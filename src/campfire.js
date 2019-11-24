var config = require("./config")
var Sprite = require("./sprite")

module.exports = class Campfire extends Sprite {
	constructor(x, y) {
		super("campfire")
		this.state = "campfire-lit_0"
		this.x = x
		this.y = y
		this.anchor.y = 1
	}
}
