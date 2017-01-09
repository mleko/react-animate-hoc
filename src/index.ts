import * as React from "react";

const defaults: AnimationOptions = {
	duration: 1000
};

export function animate(options?: AnimationOptions): <C extends Function>(WrappedComponent: C) => C {

	options = options || defaults;
	const duration = options.duration || defaults.duration;

	return <T extends React.ComponentClass<P>, P>(WrappedComponent: T): React.ComponentClass<P> => {

		class Animate extends React.Component<P, State> {

			public static displayName = "Animate(" + (WrappedComponent["displayName"] || WrappedComponent["name"] || "Component") + ")";

			private static isNumber(value: any): boolean {
				return typeof value === "number";
			}

			private intervalId;
			private animationStartDate: number;

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
				this.intervalId = setInterval(this.tick, this.frameInterval());
				this.animationStartDate = Date.now();
			}

			private stopAnimation() {
				if (this.intervalId) {
					clearInterval(this.intervalId);
					this.intervalId = null;
				}
			}

			private tick = () => {
				const diff = Date.now() - this.animationStartDate;
				const a = Math.min(1, diff / duration);
				if (a === 1) {
					this.stopAnimation();
				}

				const interpolatedProps = this.interpolateProps(a);
				const props = Object.assign({}, this.props, interpolatedProps);

				this.setState({props});
			};

			private frameInterval() {
				return 1 / 60 / 1000;
			}

			private assembleProps(): P {
				return this.state.props;
			}

			private interpolateProps(a: number) {
				let props = {};
				for (let key of Object.keys(this.props)) {
					if (this.prevProps.hasOwnProperty(key) && Animate.isNumber(this.props[key]) && Animate.isNumber(this.prevProps[key])) {
						let prevProp = this.prevProps[key] as number;
						let prop = this.props[key] as number;
						props[key] = (prevProp) + (prop - prevProp) * a;
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
}
