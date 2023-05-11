const { collectionAlgo } = require('../modules/algoritm');

describe('UAT positive tests', () => {
	it('testing basic example', async () => {
		const { letters, path } = await collectionAlgo('basic.txt');
		expect(letters).toBe('ACB');
		expect(path).toBe('@---A---+|C|+---+|+-B-x');
	});

	it('testing lettersOnTurns example', async () => {
		const { letters, path } = await collectionAlgo('lettersOnTurns.txt');
		expect(letters).toBe('ACB');
		expect(path).toBe('@---A---+|||C---+|+-B-x');
	});

	it('testing noDoubleLetters example', async () => {
		const { letters, path } = await collectionAlgo('noDoubleLetters.txt');
		expect(letters).toBe('GOONIES');
		expect(path).toBe('@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x');
	});

	it('testing straightThroughInter example', async () => {
		const { letters, path } = await collectionAlgo('straightThroughInter.txt');
		expect(letters).toBe('ABCD');
		expect(path).toBe('@|A+---B--+|+--C-+|-||+---D--+|x');
	});

	it('testing ignoreAfterEnd example', async () => {
		const { letters, path } = await collectionAlgo('ignoreAfterEnd.txt');
		expect(letters).toBe('AB');
		expect(path).toBe('@-A--+|+-B--x');
	});

	it('testing keep direction example', async () => {
		const { letters, path } = await collectionAlgo('keepDirection.txt');
		expect(letters).toBe('BLAH');
		expect(path).toBe('@B+++B|+-L-+A+++A-+Hx');
	});
});

describe('UAT FAIL tests', () => {
	it('failing on broken path example', async () => {
		try {
			const { letters, path } = await collectionAlgo('error-broken.txt');
		} catch (error) {
			expect(error.message).toBe('Cant find direction');
		}
	});

	it('failing on fake turn example', async () => {
		try {
			const { letters, path } = await collectionAlgo('error-fakeTurn.txt');
		} catch (error) {
			expect(error.message).toBe('Cant find direction');
		}
	});

	it('failing on fork example', async () => {
		try {
			const { letters, path } = await collectionAlgo('error-fork.txt');
		} catch (error) {
			expect(error.message).toBe('Fork found');
		}
	});

	it('failing on missing end example', async () => {
		try {
			const { letters, path } = await collectionAlgo('error-missingEnd.txt');
		} catch (error) {
			expect(error.message).toBe('Only one ending point allowed');
		}
	});

	it('failing on missing start example', async () => {
		try {
			const { letters, path } = await collectionAlgo('error-missingStart.txt');
		} catch (error) {
			expect(error.message).toBe('Only one starting point allowed');
		}
	});

	it('failing on multiple ending example', async () => {
		try {
			const { letters, path } = await collectionAlgo(
				'error-multipleEnding.txt'
			);
		} catch (error) {
			expect(error.message).toBe('Only one ending point allowed');
		}
	});

	it('failing on multiple start1 example', async () => {
		try {
			const { letters, path } = await collectionAlgo(
				'error-multipleStart1.txt'
			);
		} catch (error) {
			expect(error.message).toBe('Only one starting point allowed');
		}
	});

	it('failing on multiple start2 example', async () => {
		try {
			const { letters, path } = await collectionAlgo(
				'error-multipleStart2.txt'
			);
		} catch (error) {
			expect(error.message).toBe('Only one starting point allowed');
		}
	});

	it('failing on multiple start3 example', async () => {
		try {
			const { letters, path } = await collectionAlgo(
				'error-multipleStart3.txt'
			);
		} catch (error) {
			expect(error.message).toBe('Only one starting point allowed');
		}
	});
});
