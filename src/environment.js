var Store = require("./store")
var Sprite = require("./sprite")
var Entity = require("./entity")
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
		this.leftEdge = 0
		this.rightEdge = 0
		this.columnWidth = config.terrainColumnWidth * config.scale
	}

	emplaceLeft(...args) {
		this.add(this.create(this.leftEdge, ...args), 0)
		this.leftEdge -= this.columnWidth
	}

	emplaceRight(...args) {
		this.add(this.create(this.rightEdge, ...args), this.list.length - 1)
		this.rightEdge += this.columnWidth
	}
}

class Column {
	constructor(x, y) {
		this.blocks = []
		for (var i = 0; i < columnHeight; i++) {
			var block = world.entities.emplace(Entity, "ground-below", {
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
