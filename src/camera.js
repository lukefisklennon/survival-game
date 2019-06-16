var config = require("./config")

module.exports = class Camera {
	constructor() {
		this.container = new PIXI.Container()
		pixi.stage.addChild(this.container)
	}

	add(child) {
		this.container.addChild(child)
	}

	update() {
		this.x = world.player.x
		this.y = world.player.y
	}

	set x(x) {
		this.container.x = this.transition(this.container.x, -x + window.innerWidth / 2)
	}

	set y(y) {
		this.container.y = this.transition(this.container.y, -y + window.innerHeight / 2)
	}

	transition(current, target) {
		return (current * (1 - config.cameraSpeed)) + (target * config.cameraSpeed)
	}
}
