import pool from './client';

export const query = {
	async execute(text: string, params?: any[]) {
		const client = await pool.connect();
		try {
			const result = await client.query(text, params);
			return result;
		} finally {
			client.release();
		}
	},
	getClient: () => pool.connect()
};
