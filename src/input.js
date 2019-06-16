module.exports = new class Input {
	constructor() {
		this.inputs = ["w", "a", "s", "d"]
		this.inputs.forEach(input => {
			this[input] = false
		})

		window.onkeydown = event => {
			this.key(event.key, true)
		}

		window.onkeyup = event => {
			this.key(event.key, false)
		}
	}

	key(name, state) {
		if (this.inputs.includes(name)) {
			this[name] = state
		}
	}
}
