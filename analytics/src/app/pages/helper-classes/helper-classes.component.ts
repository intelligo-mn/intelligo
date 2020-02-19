import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./helper-classes.component.html",
	styleUrls: ["./helper-classes.component.scss"],
	encapsulation: ViewEncapsulation.Emulated
})
export class HelperClassesComponent implements OnInit {
	//Header Title
	title: string = "Helper Classes";

	constructor() {}

	ngOnInit() {}
}
