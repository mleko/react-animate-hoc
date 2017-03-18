import * as React from "react";
import {merge, shallowEquals} from "typescript-object-utils";
import {AnimationEngine, fallbackEngine} from "../AnimationEngine";
import {easing, easingDefinition} from "../easing";
import {shouldInterpolateProp} from "./shouldInterpolateProp";

const defaults: AnimationOptions = {
	duration: 1000,
	easing: "linear",
	animationEngine: fallbackEngine
};

export function animate(options?: AnimationOptions): <C extends Function>(WrappedComponent: C) => C {

	options = options || defaults;
	const duration = options.duration || defaults.duration;
	const timingFunction = easing(options.easing || defaults.easing);
	const animationEngine = options.animationEngine || defaults.animationEngine;
	const propertiesToAnimate: string[] = options.properties || null;

	return <T extends React.ComponentClass<P>, P>(WrappedComponent: T): React.ComponentClass<P> => {

		class Animate extends React.Component<P, State> {

			public static displayName = "Animate(" + (WrappedComponent["displayName"] || WrappedComponent["name"] || "Component") + ")";

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
				if (shallowEquals(nextProps, this.props)) return;
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
				const props = merge(this.props, interpolatedProps);

				this.setState({props});
				return a !== 1;
			};

			private assembleProps(): P {
				return this.state.props;
			}

			private interpolateProps(t: number) {
				let props = {};
				const timeCoefficient = timingFunction(t);
				for (let key of Object.keys(this.props)) {
					if (shouldInterpolateProp(key, this.props, this.prevProps, propertiesToAnimate)) {
						let prevProp = this.prevProps[key] as number;
						let prop = this.props[key] as number;
						props[key] = (prevProp) + (prop - prevProp) * timeCoefficient;
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
	properties?: string[];
	animationEngine?: AnimationEngine;
}
