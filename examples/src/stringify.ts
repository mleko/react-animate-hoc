export function stringify(obj: {[id: string]: any}): string {
	const b = {};
	for (let property in obj) {
		if (obj.hasOwnProperty(property)) {
			if (typeof obj[property] === "function") {
				b[property] = "[function]";
			} else {
				b[property] = obj[property];
			}
		}
	}
	return JSON.stringify(b);
}
