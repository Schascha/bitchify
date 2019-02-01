/*exported Bitchify*/

var defaults = {
	elements: 'h1, h2, h3, h4, h5, h6, p',
	pattern: /[\t\n.!?]+$/,
	replace: ', Bitch!',
	before: false,
	active: false,
	hash: 'bitch',
	keyword: 'bitch'
};

class Bitchify {

	/**
	 * @param {object} options
	 * @param {string} options.elements
	 * @param {RegExp|string} options.pattern
	 * @param {string} options.replace
	 * @param {boolean} options.before
	 * @param {boolean} options.active
	 * @param {string} options.hash
	 * @param {string} options.keyword
	 */
	constructor(options) {
		this.options = Object.assign({}, defaults, options);

		if (this.options.active || this._isHash()) {
			this.render();
		} else {
			this._keyPress();
		}
	}

	/**
	 * Replace pattern with string on all elements
	 */
	render() {
		let matches = document.querySelectorAll(this.options.elements);

		for (let value of matches) {
			value.innerHTML = this._replace(value.innerHTML);
		}
	}

	/**
	 * Returns replace string
	 *
	 * @param {string} str
	 * @returns {*}
	 * @private
	 */
	_replace(str) {
		str = str.trim().replace(this.options.pattern, '');

		return (this.options.before) ? this.options.replace + str : str + this.options.replace;
	}

	/**
	 * Return true if options.hash is equal to window.location.hash
	 *
	 * @returns {boolean}
	 * @private
	 */
	_isHash() {
		return (this.options.hash && this._stripHash(window.location.hash) === this._stripHash(this.options.hash));
	}

	/**
	 * Removes hashtag
	 *
	 * @param {string} str
	 * @returns {string}
	 * @private
	 */
	_stripHash(str) {
		return str.replace(/^#/, '');
	}

	/**
	 * Enable keypress event listener
	 *
	 * @private
	 */
	_keyPress() {
		if (this.options.keyword) {
			this.keylog = [];
			this.keyword = this.options.keyword;
			this._onKeyPress = this._onKeyPress.bind(this);
			document.addEventListener('keypress', this._onKeyPress);
		}
	}

	/**
	 * Keypress event handler
	 *
	 * @param {object} event
	 * @private
	 */
	_onKeyPress(event) {
		if (this._validateKey(event.key)) {
			this.render();
			document.removeEventListener('keypress', this._onKeyPress);
		}
	}

	/**
	 * Returns true if keylog is equal to keyword
	 *
	 * @param {string} key
	 * @returns {boolean}
	 * @private
	 */
	_validateKey(key) {
		this.keylog.push(key);

		if (this.keylog.length > this.keyword.length) {
			this.keylog.shift();
		}

		return (this.keylog.join('') === this.keyword);
	}
}
