var Pathfinder = require("./pathfinder")

module.exports = class Enemy extends Pathfinder {
	constructor(x, y) {
		super()
		this.mode = "patrol"
		this.patrolRadius = 500
		this.patrolMoving = false
		this.patrolSwitchTime = 1000 + Math.random() * 1000
		var switchPatrol = () => {
			this.patrolMoving = !this.patrolMoving
			this.patrolSwitchTime = 1000 + Math.random() * 1000
			setTimeout(switchPatrol, this.patrolSwitchTime)
		}
		setTimeout(switchPatrol, this.patrolSwitchTime)
		this.patrolPositions = [
			{x: x + this.patrolRadius + Math.random() * this.patrolRadius},
			{x: x - this.patrolRadius - Math.random() * this.patrolRadius}
		]
		this.target = this.patrolPositions[Math.round(Math.random())]
	}

	run(entity) {
		if (this.patrolMoving) {
			var atTarget = super.run(entity)
			if (atTarget) {
				if (this.target == this.patrolPositions[0]) {
					this.target = this.patrolPositions[1]
				} else {
					this.target = this.patrolPositions[0]
				}
			}
		} else [
			entity.move(0)
		]
	}
}
