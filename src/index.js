var PIXI = require("pixi.js")
var Matter = require("matter-js")
var config = require("./config")
var load = require("./loader")
var Sprite = require("./sprite")
var PlayerController = require("./player-controller")
var World = require("./world")
require("./index.scss")
require("./config")

require("./setup")()

var iii = require("./input")

load(() => {
	window.world = new World()

	var entity = world.entities.emplace("thaumaturge", {
		controller: new PlayerController()
	})
	entity.sprite.state = "static"
	entity.x = 620
	entity.y = 100

	for (var i = 0; i < 20; i++) {
		world.environment.terrain.emplaceRight(700)// + Math.floor(Math.random() * 4) * config.scale)
	}

	pixi.ticker.add(() => {
		world.update(pixi.ticker.elapsedMS)
	})
})
