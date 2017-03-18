/// <reference types="jest" />
import {shouldInterpolateProp} from "../shouldInterpolateProp";

test("shouldInterpolateProp test", () => {
	expect(shouldInterpolateProp("test", {test: 1}, {test: 2}, null)).toBeTruthy();
	expect(shouldInterpolateProp("test", {test: 1}, {test: 2}, ["test"])).toBeTruthy();
	expect(shouldInterpolateProp<{test: any}>("test", {test: 1}, {test: "a"}, null)).toBeFalsy();
	expect(shouldInterpolateProp("test", {test: 1}, {test: 2}, [])).toBeFalsy();

	expect(shouldInterpolateProp("a", {a: 1, b: 1, c: 1}, {a: 2, b: 2, c: 2}, null)).toBeTruthy();
	expect(shouldInterpolateProp("b", {a: 1, b: 1, c: 1}, {a: 2, b: 2, c: 2}, null)).toBeTruthy();
	expect(shouldInterpolateProp("c", {a: 1, b: 1, c: 1}, {a: 2, b: 2, c: 2}, null)).toBeTruthy();
	expect(shouldInterpolateProp("a", {a: 1, b: 1, c: 1}, {a: 2, b: 2, c: 2}, ["a", "b"])).toBeTruthy();
	expect(shouldInterpolateProp("b", {a: 1, b: 1, c: 1}, {a: 2, b: 2, c: 2}, ["a", "b"])).toBeTruthy();
	expect(shouldInterpolateProp("c", {a: 1, b: 1, c: 1}, {a: 2, b: 2, c: 2}, ["a", "b"])).toBeFalsy();
});
