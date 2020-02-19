import { Component, Input } from "@angular/core";

@Component({
	selector: "social-card",
	templateUrl: "./social-card.component.html",
	styleUrls: ["./social-card.component.scss"]
})
export class SocialCardComponent {
	@Input("title") title: string;
	@Input("subtitle") subtitle: string;
	@Input("avatarImgPath") avatarImgPath: string;
	@Input("backgroundImg") backgroundImg: string;
	@Input("postCount") postCount: string;
	@Input("followersCount") followersCount: string;
	@Input("followingCount") followingCount: string;
	constructor() {
		this.title = this.title || "";
		this.subtitle = this.subtitle || "";
		this.avatarImgPath = this.avatarImgPath || "";
		this.backgroundImg = this.backgroundImg || "";
		this.postCount = this.postCount || "0";
		this.followersCount = this.followersCount || "0";
		this.followingCount = this.followingCount || "0";
	}
}
