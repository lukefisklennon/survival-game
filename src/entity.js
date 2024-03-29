var Matter = require("matter-js")
var Sprite = require("./sprite")
var Util = require("./util")
var EventEmitter = require("events")
var config = require("./config")
var entitiesData = require("./entities.json")

var allOptions = {
	asset: null,
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	controller: null,
	static: false,
	sensor: false,
	collisionFilter: {
		category: 1
	}
}

module.exports = class Entity extends EventEmitter {
	constructor(options) {
		super()
		world.entities.add(this)

		var options = Util.resolveOptions(options, allOptions)

		if (options.asset) {
			var data = entitiesData[options.asset]
			this.sprite = new Sprite(options.asset)
			this.width = data.hitbox.width * config.scale
			this.height = data.hitbox.height * config.scale
			this.sprite.anchor.set(0.5 + (config.scale * data.hitbox.x / this.sprite.width), (this.sprite.height - this.height / 2 + data.hitbox.y * config.scale) / this.sprite.height)
			this.direction = 1
		} else {
			this.width = options.width
			this.height = options.height
		}

		this.body = Matter.Bodies.rectangle(options.x, options.y, this.width, this.height, {
			inertia: Infinity,
			friction: 0,
			isStatic: options.static,
			isSensor: options.sensor,
			collisionFilter: options.collisionFilter
		})
		this.body.entity = this
		Matter.World.add(world.engine.world, this.body)

		this.controller = options.controller

		if (config.debug) {
			var graphics = new PIXI.Graphics()
			graphics.lineStyle(2, 0xffffff)
			graphics.drawRect(0, 0, this.width, this.height)
			graphics.pivot.x = this.width / 2
			graphics.pivot.y = this.height / 2
			world.camera.add(graphics)
			this.debugBox = graphics
		}
	}

	destroy() {
		Matter.Composite.remove(world.engine.world, this.body)
		world.camera.remove(this.sprite)
		if (config.debug) {
			world.camera.remove(this.debugBox)
		}
	}

	update() {
		if (this.sprite) {
			this.sprite.x = this.x
			this.sprite.y = this.y
		}
		// this.sprite.rotation = this.body.angle
		if (config.debug) {
			this.debugBox.x = this.x
			this.debugBox.y = this.y
			// console.log(this.body.width)
			// this.debugBox.width = this.body.width // TODO
			// this.debugBox.height = this.body.height
			this.debugBox.rotation = this.body.angle
		}
		if (this.controller) this.controller.run(this)
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

	get vx() {
		return this.body.velocity.x
	}

	get vy() {
		return this.body.velocity.y
	}

	set vx(vx) {
		Matter.Body.setVelocity(this.body, {x: vx, y: this.body.velocity.y})
	}

	set vy(vy) {
		Matter.Body.setVelocity(this.body, {x: this.body.velocity.x, y: vy})
	}

	get direction() {
		if (this.sprite) return Math.sign(this.sprite.scale.x)
		return 1
	}

	set direction(direction) {
		if (this.sprite) {
			var abs = Math.abs(this.sprite.scale.x)
			if (direction > 0) {
				this.sprite.scale.x = abs
			} else if (direction < 0) {
				this.sprite.scale.x = -abs
			}
		}
	}
}
