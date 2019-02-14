# Bitchify

Bitchify your panty pants

https://schascha.github.io/bitchify/

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
pattern: /[\t\n.!?]+$/,                 // RegExp|String: Replace pattern
replace: ', Bitch!',                    // String: Replace result
before: false,                          // Boolean: Replace before or after
active: false,                          // Boolean: Render on page load
hash: 'bitch',                          // String: Trigger bitchify via hashtag
keyword: 'bitch'                        // String: Trigger bitchify on keypress
```

## License

[MIT](./LICENSE)
