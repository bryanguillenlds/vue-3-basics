import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

const isAuthenticatedGuard = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	// Store the last path the user is trying to access
	localStorage.setItem('attemptedPath', to.path);

	if (localStorage.getItem('userId')) {
		next();
	} else {
		next({ name: 'login' });
	}
};

export default isAuthenticatedGuard;
