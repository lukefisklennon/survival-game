var Matter = require("matter-js")

module.exports = function() {
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

	window.pixi = new PIXI.Application({
		backgroundColor: 0x25a7da
	})
	document.body.appendChild(pixi.view)

	function resize() {
		pixi.renderer.resize(window.innerWidth, window.innerHeight)
	}
	window.onresize = resize
	resize()
}
