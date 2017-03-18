export function shouldInterpolateProp<P>(key: string, props: P, prevProps: P, propertiesToAnimate: string[]) {
	return prevProps.hasOwnProperty(key) &&
		isNumber(props[key]) &&
		isNumber(prevProps[key]) &&
		(propertiesToAnimate === null || propertiesToAnimate.indexOf(key) !== -1);
}

function isNumber(value: any): boolean {
	return typeof value === "number";
}
