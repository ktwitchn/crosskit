import type { IPuzzle } from '$lib/types/puzzle.types';
import { writable } from 'svelte/store';

export const puzzles = writable<IPuzzle[]>([]);

export const selected_puzzle = writable<IPuzzle>(undefined);
