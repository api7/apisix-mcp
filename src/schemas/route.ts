import { z } from "zod";
import { UpstreamSchema } from "./upstream.js";
import { PluginSchema } from "./plugin.js";
import { StatusSchema } from "./common.js";

export const RouteSchema = z
  .object({
    name: z.string().optional().describe("route name"),
    desc: z.string().max(256).optional().describe("route description"),
    labels: z
      .record(z.string(), z.string())
      .optional()
      .describe("route labels"),
    uri: z.string().describe("route path"),
    uris: z.array(z.string()).optional().describe("multiple route paths"),
    host: z.string().optional().describe("route host"),
    hosts: z.array(z.string()).optional().describe("allowed hosts"),
    remote_addr: z.string().optional().describe("allowed remote address"),
    remote_addrs: z
      .array(z.string())
      .optional()
      .describe("allowed remote addresses"),
    methods: z
      .array(
        z.enum([
          "GET",
          "POST",
          "PUT",
          "DELETE",
          "PATCH",
          "HEAD",
          "OPTIONS",
          "TRACE",
          "CONNECT",
          "PURGE",
        ])
      )
      .optional()
      .describe("allowed HTTP methods"),
    priority: z.number().optional().describe("route priority").default(0),
    vars: z
      .array(z.array(z.any()))
      .optional()
      .describe("route match variables"),
    filter_func: z.string().optional().describe("route filter function"),
    script: z
      .record(z.string(), z.any())
      .optional()
      .describe("route script configuration"),
    service_id: z.string().optional().describe("service id"),
    upstream_id: z.string().optional().describe("upstream id"),
    upstream: UpstreamSchema.partial()
      .optional()
      .describe("upstream configuration"),
    enable_websocket: z.boolean().optional().describe("enable websocket"),
    status: StatusSchema.optional().describe("route status"),
    plugins: PluginSchema.optional().describe("plugins"),
    service_protocol: z.string().optional().describe("service protocol"),
  })
  .passthrough()
  .describe("route configuration");

export const UpdateRouteSchema = z.object({
  id: z.string().describe("route id"),
  route: RouteSchema.partial(),
});

export const CreateRouteSchema = z.object({
  id: z.string().optional().describe("route id"),
  route: RouteSchema.refine((data) => data.upstream_id || data.upstream, {
    message: "Provide either upstream_id or upstream configuration",
    path: ["upstream_id", "upstream"],
  }),
});
