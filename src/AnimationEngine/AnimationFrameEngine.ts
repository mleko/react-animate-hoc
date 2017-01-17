import {AnimationEngine, Tick} from ".";

export class AnimationFrameEngine implements AnimationEngine {

	public startAnimation(tick: Tick): () => void {
		let animationFrameRequestId;
		let continueAnimation = true;

		let frameTick = () => {
			let tickResult = tick();
			if (tickResult && continueAnimation) {
				animationFrameRequestId = requestAnimationFrame(frameTick);
			}
		};

		frameTick();

		return () => {
			cancelAnimationFrame(animationFrameRequestId);
			continueAnimation = false;
		};
	}

}
