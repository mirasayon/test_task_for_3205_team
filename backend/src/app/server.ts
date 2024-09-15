import Express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { router } from "../routes/api/service.js";
import { StartServer } from "../utils/main.js";
const app = Express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("tiny"));
app.use(Express.json());

app.use("/api", router);

app.all("*", (_req, reply) => {
	return reply.status(404).json("Not found");
});

StartServer(app);
