"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaults = {
  elements: 'h1, h2, h3, h4, h5, h6, p',
  // String: Selector
  pattern: /[\t\n.!?]+$/,
  // RegExp|String: Replace pattern, e.g. /[^\w]+$/
  replace: ', Bitch!',
  // String: Replacement
  before: false,
  // Boolean: Insert before or after
  active: false,
  // Boolean: Render on page load
  hash: 'bitch',
  // String: Trigger bitchify via hashtag
  keyword: 'bitch' // String: Trigger bitchify on keypress

};

var Bitchify = /*#__PURE__*/function () {
  function Bitchify(options, callback) {
    _classCallCheck(this, Bitchify);

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


  _createClass(Bitchify, [{
    key: "render",
    value: function render() {
      if (this.active) {
        return;
      }

      this.active = true;
      var matches = document.querySelectorAll(this.options.elements);

      var _iterator = _createForOfIteratorHelper(matches),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var value = _step.value;
          value.innerHTML = this._replace(value.innerHTML);
        } // Remove event listener

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      document.removeEventListener('keypress', this._onKeypress);
      window.removeEventListener('hashchange', this._onHashchange); // Callback

      if (this.callback) {
        this.callback();
      }

      return this;
    }
    /**
     * Returns replace string
     * @param {string} str
     * @returns {*}
     * @private
     */

  }, {
    key: "_replace",
    value: function _replace(str) {
      str = str.trim().replace(this.options.pattern, '');
      return this.options.before ? this.options.replace + str : str + this.options.replace;
    }
    /**
     * Return true if options.hash is equal to window.location.hash
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isHash",
    value: function _isHash() {
      return this.options.hash && this._stripHash(window.location.hash) === this._stripHash(this.options.hash);
    }
    /**
     * Removes hashtag
     * @returns {string}
     * @private
     */

  }, {
    key: "_stripHash",
    value: function _stripHash(str) {
      return str.replace(/^#/, '');
    }
    /**
     * Enable keypress event listener
     * @private
     */

  }, {
    key: "_addKeypress",
    value: function _addKeypress() {
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

  }, {
    key: "_addHashchange",
    value: function _addHashchange() {
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

  }, {
    key: "_validateKey",
    value: function _validateKey(key) {
      this.keylog.push(key);

      if (this.keylog.length > this.keyword.length) {
        this.keylog.shift();
      }

      return this.keylog.join('') === this.keyword;
    }
    /**
     * Keypress event handler
     * @param {object} event
     * @private
     */

  }, {
    key: "_onKeypress",
    value: function _onKeypress(event) {
      if (this._validateKey(event.key)) {
        this.render();
      }
    }
    /**
     * Hashchange event handler
     * @private
     */

  }, {
    key: "_onHashchange",
    value: function _onHashchange() {
      if (this._isHash()) {
        this.render();
      }
    }
  }]);

  return Bitchify;
}();
