var Matter = require("matter-js")
var Sprite = require("./sprite")
var Util = require("./util")
var EventEmitter = require("events")
var config = require("./config")
var entitiesData = require("./entities.json")

var allOptions = {
	asset: null,
	controller: null,
	static: false
}

module.exports = class Entity extends EventEmitter {
	constructor(options) {
		super()

		var options = Util.resolveOptions(options, allOptions)

		var data = entitiesData[options.asset]
		this.sprite = new Sprite(options.asset)
		this.width = data.hitbox.width * config.scale
		this.height = data.hitbox.height * config.scale
		this.sprite.anchor.set(0.5 + (config.scale * data.hitbox.x / this.sprite.width), (this.sprite.height - this.height / 2 + data.hitbox.y * config.scale) / this.sprite.height)
		this.direction = 1

		this.body = Matter.Bodies.rectangle(0, 0, this.width, this.height, {
			inertia: Infinity,
			friction: 0
		})
		this.body.entity = this
		Matter.Body.setStatic(this.body, options.static)
		Matter.World.add(world.engine.world, this.body)

		this.controller = options.controller

		this.x = 550
		this.y = 0

		this.belowTouching = []
		this.isGrounded = false
		this.on("collisionStart", (entity, event) => {
			if (event.collision.normal.y < 0 && event.collision.normal.x == 0 && !this.belowTouching.includes(entity)) {
				this.belowTouching.push(entity)
				this.updateIsGrounded()
			}
		})
		this.on("collisionEnd", (entity, event) => {
			var index = this.belowTouching.indexOf(entity)
			if (index != -1) {
				this.belowTouching.splice(index, 1)
				this.updateIsGrounded()
			}
		})

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

	update() {
		if (this.isGrounded) {
			this.vx *= 1 - config.friction
		}
		this.sprite.x = this.x
		this.sprite.y = this.y
		this.sprite.rotation = this.body.angle
		if (config.debug) {
			this.debugBox.x = this.x
			this.debugBox.y = this.y
			this.debugBox.rotation = this.body.angle
		}
		if (this.controller) this.controller.run(this)
	}

	updateIsGrounded() {
		this.isGrounded = (this.belowTouching.length > 0)
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
		return Math.signum(this.sprite.scale.x)
	}

	set direction(direction) {
		var abs = Math.abs(this.sprite.scale.x)
		if (direction > 0) {
			this.sprite.scale.x = abs
		} else if (direction < 0) {
			this.sprite.scale.x = -abs
		}
	}
}
