module.exports = class Store {
	constructor() {
		this.list = []
	}

	create(Class, ...args) {
		return new Class(...args)
	}

	add(object, index) {
		if (arguments.length < 2) {
			index = this.list.length - 1
		}
		this.list.splice(index, 0, object)
	}

	emplace(Class, ...args) {
		var object = this.create(Class, ...args)
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
