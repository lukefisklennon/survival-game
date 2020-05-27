module.exports = class Pathfinder {
	constructor() {
		this.target = null
		this.targetRange = 50
	}

	run(entity) {
		if (this.target != null && Math.abs(this.target.x - entity.x) > this.targetRange) {
			entity.move(Math.sign(this.target.x - entity.x))
			return false
		} else {
			entity.move(0)
			return true
		}
	}
}
