export function stringify(obj: {[id: string]: any}): string {
	return JSON.stringify(normalize(obj));
}

function normalize(v: any): any {
	if (Array.isArray(v)) {
		return v.map((iv) => normalize(iv));
	} else if (typeof v === "object") {
		let m = {};
		for(let k in v){
			if(v.hasOwnProperty(k)){
				m[k] = normalize(v[k]);
			}
		}
		return m;
	}else if(typeof v === "function"){
		return "[function]";
	}
	return v.toString();
}