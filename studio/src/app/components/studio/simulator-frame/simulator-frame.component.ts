import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-simulator-frame",
  templateUrl: "./simulator-frame.component.html",
  styleUrls: ["./simulator-frame.component.scss"]
})
export class SimulatorFrameComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {
    let param = {
      brandingConfig: {
        primaryBackgroundColor: "#5e72e4",
        primaryForegroundColor: "white",
        secondaryBackgroundColor: "#3c3c3c",
        logoUrl: `favicon.ico`,
        agentName: "Chatbots.mn",
        frameHeight: "100%",
        frameWidth: "360px"
      },
      simulatorMode: true,
      appConfig: {
        htmlMessages: true
      }
    };
    let url = `https://simulator.chatbots.mn/?s=${btoa(JSON.stringify(param))}`;
    if (environment.local)
      url = `http://localhost:4200/index.html?s=${btoa(JSON.stringify(param))}`;
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {}
  iframeUrl: SafeResourceUrl;
  isOpen: boolean = false;

  @ViewChild("intelligoRoot")
  intelligoRoot: ElementRef;

  @ViewChild("simulatorIFrame")
  simulatorIFrame: ElementRef;

  frame() {
    return (this.simulatorIFrame.nativeElement as HTMLIFrameElement)
      .contentWindow;
  }

  minMaxBtnClick() {
    this.isOpen = !this.isOpen;
    if (this.intelligoRoot && this.intelligoRoot.nativeElement)
      (<HTMLDivElement>this.intelligoRoot.nativeElement).classList.remove(
        "intelligo-hidden"
      );
  }
}
