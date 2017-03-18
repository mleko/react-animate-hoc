import * as React from "react";
import {ColorBar} from "../ColorBar";
import {fill} from "../fill";
import {stringify} from "../stringify";
import {animate, AnimationOptions} from "./../../../src";

const defs: (AnimationOptions & {description?: string})[] = [
	{duration: 1000},
	{duration: 1000, properties: ["r"]},
	{duration: 1000, properties: ["g", "b"]}
];

const animatedDivs = defs.map((def) => {
	return animate(def)(ColorBar);
});

export class ColorBarSamples extends React.Component<void, State> {

	constructor(props: void, context: any) {
		super(props, context);
		this.state = {
			values: fill([0.0, 0.0, 0.0], defs.length)
		};
	}

	public render(): JSX.Element {
		let examples = [];
		for (let i = 0; i < defs.length; i++) {
			examples.push(React.createElement(animatedDivs[i], {
				key: i,
				r: this.state.values[i][0],
				g: this.state.values[i][1],
				b: this.state.values[i][2],
				index: i,
				text: stringify(defs[i]),
				onClick: this.toggleState
			}));
		}

		return (
			<div>
				{examples}
			</div>
		);
	}

	private toggleState = (i: number) => {
		let copy = this.state.values.concat();
		copy[i] = copy[i][0] ? [0.0, 0.0, 0.0] : [255.0, 255.0, 255.0];
		this.setState({values: copy});
	}

}

interface State {
	values: number[][];
}
