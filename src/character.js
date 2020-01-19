var Humanoid = require("./humanoid")
var config = require("./config")

config.healthBar.height *= config.scale
config.healthBar.padding *= config.scale
config.healthBar.radius *= config.scale

module.exports = class Character extends Humanoid {
	constructor(options) {
		super(options)
		this.hp = 1
		this.createHealthBar()
	}

	update() {
		this.hp += 0.001
		if (this.hp > 1) this.hp = 1
		if (this.hp <= 0) {
			// var Pathfinder = require("./pathfinder")
			// var enemy1 = new Character({
			// 	asset: "goblin",
			// 	x: Math.random() * 1000 - 500,
			// 	y: 0,
			// 	controller: new Pathfinder(300)
			// })
			// enemy1.controller.target = world.player
			// var enemy2 = new Character({
			// 	asset: "goblin",
			// 	x: Math.random() * 1000 - 500,
			// 	y: 0,
			// 	controller: new Pathfinder(300)
			// })
			// enemy2.controller.target = world.player

			if (this.blaasset == "thaumaturge") {
				window.score++
			} else {
				alert("Score: " + window.score)
			}

			this.hp = 0
			this.destroy()
		}
		super.update()
		this.updateHealthBar()
	}

	updateHealthBar() {
		this.healthBar.clear()
		this.drawHealthBar(1, config.healthBar.backgroundColor)
		this.drawHealthBar(this.hp, config.healthBar.foregroundColor)

		this.healthBar.x = this.x + this.width * (0.5 - this.sprite.anchor.x)
		this.healthBar.y = this.y
	}

	drawHealthBar(width, color) {
		var c = config.healthBar

		this.healthBar.beginFill(parseInt(color))
		width *= c.width
		if (width < c.radius * 2) width = c.radius * 2
		this.healthBar.drawRoundedRect(this.width / 2 - c.width / 2, -c.height - c.padding, width, c.height, c.radius)
		this.healthBar.endFill()
	}

	createHealthBar() {
		this.healthBar = new PIXI.Graphics()
		this.healthBar.pivot.x = this.width / 2
		this.healthBar.pivot.y = this.height / 2
		world.camera.add(this.healthBar)
	}

	destroy() {
		try {
			this.healthBar.parent.removeChild(this.healthBar)
		} catch(e) {} // TODO
		super.destroy()
	}
}
