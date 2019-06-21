var PIXI = require("pixi.js")
var Matter = require("matter-js")
var config = require("./config")
var load = require("./loader")
var Humanoid = require("./humanoid.js")
var Sprite = require("./sprite")
var World = require("./world")
var PlayerController = require("./player-controller")
require("./index.scss")
require("./config")

require("./setup")()

load(() => {
	window.world = new World()

	var player = world.entities.emplace(Humanoid, {
		asset: "thaumaturge",
		controller: new PlayerController()
	})
	player.sprite.state = "static"
	player.x = 620
	player.y = 100
	world.player = player

	var e = []
	// for (var i = 0; i < 10; i++) {
	// 	e.push(world.entities.emplace(Humanoid, {
	// 		asset: "thaumaturge"
	// 	}))
	// 	e[i].x = 2000
	// 	e[i].y = 100
	// }

	for (var i = 0; i < 40; i++) {
		// world.environment.terrain.emplaceRight(500)
		var y = 500 + Math.round(Math.random() * 22) * config.scale
		for (var j = 0; j < 5; j++) {
			world.environment.terrain.emplaceRight(y)
		}
	}

	pixi.ticker.add(() => {
		// for (var i = 0; i < e.length; i++) {
		// 	e[i].move((i % 2) * 2 - 1)
		// 	if (Math.random() < 0.001) e[i].jump(1)
		// }
		world.update(pixi.ticker.elapsedMS)
	})
})
