export type IPuzzle = {
	id: string;
	name: string;
	description: string | null;
	clues: IClue[];
	cells: ICell[];
};

export type IClue = {
	// serial value in pg
	id: number;
	puzzle_id: string;
	number: number;
	value: string;
	direction: 'across' | 'down';
};

export type ICell = {
	// Serial value in pg
	id: number;
	// col and row location of the cell
	location: string;
	puzzle_id: string;
	value: string;
	disabled: boolean;
	clue_number: number | undefined;
};
