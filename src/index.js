var PIXI = require("pixi.js")
var Matter = require("matter-js")
var config = require("./config")
var load = require("./loader")
var Sprite = require("./sprite")
var World = require("./world")
var PlayerController = require("./player-controller")
require("./index.scss")
require("./config")

require("./setup")()

load(() => {
	window.world = new World()

	var player = world.entities.emplace("thaumaturge", {
		controller: new PlayerController()
	})
	player.sprite.state = "static"
	player.x = 620
	player.y = 100
	world.player = player

	for (var i = 0; i < 40; i++) {
		// world.environment.terrain.emplaceRight(500)
		var y = 500 + Math.floor(Math.random() * 40) * config.scale
		for (var j = 0; j < 3; j++) {
			world.environment.terrain.emplaceRight(y)
		}
	}

	pixi.ticker.add(() => {
		world.update(pixi.ticker.elapsedMS)
	})
})
