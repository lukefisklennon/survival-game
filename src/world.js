var Matter = require("matter-js")
var Entities = require("./entities")
var Environment = require("./environment")
var config = require("./config")

module.exports = class World {
	constructor() {
		this.engine = Matter.Engine.create()
		this.entities = new Entities()
		this.environment = new Environment()
	}

	update(delta) {
		if (delta > config.deltaLimit) delta = config.deltaLimit
		Matter.Engine.update(world.engine, delta)
		this.entities.update()
	}
}
