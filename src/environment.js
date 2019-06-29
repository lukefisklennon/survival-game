var Store = require("./store")
var Sprite = require("./sprite")
var Entity = require("./entity")
var Util = require("./util")
var SimplexNoise = require("simplex-noise")
var entitiesData = require("./entities.json")
var config = require("./config")

var simplex = new SimplexNoise()

module.exports = class Environment {
	constructor() {
		this.terrain = new Terrain()
	}

	update() {
		this.terrain.update()
	}
}

var blockSize = entitiesData["ground-below"].hitbox.width * config.scale

class Terrain extends Store {
	constructor() {
		super()
		this.leftEdge = 0
		this.rightEdge = 0
		this.init()
	}

	init() {
		while (world.camera.x > this.rightEdge - config.fov / 2) {
			this.emplaceRight(this.generateHeight(this.rightEdge))
		}
		while (world.camera.x < this.leftEdge + config.fov / 2) {
			this.emplaceLeft(this.generateHeight(this.leftEdge))
		}
	}

	update() {
		if (world.camera.x > this.rightEdge - config.fov / 2) {
			this.emplaceRight(this.generateHeight(this.rightEdge))
			this.destroyLeft()
		}
		while (world.camera.x < this.leftEdge + config.fov / 2) {
			this.emplaceLeft(this.generateHeight(this.leftEdge))
			this.destroyRight()
		}
	}

	generateHeight(x) {
		x = Math.round(x / blockSize)
		var y = 0
		config.terrain.octaves.forEach(octave => {
			y += Math.round((simplex.noise2D(x / octave.wavelength, 16) * 0.5 + 0.5) * octave.amplitude)
		})
		y = Math.round(y / config.terrain.stepHeight) * config.terrain.stepHeight
		return y * config.scale
	}

	emplaceLeft(...args) {
		this.add(this.create(Column, this.leftEdge, ...args), 0)
		this.leftEdge -= blockSize
	}

	emplaceRight(...args) {
		this.add(this.create(Column, this.rightEdge, ...args), this.length - 1)
		this.rightEdge += blockSize
	}

	destroyLeft() {
		this.destroyIndex(0)
		this.leftEdge += blockSize
	}

	destroyRight() {
		this.destroyIndex(this.length - 1)
		this.rightEdge -= blockSize
	}
}

class Column {
	constructor(x, y) {
		this.blocks = []
		// y *= config.scale
		this.entity = world.entities.emplace(Entity, {
			asset: null,
			x: x,
			y: y + (blockSize * config.terrain.columnHeight) / 2,
			width: blockSize,
			height: blockSize * config.terrain.columnHeight,
			static: true
		})
		// this.sprite = new PIXI.extras.TilingSprite.from(Util.imagePath("ground-below"), blockSize / config.scale, (blockSize * config.terrain.columnHeight) / config.scale)
		// this.sprite.scale = new PIXI.Point(config.scale, config.scale)
		// this.sprite.x = x - blockSize / 2
		// this.sprite.y = y
		// world.camera.add(this.sprite)
		for (var i = 0; i < config.terrain.columnHeight; i++) {
			var block = new Sprite("ground-below")
			block.x = x
			block.y = y + blockSize / 2 + i * blockSize
			this.blocks.push(block)
		}
		this.surface = new Sprite("ground-surface")
		this.surface.x = x
		this.surface.y = y
	}

	destroy() {
		this.entity.destroy()
		world.camera.remove(this.surface)
		this.blocks.forEach(block => world.camera.remove(block))
	}
}
