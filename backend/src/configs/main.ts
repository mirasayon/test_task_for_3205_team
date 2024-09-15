import dotenv from "@dotenvx/dotenvx";
dotenv.config();
export const port = Number(process.env.PORT) || 5000;
export const NODE_ENV = process.env.NODE_ENV as
	| "development"
	| "test"
	| "production";
