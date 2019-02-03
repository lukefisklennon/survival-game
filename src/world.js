var Entities = require("./entities");

module.exports = new class World {
	constructor() {
		this.entities = new Entities()
	}
}()
