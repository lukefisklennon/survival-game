var Store = require("./store")
var Sprite = require("./sprite")
var config = require("./config")

module.exports = class Environment {
	constructor() {
		this.terrain = new Terrain()
	}
}

var columnHeight = 10

class Terrain extends Store {
	constructor() {
		super(Column)
		leftEdge = 0
		rightEdge = 0
	}

	emplaceLeft(...args) {
		this.add(this.create(leftEdge, ...args), 0)
		leftEdge -= 16 * config.scale
	}

	emplaceRight(...args) {
		this.add(this.create(rightEdge, ...args), this.list.length - 1)
		rightEdge += 16 * config.scale
	}
}

class Column {
	constructor(x, y) {
		this.blocks = []
		for (var i = 0; i < columnHeight; i++) {
			var block = world.entities.emplace("ground-below", {
				static: true
			})
			this.blocks.push(block)
			block.x = x
			block.y = y + block.height * i
		}
		this.surface = new Sprite("ground-surface")
		this.surface.x = x
		this.surface.y = y - this.blocks[0].height / 2
	}
}
