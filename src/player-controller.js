var input = require("./input")

module.exports = class PlayerController {
	run(entity) {
		entity.move({
			left: input.a,
			right: input.d
		})
	}
}
