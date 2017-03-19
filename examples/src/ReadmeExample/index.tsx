import * as React from "react";
import {AnimatedColorBox, AnnotatedColorBox, ColorBox, RgbColor} from "./ColorBox";

export class ReadmeExamples extends React.Component<void, RgbColor> {

	private intervalId;

	constructor(props: void, context: any) {
		super(props, context);
	}

	public render(): JSX.Element {
		return (
			<div style={{cursor: "pointer"}} onClick={this.randomizeColor}>
				<ColorBox {...this.state}/>
				<AnimatedColorBox {...this.state}/>
				<AnnotatedColorBox {...this.state}/>
			</div>
		);
	}

	protected componentWillMount() {
		this.randomizeColor();
		this.intervalId = setInterval(this.randomizeColor, 3000);
	}

	protected componentWillUnmount() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}

	private randomizeColor = () => {
		this.setState({
			r: Math.random() * 255,
			g: Math.random() * 255,
			b: Math.random() * 255
		});
	};
}