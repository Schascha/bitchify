import Bitchify from './bitchify';


describe('Bitchify', () => {

	it('should render, bitch!', () => {
		const bitchify = new Bitchify();

		expect(bitchify.active).toBeFalsy();
		bitchify.render();
		expect(bitchify.active).toBeTruthy();
	});

	it('should override options, bitch!', () => {
		const
			options = {
				elements: 'h1',
				pattern: 'foo',
				replace: 'bar'
			},
			bitchify = new Bitchify(options).render()
		;

		expect(bitchify.options.elements).toBe(options.elements);
		expect(bitchify.options.pattern).toBe(options.pattern);
		expect(bitchify.options.replace).toBe(options.replace);
	});

	it('should return itself on render, bitch!', () => {
		const bitchify = new Bitchify();

		expect(bitchify.render()).toBe(bitchify);
	});

	it('should render only once, bitch!', () => {
		const bitchify = new Bitchify({
			active: true
		});

		expect(bitchify.active).toBeTruthy();

		// TODO: return itself?
		expect(bitchify.render()).toBeFalsy();
	});

});
