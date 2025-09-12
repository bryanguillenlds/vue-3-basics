import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import type { RouteLocationNormalized } from 'vue-router';

describe('isAuthenticatedGuard', () => {
	const to: RouteLocationNormalized = {
		name: '',
		params: {},
		fullPath: '',
		query: {},
		matched: [],
		meta: {},
		redirectedFrom: undefined,
		hash: '',
		path: '/home'
	};

	const from: RouteLocationNormalized = {
		name: '',
		params: {},
		fullPath: '',
		query: {},
		matched: [],
		meta: {},
		redirectedFrom: undefined,
		hash: '',
		path: ''
	};

	const next = vi.fn();

	// Clear localStorage before each test
	beforeEach(() => {
		localStorage.clear();
	});

	test('should store the attempted path in localStorage', async () => {
		const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

		await isAuthenticatedGuard(to, from, next);

		expect(setItemSpy).toHaveBeenCalledWith('attemptedPath', to.path);
	});

	test('should allow authenticated user to proceed to the route', async () => {
		vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('ABC-123');

		await isAuthenticatedGuard(to, from, next);

		expect(next).toHaveBeenCalled();
	});

	test('should block the route and send user to login page if the user is not authenticated', async () => {
		await isAuthenticatedGuard(to, from, next);
		expect(next).toHaveBeenCalledWith({ name: 'login' });
	});
});
