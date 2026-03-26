import { Router } from "express";
import { TwitService } from "./twit.service.js";
import { authMiddleware } from "@/auth.middleware.js";
import { TwitDtoSchema } from "./twit.dto.js";

const router = Router();

const twitService = new TwitService();

router.post("/", authMiddleware, async (req, res) => {
  const validation = TwitDtoSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json(JSON.parse(validation.error.message));
  }
  const twit = await twitService.createTwit(req.body);
  res.status(200).json(twit);
});

router.get("/", async (req, res) => {
  const twit = await twitService.getTwits();
  res.status(200).json(twit);
});

export const twitRouter = router;
