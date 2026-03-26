import z from "zod";

export const TwitDtoSchema = z.object({
  text: z.string().min(1, "Text is requred").max(280),
});
