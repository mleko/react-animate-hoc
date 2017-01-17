export {AnimationFrameEngine} from "./AnimationFrameEngine";
export {IntervalEngine} from "./IntervalEngine"

export interface AnimationEngine {
	startAnimation(tick: Tick): () => void;
}

export interface Tick {
	(): boolean;
}
