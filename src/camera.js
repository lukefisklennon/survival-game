var config = require("./config")

module.exports = class Camera {
	constructor() {
		this.screenTarget = {x: window.innerWidth / 2, y: window.innerHeight / 2}
		this.container = new PIXI.Container()
		// this.container.sortableChildren = true
		pixi.stage.addChild(this.container)
	}

	add(child) {
		this.container.addChild/*At*/(child)//, 0)
	}

	update() {
		this.follow(world.player.x, world.player.y)
	}

	follow(x, y) {
		this.x = this.transition(this.x, x)
		this.y = this.transition(this.y, y)
		this.screenTarget.x = x - this.x + window.innerWidth / 2
		this.screenTarget.y = y + this.y + window.innerHeight / 2
	}

	transition(current, target) {
		return (current * (1 - config.cameraSpeed)) + (target * config.cameraSpeed)
	}

	get x() {
		return -(this.container.x - window.innerWidth / 2)
	}

	get y() {
		return -(this.container.y - window.innerHeight / 2)
	}

	set x(x) {
		this.container.x = -x + window.innerWidth / 2
	}

	set y(y) {
		this.container.y = -y + window.innerHeight / 2
	}
}
