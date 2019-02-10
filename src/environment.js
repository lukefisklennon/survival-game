var Store = require("./store")
var Sprite = require("./sprite")

module.exports = class Environment {
	constructor() {
		this.terrain = new Terrain()
	}
}

var columnHeight = 3

class Terrain extends Store {
	constructor() {
		super(Column)
	}

	emplaceLeft(...args) {
		this.add(this.create(...args), 0)
	}

	emplaceRight(...args) {
		this.add(this.create(...args), this.list.length - 1)
	}
}

class Column {
	constructor() {
		this.blocks = []
		for (var i = 0; i < columnHeight; i++) {
			console.log(world)
			this.blocks.push(world.entities.emplace("ground-below", {
				static: true
			}))
		}
		this.surface = new Sprite("ground-surface")
	}
}
