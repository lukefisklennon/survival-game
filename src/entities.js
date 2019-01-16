var Matter = require("matter-js");
var Sprite = require("./sprite");
var config = require("./config");

var entities = [];

module.exports = new class Entities {
	create(...args) {
		var entity = new Entity(...args);
		entities.push(entity);
		return entity;
	}

	update() {
		this.loop(entity => {
			entity.update();
		});
	}

	loop(callback) {
		entities.forEach(callback);
	}
}();

class Entity {
	constructor(resource) {
		this.sprite = new Sprite(resource);
		this.x = 550;
		this.y = 0;
		this.width = 12 * config.scale;
		this.height = 31 * config.scale;
		this.body = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height);
		Matter.World.add(engine.world, this.body);
		this.sprite.anchor.set((this.sprite.width / 2 + 0.5 * config.scale) / this.sprite.width, (this.sprite.height / 2 + 5 * config.scale - 1) / this.sprite.height);
	}

	update() {
		this.x = this.body.position.x;
		this.y = this.body.position.y;
		this.sprite.x = this.x;
		this.sprite.y = this.y;

		this.sprite.rotation = this.body.angle;
	}
}
