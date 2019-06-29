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
	new World()

	world.player = world.entities.emplace(Humanoid, {
		asset: "thaumaturge",
		x: 0,
		y: 0,
		controller: new PlayerController()
	})

	pixi.ticker.add(() => {
		world.update(pixi.ticker.elapsedMS)
	})
})
