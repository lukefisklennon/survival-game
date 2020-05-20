var config = require("./config")

module.exports = class Camera {
	constructor(x, y) {
		this.screenTarget = {x: window.innerWidth / 2, y: window.innerHeight / 2}

		this.layers = config.layers.map((speed, index) => {
			let layer = new PIXI.Container()
			layer.speed = speed
			pixi.stage.addChild(layer)
			return layer
		})

		// this.container.sortableChildren = true
		this.x = x
		this.y = y
	}

	add(child, index) {
		index = this.reverseIndex(index)
		this.layers[index].addChild/*At*/(child)//, 0)
	}

	remove(child, index) {
		index = this.reverseIndex(index)
		this.layers[index].removeChild(child)
	}

	update() {
		this.follow(world.player.x, world.player.y)
	}

	follow(x, y) {
		this.screenTarget.x = x - this.x + window.innerWidth / 2
		this.screenTarget.y = y + this.y + window.innerHeight / 2
		this.x = this.transition(this.x, x)
		this.y = this.transition(this.y, y)
	}

	transition(current, target) {
		return (current * (1 - config.cameraSpeed)) + (target * config.cameraSpeed)
	}

	get x() {
		return -(this.layers[this.reverseIndex(0)].x - window.innerWidth / 2)
	}

	get y() {
		return -(this.layers[this.reverseIndex(0)].y - window.innerHeight + 400)
	}

	set x(x) {
		this.layers.forEach(layer => {
			layer.x = -x * layer.speed + window.innerWidth / 2
		})
	}

	set y(y) {
		this.layers.forEach(layer => {
			layer.y = -y * layer.speed + window.innerHeight - 400
		})
	}

	reverseIndex(index) {
		if (index === undefined) {
			index = 0
		}
		return (this.layers.length - 1) - index
	}
}
