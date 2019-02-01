'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Bitchify = function () {

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
	function Bitchify(options) {
		_classCallCheck(this, Bitchify);

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


	_createClass(Bitchify, [{
		key: 'render',
		value: function render() {
			var matches = document.querySelectorAll(this.options.elements);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var value = _step.value;

					value.innerHTML = this._replace(value.innerHTML);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}

		/**
   * Returns replace string
   *
   * @param {string} str
   * @returns {*}
   * @private
   */

	}, {
		key: '_replace',
		value: function _replace(str) {
			str = str.trim().replace(this.options.pattern, '');

			return this.options.before ? this.options.replace + str : str + this.options.replace;
		}

		/**
   * Return true if options.hash is equal to window.location.hash
   *
   * @returns {boolean}
   * @private
   */

	}, {
		key: '_isHash',
		value: function _isHash() {
			return this.options.hash && this._stripHash(window.location.hash) === this._stripHash(this.options.hash);
		}

		/**
   * Removes hashtag
   *
   * @param {string} str
   * @returns {string}
   * @private
   */

	}, {
		key: '_stripHash',
		value: function _stripHash(str) {
			return str.replace(/^#/, '');
		}

		/**
   * Enable keypress event listener
   *
   * @private
   */

	}, {
		key: '_keyPress',
		value: function _keyPress() {
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

	}, {
		key: '_onKeyPress',
		value: function _onKeyPress(event) {
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

	}, {
		key: '_validateKey',
		value: function _validateKey(key) {
			this.keylog.push(key);

			if (this.keylog.length > this.keyword.length) {
				this.keylog.shift();
			}

			return this.keylog.join('') === this.keyword;
		}
	}]);

	return Bitchify;
}();
