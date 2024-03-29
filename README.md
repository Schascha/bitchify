# Bitchify

[![Build](https://github.com/Schascha/bitchify/workflows/Build/badge.svg)](https://github.com/Schascha/bitchify/actions)
[![npm](https://img.shields.io/npm/v/bitchify)](https://www.npmjs.com/package/bitchify)
[![install size](https://packagephobia.com/badge?p=bitchify)](https://packagephobia.com/result?p=bitchify)

> Bitchify your panty pants. Just a lightweight dependency-free easter egg for every website, bitch!

https://schascha.github.io/bitchify/

## Installation

Bitchify is available on [npm](https://www.npmjs.com/package/bitchify):

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

## Examples

### Insert at the beginning

```javascript
new Bitchify({
	pattern: /[^\w]+$/,
	replace: 'Bitch! ',
	before: true
}
```

## Development

### Project setup

```
npm install
```

### Compiles for development

```
npm start
```

### Compiles and minifies for production

```
npm run build
```

### Test, lints and fixes files

```
npm test
```

## Bitchify the world as Browser Bookmark

Create bowser bookmark and copy following code as URL:

```html
javascript:if(typeof bitchify==='undefined'){var bitchify,s=document.createElement('script');s.src='https://schascha.github.io/bitchify/dist/js/bitchify.js';s.onload=function() {bitchify=new Bitchify().render();};document.body.appendChild(s);}else{bitchify.render();}
```

## Bugs? 🐛

Please let me know: https://github.com/Schascha/bitchify/issues

## Buy me a Coffee ☕

Support this project and [others](https://github.com/Schascha?tab=repositories) via [PayPal](https://www.paypal.me/LosZahlos). Thanks

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/Schascha/bitchify/releases).

## License

[MIT](./LICENSE)

Copyright (c) 2019 Sascha Künstler
