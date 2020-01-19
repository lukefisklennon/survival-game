var PIXI = require("pixi.js")
var Matter = require("matter-js")
var config = require("./config")
var load = require("./loader")
var Character = require("./character")
var Campfire = require("./campfire")
var Sprite = require("./sprite")
var World = require("./world")
var PlayerController = require("./player-controller")
var Pathfinder = require("./pathfinder")
require("./index.scss")
// require("./config")

require("./setup")()

load(() => {
	window.score = 0
	new World()

	var campfire = new Campfire(0, 200)

	world.player = new Character({
		asset: "goblin",
		x: 0,
		y: 0,
		controller: new PlayerController()
	})

	window.enemies = []
	var time = 1000
	function spawn() {
		var enemy = new Character({
			asset: "thaumaturge",
			x: (Math.random() * 2000 - 1000) + world.player.x,
			y: 0,
			controller: new Pathfinder(300)
		})
		enemy.controller.target = world.player
		window.enemies.push(enemy)
		time *= 0.95
		if (time < 100) time = 100
		setTimeout(spawn, time)
	}
	setTimeout(spawn, time)

	// var enemy1 = new Character({
	// 	asset: "goblin",
	// 	x: -500,
	// 	y: 0,
	// 	controller: new Pathfinder(300)//500)
	// })
	//
	// var enemy2 = new Character({
	// 	asset: "goblin",
	// 	x: -250,
	// 	y: 0,
	// 	controller: new Pathfinder(300)
	// })
	//
	// var enemy3 = new Character({
	// 	asset: "goblin",
	// 	x: 250,
	// 	y: 0,
	// 	controller: new Pathfinder(300)//700)
	// })
	//
	// var enemy4 = new Character({
	// 	asset: "goblin",
	// 	x: 500,
	// 	y: 0,
	// 	controller: new Pathfinder(300)//900)
	// })

	// enemy1.controller.target = world.player
	// enemy2.controller.target = world.player
	// enemy3.controller.target = world.player
	// enemy4.controller.target = world.player

	pixi.ticker.add(() => {
		world.update(pixi.ticker.elapsedMS)
	})
})
