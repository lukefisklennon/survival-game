var PIXI = require("./pixi.min.js");
require("./index.scss");

var game = new PIXI.Application();
document.body.appendChild(game.view);

function resize() {
	game.renderer.resize(window.innerWidth, window.innerHeight);
}
window.onresize = resize;
resize();

PIXI.loader.add(require("./sprites/sprite-image-horizontal.png"));
PIXI.loader.load(() => {
	var texture = PIXI.Texture.from(require("./sprites/sprite-image-horizontal.png"));
	var frames = [];
	for (var i = 0; i < 14; i++) {
		frames.push({texture: new PIXI.Texture(texture, new PIXI.Rectangle(420 * i, 0, 420, 500)), time: 100});
	}

	var sprite = new PIXI.extras.AnimatedSprite(frames);

	sprite.anchor.set(0.5);

	sprite.x = game.screen.width / 2;
	sprite.y = game.screen.height / 2;

	// sprite.animationSpeed = 0.1;
	sprite.play();

	game.stage.addChild(sprite);
});
