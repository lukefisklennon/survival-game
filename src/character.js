var Humanoid = require("./humanoid")
var config = require("./config")

config.healthBar.height *= config.scale
config.healthBar.padding *= config.scale

module.exports = class Character extends Humanoid {
	constructor(options) {
		super(options)
		this.hp = 1
		this.createHealthBars()
	}

	update() {
		this.hp -= 0.005
		if (this.hp < 0) this.hp = 0
		super.update()
		this.updateHealthBars()
	}

	updateHealthBars() {
		this.drawHealthBar(0, 1, config.healthBar.backgroundColor)
		this.drawHealthBar(1, this.hp, config.healthBar.foregroundColor)

		for (var i = 0; i < 2; i++) {
			this.healthBars[i].x = this.x + this.width * (0.5 - this.sprite.anchor.x)
			this.healthBars[i].y = this.y
		}
	}

	drawHealthBar(i, width, color) {
		var c = config.healthBar

		this.healthBars[i].clear()
		this.healthBars[i].beginFill(parseInt(color))
		width *= c.width
		if (width < c.radius * 2) width = c.radius * 2
		this.healthBars[i].drawRoundedRect(this.width / 2 - c.width / 2, -c.height - c.padding, width, c.height, c.radius)
		this.healthBars[i].endFill()
	}

	createHealthBars() {
		this.healthBars = []
		// 0: grey bar underneath
		// 1: green bar on top
		for (var i = 0; i < 2; i++) {
			this.healthBars[i] = new PIXI.Graphics()
			this.healthBars[i].pivot.x = this.width / 2
			this.healthBars[i].pivot.y = this.height / 2
			world.camera.add(this.healthBars[i])
		}
	}
}
