import { writable } from 'svelte/store';

export type Puzzle = {
	name: string;
	description: string;
	clues: Clue[];
	cells: Cell[];
};

export type Clue = {
	number: string;
	value: string;
	direction: 'across' | 'down';
};

export type Cell = {
	id: string;
	value: string;
	disabled: boolean;
	clueNumber: string | undefined;
};

const puzzle: Puzzle = {
	name: 'Dummy puzzle',
	description: 'this is hard coded',
	clues: [],
	cells: []
};

export const puzzles = writable<Puzzle[]>([puzzle]);
