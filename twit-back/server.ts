import "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { twitRouter } from "./src/twit/twit.controller.js";
import path from "path";
import { fileURLToPath } from "url";
import { prisma } from "./src/prisma.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

async function main() {
  app.use(express.json());

  app.use("/api/twits", twitRouter);

  app.get("/profiler", (req, res) => {
    res.render("profiler", {
      user: {
        name: "Dmitry",
        age: 33,
      },
    });
  });

  app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Что-то пошло не так...");
  });

  app.listen(process.env.PORT || 4200, () => {
    console.log("Server is start on port 4200");
  });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
