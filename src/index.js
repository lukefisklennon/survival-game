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

	world.player = world.entities.emplace(Humanoid, {
		asset: "thaumaturge",
		x: 0,
		y: 0,
		controller: new PlayerController()
	})

	var SimplexNoise = require("simplex-noise")
	var simplex = new SimplexNoise()

	function thing(i) {
		var y = 0
		config.terrain.octaves.forEach(octave => {
			y += Math.round((simplex.noise2D(i * octave.frequency, 16) * 0.5 + 0.5) * octave.amplitude)
		})
		y = Math.round(y / config.terrain.stepHeight) * config.terrain.stepHeight
		world.environment.terrain.emplaceRight(y)
	}

	var numAhead = 5

	for (var i = 0; i < numAhead; i++) {
		thing(world.environment.terrain.length)
	}

	// setTimeout(() => {
		pixi.ticker.add(() => {
			// for (var i = 0; i < e.length; i++) {
			// 	e[i].move((i % 2) * 2 - 1)
			// 	if (Math.random() < 0.001) e[i].jump(1)
			// }
			if (world.player.x > (world.environment.terrain.length - numAhead) * 16 * config.scale) {
				thing(world.environment.terrain.length)
			}
			world.update(pixi.ticker.elapsedMS)
		})
	// }, 1)
})
