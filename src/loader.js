var data = require("./assets.json")

for (var type in data) {
	data[type].forEach(asset => {
		PIXI.loader.add(require("./" + type + "/" + asset))
	})
}

module.exports = callback => PIXI.loader.load(callback)
