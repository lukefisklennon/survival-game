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

		var events = ["collisionStart", "collisionActive", "collisionEnd"]
		events.forEach(name => {
			Matter.Events.on(this.engine, name, event => {
				event.pairs.forEach(pair => {
					var a = pair.bodyA.entity
					var b = pair.bodyB.entity
					a.emit(name, b, pair)
					b.emit(name, a, pair)
				})
			})
		})
	}

	update(delta) {
		if (delta > config.deltaLimit) delta = config.deltaLimit
		Matter.Engine.update(world.engine, delta)
		this.entities.update()
		this.camera.update()
	}
}
