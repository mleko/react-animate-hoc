import {AnimationEngine} from "./";
import {AnimationFrameEngine} from "./AnimationFrameEngine";
import {IntervalEngine} from "./IntervalEngine";

const requestAnimationFrameAvailable = !!window.requestAnimationFrame;
const fallbackEngine: AnimationEngine = requestAnimationFrameAvailable ? new AnimationFrameEngine() : new IntervalEngine(60);

export {fallbackEngine};
