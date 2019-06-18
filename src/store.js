module.exports = class Store {
	constructor(Class) {
		this.Class = Class
		this.list = []
	}

	create() {
		return new this.Class(...arguments)
	}

	add(object, index) {
		if (arguments.length < 2) {
			index = this.list.length - 1
		}
		this.list.splice(index, 0, object)
	}

	emplace() {
		var object = this.create(...arguments)
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
