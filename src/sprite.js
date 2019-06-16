var config = require("./config")

module.exports = class Sprite extends PIXI.extras.AnimatedSprite {
	constructor(asset) {
		var animations = {}
		var base = "./images/" + asset
		var image = require(base + ".png")
		var data = require(base + ".json")
		var texture = PIXI.Texture.from(image)
		var frameTags = data.meta.frameTags
		if (frameTags.length == 0) {
			frameTags.push({
				"name": "static",
				"from": 0,
				"to": 0
			})
		}
		frameTags.forEach(tag => {
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
		this.anchor.set(0.5, 0.5)
		this.scale = new PIXI.Point(config.scale, config.scale)
		this._state = state
		this.animations = animations
		pixi.stage.addChild(this)
		this.play()
	}

	set state(state) {
		if (this._state != state) {
			this._state = state
			this.textures = this.animations[this._state]
			this.play()
		}
	}

	get state() {
		return this._state
	}
}
