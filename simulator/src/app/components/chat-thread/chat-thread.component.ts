import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren
} from "@angular/core";
import { MatDialog } from "@angular/material";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import * as hammer from "hammerjs";
import * as vm from "../../models/ana-chat-vm.models";
import * as models from "../../models/ana-chat.models";
import * as config from "../../models/ana-config.models";
import { APIService } from "../../services/api.service";
import { ChainDelayService } from "../../services/chain-delay.service";
import { InfoDialogService } from "../../services/info-dialog.service";
import { SimulatorService } from "../../services/simulator.service";
import {
  StompConnectionStatus,
  StompService
} from "../../services/stomp.service";
import { Config, UtilitiesService } from "../../services/utilities.service";

@Component({
  selector: "app-chat-thread",
  templateUrl: "./chat-thread.component.html",
  styleUrls: ["./chat-thread.component.scss"]
})
export class ChatThreadComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    if (this.chatThreadView)
      this.chatThread.chatThreadView = this.chatThreadView.nativeElement;
  }

  constructor(
    private stompService: StompService,
    private apiService: APIService,
    private dialog: MatDialog,
    private simulator: SimulatorService,
    private sanitizer: DomSanitizer,
    private infoDialog: InfoDialogService,
    private chainDelayService: ChainDelayService
  ) {
    this.chatThread = new vm.ChatThreadVM(this.sanitizer);
    this.chatInput = new vm.ChatInputVM(
      this.dialog,
      this.chatThread,
      this.apiService,
      this.stompService,
      this,
      this.sanitizer
    );
  }
  @ViewChild("inputContainer", { static: true })
  inputContainerRef: ElementRef;

  @ViewChild("chatThreadView", { static: true })
  chatThreadView: ElementRef;

  @ViewChildren("carouselContainer")
  carouselContainers: ElementRef[];

  chatThread: vm.ChatThreadVM;
  chatInput: vm.ChatInputVM;
  settings: config.AppSettings;
  isMin: boolean = false;
  isMute: boolean = false;

  fullScreenImage: string | SafeUrl;
  fullScreenVideo: string | SafeUrl;

  connectionStatusMessage() {
    if (!this.stompService) return "";
    switch (this.stompService.connectionStatus) {
      case StompConnectionStatus.Connected:
        return "Available";
      case StompConnectionStatus.Connecting:
        return "Trying to connect...";
      case StompConnectionStatus.Disconnected:
        return "Not available";
      default:
        return "";
    }
  }
  setMin(min: boolean) {
    this.isMin = min;
  }
  carItemWidth: number = 245;
  scrollCarousel(carId: string, direction: string) {
    if (this.carouselContainers && this.carouselContainers.length > 0) {
      let carousels = this.carouselContainers
        .map(x => x.nativeElement as HTMLDivElement)
        .filter(x => x.classList.contains(carId));
      if (carousels) {
        let car = carousels[0];
        if (direction == "right") {
          if (car.scrollBy) {
            car.scrollBy({ behavior: "smooth", left: this.carItemWidth }); //The 'left' value should be the width + margin of a single carousel item set in the CSS
          } else {
            car.scrollLeft += this.carItemWidth;
          }
        } else if (direction == "left") {
          if (car.scrollBy) {
            car.scrollBy({ behavior: "smooth", left: -this.carItemWidth });
          } else {
            car.scrollLeft -= this.carItemWidth;
          }
        }
      }
    }
  }

  canScrollCarousel(carId: string, direction: string) {
    return true;
    //Below implementation is not accurate.

    //if (this.carouselContainers && this.carouselContainers.length > 0) {
    //    let carousels = this.carouselContainers.map(x => x.nativeElement as HTMLDivElement).filter(x => x.classList.contains(carId));
    //    if (carousels) {
    //        let car = carousels[0];
    //        if (direction == 'right')
    //            return car.scrollLeft < car.scrollWidth;
    //        else if (direction == 'left')
    //            return car.scrollLeft > 0;
    //    }
    //}
  }

  isLastInMessageGroup(msg: vm.ChatMessageVM) {
    let msgsOnly = this.chatThread.messages.filter(
      x => x.getMessageContentType() != models.MessageContentType.Typing
    );
    let index = msgsOnly.indexOf(msg);
    if (index != -1) {
      if (index >= msgsOnly.length - 1) return true;
      if (msgsOnly[index].direction != msgsOnly[index + 1].direction)
        return true;
    }
    return false;
  }
  isLastMessage(msg: vm.ChatMessageVM) {
    let msgsOnly = this.chatThread.messages.filter(
      x => x.getMessageContentType() != models.MessageContentType.Typing
    );
    let index = msgsOnly.indexOf(msg);
    return index == msgsOnly.length - 1;
  }
  handleCarouselClick(
    chatMessage: vm.ChatMessageVM,
    carOption: models.CarouselOption
  ) {
    let carMsg = chatMessage.carouselMessageData();
    if (!carMsg.content.input)
      carMsg.content.input = {
        val: ""
      };
    if (carOption.type == models.ButtonType.URL) {
      let v = JSON.parse(carOption.value);
      carMsg.content.input.val = v.value;
      window.open(v.url, "_blank");
    } else carMsg.content.input.val = carOption.value;

    let msg = this.chatThread.addTextReply(
      carOption.title,
      UtilitiesService.uuidv4()
    );
    this._sendMessageDelegate(
      new models.ANAChatMessage({
        meta: UtilitiesService.getReplyMeta(chatMessage.meta),
        data: carMsg
      }),
      msg
    );

    this.chatInput.resetInputs();
  }

  insertThreadMessageForCarouselInput(chatMessage: vm.ChatMessageVM) {
    try {
      let carMsg = chatMessage.carouselMessageData();
      let msg: vm.ChatMessageVM = null;
      carMsg.content.items.forEach(x => {
        try {
          x.options.forEach(y => {
            try {
              let value = "";
              if (y.type == models.ButtonType.URL) {
                let v = JSON.parse(y.value);
                value = v.value;
              } else value = y.value;

              if (value == carMsg.content.input.val)
                msg = this.chatThread.addTextReply(
                  y.title,
                  "",
                  chatMessage.meta.timestamp,
                  true
                );
            } catch (e) {
              console.log(e);
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
      return msg;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  fetchingHistory: boolean = false;
  lastScrollTop: number = 0;
  chatThreadOnScroll(event: UIEvent) {
    if (!this.chatThread.chatThreadView) return;
    if (!this.settings || this.settings.simulatorMode) return;

    let currentScrollTop = this.chatThread.chatThreadView.scrollTop;
    if (currentScrollTop < this.lastScrollTop) {
      if (this.fetchingHistory) return;
      if (this.chatThread.chatThreadView) {
        if (this.chatThread.chatThreadView.scrollTop <= 2) {
          this.fetchingHistory = true;
          this.loadHistory(() => (this.fetchingHistory = false));
        }
      }
    }
    this.lastScrollTop = currentScrollTop;
  }

  chatTextInputOnFocus() {
    this.chatThread.scrollLastIntoView(1000);
  }

  textInputFocus() {
    let ele = this.inputContainerRef.nativeElement as HTMLDivElement;
    if (ele) {
      setTimeout(() => {
        let inputEle = ele.querySelector("#chat-text") as HTMLInputElement;
        if (inputEle) inputEle.focus();
      }, 100);
    }
  }

  loadHistory(next: () => void) {
    if (!this.settings || this.settings.simulatorMode) return;
    let oldMsgTimestamp =
      this.chatThread.messages && this.chatThread.messages.length > 0
        ? this.chatThread.messages[0].meta.timestamp
        : null;
    let oldScrollHeight: number = null;
    if (this.chatThread.chatThreadView)
      oldScrollHeight = this.chatThread.chatThreadView.scrollHeight;
    this.apiService.fetchHistory(oldMsgTimestamp).subscribe(
      resp => {
        try {
          let chatMsgs = resp.content.map(x => new models.ANAChatMessage(x));
          for (let i = 0; i < chatMsgs.length; i++) {
            let chatMsg = chatMsgs[i];
            let direction =
              chatMsg.meta.recipient.id == this.stompService.config.businessId
                ? vm.Direction.Outgoing
                : vm.Direction.Incoming;
            switch (chatMsg.data.type) {
              case models.MessageType.CAROUSEL:
                if (direction == vm.Direction.Incoming)
                  this.chatThread.addMessage(
                    new vm.ChatMessageVM(chatMsg, direction, ""),
                    true
                  );
                else if (direction == vm.Direction.Outgoing)
                  this.insertThreadMessageForCarouselInput(
                    new vm.ChatMessageVM(chatMsg, direction, "")
                  );
                break;
              case models.MessageType.SIMPLE:
                if (direction == vm.Direction.Incoming)
                  //Outgoing messages are never 'SIMPLE',  they are mostly 'INPUT' and rarely 'CAROUSEL'
                  this.chatThread.addMessage(
                    new vm.ChatMessageVM(chatMsg, direction, ""),
                    true
                  );
                break;
              case models.MessageType.INPUT:
                if (direction == vm.Direction.Outgoing) {
                  //Ignore incoming input messages as their outgoing messages will be present (along with user given data).
                  this.chatInput.insertThreadMessageForInput(
                    new vm.ChatInputItemVM(chatMsg)
                  );
                }
                break;
              default:
                break;
            }
          }

          if (!oldMsgTimestamp) {
            //Display input and scroll to last only for page 0 of the history (latest page)
            if (
              chatMsgs[0] &&
              chatMsgs[0].data.type == models.MessageType.INPUT
            ) {
              let inputContent = chatMsgs[0].data
                .content as models.InputContent;
              if (
                !inputContent.input ||
                Object.keys(inputContent.input).length <= 0
              )
                this.chatInput.setInput(new vm.ChatInputItemVM(chatMsgs[0]));
            }
            this.chatThread.scrollToLast();
          } else {
            if (oldScrollHeight && this.chatThread.chatThreadView) {
              window.requestAnimationFrame(() => {
                this.chatThread.chatThreadView.scrollTop =
                  this.chatThread.chatThreadView.scrollHeight - oldScrollHeight;
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
        if (next) next();
      },
      err => {
        if (next) next();
      }
    );
  }

  _handleMessageReceivedDelegate = message => {
    if (
      this.settings &&
      this.settings.stompConfig &&
      this.settings.stompConfig.debug
    ) {
      console.log("Socket Message Received: ");
      console.log(message);
    }

    switch (message.data.type) {
      case models.MessageType.INPUT: {
        this.chainDelayService.delay(queueLength => {
          this.chatInput.resetInputs(); //Currently only one input item is supported
          this.chatInput.setInput(new vm.ChatInputItemVM(message));
          this.chatThread.removeTyping();
          this.textInputFocus();
        }, 0);
        break;
      }
      case models.MessageType.SIMPLE:
      case models.MessageType.CAROUSEL: {
        this.chatThread.setTyping();
        this.chainDelayService.delay(queueLength => {
          let msg = new vm.ChatMessageVM(message, vm.Direction.Incoming, "");
          this.chatThread.addMessage(msg);
          this.notifyNewMsg();
          if (message.data.type == models.MessageType.CAROUSEL) {
            let carItemsWithOptions = msg
              .carouselMessageData()
              .content.items.filter(x => x.options && x.options.length > 0)
              .length;
            if (carItemsWithOptions > 0)
              //Hide the fixed input textbox if carousel has options
              this.chatInput.resetInputs();
          }
          if (queueLength > 0) this.chatThread.setTyping();
        }, 2000);
        break;
      }
      default:
        console.log(
          `Unsupported message type: ${models.MessageType[message.data.type]}`
        );
    }
  };
  _sendMessageDelegate: (
    message: models.ANAChatMessage,
    threadMsgRef: vm.ChatMessageVM
  ) => void;

  removeConsecutiveErrorsMessage() {
    let oldMsgIdx = this.chatThread.messages.findIndex(
      x => x.messageAckId == Config.consecutiveErrorsMessageAckId
    );
    if (oldMsgIdx != -1) this.chatThread.messages.splice(oldMsgIdx, 1);
  }

  notifyNewMsg() {
    if (
      this.settings.appConfig.msgSounds &&
      document.visibilityState != "visible" &&
      !this.isMute
    ) {
      let audio = new Audio("assets/sounds/new-msg.mp3");
      audio.play();
    }
  }

  openWindow(url: string | SafeUrl) {
    if (typeof url == "string") window.open(url);
    else if (typeof url == "object") {
      window.open((<any>url).changingThisBreaksApplicationSecurity);
    }
  }

  viewImage(url: string | SafeUrl) {
    this.fullScreenImage = url;

    let imgContainer = document.querySelector(
      "div.img-container"
    ) as HTMLDivElement;
    let image = document.querySelector(
      "div.img-container>img"
    ) as HTMLImageElement;

    if (imgContainer && image) {
      image.alt = "";
      image.style.transform = "";
      imgContainer.style.transform = "";
      this.setupImageViewerGestures(imgContainer, image);
    }
  }

  viewVideo(url: string | SafeUrl) {
    this.fullScreenVideo = url;
  }

  closeImageViewer() {
    this.fullScreenImage = null;
    this.destroyHammer();
  }

  closeVideoViewer() {
    this.fullScreenVideo = null;
  }

  hammerManager: HammerManager;
  destroyHammer() {
    //Hela \m/
    if (this.hammerManager) {
      this.hammerManager.destroy();
      delete this.hammerManager;
    }
  }

  setupImageViewerGestures(
    imgContainer: HTMLDivElement,
    image: HTMLImageElement
  ) {
    this.destroyHammer();

    if (!UtilitiesService.isMobile()) {
      //Ignore touch handlers if mouse is detected
      return;
    }

    this.hammerManager = new hammer.Manager(image);

    let pinch = new hammer.Pinch();
    let pan = new hammer.Pan();

    pinch.recognizeWith(pan);

    this.hammerManager.add([pinch, pan]);

    let adjustScale = 1;
    let adjustDeltaX = 0;
    let adjustDeltaY = 0;

    let currentScale = null;
    let currentDeltaX = null;
    let currentDeltaY = null;

    // Prevent long press saving on mobiles.
    imgContainer.ontouchstart = function(e) {
      e.preventDefault();
    };

    // Handles pinch and pan events/transforming at the same time;
    this.hammerManager.on("pinch pan", function(ev) {
      let transforms = [];

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      currentScale = adjustScale * ev.scale;
      currentDeltaX = adjustDeltaX + ev.deltaX / currentScale;
      currentDeltaY = adjustDeltaY + ev.deltaY / currentScale;

      // Concatinating and applying parameters.
      transforms.push(`scale(${currentScale})`);
      transforms.push(`translate(${currentDeltaX}px,${currentDeltaY}px)`);
      imgContainer.style.transform = transforms.join(" ");
    });

    this.hammerManager.on("panend pinchend", function(ev) {
      // Saving the final transforms for adjustment next time the user interacts.
      adjustScale = currentScale;
      adjustDeltaX = currentDeltaX;
      adjustDeltaY = currentDeltaY;
    });
  }

  getStarted(clearThread: boolean, askConfirmation: boolean) {
    if (askConfirmation) {
      this.infoDialog.confirm(
        "Start a fresh chat?",
        "Restarting the chat will clear current chat messages. Are you sure?",
        ok => {
          if (ok) {
            this.getStarted(true, false);
          }
        },
        "Yes",
        "No"
      );
      return;
    }
    if (clearThread) {
      this.fetchingHistory = true;
      setTimeout(() => (this.fetchingHistory = false), 1000);

      this.chatThread.messages = [];
      this.chatInput.resetInputs();
    }
    let firstMsg = new models.ANAChatMessage({
      meta: {
        sender: {
          id: this.stompService.config.businessId,
          medium: 3
        },
        recipient: {
          id: this.stompService.config.customerId,
          medium: 3
        },
        senderType: models.SenderType.USER,
        flowId: this.stompService.config.flowId,
        previousFlowId: this.stompService.config.flowId,
        currentFlowId: this.stompService.config.flowId,
        timestamp: new Date().getTime()
      },
      data: {
        type: 2,
        content: {
          inputType: models.InputType.OPTIONS,
          mandatory: 1,
          options: [
            {
              title: "Get Started",
              value: "GetStarted"
            }
          ],
          input: {
            val: ""
          }
        }
      },
      events: [
        {
          type: models.EventType.SET_SESSION_DATA,
          data: JSON.stringify(UtilitiesService.settings.appConfig.initVerbs)
        }
      ]
    });
    let msg = new vm.ChatMessageVM(
      firstMsg,
      vm.Direction.Outgoing,
      UtilitiesService.uuidv4()
    ); //Pseudo, not actually added to thread.
    this._sendMessageDelegate(
      new models.ANAChatMessage({
        meta: UtilitiesService.getReplyMeta(firstMsg.meta),
        data: firstMsg.data,
        events: firstMsg.events
      }),
      msg
    );
  }

  MH = new ModelHelpers();
  ngOnInit() {
    this.settings = UtilitiesService.settings;
    if (this.settings && this.settings.stompConfig) {
      this._sendMessageDelegate = (a, b) => this.stompService.sendMessage(a, b);

      this.stompService.handleMessageReceived = this._handleMessageReceivedDelegate;
      this.stompService.handleConnect = () => {
        if (this.chatThread.messages.length <= 0) {
          this.getStarted(false, false);
        } else {
          //Retrying all pending messages in the chat thread.
          this.removeConsecutiveErrorsMessage();
          let pendingMsgs = this.chatThread.messages.filter(
            x =>
              x.status == vm.MessageStatus.SentTimeout ||
              (x.status == vm.MessageStatus.SentToServer && x.retrySending)
          );
          pendingMsgs.forEach(x => x.retrySending());
        }
      };
      this.stompService.handleAck = (
        messageAckId: string,
        deliveredAck?: boolean
      ) => {
        if (deliveredAck) {
          //For deliveredAck, msgAckId is the msg.meta.id
          let msg = this.chatThread.messages.find(
            x => x.meta.id == messageAckId
          );
          if (msg) {
            msg.status = vm.MessageStatus.DelieveredToTarget;
            msg.clearTimeoutTimer();
          }
        } else {
          let msg = this.chatThread.messages.find(
            x => x.messageAckId == messageAckId
          );
          if (msg) {
            msg.status = vm.MessageStatus.ReceivedAtServer;
            msg.clearTimeoutTimer();
          }
        }
      };
      this.stompService.handleTyping = () => {
        this.chatThread.setTyping();
      };
      this.stompService.handleConsecutiveErrorsState = () => {
        this.removeConsecutiveErrorsMessage();
        this.chatThread.addTextIncoming(
          Config.consecutiveErrorsMessageText,
          Config.consecutiveErrorsMessageAckId
        );
      };
      this.loadHistory(() => {
        try {
          if (window.parent && window.parent.postMessage) {
            window.parent.postMessage(
              {
                type: "LOADED"
              },
              "*"
            );
          }
        } catch (e) {}
        this.stompService.connect();
      });
    }

    if (this.settings.simulatorMode) {
      this.fetchingHistory = false;
      this.simulator.handleMessageReceived = this._handleMessageReceivedDelegate;
      this.simulator.handleResetSignal = () => {
        this.chatThread.messages = [];
        this.chatInput.resetInputs();
      };
      this._sendMessageDelegate = (a, b) => this.simulator.sendMessage(a, b);
    }
  }

  carouselItemHasMedia(carItem: models.CarouselItem) {
    return (
      carItem.media &&
      (carItem.media.type != null || carItem.media.type != undefined) &&
      carItem.media.url
    );
  }
}

export class ModelHelpers {
  Direction = vm.Direction;
  MessageStatus = vm.MessageStatus;
  MessageType = models.MessageType;
  MessageContentType = models.MessageContentType;
  MediaType = models.MediaType;
  InputType = models.InputType;
  StompConnectionStatus = StompConnectionStatus;
}
