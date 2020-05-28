module.exports = class Pathfinder {
	constructor() {
		this.target = null
		this.targetRange = 200
	}

	run(entity, inverse, walking) {
		var direction = Math.sign(this.target.x - entity.x)
		if (this.target != null && Math.abs(this.target.x - entity.x) > this.targetRange || inverse) {
			if (inverse) direction *= -1
			entity.move(direction, walking)
			return 0
		} else {
			entity.move(0)
			return direction
		}
	}
}
