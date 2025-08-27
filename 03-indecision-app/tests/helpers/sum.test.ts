import { describe, expect, test } from 'vitest';
import { addArray, sum } from '../../src/helpers/sumtest';

/* TESTING FRAMEWORK (AAA) = Arrange, Act, Assert
 Arrange is the setup of the test
 Act is the action of the test
 Assert is the assertion of the test, the expected result */

// Test takes a description and a function to run the test
describe('sum', () => {
	test('adding 1 + 2 = 3', () => {
		//ARRANGING
		const a = 1;
		const b = 2;

		//ACTING
		const result = sum(a, b);

		//ASSERTING
		// expect is a function that takes a value and you can chain assertions on it
		// toBe is an assertion that checks if the result is equal to 3
		expect(result).toBe(3);
	});
});

describe('addArray', () => {
	test('adding [1, 2, 3] = 6', () => {
		//ARRANGE
		const arr = [1, 2, 3];

		//ACT
		const result = addArray(arr);

		//ASSERT
		expect(result).toBe(6);
	});

	test('should return 0 if the array is empty', () => {
		//ARRANGE
		const arr = [];

		//ACT
		const result = addArray(arr);

		//ASSERT
		expect(result).toBe(0);
	});
});
