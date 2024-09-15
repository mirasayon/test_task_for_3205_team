import Express, { type Request, type Response } from "express";
import { emailRegex } from "../../constants/main.js";
import { users } from "../../data/users.js";
import { sleep } from "../../utils/main.js";
import { NODE_ENV } from "../../configs/main.js";
export const router = Express.Router();
router.post("/search", async (req: Request, reply: Response) => {
	const { email, number } = req.body;
	if (!email || typeof email !== "string" || !emailRegex.test(email)) {
		return reply
			.status(400)
			.json({ message: "Отсутсвует или некорректная почта" });
	}
	if (number) {
		if (Number.isNaN(Number(number))) {
			return reply.status(400).json({ message: "Некорректный номер" });
		}
	}
	NODE_ENV === "production" && (await sleep(5000));
	const filteredUsers = users.filter(
		(user) => user.email.includes(email) && (!number || user.number === number),
	);
	if (filteredUsers.length === 0) {
		return reply
			.status(404)
			.json({ message: "Ничего не найдено по вашему запросу" });
	}
	return reply.status(200).json({ data: filteredUsers });
});
