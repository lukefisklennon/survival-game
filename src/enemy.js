var Pathfinder = require("./pathfinder")

module.exports = class Enemy extends Pathfinder {
	constructor(x, y) {
		super()
		this.mode = "patrol"
		this.attackRange = 400 + Math.random() * 200
		this.patrolRadius = 500
		this.patrolMoving = Math.round(Math.random()) ? true : false
		this.attackFlee = Math.round(Math.random()) ? true : false
		this.switchTimer = null
		this.doSwitch()
		this.patrolPositions = [
			{x: x - (this.patrolRadius + Math.random() * this.patrolRadius) * 2},
			{x: x - (this.patrolRadius + Math.random() * this.patrolRadius)},
			{x: x + (this.patrolRadius + Math.random() * this.patrolRadius)},
			{x: x + (this.patrolRadius + Math.random() * this.patrolRadius) * 2}
		]
		this.target = this.patrolPositions[Math.round(Math.random())]
	}

	doSwitch() {
		if (this.mode == "patrol") {
			this.patrolMoving = !this.patrolMoving
		} else if (this.mode == "attack") {
			this.attackFlee = !this.attackFlee
		}
		this.delaySwitch()
	}

	delaySwitch() {
		var switchTime
		if (this.mode == "patrol") {
			switchTime = 1000 + Math.random() * 1000
		} else if (this.mode == "attack") {
			if (this.attackFlee) {
				switchTime = 2000 + Math.random() * 1000
			} else {
				switchTime = 8000 + Math.random() * 2000
			}
		}
		clearTimeout(this.switchTimer)
		this.switchTimer = setTimeout((this.doSwitch).bind(this), switchTime)
	}

	run(entity) {
		var oldMode = this.mode
		this.mode = (
			entity.x > this.patrolPositions[0].x && entity.x < this.patrolPositions[3].x
		) && world.entities.scan(entity.x, this.attackRange).find(entity => (
			entity == world.player// || (entity.controller && entity.controller.mode == "attack")
		)) ? "attack" : "patrol"
		if (this.mode != oldMode) {
			this.delaySwitch()
			if (this.mode == "attack") {
				this.attackFlee = false
			}
		}

		if (this.mode == "patrol") {
			if (this.patrolMoving) {
				var targetDirection = super.run(entity, false, true)
				if (targetDirection) {
					if (entity.x < this.patrolPositions[1].x) {
						entity.move(1)
					} else if (entity.x > this.patrolPositions[2].x) {
						entity.move(-1)
					} else {
						if (this.target == this.patrolPositions[1]) {
							this.target = this.patrolPositions[2]
						} else {
							this.target = this.patrolPositions[1]
						}
					}
				}
			} else {
				entity.move(0)
			}
			entity.attack(0)
		} else if (this.mode == "attack") {
			var targetDirection = super.run(entity, this.attackFlee)
			this.target = world.player
			if (targetDirection && !this.attackFlee) {
				entity.attack(targetDirection)
			} else {
				entity.attack(0)
			}
		}
	}
}
