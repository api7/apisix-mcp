import { z } from "zod";

export const ProtoSchema = z.object({
  content: z.string().describe("proto content"),
});

export const CreateOrUpdateProtoSchema = z.object({
  id: z.string().optional().describe("proto id"),
  proto: ProtoSchema,
});
