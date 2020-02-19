export class GaugeLabel {
	color: string;
	text: string;
	x: number;
	y: number;
	fontSize: string;

	constructor(
		options: {
			color?: string;
			text?: string;
			x?: number;
			y?: number;
			fontSize?: string;
		} = {}
	) {
		this.color = options.color;
		this.text = options.text;
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.fontSize = options.fontSize || "1em";
	}
}
