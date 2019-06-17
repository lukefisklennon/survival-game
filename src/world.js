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

		Matter.Events.on(this.engine, "collisionStart", event => {
			event.pairs.forEach(pair => {
				var a = pair.bodyA.entity
				var b = pair.bodyB.entity
				a.emit("collisionStart", b, pair)
				b.emit("collisionStart", a, pair)
			})
		})

		Matter.Events.on(this.engine, "collisionEnd", event => {
			event.pairs.forEach(pair => {
				var a = pair.bodyA.entity
				var b = pair.bodyB.entity
				a.emit("collisionEnd", b, pair)
				b.emit("collisionEnd", a, pair)
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
