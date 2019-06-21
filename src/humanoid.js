var Matter = require("matter-js")
var Entity = require("./entity")
var config = require("./config")

module.exports = class Humanoid extends Entity {
	constructor() {
		super(...arguments)

		this.isAttacking = false
		this.attackDirection = 0
	}

	update() {
		if (this.isAttacking) {
			this.direction = this.attackDirection
			if (!world.yeet) this.setMovement(this.attackDirection * config.player.speed * config.humanoid.attackSpeedFactor, config.player.accelerationFactor)
		}
		super.update()
	}

	move(x) {
		if (!this.isAttacking) {
			var accelerationFactor = config.player.accelerationFactor
			if (!this.isGrounded) accelerationFactor *= config.humanoid.airAccelerationFactor
			this.setMovement(x * config.player.speed, accelerationFactor)

			if (this.isGrounded) {
				if (x != 0) {
					this.handleRunTransition("run")
				} else {
					this.handleRunTransition("static")
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
			this.belowTouching = []
			this.updateIsGrounded()
		}
	}

	attack(direction) {
		if (!this.isAttacking) {
			this.attackDirection = direction
			if (world.yeet) this.vx = 15 * direction
		}
		this.isAttacking = true
		this.sprite.state = "attack-fist_0"
		this.sprite.onFrameChange = function(frame) {
			if (this.isAttacking && frame > 3) {
				this.sprite.state = "static"
				this.isAttacking = false
			}
		}.bind(this)
	}

	handleRunTransition(to) {
		if (this.sprite.state != to) {
			this.sprite.state = "run-start"
			setTimeout(() => {
				if (this.sprite.state == "run-start") this.sprite.state = to
			}, 83 * config.humanoid.runTransitionFactor)
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
}
