import Bitchify from './bitchify';

function __fixture() {
	return `
		<h1>Lorem ipsum dolor</h1>
		<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
	`;
}

describe('Bitchify', () => {
	afterEach(() => {
		document.body.innerHTML = '';
		window.location.hash = '';
	});

	it('should render, bitch!', () => {
		document.body.innerHTML = __fixture();

		const bitchify = new Bitchify(),
			re = new RegExp(bitchify.options.replace, 'g');
		expect(bitchify.active).toBeFalsy();
		bitchify.render();
		expect(bitchify.active).toBeTruthy();
		expect((document.body.innerHTML.match(re) || []).length).toBe(2);
	});

	it('should override options, bitch!', () => {
		const options = {
			elements: 'h1',
			pattern: 'foo',
			replace: 'bar',
			hash: null,
			keyword: '',
		};
		const bitchify = new Bitchify(options).render();
		expect(bitchify?.options.elements).toBe(options.elements);
		expect(bitchify?.options.pattern).toBe(options.pattern);
		expect(bitchify?.options.replace).toBe(options.replace);
		expect(bitchify?.options.hash).toBe(options.hash);
		expect(bitchify?.options.keyword).toBe(options.keyword);
	});

	it('should return itself on render, bitch!', () => {
		const bitchify = new Bitchify();
		expect(bitchify.render()).toBe(bitchify);
	});

	it('should render only once, bitch!', () => {
		const bitchify = new Bitchify();
		expect(bitchify.render()?.active).toBeTruthy();
		expect(bitchify.render()).toBeUndefined();
	});

	it('should render on initialize, bitch!', () => {
		const bitchify = new Bitchify({
			active: true,
		});

		expect(bitchify.active).toBeTruthy();
	});

	it('should render on hash change, bitch!', () => {
		const bitchify = new Bitchify(),
			event = document.createEvent('HashChangeEvent');
		expect(bitchify.options.hash).toBe('bitch');
		event.initEvent('hashchange');

		window.location.hash = 'foo';
		window.dispatchEvent(event);
		expect(bitchify.active).toBeFalsy();

		window.location.hash = 'bitch';
		window.dispatchEvent(event);
		expect(bitchify.active).toBeTruthy();
	});

	it('should render on keypress, bitch!', () => {
		const bitchify = new Bitchify();
		// Should use defaults
		expect(bitchify.options.keyword).toBe('bitch');
		expect(bitchify.keylog.length).toBe(0);

		// Should add key to keylog
		document.dispatchEvent(new KeyboardEvent('keypress', { key: 'b' }));
		expect(bitchify.keylog.length).toBe(1);

		// Should shift keylog array
		bitchify.keylog = ['a', 'b', 'c', 'd', 'e'];
		document.dispatchEvent(new KeyboardEvent('keypress', { key: 'f' }));
		expect(bitchify.keylog.length).toBe(5);

		// Should render
		bitchify.keylog = ['b', 'i', 't', 'c'];
		document.dispatchEvent(new KeyboardEvent('keypress', { key: 'h' }));
		expect(bitchify.active).toBeTruthy();
	});

	it('should trigger callback, bitch!', () => {
		var x = 0;

		new Bitchify({}, function () {
			x++;
		}).render();

		expect(x).toBe(1);
	});

	it('should insert before, bitch!', () => {
		document.body.innerHTML = __fixture();

		const bitchify = new Bitchify({
				before: true,
				pattern: /[^\w]+$/,
				replace: 'Bitch! ',
			}),
			re = new RegExp(bitchify.options.replace, 'g');
		bitchify.render();
		expect(bitchify.active).toBeTruthy();
		expect((document.body.innerHTML.match(re) || []).length).toBe(2);
	});
});
