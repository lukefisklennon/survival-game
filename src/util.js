module.exports = class Util {
	static resolveOptions(options, allOptions) {
		if (typeof(options) == "undefined") {
			options = {}
		}
		for (key in allOptions) {
			if (!(key in options)) {
				options[key] = allOptions[key]
			}
		}
		return options
	}
}
