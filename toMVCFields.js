function toMvcFields(target) {
	if (typeof target !== "object") {
		throw new Error("target must be an object");
	}
	
	function toMVCSerializedObject(keyValuePairs) {
		var encodedPairs = [];
		for(var i = 0; i < keyValuePairs.length; i++) {
			var kvp = keyValuePairs[i];
			encodedPairs.push(encodeURIComponent(kvp.Key) + "=" + encodeURIComponent(kvp.Value));
		}
		
		return encodedPairs.join("&");
	}
	
	function getType(obj) {
		return obj instanceof Array ? "array" : typeof obj;
	}
	
	function toKvp(target, key, kvps) {	
		key = (key || "");
		try
		{
			var targetType = getType(target);
		} catch (e) {
			console.log(e);
		}
		switch(targetType) {
			case "string":
			case "number":
			case "boolean":
				if (key.substr(0, 1) === ".") {
					key = key.substr(1, key.length - 1);
				}
				kvps.push({Key: key, Value: target});
				return;
			case "array":
				for(var i = 0; i < target.length; i++) {
					toKvp(target[i], key + "[" + i + "]", kvps); 
				}
				return;
			case "object":
				for(var prop in target){
					if (!target.hasOwnProperty(prop)) {
						continue;
					}
					toKvp(target[prop], key + "." + prop, kvps);
				}
				return;
		}
	}
	
	var kvps = [];
	toKvp(target, "", kvps);
	return toMVCSerializedObject(kvps);
}