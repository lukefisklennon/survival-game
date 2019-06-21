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

	var e = []
	// for (var i = 0; i < 10; i++) {
	// 	e.push(world.entities.emplace(Humanoid, {
	// 		asset: "thaumaturge"
	// 	}))
	// 	e[i].x = 2000
	// 	e[i].y = 100
	// }

	for (var i = 0; i < 20; i++) {
		// world.environment.terrain.emplaceRight(500)
		var y = 500 + Math.round(Math.random() * 22) * config.scale
		for (var j = 0; j < 5; j++) {
			world.environment.terrain.emplaceRight(y)
		}
	}

	setTimeout(() => {
		var player = world.entities.emplace(Humanoid, {
			asset: "thaumaturge",
			x: 620,
			y: 200,
			controller: new PlayerController()
		})
		// player.sprite.zIndex = -1
		world.player = player

		pixi.ticker.add(() => {
			// for (var i = 0; i < e.length; i++) {
			// 	e[i].move((i % 2) * 2 - 1)
			// 	if (Math.random() < 0.001) e[i].jump(1)
			// }
			world.update(pixi.ticker.elapsedMS)
		})
	}, 1)
})
