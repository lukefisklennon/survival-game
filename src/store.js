module.exports = class Store {
	constructor(Class) {
		this.Class = Class
		this.list = []
	}

	create(...args) {
		return new this.Class(...args)
	}

	add(object, index) {
		if (arguments.length < 2) {
			index = this.list.length - 1
		}
		this.list.splice(index, 0, object)
	}

	emplace(...args) {
		var object = this.create(...args)
		this.add(object)
		return object
	}

	get(index) {
		return this.list[index]
	}

	loop(callback) {
		this.list.forEach(callback)
	}

	get length() {
		return this.list.length
	}
}
