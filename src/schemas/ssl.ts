import { z } from "zod";

export const SSLSchema = z
  .object({
    label: z.string().optional().describe("SSL label"),
    cert: z.string().describe("SSL certificate in PEM format"),
    certs: z.array(z.string()).optional().describe("SSL certificates in PEM format"),
    key: z.string().describe("SSL private key in PEM format"),
    keys: z.array(z.string()).optional().describe("SSL private keys in PEM format"),
    sni: z.string().optional().describe("Server Name Indication"),
    snis: z.array(z.string()).optional().describe("Server Name Indications"),
    client: z
      .object({
        ca: z.string().describe("SSL client CA certificate in PEM format"),
        depth: z.number().optional().default(1).describe("SSL client verification depth"),
        skip_mtls_uri_regex: z.array(z.string()).optional().describe("URIs to skip mTLS verification"),
      })
      .optional()
      .describe("SSL client configuration"),
    type: z.enum(["server", "client"]).optional().default("server").describe("SSL type"),
    status: z.number().optional().describe("SSL certificate status"),
    validity_start: z.number().optional().describe("SSL certificate validity start timestamp"),
    validity_end: z.number().optional().describe("SSL certificate validity end timestamp"),
  })
  .passthrough()
  .describe("SSL certificate configuration object");

export const UpdateSSLSchema = z.object({
  id: z.string().describe("SSL certificate ID"),
  ssl: SSLSchema.partial(),
});

export const CreateSSLSchema = z.object({
  id: z.string().optional().describe("SSL certificate ID"),
  ssl: SSLSchema,
});
