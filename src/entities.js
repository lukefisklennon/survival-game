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
	constructor(resource, options) {
		if (arguments.length < 2) {
			options = {}
		}
		for (key in allOptions) {
			if (!(key in options)) {
				options[key] = allOptions[key]
			}
		}
		var data = entitiesData[resource]
		this.sprite = new Sprite(resource)
		this.x = 550
		this.y = 0
		this.width = data.hitbox.width * config.scale
		this.height = data.hitbox.height * config.scale
		this.body = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height, {
			static: options.static,
			inertia: Infinity
		})
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

	update() {
		this.x = this.body.position.x
		this.y = this.body.position.y
		this.sprite.x = this.x
		this.sprite.y = this.y
		this.sprite.rotation = this.body.angle
		if (config.debug) {
			this.debugBox.x = this.x
			this.debugBox.y = this.y
		}
	}
}
