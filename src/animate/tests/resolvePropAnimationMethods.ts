/// <reference types="jest" />

import {resolvePropAnimationMethods} from "../resolvePropAnimationMethods";
test("resolvePropAnimationMethods test", () => {
	expect(resolvePropAnimationMethods(null)).toBe(null);

	expect(resolvePropAnimationMethods([])).toEqual({});
	expect(resolvePropAnimationMethods(["a", "b"])).toEqual({a: false, b: false});

	expect(resolvePropAnimationMethods({})).toEqual({});
	expect(resolvePropAnimationMethods({a: true, b: true})).toEqual({a: false, b: false});
	expect(resolvePropAnimationMethods({a: {duration: 1000, easing: "ease-in"}, b: {easing: "linear"}})).toEqual({a: true, b: true});
});