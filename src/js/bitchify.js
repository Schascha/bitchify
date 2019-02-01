/*exported Bitchify*/

var defaults = {
	elements: 'h1, h2, h3, h4, h5, h6, p',
	pattern: /[\t\n.!?]+$/,
	replace: ', Bitch!',
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
	 * @param {function} options.onBitchify
	 */
	constructor(options, callback) {
		this.options = Object.assign({}, defaults, options);
		this.active = this.options.active;

		if (callback && typeof callback === 'function') {
			this.callback = callback;
		}

		if (this.active || this._isHash()) {
			this.render();
		} else {
			this._addKeyPress();
		}
	}

	/**
	 * Replace pattern with string on all elements
	 */
	render() {
		if (this.active) {
			return;
		}

		this.active = true;

		const matches = document.querySelectorAll(this.options.elements);

		for (let value of matches) {
			value.innerHTML = this._replace(value.innerHTML);
		}

		// Callback
		if (this.callback) {
			this.callback();
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
	_addKeyPress() {
		if (this.options.keyword) {
			this.keylog = [];
			this.keyword = this.options.keyword;
			this._onBitchify = this._onBitchify.bind(this);
			document.addEventListener('keypress', this._onBitchify);
		}
	}

	/**
	 * Keypress event handler
	 *
	 * @param {object} event
	 * @private
	 */
	_onBitchify(event) {
		if (this._validateKey(event.key)) {
			this.render();
		}

		// Remove keypress event
		if (this.active) {
			document.removeEventListener('keypress', this._onBitchify);
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
