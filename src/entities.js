var Store = require("./store")
var Entity = require("./entity")

module.exports = class Entities extends Store {
	constructor() {
		super()
	}

	update() {
		this.loop(entity => entity.update())
	}

	scan(x, range) {
		return this.filter(entity => (
			entity.x < x + range && entity.x > x - range
		))
	}
}
