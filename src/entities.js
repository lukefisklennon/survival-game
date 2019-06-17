var Matter = require("matter-js")
var Sprite = require("./sprite")
var Store = require("./store")
var EventEmitter = require("events")
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
	static: false,
	controller: null
}

class Entity extends EventEmitter {
	constructor(asset, options) {
		super()

		var options = resolveOptions(options, allOptions)

		var data = entitiesData[asset]
		this.sprite = new Sprite(asset)
		this.width = data.hitbox.width * config.scale
		this.height = data.hitbox.height * config.scale
		this.body = Matter.Bodies.rectangle(0, 0, this.width, this.height, {
			inertia: Infinity
		})
		this.body.entity = this
		this.x = 550
		this.y = 0
		Matter.Body.setStatic(this.body, options.static)
		Matter.World.add(world.engine.world, this.body)
		this.sprite.anchor.set(0.5, (this.sprite.height - this.height / 2) / this.sprite.height)
		this.controller = options.controller
		this.belowTouching = []
		this.isGrounded = false

		this.on("collisionStart", (entity, event) => {
			if (this.x + this.width / 2 > entity.x - entity.width / 2 &&
				this.x - this.width / 2 < entity.x + entity.width / 2 &&
				this.y < entity.y) {
				if (!this.belowTouching.includes(entity)) this.belowTouching.push(entity)
				this.isGrounded = (this.belowTouching.length > 0)
			}
		})

		this.on("collisionEnd", (entity, event) => {
			var index = this.belowTouching.indexOf(entity)
			if (index != -1) this.belowTouching.splice(index)
			this.isGrounded = (this.belowTouching.length > 0)
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

	move(input) {
		var acceleration = config.player.speed * config.player.accelerationFactor
		// if (!this.isGrounded) {
		// 	input.left = false
		// 	input.right = false
		// }
		if (input.left) this.vx -= acceleration
		if (input.right) this.vx += acceleration
		if (this.vx > config.player.speed) {
			this.vx = config.player.speed
		} else if (this.vx < -config.player.speed) {
			this.vx = -config.player.speed
		}

		if (this.isGrounded) {
			var yeet = 0.6
			if (input.left || input.right) {
				if (this.sprite.state != "run") {
					this.sprite.state = "run-start"
					setTimeout(() => {
						if (this.sprite.state == "run-start") this.sprite.state = "run"
					}, 83 * yeet)
				}
			} else {
				if (this.sprite.state != "static") {
					this.sprite.state = "run-start"
					setTimeout(() => {
						if (this.sprite.state == "run-start") this.sprite.state = "static"
					}, 83 * yeet)
				}
			}
		}
		// } else {
		// 	if (Math.abs(this.vx) > 5) {
		// 		if (this.sprite.state == "run") {
		// 			this.sprite.state = "jump-run"
		// 		} else if (this.sprite.state != "jump-run") {
		// 			this.sprite.state = "jump-run-end"
		// 		}
		// 	} else {
		// 		if (this.sprite.state == "static") {
		// 			this.sprite.state = "jump-static"
		// 		} else if (this.sprite.state != "jump-static") {
		// 			this.sprite.state = "jump-static-end"
		// 		}
		// 	}
		// }

		var abs = Math.abs(this.sprite.scale.x)
		if (input.left) {
			this.sprite.scale.x = -abs
		} else if (input.right) {
			this.sprite.scale.x = abs
		}

		if (input.jump && this.isGrounded) {
			Matter.Body.applyForce(this.body, {x: 0, y: 0}, {x: 0, y: -0.6})
		}
	}

	update() {
		this.updateTouchingGround()
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

	updateTouchingGround() {
		this.touchingGround = false
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
}

function resolveOptions(options, allOptions) {
	if (typeof(options) == "undefined") {
		options = {}
	}
	for (key in allOptions) {
		if (!(key in options)) {
			options[key] = allOptions[key]
		}
	}
	return options
}
