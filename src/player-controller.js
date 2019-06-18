var input = require("./input")

module.exports = class PlayerController {
	run(entity) {
		var x = 0
		if (input.a) x -= 1
		if (input.d) x += 1
		entity.move(x)
		if (input.w) entity.jump(1)
	}
}
