export type IPuzzle = {
	id: string;
	name: string;
	description?: string;
	clues: IClue[];
	cells: ICell[];
};

export type IClue = {
	number: string;
	value: string;
	direction: 'across' | 'down';
};

export type ICell = {
	id: string;
	value: string;
	disabled: boolean;
	clueNumber: string | undefined;
};
