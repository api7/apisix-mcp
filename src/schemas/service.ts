import { z } from "zod";
import { UpstreamSchema } from "./upstream.js";
import { PluginSchema } from "./plugin.js";

export const ServiceSchema = z
  .object({
    name: z.string().min(1).max(100).optional().describe("service name"),
    desc: z.string().max(256).optional().describe("service description"),
    labels: z.record(z.string(), z.string()).optional().describe("service labels"),
    upstream_id: z.string().optional().describe("upstream id"),
    upstream: UpstreamSchema.partial().optional(),
    enable_websocket: z.boolean().optional().describe("enable websocket"),
    plugins: PluginSchema.optional().describe("plugins"),
    script: z.record(z.string(), z.any()).optional().describe("service script configuration"),
    hosts: z.array(z.string()).optional().describe("allowed hosts"),
    vars: z.array(z.array(z.any())).optional().describe("service match variables"),
  })
  .passthrough()
  .describe("service configuration object");

export const UpdateServiceSchema = z.object({
  id: z.string().describe("service id"),
  service: ServiceSchema.partial(),
});

export const CreateServiceSchema = z.object({
  id: z.string().optional().describe("service id"),
  service: ServiceSchema.refine((data) => !data.upstream_id && !data.upstream, {
    message: "Provide either upstream_id or upstream",
    path: ["upstream_id", "upstream"],
  }),
});
