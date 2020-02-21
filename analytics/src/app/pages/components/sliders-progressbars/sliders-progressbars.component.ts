import {
	Component
} from "@angular/core";


@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./sliders-progressbars.component.html",
	styleUrls: ["./sliders-progressbars.component.scss"]
})
export class SlidersProgressbarsComponent {
	//Slider Demo
	demo: number;
	val: number = 50;
	min: number = 0;
	max: number = 100;
	disabledValue = 0;
	//Progressbar Demo
	color: string = "primary";
	determinateProgressValue: number = 30;
	bufferProgressValue: number = 30;
	bufferBufferValue: number = 40;

	stepDeterminateProgressVal(val: number) {
		this.determinateProgressValue = this.clampValue(
			val + this.determinateProgressValue
		);
	}

	stepBufferProgressVal(val: number) {
		this.bufferProgressValue = this.clampValue(val + this.bufferProgressValue);
	}

	stepBufferBufferVal(val: number) {
		this.bufferBufferValue = this.clampValue(val + this.bufferBufferValue);
	}

	private clampValue(value: number) {
		return Math.max(0, Math.min(100, value));
	}
}
