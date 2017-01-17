import * as React from "react";
import {animate, AnimationOptions} from "./../../src";
import {FloatingDiv} from "../FloatingDiv";

const defs: AnimationOptions[] = [
	{duration: 1000},
	{duration: 1000, easing: "linear"},
	{duration: 1000, easing: "ease-in-out"},
	{duration: 1000, easing: "ease"},
	{duration: 1000, easing: [0.23, 1, 0.32, 1]},
	{duration: 2000, easing: "linear"},
	{duration: 2000, easing: "ease-in-out"},
];

const animatedDivs = defs.map((def) => {
	return animate(def)(FloatingDiv);
});

export class AnimationSamples extends React.Component<void, State> {

	constructor(props: void, context: any) {
		super(props, context);
		let values = [];
		for (let d of defs) {
			values.push(0);
		}
		this.state = {
			values
		};
	}

	public render(): JSX.Element {
		let examples = [];
		for (let i = 0; i < defs.length; i++) {
			examples.push(React.createElement(animatedDivs[i], {
				key: i,
				x: this.state.values[i],
				index: i,
				text: JSON.stringify(defs[i]),
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
		copy[i] = copy[i] ? 0.0 : 100.0;
		this.setState({values: copy});
	}

}

interface State {
	values: number[];
}
