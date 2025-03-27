import { z } from "zod";

export const PluginSchema = z.record(z.string(), z.any()).describe("plugins configuration");

export const GetPluginSchemaSchema = z.object({
  name: z.string().describe("plugins name"),
  type: z.enum(["http", "stream"]).optional().describe("plugins type"),
});

export const GetPluginMetadataSchema = z.object({
  name: z.string().describe("plugins name"),
});

export const CreateOrUpdatePluginMetadataSchema = z.object({
  name: z.string().describe("plugins name"),
  metadata: PluginSchema,
});

export const DeletePluginMetadataSchema = z.object({
  name: z.string().describe("plugins name"),
});

export const UpdateGlobalRuleSchema = z.object({
  id: z.string().describe("global rule ID"),
  plugins: PluginSchema,
});

export const CreateGlobalRuleSchema = z.object({
  id: z.string().describe("global rule ID"),
  plugins: PluginSchema,
});

export const PluginConfigSchema = z.object({
  desc: z.string().describe("plugin config description"),
  labels: z.record(z.string(), z.string()).describe("plugin config labels"),
  plugins: PluginSchema,
});

export const CreatePluginConfigSchema = z.object({
  id: z.string().describe("plugin config ID"),
  plugins: PluginSchema,
});

export const UpdatePluginConfigSchema = z.object({
  id: z.string().describe("plugin config ID"),
  plugins: PluginSchema,
});
