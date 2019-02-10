var config = require("./config")

module.exports = class Sprite extends PIXI.extras.AnimatedSprite {
	constructor(resource) {
		var animations = {}
		var base = "./images/" + resource
		var image = require(base + ".png")
		var data = require(base + ".json")
		var texture = PIXI.Texture.from(image)
		data.meta.frameTags.forEach(tag => {
			animations[tag.name] = []
			var frames = []
			if (tag.to < data.frames.length) {
				for (var i = tag.from; i <= tag.to; i++) {
					var frame = data.frames[i]
					var rect = frame.frame
					animations[tag.name].push({
						texture: new PIXI.Texture(texture, new PIXI.Rectangle(rect.x, rect.y, rect.w, rect.h)),
						time: frame.duration
					})
				}
			}
		})
		var state = Object.keys(animations)[0]
		super(animations[state])
		this.scale = new PIXI.Point(config.scale, config.scale)
		this._state = state
		this.animations = animations
		pixi.stage.addChild(this)
		this.play()
	}

	set state(state) {
		this._state = state
		this.textures = this.animations[this._state]
		this.play()
	}

	get state() {
		return this._state
	}
}
