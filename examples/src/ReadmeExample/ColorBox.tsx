import * as React from "react";
import {animate} from "react-animate-hoc";

export function ColorBox(p: RgbColor): JSX.Element {
	let style = {
		height: 50,
		width: 50,
		backgroundColor: `rgb(${p.r.toFixed()},${p.g.toFixed()},${p.b.toFixed()}`,
		border: "1px black solid",
		display: "inline-block",
		margin: 3
	};
	return (<div style={style}/>);
}

export const AnimatedColorBox = animate()(ColorBox);

@animate()
export class AnnotatedColorBox extends React.Component<RgbColor, any> {
	public render(): JSX.Element {
		return (<ColorBox {...this.props}/>);
	}
}

export interface RgbColor {
	r: number;
	g: number;
	b: number;
}