import {BoolMap} from "./index";
export function shouldInterpolateProp<P>(key: string, props: P, prevProps: P, propertiesToAnimate: BoolMap = null) {
	return prevProps.hasOwnProperty(key) &&
		props[key] !== prevProps[key] &&
		isNumber(props[key]) &&
		isNumber(prevProps[key]) &&
		(propertiesToAnimate === null || key in propertiesToAnimate);
}

function isNumber(value: any): boolean {
	return typeof value === "number";
}
