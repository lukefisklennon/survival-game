var PIXI = require("pixi.js")
var Matter = require("matter-js")
var config = require("./config")
var World = require("./world")
require("./setup")()
var load = require("./loader")
var Sprite = require("./sprite")
require("./index.scss")
require("./config")

load(() => {
	window.world = new World()

	var entity = world.entities.emplace("thaumaturge")
	entity.sprite.state = "static"
	entity.x = 650
	entity.y = 100

	for (var i = 0; i < 20; i++) {
		world.environment.terrain.emplaceRight(700 + Math.floor(Math.random() * 4) * config.scale)
	}

	pixi.ticker.add(() => {
		var delta = pixi.ticker.elapsedMS
		if (delta > config.deltaLimit) delta = config.deltaLimit
		Matter.Engine.update(engine, delta)
		world.entities.update()
	})
})
