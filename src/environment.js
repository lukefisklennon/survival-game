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
		this.mountain = new Mountain(0, 100)
		this.mountain2 = new Mountain(200, 250)
		this.mountain3 = new Mountain(400, 400)
		this.mountain4 = new Mountain(600, 550)
		this.terrain = new Terrain()
	}

	update() {
		this.terrain.update()
	}
}

var blockSize = entitiesData["ground"].hitbox.width * config.scale

class Terrain extends Store {
	constructor() {
		super()
		this.leftEdge = 0
		this.rightEdge = 0
		this.init()
	}

	init() {
		// var platform = new Platform(0, -100, 30)
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
		// return y * config.scale
		return 150
	}

	emplaceLeft(...args) {
		this.add(new Column(this.leftEdge, ...args), 0)
		this.leftEdge -= blockSize
	}

	emplaceRight(...args) {
		this.add(new Column(this.rightEdge, ...args), this.length - 1)
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

class Column extends Entity {
	constructor(x, y) {
		// y = 200
		super({
			asset: null,
			x: x,
			y: y + (blockSize * config.terrain.columnHeight) / 2,
			width: blockSize,
			height: blockSize * config.terrain.columnHeight,
			static: true
		})
		this.blocks = []
		// y *= config.scale
		// this.sprite = new PIXI.extras.TilingSprite.from(Util.imagePath("ground"), blockSize / config.scale, (blockSize * config.terrain.columnHeight) / config.scale)
		// this.sprite.scale = new PIXI.Point(config.scale, config.scale)
		// this.sprite.x = x - blockSize / 2
		// this.sprite.y = y
		// world.camera.add(this.sprite)
		for (var i = 0; i < config.terrain.columnHeight; i++) {
			var block = new Sprite("ground")
			block.x = x
			block.y = y + blockSize / 2 + i * blockSize
			this.blocks.push(block)
		}
		this.surface = new Sprite("ground-surface")
		this.surface.x = x
		this.surface.y = y
	}

	destroy() {
		super.destroy()
		world.camera.remove(this.surface)
		this.blocks.forEach(block => world.camera.remove(block))
	}
}

class Mountain extends Sprite {
	constructor(x, y) {
		super("mountains-grassland", 1)
		this.x = x
		this.y = y
		this.anchor.y = 1
	}
}

class Platform extends Entity {
	constructor(x, y, width) {
		super({
			asset: null,
			x: x + (blockSize * width) / 2,
			y: y + blockSize / 2,
			width: blockSize * width,
			height: blockSize,
			static: true,
			collisionFilter: {
				category: 2
			}
		})
		this.blocks = []
		this.surfaces = []
		for (var i = 0; i < width; i++) {
			x = blockSize / 2 + i * blockSize
			var block = new Sprite("ground")
			block.x = x
			block.y = y + blockSize / 2
			this.blocks.push(block)
			var surface = new Sprite("ground-surface")
			surface.x = x
			surface.y = y
			this.surfaces.push(surface)
		}

	}

	destroy() {
		super.destroy()
		this.blocks.forEach(block => world.camera.remove(block))
		this.surfaces.forEach(surface => world.camera.remove(surface))
	}
}
