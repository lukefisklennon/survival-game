module.exports = class Pathfinder {
	constructor() {
		this.target = null
	}

	run(entity) {
		if (this.target != null && Math.abs(this.target.x - entity.x) > 400) {
			entity.move(Math.sign(this.target.x - entity.x))
		} else {
			entity.move(0)
		}
	}
}
