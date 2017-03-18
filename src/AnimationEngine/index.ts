export {AnimationFrameEngine} from "./AnimationFrameEngine";
export {IntervalEngine} from "./IntervalEngine"
export {fallbackEngine} from "./fallbackEngine";

export interface AnimationEngine {
	startAnimation(tick: Tick): () => void;
}

export interface Tick {
	(): boolean;
}
