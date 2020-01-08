var Matter = require("matter-js")
var Entity = require("./entity")
var config = require("./config")

module.exports = class Humanoid extends Entity {
	constructor(options) {
		options.collisionFilter = {
			group: -1
		}
		super(options)
		this.blaasset = options.asset // TODO

		this.isAttacking = false
		this.attackDirection = 0
		this.attackBox = new Entity({
			static: true,
			sensor: true,
			width: 6 * config.scale,
			height: 6 * config.scale
		})
		this.attackBox.on("collisionStart", (entity, event) => {
			if (this.isAttacking && entity != this && entity.constructor.name == "Character") {
				entity.vx += 3 * this.direction
				if (entity == world.player) {
					entity.hp -= 0.13 / 5
				} else {
					entity.hp -= 0.13
				}
			}
		})
		// this.attackBox.scaleX = 1
		// this.attackBox.scaleY = 1
		this.extractSliceData()

		this.belowTouching = []
		this.isGrounded = false

		this.on("collisionStart", (entity, event) => {
			if (entity.constructor.name == "Column") {
				if (this.y < entity.y && /*event.collision.normal.y > 0 && event.collision.normal.x == 0 &&*/ !this.belowTouching.includes(entity)) {
					this.belowTouching.push(entity)
					this.updateIsGrounded()
				}
				if (event.collision.normal.y == 0) {
					this.y -= config.terrain.stepHeight * config.scale
				}
			}
		})

		this.on("collisionEnd", (entity, event) => {
			var index = this.belowTouching.indexOf(entity)
			if (index != -1) {
				this.belowTouching.splice(index, 1)
				this.updateIsGrounded()
			}
		})
	}

	update() {
		this.attackBox.x = this.x + (-this.width / 2 - 6 * config.scale / 2) * this.direction
		this.attackBox.y = this.y - this.height / 2 - 6 * config.scale / 2
		if (this.isAttacking) {
			var slice = this.getAttackSlice(this.sprite.currentFrame + this.sprite.frameTags.find(tag => tag.name == "attack-fists_0").from)
			if (slice != null) {
				this.attackBox.x += (slice.bounds.x * config.scale - 6 * config.scale / 2) * this.direction
				this.attackBox.y += slice.bounds.y * config.scale - 6 * config.scale / 2
				// Matter.Body.scale(this.attackBox.body, 1 / this.attackBox.scaleX, 1 / this.attackBox.scaleY)
				// this.attackBox.scaleX = 5//slice.bounds.width
				// this.attackBox.scaleY = 5//slice.bounds.height
				// Matter.Body.scale(this.attackBox.body, this.attackBox.scaleX, this.attackBox.scaleY)
			}
		}

		if (this.isGrounded) {
			this.vx *= 1 - config.friction
		}

		super.update()

		// Platform stuff

		// if (this.constructor.name == "Humanoid") {
		// 	// console.log(this.belowTouching.filter(entity => entity.constructor.name == "Platform").length)
		// 	// if (this.vy > 0) {
		// 		this.body.collisionFilter.mask = 3
		// 	// } else {
		// 	// 	this.body.collisionFilter.mask = 1
		// 	// }
		// }
	}

	move(x) {
		if (!this.isAttacking) {
			var accelerationFactor = config.player.accelerationFactor
			if (!this.isGrounded) accelerationFactor *= config.humanoid.airAccelerationFactor
			this.setMovement(x * config.player.speed, accelerationFactor)
			if (this.isGrounded) {
				if (x != 0) {
					if (this.blaasset == "thaumaturge") {
						this.sprite.transition("run", "run-start", config.humanoid.runTransitionFactor)
					} else {
						this.sprite.state = "run"
					}
				} else {
					if (this.blaasset == "thaumaturge") {
						this.sprite.transition("static", "run-start", config.humanoid.runTransitionFactor)
					} else {
						this.sprite.state = "static"
					}
				}
			} else {
				if (Math.abs(this.vx) > 5) {
					this.handleJumpState("run")
				} else {
					this.handleJumpState("static")
				}
			}

			this.direction = x
		}
	}

	setMovement(speed, accelerationFactor) {
		this.vx += speed * accelerationFactor
		if ((speed > 0 && this.vx > speed) || (speed < 0 && this.vx < speed)) {
			this.vx = speed
		}
	}

	jump(power) {
		if (this.isGrounded && !this.isAttacking) {
			this.vy = -config.player.jumpPower * power
			// this.belowTouching = []
			this.updateIsGrounded()
		}
	}

	attack(direction) {
		if (direction != 0) {
			if (!this.isAttacking) {
				this.direction = direction
				// this.vx = 0 * direction
			}
			this.isAttacking = true
			var iii = 0
			this.sprite.state = "attack-fists_" + iii
			this.sprite.onComplete = function(frame) {
				// console.log(this.sprite.animations["attack-fists_0"].length)
				// console.log(frame, this.sprite.animations["attack-fists_" + iii].length)
				// if (frame >= this.sprite.animations["attack-fists_" + iii].length) {
					this.endAttack()
				// }
			}.bind(this)
		} else {
			this.endAttack()
		}
	}

	endAttack() {
		if (this.isAttacking) {
			this.isAttacking = false
			this.sprite.state = "static"
		}
	}

	handleJumpState(to) {
		var from
		if (to == "run") {
			from = "static"
		} else {
			from = "run"
		}
		var oldState = this.sprite.state
		var oldCurrentFrame = this.sprite.currentFrame
		this.sprite.state = "jump-" + to
		if (oldState == "jump-" + from) {
			this.sprite.gotoAndPlay(oldCurrentFrame)
		}
	}

	updateIsGrounded() {
		this.isGrounded = (this.belowTouching.length > 0)
	}

	extractSliceData() {
		this.slices = this.sprite.slices.find(slice => slice.name == "hitbox-attacks").keys
	}

	getAttackSlice(frame) {
		var result = this.slices.find(slice => slice.frame == frame)
		if (result && (result.bounds.x >= 0 && result.bounds.y >= 0)) {
			return result
		} else {
			return null
		}
	}
}
