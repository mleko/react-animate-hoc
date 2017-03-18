import * as React from "react";
import {fill} from "../fill";
import {FloatingDiv} from "../FloatingDiv";
import {stringify} from "../stringify";
import {animate, AnimationOptions} from "./../../../src";

const zigZagEasing = (t: number): number => {
	const t1 = 0.75 / 2;
	const t2 = 1.25 / 2;
	if (t < t1) {
		return t * 2;
	} else if (t < t2) {
		return 0.75 - (t - t1) * 2;
	} else {
		return 0.25 + (t - t2) * 2;
	}
};

const easingWithPause = (t: number): number => {
	if (t < 0.3) {
		return t / 0.3 * 0.5;
	} else if (t < 0.7) {
		return 0.5;
	} else {
		return 0.5 + (t - 0.7) / 0.3 * 0.5;
	}
};

const defs: (AnimationOptions & {description?: string})[] = [
	{duration: 1000},
	{duration: 1000, easing: "linear"},
	{duration: 1000, easing: "ease-in-out"},
	{duration: 1000, easing: "ease"},
	{duration: 1000, easing: [0.23, 1, 0.32, 1]},
	{duration: 2000, easing: "linear"},
	{duration: 2000, easing: "ease-in-out"},
	{duration: 2000, easing: zigZagEasing, description: "custom zigZag easing"},
	{duration: 2000, easing: easingWithPause, description: "custom easing with pause"},
];

const animatedDivs = defs.map((def) => {
	return animate(def)(FloatingDiv);
});

export class AnimationSamples extends React.Component<void, State> {

	constructor(props: void, context: any) {
		super(props, context);
		this.state = {
			values: fill(0, defs.length)
		};
	}

	public render(): JSX.Element {
		let examples = [];
		for (let i = 0; i < defs.length; i++) {
			examples.push(React.createElement(animatedDivs[i], {
				key: i,
				x: this.state.values[i],
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
		copy[i] = copy[i] ? 0.0 : 100.0;
		this.setState({values: copy});
	}

}

interface State {
	values: number[];
}
