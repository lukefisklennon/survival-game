var Entities = require("./entities")
var Environment = require("./environment")

module.exports = class World {
	constructor() {
		this.entities = new Entities()
		this.environment = new Environment()
	}
}
