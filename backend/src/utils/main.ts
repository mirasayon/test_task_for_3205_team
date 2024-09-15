import type { AddressInfo } from "node:net";
import { port } from "../configs/main.js";
import type { Application } from "express";

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function StartServer(application: Application) {
	try {
		const server = application.listen({ port });
		const { port: _port } = server.address() as AddressInfo;
		console.info(`Server is running at http://localhost:${_port}`);
	} catch (error) {
		console.error("Error while starting server: ", error);
	}
}
