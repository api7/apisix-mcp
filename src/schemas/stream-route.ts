import { z } from 'zod';
import { UpstreamSchema } from './upstream.js';
import { PluginSchema } from './plugin.js';

const ipv4Pattern =
  /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\/([12]?[0-9]|3[0-2])$/;
const ipv6Pattern =
  /^([a-fA-F0-9]{0,4}:){1,8}(:[a-fA-F0-9]{0,4}){0,8}([a-fA-F0-9]{0,4})?\/[0-9]{1,3}$/;

const IPAddressSchema = z.union([
  z.string().ip({ version: 'v4' }).describe('IPv4'),
  z.string().regex(ipv4Pattern).describe('IPv4/CIDR'),
  z.string().ip({ version: 'v6' }).describe('IPv6'),
  z.string().regex(ipv6Pattern).describe('IPv6/CIDR'),
]);

const ProtocolLoggerSchema = z.object({
  name: z.string(),
  conf: z
    .record(z.string(), z.any())
    .describe('logger plugin configuration')
    .optional(),
  filter: z.array(z.string()).describe('logger filter rules').optional(),
});

const ProtocolSchema = z.object({
  name: z.string(),
  conf: z
    .record(z.string(), z.any())
    .describe('protocol-specific configuration')
    .optional(),
  superior_id: z.string().optional(),
  logger: z.array(ProtocolLoggerSchema).optional(),
});

export const StreamRouteSchema = z
  .object({
    desc: z.string().max(256).optional().describe('stream route description'),
    upstream: UpstreamSchema.partial().optional(),
    upstream_id: z.string().optional().describe('upstream id'),
    service_id: z.string().optional().describe('service id'),
    server_addr: IPAddressSchema.describe('server IP'),
    server_port: z.number().describe('server port'),
    remote_addr: IPAddressSchema.optional().describe('client IP'),
    sni: z.string().optional().describe('SNI'),
    protocol: ProtocolSchema.optional(),
    plugins: PluginSchema.optional().describe('plugins'),
  })
  .passthrough()
  .describe('stream route configuration');

export const CreateOrUpdateStreamRouteSchema = z.object({
  id: z.string().optional().describe('stream route id'),
  route: StreamRouteSchema,
});
