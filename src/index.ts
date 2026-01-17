import express from "express";
import "dotenv/config";
import router from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(
    cors({
        origin: "*",
    }),
);
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res, next) => {
    res.json({ message: "API WORKING" });
});

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("listening on http://localhost:" + PORT);
});
