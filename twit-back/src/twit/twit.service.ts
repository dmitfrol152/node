import type { Twit } from "@prisma/client";
import type { ITwit } from "./twit.types.ts";
import { prisma } from "../prisma.js";

export class TwitService {
  async createTwit(twit: ITwit): Promise<Twit> {
    return await prisma.twit.create({
      data: twit,
    });
  }

  async getTwits(): Promise<Twit[]> {
    return prisma.twit.findMany();
  }
}
