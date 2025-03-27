import { z } from "zod";
import { PluginSchema } from "./plugin.js";
import { PaginationSchema } from "./common.js";

export const ConsumerSchema = z
  .object({
    username: z.string().describe("consumer username"),
    desc: z.string().optional().describe("consumer description"),
    labels: z.record(z.string(), z.string()).optional().describe("consumer labels"),
    plugins: PluginSchema.optional().describe("consumer plugins"),
    group_id: z.string().optional().describe("consumer group id"),
  })
  .passthrough()
  .describe("consumer configuration object");

export const CredentialSchema = z
  .object({
    name: z.string().describe("credential name"),
    plugins: PluginSchema.optional().describe("credential plugins"),
    desc: z.string().max(256).optional().describe("credential description"),
    labels: z.record(z.string(), z.string()).optional().describe("credential labels"),
  })
  .passthrough()
  .describe("credential configuration object");

export const GetConsumerSchema = z.object({ username: ConsumerSchema.shape.username.optional() }).merge(PaginationSchema);

export const CreateOrUpdateConsumerSchema = ConsumerSchema;

export const DeleteConsumerSchema = z.object({
  username: ConsumerSchema.shape.username,
});

export const GetCredentialSchema = z.object({
  username: ConsumerSchema.shape.username,
  id: z.string().optional().describe("credential id"),
});

export const DeleteCredentialSchema = z.object({
  username: ConsumerSchema.shape.username,
  id: z.string().describe("credential id"),
});

export const CreateCredentialSchema = z.object({
  username: ConsumerSchema.shape.username,
  id: z.string().describe("credential id"),
  credential: CredentialSchema,
});
