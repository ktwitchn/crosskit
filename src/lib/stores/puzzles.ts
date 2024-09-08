import type { IPuzzle } from '$lib/types/puzzle.types';
import { writable } from 'svelte/store';

export const unsaved_puzzle = writable<IPuzzle | null>(null);
