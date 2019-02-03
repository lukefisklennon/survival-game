module.exports = new class Camera {
	constructor() {
		this.container = new PIXI.Container()
		pixi.stage.addChild(container)
	}

	add(child) {
		this.container.addChild(child)
	}

	set x(x) {
		this.container.x = -x + pixi.stage.width / 2

	set y(y) {
		this.container.y = -y + pixi.stage.height / 2
	}
}
