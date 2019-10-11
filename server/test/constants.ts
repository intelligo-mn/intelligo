import 'dotenv/config';

export const app = `http://localhost:${process.env.PORT}/api`;
export const database = process.env.MONGO_URI;
