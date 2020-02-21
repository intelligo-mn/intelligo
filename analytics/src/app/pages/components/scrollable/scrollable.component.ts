import {
	Component
} from "@angular/core";


@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./scrollable.component.html",
	styleUrls: ["./scrollable.component.scss"]
})
export class ScrollableComponent {
	public MinimalLightScrollbar = {
		axis: "y",
		theme: "minimal",
		scrollInertia: 0,
		mouseWheel: { preventDefault: true }
	};
	public MinimalDarkScrollbar = {
		axis: "y",
		theme: "minimal-dark",
		scrollInertia: 0,
		mouseWheel: { preventDefault: true }
	};
	public DarkScrollbar = {
		axis: "y",
		theme: "dark",
		scrollInertia: 0,
		mouseWheel: { preventDefault: true }
	};
	public LightScrollbar = {
		axis: "y",
		theme: "light",
		scrollInertia: 0,
		mouseWheel: { preventDefault: true }
	};
	public DarkScrollbarX = {
		axis: "x",
		theme: "dark",
		scrollInertia: 0,
		mouseWheel: { preventDefault: true }
	};
}
