var Matter = require("matter-js")
var Sprite = require("./sprite")
var Store = require("./store")
var config = require("./config")
var entitiesData = require("./entities.json")

module.exports = class Entities extends Store {
	constructor() {
		super(Entity)
	}

	update() {
		this.loop(entity => {
			entity.update()
		})
	}
}

var allOptions = {
	static: false
}

class Entity {
	constructor(asset, options) {
		if (arguments.length < 2) {
			options = {}
		}
		for (key in allOptions) {
			if (!(key in options)) {
				options[key] = allOptions[key]
			}
		}
		var data = entitiesData[asset]
		this.sprite = new Sprite(asset)
		this.width = data.hitbox.width * config.scale
		this.height = data.hitbox.height * config.scale
		this.body = Matter.Bodies.rectangle(0, 0, this.width, this.height, {
			inertia: Infinity
		})
		this.x = 550
		this.y = 0
		Matter.Body.setStatic(this.body, options.static)
		Matter.World.add(engine.world, this.body)
		this.sprite.anchor.set(0.5, (this.sprite.height - this.height / 2) / this.sprite.height)
		if (config.debug) {
			var graphics = new PIXI.Graphics()
			graphics.lineStyle(2, 0xffffff)
			graphics.drawRect(0, 0, this.width, this.height)
			graphics.pivot.x = this.width / 2
			graphics.pivot.y = this.height / 2
			pixi.stage.addChild(graphics)
			this.debugBox = graphics
		}
	}

	get x() {
		return this.body.position.x
	}

	get y() {
		return this.body.position.y
	}

	set x(x) {
		Matter.Body.setPosition(this.body, {x: x, y: this.y})
	}

	set y(y) {
		Matter.Body.setPosition(this.body, {x: this.x, y: y})
	}

	update() {
		this.sprite.x = this.x
		this.sprite.y = this.y
		this.sprite.rotation = this.body.angle
		if (config.debug) {
			this.debugBox.x = this.x
			this.debugBox.y = this.y
			this.debugBox.rotation = this.body.angle
		}
	}
}
