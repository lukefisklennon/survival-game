var Store = require("./store")
var Entity = require("./entity")

module.exports = class Entities extends Store {
	constructor() {
		super(Entity)
	}

	create(Class, ...args) {
		return new Class(...args)
	}

	update() {
		this.loop(entity => entity.update())
	}
}
