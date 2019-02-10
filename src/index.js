var PIXI = require("pixi.js")
var Matter = require("matter-js")
var config = require("./config")
var World = require("./world")
require("./setup")()
var load = require("./loader")
var Sprite = require("./sprite")
require("./index.scss")

load(() => {
	window.world = new World()

	for (var i = 0; i < 5; i++) {
		var entity = world.entities.emplace("thaumaturge")
		entity.sprite.state = "static"
	}

	world.environment.terrain.emplaceRight()

	pixi.ticker.add(() => {
		var delta = pixi.ticker.elapsedMS
		if (delta > config.deltaLimit) delta = config.deltaLimit
		Matter.Engine.update(engine, delta)
		world.entities.update()
	})
})
