import { z } from "zod";
import { PluginSchema } from "./plugin.js";

export const ConsumerGroupSchema = z
  .object({
    labels: z
      .record(z.string(), z.string())
      .optional()
      .describe("consumer group labels"),
    plugins: PluginSchema.optional().describe("consumer group plugins"),
    desc: z.string().optional().describe("consumer group description"),
  })
  .passthrough()
  .describe("consumer group configuration object");

export const UpdateConsumerGroupSchema = z.object({
  id: z.string().describe("consumer group ID"),
  consumerGroup: ConsumerGroupSchema.partial(),
});

export const CreateConsumerGroupSchema = z.object({
  id: z.string().optional().describe("consumer group ID"),
  consumerGroup: ConsumerGroupSchema,
});
