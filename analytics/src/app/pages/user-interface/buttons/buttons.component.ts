import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./buttons.component.html",
	styleUrls: ["./buttons.component.scss"],
	encapsulation: ViewEncapsulation.Emulated
})
export class ButtonsComponent {
	//Header Title
	title: string = "Buttons";
	private _fixed: boolean = false;
	open: boolean = false;
	spin: boolean = false;
	direction: string = "up";
	animationMode: string = "fling";
	get fixed() {
		return this._fixed;
	}
	set fixed(fixed: boolean) {
		this._fixed = fixed;
		if (this._fixed) {
			this.open = true;
		}
	}

	_click(event: any) {
		//console.log(event);
	}
}
