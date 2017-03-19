import * as bezier from "bezier-easing";

export interface TimingFunction {
	(x: number): number;
}

export type timingFunctionDefinition = easingName | bezierCoefficients | TimingFunction;

export function timingFunction(definition: timingFunctionDefinition): TimingFunction {
	if (typeof definition === "string") {
		return getByName(definition);
	} else if (Array.isArray(definition) && definition.length >= 4) {
		return getBezierByCoefficients(definition);
	}
	return definition as TimingFunction;
}

const easings: {[id: string]: bezierCoefficients} = {
	"ease": [0.25, 0.1, 0.25, 1.0],
	"linear": [0.00, 0.0, 1.00, 1.0],
	"ease-in": [0.42, 0.0, 1.00, 1.0],
	"ease-out": [0.00, 0.0, 0.58, 1.0],
	"ease-in-out": [0.42, 0.0, 0.58, 1.0]
};
export type easingName = "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out";
function getByName(name: easingName): TimingFunction {
	return getBezierByCoefficients(easings[name]);
}

export type bezierCoefficients = [number, number, number, number];
function getBezierByCoefficients(coefficients: bezierCoefficients): TimingFunction {
	return bezier(coefficients[0], coefficients[1], coefficients[2], coefficients[3]);
}
