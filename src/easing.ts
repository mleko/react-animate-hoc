import * as bezier from "bezier-easing";

export interface Easing {
	(x: number): number;
}

export type easingDefinition = easingName | bezierCoefficients | Easing;

export function easing(definition: easingDefinition): Easing {
	if (typeof definition === "string") {
		return getByName(definition);
	} else if (Array.isArray(definition) && definition.length >= 4) {
		return getBezierByCoefficients(definition);
	}
	return definition as Easing;
}

const easings: {[id: string]: bezierCoefficients} = {
	"ease": [0.25, 0.1, 0.25, 1.0],
	"linear": [0.00, 0.0, 1.00, 1.0],
	"ease-in": [0.42, 0.0, 1.00, 1.0],
	"ease-out": [0.00, 0.0, 0.58, 1.0],
	"ease-in-out": [0.42, 0.0, 0.58, 1.0]
};
export type easingName = "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out";
function getByName(name: easingName): Easing {
	return getBezierByCoefficients(easings[name]);
}

export type bezierCoefficients = [number, number, number, number];
function getBezierByCoefficients(coefficients: bezierCoefficients): Easing {
	return bezier(coefficients[0], coefficients[1], coefficients[2], coefficients[3]);
}
