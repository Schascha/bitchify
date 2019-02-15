import Bitchify from './bitchify';


describe('Bitchify', () => {

	it('should render, bitch!', () => {
		const bitchify = new Bitchify();

		expect(bitchify.active).toBeFalsy();
		bitchify.render();
		expect(bitchify.active).toBeTruthy();
	});

});
