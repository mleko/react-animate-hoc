import * as React from "react";
import {animate, AnimateOptions} from "react-easing";
import {ColorBar} from "../ColorBar";
import {fill} from "../fill";
import {stringify} from "../stringify";

const exampleDefs: ({def: AnimateOptions, height?: number})[] = [
	{def: {duration: 1000}},
	{def: {duration: 1000, properties: ["r"]}},
	{def: {duration: 1000, properties: ["g", "b"]}},
	{
		def: {
			duration: 3000,
			properties: {
				r: {easing: (t) => t < 0.33 ? t * 3 : 1},
				g: {easing: (t) => t < 0.33 ? 0 : (t < 0.66 ? (t - 0.33) * 3 : 1)},
				b: {easing: (t) => t < 0.66 ? 0 : (t < 1 ? (t - 0.66) * 3 : 1)}
			}
		},
		height: 40
	},
	{
		def: {
			duration: 1000,
			properties: {
				r: true,
				g: {duration: 2000},
				b: {duration: 3000}
			}
		},
		height: 40
	}
];

const animatedDivs = exampleDefs.map((e) => {
	return animate(e.def)(ColorBar);
});

export class ColorBarSamples extends React.Component<void, State> {

	constructor(props: void, context: any) {
		super(props, context);
		this.state = {
			values: fill([0.0, 0.0, 0.0], exampleDefs.length)
		};
	}

	public render(): JSX.Element {
		let examples = [];
		for (let i = 0; i < exampleDefs.length; i++) {
			examples.push(React.createElement(animatedDivs[i], {
				key: i,
				r: this.state.values[i][0],
				g: this.state.values[i][1],
				b: this.state.values[i][2],
				index: i,
				text: stringify(exampleDefs[i].def),
				onClick: this.toggleState,
				height: exampleDefs[i].height
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
