interface IBitchifyOptions {
	elements: string;
	pattern: RegExp | string;
	replace: string;
	before: boolean;
	active: boolean;
	hash: string | null;
	keyword: string;
}

const defaults: IBitchifyOptions = {
	elements: 'h1, h2, h3, h4, h5, h6, p', // String: Selector
	pattern: /[\t\n.!?]+$/, // RegExp|String: Replace pattern, e.g. /[^\w]+$/
	replace: ', Bitch!', // String: Replacement
	before: false, // Boolean: Insert before or after
	active: false, // Boolean: Render on page load
	hash: 'bitch', // String: Trigger bitchify via hashtag
	keyword: 'bitch', // String: Trigger bitchify on keypress
};

class Bitchify {
	active: boolean;
	options: IBitchifyOptions;
	keylog!: string[];
	keyword!: string;
	callback!: () => void;

	constructor(options?: Partial<IBitchifyOptions>, callback?: () => void) {
		this.options = { ...defaults, ...options };
		this.active = this._isHash() || this.options.active;

		if (callback && typeof callback === 'function') {
			this.callback = callback;
		}

		if (this.active) {
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

		for (const value of matches) {
			value.innerHTML = this._replace(value.innerHTML);
		}

		// Remove event listeners
		document.removeEventListener('keypress', this._onKeypress);
		window.removeEventListener('hashchange', this._onHashchange);

		// Callback
		if (this.callback) {
			this.callback();
		}

		return this;
	}

	/**
	 * Returns replace string
	 * @param {string} str - String to replace
	 * @returns {string} - Replaced string
	 * @private
	 */
	_replace(str: string): string {
		const { before, pattern, replace } = this.options;
		str = str.trim().replace(pattern, '');
		return before ? replace + str : str + replace;
	}

	/**
	 * Return true if options.hash is equal to window.location.hash
	 * @returns {boolean} - True if hash is equal
	 * @private
	 */
	_isHash(): boolean {
		const { hash } = this.options;
		return (
			!!hash && this._stripHash(window.location.hash) === this._stripHash(hash)
		);
	}

	/**
	 * Removes hashtag
	 * @param {string} str - String with hashtag
	 * @returns {string} - String without hashtag
	 * @private
	 */
	_stripHash(str: string): string {
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
	 * Enable hashchange event listener
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
	 * @param {string} key - Key pressed
	 * @returns {boolean} - True if keylog is equal to keyword
	 * @private
	 */
	_validateKey(key: string): boolean {
		this.keylog.push(key);

		if (this.keylog.length > this.keyword.length) {
			this.keylog.shift();
		}

		return this.keylog.join('') === this.keyword;
	}

	/**
	 * Keypress event handler
	 * @param {object} event - Keypress event
	 * @private
	 */
	_onKeypress(event: { key: string }) {
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

export default Bitchify;
