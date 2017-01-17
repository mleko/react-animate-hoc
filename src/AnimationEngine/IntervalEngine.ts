import {AnimationEngine, Tick} from ".";
export class IntervalEngine implements AnimationEngine {

	public constructor(private fps: number = 60) {
	}

	public startAnimation(tick: Tick): () => void {
		let intervalId;
		let stopAnimation = () => {
			clearInterval(intervalId);
		};
		intervalId = setInterval(() => {
			if (tick()) {
				clearInterval(intervalId);
			}
		}, this.fps / 1000.0);

		return stopAnimation;
	};

}
