var Store = require("./store")
var Entity = require("./entity")

module.exports = class Entities extends Store {
	constructor() {
		super()
	}

	update() {
		this.loop(entity => entity.update())
	}
}
