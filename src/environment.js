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

var asdf = 0;

class Column {
	constructor() {
		this.blocks = []
		for (var i = 0; i < columnHeight; i++) {
			var block = world.entities.emplace("ground-below", {
				static: true
			})
			this.blocks.push(block)
			block.x = 500 + asdf * this.blocks[0].width
			block.y = 500 + block.height * i
		}
		this.surface = new Sprite("ground-surface")
		this.surface.x = 500 + asdf * this.blocks[0].width
		this.surface.y = 500 - this.blocks[0].height / 2
		this.surface.alpha = 0.5;
		asdf++;
	}
}
