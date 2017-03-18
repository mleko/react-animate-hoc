export function fill(value: any, count: number) {
	const array = [];
	while (count--) {
		array.push(value);
	}
	return array;
}
