var PIXI = require("pixi.js");
var Matter = require("matter-js");
require("./setup")();
var load = require("./loader");
var Sprite = require("./sprite");
var entities = require("./entities.js");
require("./index.scss");

load(() => {
	var things = [];
	for (var i = 0; i < 5; i++) {
		things.push(entities.create("thaumaturge"));
		things[i].sprite.state = "jump-static";
	}
	var bod = Matter.Bodies.rectangle(550, 500, 500, 30, {isStatic: true});
	Matter.World.add(engine.world, bod);
	bod.angle = 0.07;

	var graphics = new PIXI.Graphics();

	// set the line style to have a width of 5 and set the color to red
	graphics.lineStyle(5, 0x0000ff);

	// draw a rectangle
	graphics.drawRect(0, 0, 11 * 7, 31 * 7);

	graphics.pivot.x = (11 * 7) / 2;
	graphics.pivot.y = (31 * 7) / 2;

	// game.stage.addChild(graphics);

	var grounde = new PIXI.Graphics();

	// set the line style to have a width of 5 and set the color to red
	grounde.lineStyle(5, 0x0000ff);

	// draw a rectangle
	grounde.drawRect(0, 0, 500, 30);

	grounde.x = 550;
	grounde.y = 500;
	grounde.pivot.x = 500 / 2;
	grounde.pivot.y = 30 / 2;
	grounde.rotation = 0.07;

	game.stage.addChild(grounde);

	game.ticker.add(() => {
		Matter.Engine.update(engine, game.ticker.elapsedMS);
		entities.update();
		// graphics.x = thing.x;
		// graphics.y = thing.y;
		// graphics.rotation = thing.sprite.rotation;
	});
});
