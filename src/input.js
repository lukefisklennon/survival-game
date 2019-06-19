module.exports = new class Input {
	constructor() {
		this.inputs = ["w", "a", "s", "d"]
		this.inputs.forEach(input => {
			this[input] = false
		})
		window.onkeydown = event => {
			this.setKey(event.key, true)
		}
		window.onkeyup = event => {
			this.setKey(event.key, false)
		}

		this.leftMouse = false
		this.rightMouse = false
		this.mouse = {x: 0, y: 0}
		window.onmousedown = event => {
			this.setMouseButton(event.button, true)
		}
		window.onmouseup = event => {
			this.setMouseButton(event.button, false)
		}
		window.onmousemove = event => {
			this.mouse.x = event.clientX
			this.mouse.y = event.clientY
		}
	}

	setKey(name, state) {
		if (this.inputs.includes(name)) {
			this[name] = state
		}
	}

	setMouseButton(button, state) {
		if (button == 0) {
			this.leftMouse = state
		} else if (button == 2) {
			this.rightMouse = state
		}
	}
}
