module.exports = class Store {
	constructor() {
		this.list = []
	}

	add(object, index) {
		if (arguments.length < 2) {
			index = this.length - 1
		}
		this.list.splice(index, 0, object)
	}

	destroyIndex(index) {
		var object = this.list[index]
		if (object.destroy) object.destroy()
		this.removeIndex(index)
	}

	destroyValue(object) {
		if (object.destroy) object.destroy()
		this.removeValue(object)
	}

	removeIndex(index) {
		this.list.splice(index, 1)
	}

	removeValue(value) {
		this.removeIndex(this.indexOf(value))
	}

	get(index) {
		return this.list[index]
	}

	set(index, value) {
		this.list[index] = value
	}

	loop(callback) {
		// for (var i = 0; i < list.length; i++) {
		// 	var length = list.length
		// 	callback(list[i], i)
		// }
		this.list.forEach(callback)
	}

	get length() {
		return this.list.length
	}
}
