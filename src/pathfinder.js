module.exports = class Pathfinder {
	constructor(bla) {
		this.target = null
		this.bla = bla
	}

	run(entity) {
		if (this.target != null && Math.abs(this.target.x - entity.x) > this.bla) {
			entity.move(Math.sign(this.target.x - entity.x))
			entity.attack(0)
		} else {
			entity.move(0)
			entity.attack(Math.sign(this.target.x - entity.x))
			// if (Math.random() < 0.03) entity.attack(Math.sign(this.target.x - entity.x))
		}
		if (entity.y - this.target.y > 0) {
			entity.jump(1)
		}
	}
}
