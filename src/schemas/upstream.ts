import { z } from "zod";

export const UpstreamSchema = z.object({
    name: z.string().optional().describe("upstream name"),
    desc: z.string().max(256).optional().describe("upstream description"),
    type: z.enum(["roundrobin", "chash", "ewma", "least_conn"]).optional().default("roundrobin").describe("load balancing algorithm"),
    nodes: z.array(z.object({
        host: z.string().describe("upstream host"),
        port: z.number().describe("upstream port"),
        weight: z.number().min(0).optional().describe("upstream weight"),
        priority: z.number().min(0).optional().describe("upstream priority"),
    })).describe("upstream nodes with weights"),
    hash_on: z.enum(["vars", "header", "cookie", "consumer", "vars_combinations"]).optional().describe("hash on type for chash algorithm"),
    key: z.string().optional().describe("hash key for chash algorithm"),
    timeout: z.object({
        connect: z.number().optional().describe("connection timeout in seconds"),
        send: z.number().optional().describe("send timeout in seconds"),
        read: z.number().optional().describe("read timeout in seconds")
    }).optional().describe("timeout configuration"),
    retries: z.number().min(0).optional().describe("retry count"),
    retry_timeout: z.number().min(0).optional().describe("retry timeout"),
    pass_host: z.enum(["pass", "node", "rewrite"]).optional().default("pass").describe("host passing mode"),
    upstream_host: z.string().optional().describe("upstream host for rewrite mode"),
    scheme: z.enum(["http", "https", "grpc", "grpcs", "tcp", "tls", "udp", "kafka"]).optional().default("http").describe("upstream scheme"),
    labels: z.record(z.string(), z.string()).optional().describe("upstream labels"),
    checks: z.object({
        active: z.object({
            healthy: z.object({
                interval: z.number().optional().describe("check interval for healthy status"),
                successes: z.number().optional().describe("success count threshold")
            }).optional(),
            unhealthy: z.object({
                interval: z.number().optional().describe("check interval for unhealthy status"),
                http_failures: z.number().optional().describe("HTTP failure count threshold")
            }).optional(),
            http_path: z.string().optional().describe("HTTP path for health check"),
            host: z.string().optional().describe("host for health check"),
            port: z.number().optional().describe("port for health check"),
            https_verify_certificate: z.boolean().optional().describe("verify HTTPS certificate"),
            timeout: z.number().optional().describe("timeout for health check")
        }).optional().describe("active health check configuration"),
        passive: z.object({
            healthy: z.object({
                http_statuses: z.array(z.number()).optional().describe("HTTP status codes for healthy state"),
                successes: z.number().optional().describe("success count threshold")
            }).optional(),
            unhealthy: z.object({
                http_statuses: z.array(z.number()).optional().describe("HTTP status codes for unhealthy state"),
                http_failures: z.number().optional().describe("HTTP failure count threshold"),
                timeout: z.number().optional().describe("timeout threshold")
            }).optional()
        }).optional().describe("passive health check configuration")
    }).optional().describe("health check configuration"),
    tls: z.object({
        client_cert: z.string().optional().describe("TLS certificate"),
        client_key: z.string().optional().describe("TLS key"),
        verify: z.boolean().optional().describe("TLS verification"),
        client_cert_id: z.array(z.string()).optional().describe("TLS certificate id"),
    }).optional().describe("TLS configuration"),
    keepalive_pool: z.object({
        idle_timeout: z.number().optional().describe("idle timeout").default(60),
        requests: z.number().optional().describe("requests").default(1000),
        size: z.number().optional().describe("size").default(320),
    }).optional().describe("keepalive pool configuration")
}).passthrough().describe("upstream service configuration object");

export const UpdateUpstreamSchema = z.object({ id: z.string().describe("upstream id"), upstream: UpstreamSchema.partial() });

export const CreateUpstreamSchema = z.object({ id: z.string().optional().describe("upstream id"), upstream: UpstreamSchema });