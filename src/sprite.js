var Util = require("./util")
var animationsData = require("./animations")
var config = require("./config")

module.exports = class Sprite extends PIXI.extras.AnimatedSprite {
	constructor(asset) {
		var animations = {}
		var image = Util.imagePath(asset)
		var data = Util.imageData(asset)
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
						time: frame.duration * (asset == "goblin" ? 1.5 : 1)
					})
				}
			}
		})
		var state = Object.keys(animations)[0]
		super(animations[state])
		this.frameTags = frameTags // TODO remove this
		this.slices = data.meta.slices
		this.frameDuration = data.frames[0].duration
		this.anchor.set(0.5, 0.5)
		this.scale = new PIXI.Point(config.scale, config.scale)
		this._state = state
		this.animations = animations
		world.camera.add(this)
		this.play()
	}

	transition(to, between, factor) {
		if (this.state != to) {
			this.state = between
			setTimeout(() => {
				if (this.state == between) this.state = to
			}, this.frameDuration * factor)
		}
	}

	set state(state) {
		if (this._state != state) {
			this._state = state
			this.textures = this.animations[this._state]
			var loop = false
			if (state in animationsData) loop = animationsData[state].loop
			this.loop = loop
			this.play()
		}
	}

	get state() {
		return this._state
	}
}
