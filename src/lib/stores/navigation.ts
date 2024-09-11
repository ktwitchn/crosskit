import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function _createMenuStore() {
	// TODO local storage takes some time to update so the store is initially undefined
	const storedValue = browser ? localStorage.getItem('menu') : null;
	const initialValue = storedValue !== null ? storedValue === 'true' : true;

	const { subscribe, set, update } = writable(initialValue);

	return {
		subscribe,
		set: (value: boolean) => {
			set(value);
			if (browser) {
				localStorage.setItem('menu', value.toString());
			}
		},
		update
	};
}

export const menu_open = _createMenuStore();
