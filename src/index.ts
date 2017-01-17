import * as React from "react";
import {AnimationEngine, AnimationFrameEngine, IntervalEngine} from "./AnimationEngine";
import {easing, easingDefinition} from "./easing";

const defaults: AnimationOptions = {
	duration: 1000,
	easing: "linear"
};

const requestAnimationFrameAvailable = !!window.requestAnimationFrame;
const animationEngine: AnimationEngine = requestAnimationFrameAvailable ? new AnimationFrameEngine() : new IntervalEngine(60);

export function animate(options?: AnimationOptions): <C extends Function>(WrappedComponent: C) => C {

	options = options || defaults;
	const duration = options.duration || defaults.duration;
	const timingFunction = easing(options.easing || defaults.easing);

	return <T extends React.ComponentClass<P>, P>(WrappedComponent: T): React.ComponentClass<P> => {

		class Animate extends React.Component<P, State> {

			public static displayName = "Animate(" + (WrappedComponent["displayName"] || WrappedComponent["name"] || "Component") + ")";

			private static isNumber(value: any): boolean {
				return typeof value === "number";
			}

			private cancelAnimation: () => void;

			private animationStartDate: number = null;

			private prevProps: P;

			public constructor(props) {
				super(props);
				this.state = {
					props
				};
			}

			public render(): JSX.Element {
				return React.createElement(WrappedComponent, this.assembleProps());
			}

			protected componentWillUnmount() {
				this.stopAnimation();
			}

			protected componentWillReceiveProps(nextProps: P) {
				if (nextProps === this.props) return;
				this.prevProps = this.state.props;
				this.startAnimation();
			}

			private startAnimation() {
				this.stopAnimation();
				this.animationStartDate = Date.now();
				this.cancelAnimation = animationEngine.startAnimation(this.tick);
			}

			private stopAnimation() {
				if (this.cancelAnimation) {
					this.cancelAnimation();
				}
			}

			private tick = () => {
				const diff = Date.now() - this.animationStartDate;
				const a = Math.min(1, diff / duration);

				const interpolatedProps = this.interpolateProps(a);
				const props = Object.assign({}, this.props, interpolatedProps);

				this.setState({props});
				return a !== 1;
			};

			private assembleProps(): P {
				return this.state.props;
			}

			private interpolateProps(a: number) {
				let props = {};
				for (let key of Object.keys(this.props)) {
					if (this.prevProps.hasOwnProperty(key) && Animate.isNumber(this.props[key]) && Animate.isNumber(this.prevProps[key])) {
						let prevProp = this.prevProps[key] as number;
						let prop = this.props[key] as number;
						props[key] = (prevProp) + (prop - prevProp) * timingFunction(a);
					}
				}
				return props;
			}
		}

		interface State {
			props?: P;
		}

		return Animate as React.ComponentClass<P>;
	};
}

export interface AnimationOptions {
	duration: number;
	easing?: easingDefinition;
}
