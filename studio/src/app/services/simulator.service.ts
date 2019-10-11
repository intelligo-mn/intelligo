import { Injectable } from '@angular/core';
import * as jsonpath from 'jsonpath';
import * as _ from 'underscore';
import { SimulatorFrameComponent } from '../components/studio/simulator-frame/simulator-frame.component';
import * as models from '../models/chatflow.models';
import { CarouselButton } from '../models/chatflow.models';
import * as chatModels from '../models/intelligo-chat.models';
import { GlobalsService } from '../services/globals.service';
import { InfoDialogService } from '../services/info-dialog.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class SimulatorService {

	private debug: boolean = true;
	private chatFlow: models.ChatNode[] = [];
	private state: SimulatorState;
	private simulatorFrame: SimulatorFrameComponent;

	public simulatorBusinessId = 'ana-studio';
	public simulatorCustomerId = 'ana-simulator';

	constructor(private http: HttpClient, private globals: GlobalsService, private infoDialog: InfoDialogService) {
		window.onmessage = (event) => {
			this.logDebug('On message received from client:');
			this.logDebug(event.data);
			let msg = event.data as SimulatorMessage;
			if (msg.type == SimulatorMessageType.AnaChatMessage) {
				let cfMsg = (msg as AnaChatSimulatorMessage);
				this.handleIncomingMessage(cfMsg.data);
			}
		}
	}

	init(chatFlow: models.ChatNode[], simulatorFrame: SimulatorFrameComponent) {
		this.chatFlow = chatFlow;
		this.simulatorFrame = simulatorFrame;

		if (this.chatFlow && this.chatFlow.length > 0) {
			this.state = {
				variables: {}
			};
			this.pushResetToClient();
			let firstMsg: any = {
				"meta": {
					"sender": {
						"id": this.simulatorBusinessId,
						"medium": 100
					},
					"recipient": {
						"id": this.simulatorCustomerId,
						"medium": 100
					},
					"senderType": chatModels.SenderType.USER,
					"timestamp": new Date().getTime(),
				},
				"data": {
					"type": 2,
					"content": {
						"inputType": chatModels.InputType.OPTIONS,
						"mandatory": 1,
						"options": [
							{
								"title": "Get Started",
								"value": "GetStarted"
							}
						],
						"input": {
							"val": "GET_STARTED"
						}
					}
				}
			};
			this.handleIncomingMessage(firstMsg);
		}
	}

	handleIncomingMessage(message: chatModels.IntelligoChatMessage) {
		this.logDebug("Incoming message from client: ");
		this.logDebug(message);
		this.processIncomingMessage(message);
	}

	pushMessageToClient(message: chatModels.IntelligoChatMessage) {
		if (this.simulatorFrame) {
			let resp: AnaChatSimulatorMessage = {
				data: message,
				type: SimulatorMessageType.AnaChatMessage
			};
			this.simulatorFrame.frame().postMessage(resp, "*");
		}
	}

	pushResetToClient() {
		if (this.simulatorFrame) {
			this.simulatorFrame.frame().postMessage({
				type: SimulatorMessageType.AnaChatReset
			}, "*");
		}
	}

	private processIncomingMessage(chatMsg: chatModels.IntelligoChatMessage) {
		let message = chatMsg.data;
		if (message.type == chatModels.MessageType.INPUT) {
			let ipMsgContent = message.content as chatModels.InputContent;
			if (ipMsgContent.input && Object.keys(ipMsgContent.input).length > 0) {
				let nextNodeId = "";
				let userData: any = null;
				switch (ipMsgContent.inputType) {
					case chatModels.InputType.LOCATION://Click, Complex
						{
							let locIp = ipMsgContent.input as chatModels.LocationInput;
							userData = locIp.location;
							let clickedBtn = this.getNodeButtonByType(models.ButtonType.GetLocation);
							if (clickedBtn)
								nextNodeId = clickedBtn.NextNodeId;
						}
						break;
					case chatModels.InputType.DATE://Click, Complex
						{
							let ip = ipMsgContent.input as chatModels.DateInput;
							userData = ip.date;
							let clickedBtn = this.getNodeButtonByType(models.ButtonType.GetDate);
							if (clickedBtn)
								nextNodeId = clickedBtn.NextNodeId;
						}
						break;
					case chatModels.InputType.TIME://Click, Complex
						{
							let ip = ipMsgContent.input as chatModels.TimeInput;
							userData = ip.time;
							let clickedBtn = this.getNodeButtonByType(models.ButtonType.GetTime);
							if (clickedBtn)
								nextNodeId = clickedBtn.NextNodeId;
						}
						break;
					case chatModels.InputType.ADDRESS://Click, Complex
						{
							let ip = ipMsgContent.input as chatModels.AddressInputField;
							userData = ip.address;
							let clickedBtn = this.getNodeButtonByType(models.ButtonType.GetAddress);
							if (clickedBtn)
								nextNodeId = clickedBtn.NextNodeId;
						}
						break;
					case chatModels.InputType.MEDIA: //Click, Non Complex
						{
							let ip = ipMsgContent.input as chatModels.MediaInput;
							if (ip.media && ip.media.length > 0 && ip.media[0]) {

								if (typeof ip.media[0].url == 'object')
									userData = (<any>ip.media[0].url).changingThisBreaksApplicationSecurity;
								else
									userData = ip.media[0].url;
								let cfmType = models.ButtonType.GetFile;
								switch (ip.media[0].type) {
									case chatModels.MediaType.AUDIO:
										cfmType = models.ButtonType.GetAudio;
										break;
									case chatModels.MediaType.VIDEO:
										cfmType = models.ButtonType.GetVideo;
										break;
									case chatModels.MediaType.IMAGE:
										cfmType = models.ButtonType.GetImage;
										break;
									case chatModels.MediaType.FILE:
									default:
										cfmType = models.ButtonType.GetFile;
										break;
								}
								let clickedBtn = this.getNodeButtonByType(cfmType);
								if (clickedBtn)
									nextNodeId = clickedBtn.NextNodeId;
							}
						}
						break;
					case chatModels.InputType.OPTIONS: //Click, Non Complex
						{
							let ip = ipMsgContent.input as chatModels.TextInput; //Option also has input.val
							if (ip.val == "GET_STARTED") {
								let firstNode = _.first(this.chatFlow.filter(x => x.IsStartNode));
								nextNodeId = (firstNode ? firstNode.Id : this.chatFlow[0].Id);
							} else {
								let clickedBtn = this.getNodeButtonById(ip.val);
								if (clickedBtn) {
									nextNodeId = clickedBtn.NextNodeId;
									userData = clickedBtn.VariableValue;
								}
							}
						}
						break;
					case chatModels.InputType.LIST://Click, Complex
						{
							let ipMsg = ipMsgContent as chatModels.ListInputContent;
							let ip = ipMsg.input;
							let listSelectedValues = ip.val.split(',');
							let listSelectedItems = ipMsg.values.filter(x => listSelectedValues.indexOf(x.value) != -1);
							userData = ip.val;//listSelectedItems.map(x => x.text);
							let clickedBtn = this.getNodeButtonByType(models.ButtonType.GetItemFromSource);
							if (clickedBtn)
								nextNodeId = clickedBtn.NextNodeId;
						}
						break;
					case chatModels.InputType.PHONE:
						{
							let ip = ipMsgContent.input as chatModels.TextInput;
							userData = ip.val;
							let clickedBtn = this.getNodeButtonByType(models.ButtonType.GetPhoneNumber);
							if (clickedBtn)
								nextNodeId = clickedBtn.NextNodeId;
						}
						break;
					case chatModels.InputType.EMAIL:
						{
							let ip = ipMsgContent.input as chatModels.TextInput;
							userData = ip.val;
							let clickedBtn = this.getNodeButtonByType(models.ButtonType.GetEmail);
							if (clickedBtn)
								nextNodeId = clickedBtn.NextNodeId;
						}
						break;
					case chatModels.InputType.NUMERIC:
						{
							let ip = ipMsgContent.input as chatModels.TextInput;
							userData = ip.val;
							let clickedBtn = this.getNodeButtonByType(models.ButtonType.GetNumber);
							if (clickedBtn)
								nextNodeId = clickedBtn.NextNodeId;
						}
						break;
					case chatModels.InputType.TEXT:
						{
							let ip = ipMsgContent.input as chatModels.TextInput;
							userData = ip.val;
							let clickedBtn = this.getNodeButtonByType(models.ButtonType.GetText);
							if (clickedBtn)
								nextNodeId = clickedBtn.NextNodeId;
						}
						break;
					default:
						break;
				}
				if (typeof userData == 'object') {
					userData = JSON.stringify(userData);
				}
				this.saveVariable(userData);
				this.gotoNextNode(nextNodeId);
			}
		} else if (message.type == chatModels.MessageType.CAROUSEL) {
			let msgContent = message.content as chatModels.CarouselContent;
			if (msgContent.input && Object.keys(msgContent.input).indexOf('val') != -1 && msgContent.input.val) {
				let clickedCarBtn = this.getCarouselButtonById(msgContent.input.val);
				this.saveVariable(clickedCarBtn.VariableValue);
				switch (clickedCarBtn.Type) {
					case models.CarouselButtonType.DeepLink:
					case models.CarouselButtonType.OpenUrl:
					case models.CarouselButtonType.NextNode:
					default:
						this.gotoNextNode(clickedCarBtn.NextNodeId);
						break;
				}
			}
		}
	}

	private gotoNextNode(nextNodeId: string) {
		let nextNode = this.getNodeById(nextNodeId);
		if (nextNode)
			this.processNode(nextNode);
	}

	private getNodeById(Id: string) {
		if (Id) {
			let foundNodes = this.chatFlow.filter(n => n.Id == Id);
			if (foundNodes && foundNodes.length > 0)
				return foundNodes[0];
		}
		return null;
	}

	private getNodeButtonById(buttonId: string) {
		let btn = this.state.currentNode.Buttons.filter(x => x._id == buttonId);
		return (btn && btn.length > 0) ? btn[0] : null;
	}

	private getNodeButtonByType(type: models.ButtonType) {
		let btn = this.state.currentNode.Buttons.filter(x => x.ButtonType == type);
		let firstTry = (btn && btn.length > 0) ? btn[0] : null;
		if (firstTry) return firstTry;

		if (type == models.ButtonType.GetText) {
			let found = _.first(_.filter(this.state.currentNode.Buttons, x => _.contains([
				models.ButtonType.GetPhoneNumber,
				models.ButtonType.GetEmail,
				models.ButtonType.GetNumber
			], x.ButtonType)));
			if (found) return found;
		}
		return null;
	}

	private getCarouselButtonById(carItemBtnId: string) {
		let carSection = this.state.currentSection as models.CarouselSection;
		if (carSection && carSection.SectionType == models.SectionType.Carousel) {
			let selectedCarBtn: CarouselButton = null;
			for (var i = 0; i < carSection.Items.length; i++) {
				let carItem = carSection.Items[i];
				for (var j = 0; j < carItem.Buttons.length; j++) {
					let carBtn = carItem.Buttons[j];
					if (carBtn._id == carItemBtnId) {
						selectedCarBtn = carBtn;
						break;
					}
				}
				if (selectedCarBtn) {
					break;
				}
			}
			return selectedCarBtn;
		}
		return null;
	}

	private saveVariable(value: string) {
		if (value && this.state.currentNode && this.state.currentNode.VariableName)
			this.state.variables[this.state.currentNode.VariableName] = value;
	}

	private logDebug(msg: any) {
		if (this.debug)
			console.log(msg);
	}

	private processVerbsForChatNode(chatNode: models.ChatNode): models.ChatNode {
		try {
			let nodeJson = this.processVerbs(JSON.stringify(chatNode));
			return JSON.parse(nodeJson) as models.ChatNode;
		} catch (e) {
			this.logDebug(e);
		}
	}

	private replaceTxt(subStr, key) {
		if (!key)
			key = subStr.replace('{{', '').replace('}}', '');

		try {
			if (this.state.variables && this.state.variables[key])
				return this.state.variables[key];
			else {
				let rootToken = key.split(/\.|\[/)[0];
				let wrappedResp = {};
				wrappedResp[rootToken] = JSON.parse(this.state.variables[rootToken]);
				let deepValue: any = jsonpath.query(wrappedResp, key);
				if (deepValue && typeof deepValue == 'object' && deepValue.length == 1) {
					deepValue = deepValue[0];
				}
				return deepValue;
			}
		} catch (e) {
			return subStr;
		}
	}

	private jsonEscape(value: any) {
		if (value && (typeof value == "string") && value.replace) {
			let rTxt = value
				.replace(/\n/g, "\\n")
				//.replace(/\'/g, "\\'")
				.replace(/\"/g, '\\"')
				//.replace(/\&/g, "\\&")
				.replace(/\r/g, "\\r")
				.replace(/\t/g, "\\t")
				.replace(/\f/g, "\\f");
			return rTxt;
		}
		return value;
	}

	private processVerbs(txt: string): string {
		let processedText = txt.replace(/\[~(.*?)\]|{{(.*?)}}/g, (subStr, key) => {
			return this.jsonEscape(this.replaceTxt(subStr, key));
		});
		return processedText;
	}

	private processNode(chatNode: models.ChatNode, section?: models.Section) {

		chatNode = this.processVerbsForChatNode(chatNode);
		this.state.currentNode = chatNode;
		this.state.currentSection = section || _.first(chatNode.Sections);

		switch (chatNode.NodeType) {
			case models.NodeType.ApiCall:
				{
					let apiHeaders = new HttpHeaders();

					if (chatNode.Headers) {
						let splits = chatNode.Headers.split(/\n|,/);
						for (var si = 0; si < splits.length; si++) {
							try {
								let split = splits[si];
								if (split.indexOf(':') != -1) {
									let key = split.split(':')[0];
									let value = split.split(':')[1];
									apiHeaders.set(key, value);
								}
							} catch (e) {
								this.logDebug('Invalid format provided in headers');
								this.logDebug(e);
							}
						}
					}

					let reqBody: string = null;
					if (chatNode.RequestBody)
						reqBody = this.processVerbs(chatNode.RequestBody);

					let reqParams = new HttpParams();
					if (chatNode.RequiredVariables) {
						for (var i = 0; i < chatNode.RequiredVariables.length; i++) {
							if (chatNode.RequiredVariables[i] && Object.keys(this.state.variables).indexOf(chatNode.RequiredVariables[i]) != -1)
								reqParams.append(chatNode.RequiredVariables[i], this.state.variables[chatNode.RequiredVariables[i]]);
						}
					}

					let nextNodeId = chatNode.NextNodeId;
					this.http.request(models.APIMethod[chatNode.ApiMethod], chatNode.ApiUrl, {
						headers: apiHeaders,
						body: reqBody,
						params: reqParams,
					}).subscribe((res: any) => {
						this.saveVariable(res.text());
						this.processConditionNode(chatNode);
					}, err => {
						if (Math.trunc(err.status / 100) == 5 || typeof err._body == 'object') { //Only 5xx errors are counted as errors
							this.logDebug(err);
							this.gotoNextNode(nextNodeId); //Fallback node
						} else {
							this.saveVariable(err._body);
							this.processConditionNode(chatNode);
						}
					});
				}
				break;
			case models.NodeType.Card:
				break;
			case models.NodeType.Condition:
				this.processConditionNode(chatNode);
				break;

			case models.NodeType.Combination:
			default:
				{
					if (chatNode.Sections && chatNode.Sections.length > 0) {
						let msg = this.convertSection(this.state.currentSection);
						this.prepareReplyAndSend(msg);
						let sectionIndex = chatNode.Sections.findIndex(x => x._id == this.state.currentSection._id);
						let remainingSections = chatNode.Sections.length - (sectionIndex + 1);
						if (remainingSections > 0) {
							this.processNode(chatNode, chatNode.Sections[sectionIndex + 1]);
							return;
						}
					}

					if (this.state.currentNode && this.state.currentNode.Buttons && this.state.currentNode.Buttons.length > 0) {
						this.convertButtons(this.state.currentNode, (inputMsgToSend) => {
							this.prepareReplyAndSend(inputMsgToSend);
						});
					}
				}
				break;
		}
	}

	private prepareReplyAndSend(data: chatModels.IntelligoMessageData) {
		let meta: chatModels.IntelligoMeta = {
			id: this.globals.uuidv4(),
			recipient: {
				id: this.simulatorBusinessId,
				medium: 100
			},
			sender: {
				id: this.simulatorCustomerId,
				medium: 100
			},
			senderType: chatModels.SenderType.ANA,
			sessionId: '1234',
			timestamp: new Date().getTime(),
			responseTo: ''
		};
		this.pushMessageToClient({
			meta: meta,
			data: data
		});
	}

	private convertSection(section: models.Section): chatModels.IntelligoMessageData {
		let anaMessageContent: chatModels.SimpleContent = {
			text: ''
		};
		let anaMessageData: chatModels.IntelligoMessageData = {
			content: anaMessageContent,
			type: chatModels.MessageType.SIMPLE
		};
		switch (section.SectionType) {
			case models.SectionType.Image:
				anaMessageContent.media = {
					type: chatModels.MediaType.IMAGE,
					url: (section as models.ImageSection).Url,
				}
				anaMessageContent.text = (section as models.ImageSection).Title;
				break;
			case models.SectionType.Text:
			default:
				anaMessageContent.text = (section as models.TextSection).Text;
				break;
			case models.SectionType.Gif:
				anaMessageContent.media = {
					type: chatModels.MediaType.IMAGE,
					url: (section as models.ImageSection).Url,
				}
				anaMessageContent.text = (section as models.ImageSection).Title;
				break;
			case models.SectionType.Audio:
				anaMessageContent.media = {
					type: chatModels.MediaType.AUDIO,
					url: (section as models.AudioSection).Url,
				}
				anaMessageContent.text = (section as models.AudioSection).Title;
				break;
			case models.SectionType.Video:
				anaMessageContent.media = {
					type: chatModels.MediaType.VIDEO,
					url: (section as models.VideoSection).Url,
				}
				anaMessageContent.text = (section as models.VideoSection).Title;
				break;
			case models.SectionType.Carousel:
				{
					let carContent: chatModels.CarouselContent = {
						items: _.map((section as models.CarouselSection).Items, x => {
							return {
								title: x.Title,
								desc: x.Caption,
								media: {
									type: chatModels.MediaType.IMAGE,
									url: x.ImageUrl
								},
								options: _.map(x.Buttons, y => {
									if (y.Type == models.CarouselButtonType.NextNode) {
										return {
											title: y.Text,
											value: y._id,
											type: this.convertCarouselButtonType(y.Type)
										};
									} else {
										return {
											title: y.Text,
											value: JSON.stringify({
												url: y.Url,
												value: y._id
											}),
											type: this.convertCarouselButtonType(y.Type)
										};
									}
								}),
								url: ''
							};
						}),
						mandatory: 1
					};
					anaMessageData = {
						type: chatModels.MessageType.CAROUSEL,
						content: carContent
					};
				}
				break;
		}
		return anaMessageData;
	}

	private convertButtons(chatNode: models.ChatNode, callback: (resp: chatModels.IntelligoMessageData) => void): void {

		let clickInputs = _.filter(chatNode.Buttons, x => _.contains([
			models.ButtonType.DeepLink,
			models.ButtonType.OpenUrl,
			models.ButtonType.GetDate,
			models.ButtonType.GetImage,
			models.ButtonType.GetVideo,
			models.ButtonType.GetAddress,
			models.ButtonType.GetAudio,
			models.ButtonType.GetDateTime,
			models.ButtonType.GetTime,
			models.ButtonType.GetItemFromSource,
			models.ButtonType.GetFile,
			models.ButtonType.GetLocation,
			models.ButtonType.FetchChatFlow,
			models.ButtonType.ShowConfirmation,
			models.ButtonType.NextNode,
		], x.ButtonType));

		let textInputs = _.filter(chatNode.Buttons, x => _.contains([
			models.ButtonType.GetText,
			models.ButtonType.GetEmail,
			models.ButtonType.GetPhoneNumber,
			models.ButtonType.GetNumber,
		], x.ButtonType));

		let mandatory = 1;
		if (textInputs && textInputs.length > 0 && clickInputs && clickInputs.length > 0)
			mandatory = 0;

		if (clickInputs && clickInputs.length > 0) {
			if (_.filter(clickInputs, x => _.contains([models.ButtonType.NextNode, models.ButtonType.OpenUrl], x.ButtonType)).length > 0) { //If next node/open url button is present, only options can be sent
				//Build options input and send
				let optionsInput: chatModels.OptionsInputContent = {
					inputType: chatModels.InputType.OPTIONS,
					mandatory: mandatory,
					options: _.map(_.filter(clickInputs, x => _.contains([models.ButtonType.NextNode, models.ButtonType.OpenUrl], x.ButtonType)), y => {
						return {
							title: y.ButtonName || y.ButtonText,
							value: (y.ButtonType == models.ButtonType.OpenUrl ? JSON.stringify({ url: y.Url, value: y._id }) : y._id),
							type: this.convertButtonType(y.ButtonType)
						}
					})
				};
				return callback({
					content: optionsInput,
					type: chatModels.MessageType.INPUT
				});
			}

			let inputButton = _.first(clickInputs);
			switch (inputButton.ButtonType) {
				case models.ButtonType.GetDate:
					return callback({
						content: <chatModels.DateInputContent>{
							mandatory: mandatory,
							inputType: chatModels.InputType.DATE,
						},
						type: chatModels.MessageType.INPUT
					});
				case models.ButtonType.GetTime:
					return callback({
						content: <chatModels.DateInputContent>{
							mandatory: mandatory,
							inputType: chatModels.InputType.TIME,
						},
						type: chatModels.MessageType.INPUT
					});
				case models.ButtonType.GetVideo:
					return callback({
						content: <chatModels.MediaInputContent>{
							mandatory: mandatory,
							inputType: chatModels.InputType.MEDIA,
							mediaType: chatModels.MediaType.VIDEO
						},
						type: chatModels.MessageType.INPUT
					});
				case models.ButtonType.GetImage:
					return callback({
						content: <chatModels.MediaInputContent>{
							mandatory: mandatory,
							inputType: chatModels.InputType.MEDIA,
							mediaType: chatModels.MediaType.IMAGE
						},
						type: chatModels.MessageType.INPUT
					});
				case models.ButtonType.GetAddress:
					return callback({
						content: <chatModels.AddressInputContent>{
							mandatory: mandatory,
							inputType: chatModels.InputType.ADDRESS,
							requiredFields: [
								"area",
								"country",
								"pin",
								"city",
								"state",
								"line1"
							]
						},
						type: chatModels.MessageType.INPUT
					});
				case models.ButtonType.GetAudio:
					return callback({
						content: <chatModels.MediaInputContent>{
							mandatory: mandatory,
							inputType: chatModels.InputType.MEDIA,
							mediaType: chatModels.MediaType.AUDIO
						},
						type: chatModels.MessageType.INPUT
					});
				case models.ButtonType.GetItemFromSource:
					{
						if (inputButton.ItemsSource) {
							let msg: chatModels.ListInputContent = {
								inputType: chatModels.InputType.LIST,
								multiple: inputButton.AllowMultiple,
								mandatory: mandatory,
								values: []
							};
							let itemSrc = inputButton.ItemsSource.split(',').map(x => {
								let y = x.trim().split(':');
								return { K: y[0], V: y[1] }
							});
							itemSrc.forEach(x => msg.values.push({
								text: x.K,
								value: x.V
							}));
							return callback({
								content: msg,
								type: chatModels.MessageType.INPUT
							});
						}
						if (inputButton.Url) {
							this.http.get(inputButton.Url).subscribe((x:any) => {
								let items = x.json() as {
									[key: string]: string;
								};
								let itemKeys = Object.keys(items);

								let msg: chatModels.ListInputContent = {
									inputType: chatModels.InputType.LIST,
									multiple: inputButton.AllowMultiple,
									mandatory: mandatory,
									values: itemKeys.map(key => {
										return {
											text: key,
											value: items[key]
										};
									})
								};

								return callback({
									content: msg,
									type: chatModels.MessageType.INPUT
								});
							});
							return;
						}
					}
				case models.ButtonType.GetFile:
					return callback({
						content: <chatModels.MediaInputContent>{
							mandatory: mandatory,
							inputType: chatModels.InputType.MEDIA,
							mediaType: chatModels.MediaType.FILE
						},
						type: chatModels.MessageType.INPUT
					});
				case models.ButtonType.GetLocation:
					return callback({
						content: <chatModels.LocationInputContent>{
							mandatory: mandatory,
							inputType: chatModels.InputType.LOCATION,
						},
						type: chatModels.MessageType.INPUT
					});
				default:
					break;
			}
		}

		if (textInputs && textInputs.length > 0) {
			let textInput = textInputs[0];
			let inputMsg: chatModels.TextInputContent = {
				inputType: this.convertButtonTypeToInputType(textInput.ButtonType),
				mandatory: mandatory,
				textInputAttr: {
					defaultText: textInput.DefaultText,
					maxLength: textInput.MaxLength,
					minLength: textInput.MinLength,
					multiLine: textInput.IsMultiLine ? 1 : 0,
					placeHolder: textInput.PlaceholderText
				}
			}
			return callback({
				content: inputMsg,
				type: chatModels.MessageType.INPUT
			});
		}
	}

	private convertButtonTypeToInputType(srcType: models.ButtonType): chatModels.InputType {
		switch (srcType) {
			default:
			case models.ButtonType.GetText:
				return chatModels.InputType.TEXT;
			case models.ButtonType.GetEmail:
				return chatModels.InputType.EMAIL;
			case models.ButtonType.GetNumber:
				return chatModels.InputType.NUMERIC;
			case models.ButtonType.GetPhoneNumber:
				return chatModels.InputType.PHONE;
		}
	}

	private convertCarouselButtonType(srcType: models.CarouselButtonType): chatModels.ButtonType {
		switch (srcType) {
			case models.CarouselButtonType.DeepLink:
			case models.CarouselButtonType.OpenUrl:
				return chatModels.ButtonType.URL;
			case models.CarouselButtonType.NextNode:
			default:
				return chatModels.ButtonType.ACTION;
		}
	}

	private convertButtonType(srcType: models.ButtonType): chatModels.ButtonType {
		switch (srcType) {
			case models.ButtonType.DeepLink:
			case models.ButtonType.OpenUrl:
				return chatModels.ButtonType.URL;
			case models.ButtonType.NextNode:
			default:
				return chatModels.ButtonType.ACTION;
		}
	}

	private processConditionNode(chatNode: models.ChatNode) {
		let done = false;
		try {
			if (chatNode.Buttons) {
				for (var btnIdx = 0; btnIdx < chatNode.Buttons.length; btnIdx++) {
					let btn = chatNode.Buttons[btnIdx];
					let rootToken = btn.ConditionMatchKey.split(/\.|\[/)[0];
					let wrappedResp = {};
					wrappedResp[rootToken] = JSON.parse(this.state.variables[rootToken]);
					let deepValue: any = jsonpath.query(wrappedResp, btn.ConditionMatchKey);
					if (deepValue && typeof deepValue == 'object' && deepValue.length == 1) {
						deepValue = deepValue[0];
					}
					if (this.match(deepValue, btn.ConditionOperator, btn.ConditionMatchValue)) {
						this.saveVariable(btn.VariableValue);
						this.gotoNextNode(btn.NextNodeId);
						done = true;
						break;
					}
				}
			}
		} catch (e) {
			if (chatNode.Buttons) {
				for (var btnIdx = 0; btnIdx < chatNode.Buttons.length; btnIdx++) {
					let btn = chatNode.Buttons[btnIdx];
					let leftOperand = this.state.variables[btn.ConditionMatchKey];
					if (this.match(leftOperand, btn.ConditionOperator, btn.ConditionMatchValue)) {
						this.saveVariable(btn.VariableValue);
						this.gotoNextNode(btn.NextNodeId);
						done = true;
						break;
					}
				}
			}
		}
		if (!done)
			this.gotoNextNode(chatNode.NextNodeId); //Fallback node id
	}

	private match(left: any, op: models.ConditionOperator, right: any) {
		try {
			switch (op) {
				case models.ConditionOperator.Between:
					{
						let r1 = right.split(',')[0];
						let r2 = right.split(',')[1];

						return (r1 < left && left < r2);
					}
				case models.ConditionOperator.NotEqualTo:
					return left != right;
				case models.ConditionOperator.GreaterThan:
					return left > right;
				case models.ConditionOperator.LessThan:
					return left < right;
				case models.ConditionOperator.GreaterThanOrEqualTo:
					return left >= right;
				case models.ConditionOperator.LessThanOrEqualTo:
					return left <= right;
				case models.ConditionOperator.In:
					return right.split(',').indexOf(left) != -1;
				case models.ConditionOperator.NotIn:
					return right.split(',').indexOf(left) == -1;
				case models.ConditionOperator.StartsWith:
					return left.startsWith(right);
				case models.ConditionOperator.EndsWith:
					return left.endsWith(right);
				case models.ConditionOperator.Contains:
					return left.indexOf(right) != -1;
				case models.ConditionOperator.IsNull:
					return (left == null || left == undefined);
				case models.ConditionOperator.EqualTo:
				default:
					return left == right;
			}
		} catch (e) {
			this.infoDialog.alert('Invalid operation or operands', e);
		}
	}
}

export interface SimulatorState {
	currentNode?: models.ChatNode;
	currentSection?: models.Section;
	variables?: {
		[key: string]: string
	}
}

export enum SimulatorMessageType {
	AnaChatMessage = 'AnaChatMessage', AnaChatReset = 'AnaChatReset'
}
export interface SimulatorMessage {
	type: SimulatorMessageType;
	data: any;
}

export interface AnaChatSimulatorMessage extends SimulatorMessage {
	data: chatModels.IntelligoChatMessage;
}
