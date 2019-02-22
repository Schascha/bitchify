# Bitchify

[![Travis Status](https://travis-ci.org/Schascha/bitchify.svg?branch=master)](https://travis-ci.org/Schascha/bitchify)

Bitchify your panty pants. Just a lightweight dependency-free easter egg for every website, bitch!

https://schascha.github.io/bitchify/

## Installation

Bitchify is available on [NPM](https://www.npmjs.com/package/bitchify):

```bash
npm i bitchify --save
```

## Initialize

```html
<script src="dist/js/bitchify.min.js"></script>
```

```javascript
var bitchify = new Bitchify();
```

## Configuration

```javascript
elements: 'h1, h2, h3, h4, h5, h6, p',  // String: Selector
pattern: /[\t\n.!?]+$/,                 // RegExp|String: Replace pattern, e.g. /[^\w]+$/
replace: ', Bitch!',                    // String: Replacement
before: false,                          // Boolean: Insert before or after
active: false,                          // Boolean: Render on page load
hash: 'bitch',                          // String: Trigger bitchify via hashtag
keyword: 'bitch'                        // String: Trigger bitchify on keypress
```

## License

[MIT](./LICENSE)
