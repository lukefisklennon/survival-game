var PIXI = require("pixi.js")
var Matter = require("matter-js")
var config = require("./config")
require("./setup")()
var load = require("./loader")
var world = require("./world.js")
var Sprite = require("./sprite")
require("./index.scss")

load(() => {
	for (var i = 0; i < 5; i++) {
		var entity = world.entities.create("thaumaturge")
		entity.sprite.state = "static"
	}
	// var bod = Matter.Bodies.rectangle(550, 500, 500, 30, {isStatic: true})
	// Matter.World.add(engine.world, bod)
	// bod.angle = 0.07
	//
	// var grounde = new PIXI.Graphics()
	//
	// // set the line style to have a width of 5 and set the color to red
	// grounde.lineStyle(5, 0x0000ff)
	//
	// // draw a rectangle
	// grounde.drawRect(0, 0, 500, 30)
	//
	// grounde.x = 550
	// grounde.y = 500
	// grounde.pivot.x = 500 / 2
	// grounde.pivot.y = 30 / 2
	// grounde.rotation = 0.07

	// pixi.stage.addChild(grounde)

	pixi.ticker.add(() => {
		var delta = pixi.ticker.elapsedMS
		if (delta > config.deltaLimit) delta = config.deltaLimit
		Matter.Engine.update(engine, delta)
		world.entities.update()
	})
})
