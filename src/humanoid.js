var Matter = require("matter-js")
var Entity = require("./entity")
var config = require("./config")

module.exports = class Humanoid extends Entity {
	constructor() {
		super(...arguments)
	}

	move(x) {
		var speed = config.player.speed
		if (!this.isGrounded) speed *= 0.5
		var acceleration = speed * config.player.accelerationFactor

		this.vx += x * acceleration
		if (this.vx > config.player.speed) {
			this.vx = config.player.speed
		} else if (this.vx < -config.player.speed) {
			this.vx = -config.player.speed
		}

		if (this.isGrounded) {
			var yeet = 0.6
			if (x != 0) {
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
		} else {
			if (Math.abs(this.vx) > 5) {
				this.handleJumpState("run")
			} else {
				this.handleJumpState("static")
			}
		}

		var abs = Math.abs(this.sprite.scale.x)
		if (x > 0) {
			this.sprite.scale.x = abs
		} else if (x < 0) {
			this.sprite.scale.x = -abs
		}
	}

	jump(power) {
		if (this.isGrounded) {
			Matter.Body.applyForce(this.body, {x: 0, y: 0}, {x: 0, y: -0.6 * power})
			this.belowTouching = []
			this.updateIsGrounded()
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
