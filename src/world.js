var Matter = require("matter-js")
var Entities = require("./entities")
var Environment = require("./environment")
var Camera = require("./camera")
var config = require("./config")

module.exports = class World {
	constructor() {
		this.engine = Matter.Engine.create()
		this.camera = new Camera()
		this.entities = new Entities()
		this.environment = new Environment()
	}

	update(delta) {
		if (delta > config.deltaLimit) delta = config.deltaLimit
		Matter.Engine.update(world.engine, delta)
		this.entities.update()
		this.camera.update()
	}
}
