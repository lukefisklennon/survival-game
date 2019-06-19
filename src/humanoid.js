var Matter = require("matter-js")
var Entity = require("./entity")
var config = require("./config")

module.exports = class Humanoid extends Entity {
	constructor() {
		super(...arguments)
	}

	move(x) {
		var speed = config.player.speed
		if (!this.isGrounded) speed *= config.humanoid.airSpeed
		var acceleration = speed * config.player.accelerationFactor

		this.vx += x * acceleration
		if (this.vx > config.player.speed) {
			this.vx = config.player.speed
		} else if (this.vx < -config.player.speed) {
			this.vx = -config.player.speed
		}

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

		var abs = Math.abs(this.sprite.scale.x)
		if (x > 0) {
			this.sprite.scale.x = abs
		} else if (x < 0) {
			this.sprite.scale.x = -abs
		}
	}

	jump(power) {
		if (this.isGrounded) {
			this.vy = -10 * power
			this.belowTouching = []
			this.updateIsGrounded()
		}
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
