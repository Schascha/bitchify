/*exported Bitchify*/

var defaults = {
	elements: 'h1, h2, h3, h4, h5, h6, p',	// String: Selector
	pattern: /[\t\n.!?]+$/,					// RegExp|String: Replace pattern
	replace: ', Bitch!',					// String: Replace result
	before: false,							// Boolean: Replace before or after
	active: false,							// Boolean: Render on page load
	hash: 'bitch',							// String: Trigger bitchify via hashtag
	keyword: 'bitch'						// String: Trigger bitchify on keypress
};

class Bitchify {

	/**
	 * @param {object} options
	 */
	constructor(options, callback) {
		this.options = Object.assign({}, defaults, options);
		this.active = this.options.active || false;

		if (callback && typeof callback === 'function') {
			this.callback = callback;
		}

		if (this.active || this._isHash()) {
			this.render();
		} else {
			this._addKeypress();
			this._addHashchange();
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

		// Remove event listener
		document.removeEventListener('keypress', this._onKeypress);
		window.removeEventListener('hashchange', this._onHashchange);

		// Callback
		if (this.callback) {
			this.callback();
		}
	}

	/**
	 * Returns replace string
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
	 * @returns {boolean}
	 * @private
	 */
	_isHash() {
		return (this.options.hash && this._stripHash(window.location.hash) === this._stripHash(this.options.hash));
	}

	/**
	 * Removes hashtag
	 * @returns {string}
	 * @private
	 */
	_stripHash(str) {
		return str.replace(/^#/, '');
	}

	/**
	 * Enable keypress event listener
	 * @private
	 */
	_addKeypress() {
		if (this.options.keyword) {
			this.keylog = [];
			this.keyword = this.options.keyword;
			this._onKeypress = this._onKeypress.bind(this);
			document.addEventListener('keypress', this._onKeypress);
		}
	}

	/**
	 * Enabel hashchange event listener
	 * @private
	 */
	_addHashchange() {
		if (this.options.hash) {
			this._onHashchange = this._onHashchange.bind(this);
			window.addEventListener('hashchange', this._onHashchange);
		}
	}

	/**
	 * Returns true if keylog is equal to keyword
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

	/**
	 * Keypress event handler
	 * @param {object} event
	 * @private
	 */
	_onKeypress(event) {
		if (this._validateKey(event.key)) {
			this.render();
		}
	}

	/**
	 * Hashchange event handler
	 * @private
	 */
	_onHashchange() {
		if (this._isHash()) {
			this.render();
		}
	}

}
