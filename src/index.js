var PIXI = require("./pixi.min.js");
require("./index.scss");

var game = new PIXI.Application({backgroundColor:0xffffff});
document.body.appendChild(game.view);

function resize() {
	game.renderer.resize(window.innerWidth, window.innerHeight);
}
window.onresize = resize;
resize();
