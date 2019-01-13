window.PIXI = require("./pixi.min.js");

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

window.game = new PIXI.Application();
document.body.appendChild(game.view);

function resize() {
	game.renderer.resize(window.innerWidth, window.innerHeight);
}
window.onresize = resize;
resize();

var load = require("./loader");
var Sprite = require("./sprite");

require("./index.scss");

load(() => {
	var sprite = new Sprite("thaumaturge");

	sprite.scale = new PIXI.Point(7, 7);

	game.ticker.add((delta) => {
		if (sprite.state == "run") sprite.x += 5 * delta;
	});

	setInterval(() => {
		sprite.state = "run-start";
		setTimeout(() => {
			sprite.state = "run";
			setTimeout(() => {
				sprite.state = "static";
			}, 1000);
		}, 83);
	}, 2000);
});

// PIXI.loader.add(require("./sprites/sprite-image-horizontal.png"));
// PIXI.loader.load(() => {
// 	var texture = PIXI.Texture.from(require("./sprites/sprite-image-horizontal.png"));
// 	var frames = [];
// 	for (var i = 0; i < 14; i++) {
// 		frames.push({texture: new PIXI.Texture(texture, new PIXI.Rectangle(420 * i, 0, 420, 500)), time: 100});
// 	}
//
// 	var sprite = new PIXI.extras.AnimatedSprite(frames);
//
// 	sprite.anchor.set(0.5);
//
// 	sprite.x = game.screen.width / 2;
// 	sprite.y = game.screen.height / 2;
//
// 	// sprite.animationSpeed = 0.1;
// 	sprite.play();
//
// 	game.stage.addChild(sprite);
// });
