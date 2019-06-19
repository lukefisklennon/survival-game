var Store = require("./store")
var Sprite = require("./sprite")
var Entity = require("./entity")
var config = require("./config")

module.exports = class Environment {
	constructor() {
		this.terrain = new Terrain()
	}
}

class Terrain extends Store {
	constructor() {
		super()
		this.leftEdge = 0
		this.rightEdge = 0
		this.blockSize = config.terrain.blockSize * config.scale
	}

	emplaceLeft(...args) {
		this.add(this.create(Column, this.leftEdge, ...args), 0)
		this.leftEdge -= this.blockSize
	}

	emplaceRight(...args) {
		this.add(this.create(Column, this.rightEdge, ...args), this.list.length - 1)
		this.rightEdge += this.blockSize
	}
}

class Column {
	constructor(x, y) {
		this.blocks = []
		for (var i = 0; i < config.terrain.columnHeight; i++) {
			var block = world.entities.emplace(Entity, {
				asset: "ground-below",
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
