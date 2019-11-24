module.exports = class Pathfinder {
	constructor(bla) {
		this.target = null
		this.bla = bla
	}

	run(entity) {
		if (this.target != null && Math.abs(this.target.x - entity.x) > this.bla) {
			entity.move(Math.sign(this.target.x - entity.x))
		} else {
			entity.move(0)
			// if (Math.random() < 0.03) entity.attack(Math.sign(this.target.x - entity.x))
		}
	}
}
