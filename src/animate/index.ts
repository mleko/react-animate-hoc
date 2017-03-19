import * as React from "react";
import {merge, shallowEquals, shallowMerge} from "typescript-object-utils";
import {AnimationEngine, fallbackEngine} from "../AnimationEngine";
import {easing, Easing, easingDefinition} from "../easing";
import {resolvePropAnimationMethods} from "./resolvePropAnimationMethods";
import {shouldInterpolateProp} from "./shouldInterpolateProp";

const defaults: AnimateOptions = {
	duration: 1000,
	easing: "linear",
	animationEngine: fallbackEngine
};

export function animate(options?: AnimateOptions): <C extends Function>(WrappedComponent: C) => C {

	options = options || defaults;
	const animationEngine = options.animationEngine || defaults.animationEngine;
	const hasPropOwnAnimationDefinition: BoolMap = resolvePropAnimationMethods(options.properties);

	return <T extends React.ComponentClass<P>, P>(WrappedComponent: T): React.ComponentClass<P> => {

		class Animate extends React.Component<P, State> {

			public static displayName = "Animate(" + (WrappedComponent["displayName"] || WrappedComponent["name"] || "Component") + ")";

			private animationMap: AnimationMap;

			public constructor(props) {
				super(props);

				this.animationMap = {};
				const state = {};
				const keySource = hasPropOwnAnimationDefinition === null ? props : hasPropOwnAnimationDefinition;
				for (let key in keySource) {
					if (keySource.hasOwnProperty(key)) {
						this.animationMap[key] = this.getAnimationData(key);
						state[key] = props[key];
					}
				}
				this.state = {props: state as P};
			}

			public render(): JSX.Element {
				return React.createElement(WrappedComponent, this.assembleProps());
			}

			protected componentWillUnmount() {
				for (let key in this.animationMap) {
					if (this.animationMap.hasOwnProperty(key) && this.animationMap[key].stopAnimation) {
						this.animationMap[key].stopAnimation();
					}
				}
			}

			protected componentDidUpdate(prevProps: P) {
				if (shallowEquals(prevProps, this.props)) return;
				for (let key in this.props) {
					if (this.props.hasOwnProperty(key) && shouldInterpolateProp(key, this.props, prevProps, hasPropOwnAnimationDefinition)) {
						this.startPropAnimation(key);
					}
				}
			}

			private startPropAnimation(key: string) {
				const animationData: AnimationData = this.getAnimationData(key);

				if (animationData.stopAnimation) animationData.stopAnimation();

				animationData.animationStartDate = Date.now();
				animationData.startValue = this.state.props[key];
				let tick = () => {
					const diff = Date.now() - animationData.animationStartDate;
					const a = Math.max(0, Math.min(1, diff / animationData.duration));
					const timeCoefficient = animationData.timingFunction(a);

					let prevProp = animationData.startValue as number;
					let prop = this.props[key] as number;
					const value = (prevProp) + (prop - prevProp) * timeCoefficient;
					this.setState({props: shallowMerge(this.state.props, {[key]: value})});
					return a !== 1;
				};
				animationData.stopAnimation = animationEngine.startAnimation(tick);
			}

			private getAnimationData(key: string): AnimationData {
				if (!this.animationMap[key]) {
					let config = merge(defaults, options);
					if (null !== hasPropOwnAnimationDefinition && hasPropOwnAnimationDefinition[key]) {
						config = merge(config, config.properties[key]);
					}
					this.animationMap[key] = {
						timingFunction: easing(config.easing),
						duration: config.duration,
						startValue: this.props[key],
						animationStartDate: 0,
						stopAnimation: null
					};
				}
				return this.animationMap[key];
			}

			private assembleProps(): P {
				return merge(this.props, this.state.props);
			}

		}

		interface State {
			props?: P;
		}

		return Animate as React.ComponentClass<P>;
	};
}

export type AnimateOptions = AnimationOptions & AnimationConfig;

export interface AnimationOptions {
	properties?: PropertiesDefinition;
	animationEngine?: AnimationEngine;
}

export interface AnimationConfig {
	duration?: number;
	easing?: easingDefinition;
}

export type PropertiesDefinition = null | string[] | {[id: string]: AnimationConfig|true};

interface AnimationData {
	timingFunction: Easing;
	duration: number;
	startValue: number;
	animationStartDate: number;
	stopAnimation: () => void;
}
interface AnimationMap {
	[id: string]: AnimationData;
}
export type BoolMap = {[id: string]: boolean};
