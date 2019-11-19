var PIXI = require("pixi.js")
var Matter = require("matter-js")
var config = require("./config")
var load = require("./loader")
var Humanoid = require("./humanoid.js")
var Sprite = require("./sprite")
var World = require("./world")
var PlayerController = require("./player-controller")
var Pathfinder = require("./pathfinder")
require("./index.scss")
require("./config")

require("./setup")()

load(() => {
	new World()

	world.player = new Humanoid({
		asset: "thaumaturge",
		x: 0,
		y: 0,
		controller: new PlayerController()
	})

	var enemy1 = new Humanoid({
		asset: "goblin",
		x: -600,
		y: 0,
		controller: new Pathfinder()
	})

	enemy1.controller.target = world.player

	pixi.ticker.add(() => {
		world.update(pixi.ticker.elapsedMS)
	})
})
