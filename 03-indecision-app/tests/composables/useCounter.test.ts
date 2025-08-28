import { useCounter } from '@/composables/useCounter';

describe('useCounter', () => {
	test('should initialize counter with default value', () => {
		const { count, squaredCount } = useCounter();

		expect(count.value).toBe(5);
		expect(squaredCount.value).toBe(5 * 5);
	});

	test('should initialize counter with correct value', () => {
		const initialValue = 10;
		const { count, squaredCount } = useCounter(initialValue);

		expect(count.value).toBe(initialValue);
		expect(squaredCount.value).toBe(initialValue * initialValue);
	});

	test('should increment the counter', () => {
		const { count, squaredCount } = useCounter();

		count.value++;

		expect(count.value).toBe(6); // 5 + 1 = 6
		expect(squaredCount.value).toBe(6 * 6); // 6 * 6 = 36
	});

	test('should decrement the counter', () => {
		const { count, squaredCount } = useCounter();

		count.value--;

		expect(count.value).toBe(4); // 5 - 1 = 4
		expect(squaredCount.value).toBe(4 * 4); // 4 * 4 = 16
	});
});
