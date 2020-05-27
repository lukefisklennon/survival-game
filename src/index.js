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

	var campfire = new Campfire(0, 200)

	world.player = new Character({
		asset: "thaumaturge",
		x: 0,
		y: 0,
		controller: new PlayerController()
	})

	var enemy1 = new Character({
		asset: "goblin",
		x: -500,
		y: 0,
		controller: new Enemy(-500, 0)
	})

	var enemy2 = new Character({
		asset: "goblin",
		x: -250,
		y: 0,
		controller: new Enemy(-250, 0)
	})

	var enemy3 = new Character({
		asset: "goblin",
		x: 250,
		y: 0,
		controller: new Enemy(250, 0)
	})

	var enemy4 = new Character({
		asset: "goblin",
		x: 500,
		y: 0,
		controller: new Enemy(500, 0)
	})

	pixi.ticker.add(() => {
		world.update(pixi.ticker.elapsedMS)
	})
})
