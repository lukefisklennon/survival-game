var PIXI = require("pixi.js")
var Matter = require("matter-js")
var config = require("./config")
var load = require("./loader")
var Character = require("./character")
var Campfire = require("./campfire")
var Sprite = require("./sprite")
var World = require("./world")
var PlayerController = require("./player-controller")
var Enemy = require("./enemy")
require("./index.css")
// require("./config")

require("./setup")()

load(() => {
	new World()

	var campfire = new Campfire(0, 150)

	world.player = new Character({
		asset: "thaumaturge",
		x: 0,
		y: 0,
		controller: new PlayerController()
	})

	var n = 40
	var range = n * 50
	for (var i = 0; i < n; i++) {
		var x = Math.random() * range - range / 2
		var y = 0
		new Character({
			asset: "goblin",
			x: x,
			y: y,
			controller: new Enemy(x, y)
		})
	}

	pixi.ticker.add(() => {
		world.update(pixi.ticker.elapsedMS)
	})
})
