import {PropertiesDefinition} from "./index";

export function resolvePropAnimationMethods(definition: PropertiesDefinition): {[id: string]: boolean} {
	if (null === definition || undefined === definition) return null;
	if (Array.isArray(definition)) {
		const props = {};
		for (let i of definition) {
			props[i] = false;
		}
		return props;
	}
	if (typeof definition === "object") {
		const props = {};
		for (let i in definition) {
			if (definition.hasOwnProperty(i)) {
				props[i] = definition[i] !== true;
			}
		}
		return props;
	}
	return null;
}