var Matter = require("matter-js");

module.exports = function() {
	window.engine = Matter.Engine.create();

	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

	window.game = new PIXI.Application();
	document.body.appendChild(game.view);

	function resize() {
		game.renderer.resize(window.innerWidth, window.innerHeight);
	}
	window.onresize = resize;
	resize();
}
