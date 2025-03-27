import { z } from "zod";

// Supports only passing a 1 parameter to request the Get or Delete API resources.
// Not included resources: secrets(manager, id), credentials(username, id)
export const COMMON_RESOURCE_TYPES = [
  "routes",
  "services",
  "upstreams",
  "consumers",
  "ssls",
  "consumer_groups",
  "plugin_configs",
  "global_rules",
  "stream_routes",
  "protos",
  "plugin_configs",
] as const;
export const ResourceTypeSchema = z.enum(COMMON_RESOURCE_TYPES);

export const PaginationSchema = z.object({
  page: z.number().optional().describe("page number").default(1),
  page_size: z.number().min(10).max(500).optional().describe("page size").default(50),
});

export const FilterSchema = z.object({
  name: z.string().optional().describe("filter name"),
  labels: z.record(z.string(), z.string()).optional().describe("filter labels"),
  uri: z.string().optional().describe("filter uri"),
});

export const GetResourceSchema = z
  .object({
    id: z.string().optional().describe("resource id"),
    type: ResourceTypeSchema.describe("resource type"),
  })
  .merge(PaginationSchema)
  .merge(FilterSchema);

export const DeleteResourceSchema = z.object({
  id: z.string().describe("resource id"),
  type: ResourceTypeSchema.describe("resource type"),
});

const STATUSES = {
  disable: 0,
  enable: 1,
} as const;

export const StatusSchema = z.nativeEnum(STATUSES);
