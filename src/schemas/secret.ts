import { z } from "zod";
import { PaginationSchema } from "./common.js";

const VaultSecretSchema = z.object({
  uri: z.string().describe("address of the Vault server"),
  prefix: z.string().describe("path prefix of the secret engine"),
  token: z.string().describe("token for Vault authentication"),
  namespace: z.string().optional().describe("Vault namespace"),
});

const AwsSecretSchema = z.object({
  region: z.string().describe("AWS region"),
  access_key_id: z.string().describe("AWS access key"),
  secret_access_key: z.string().describe("AWS secret key"),
  session_token: z.string().optional().describe("AWS session token"),
  endpoint_url: z.string().optional().describe("AWS secret manager endpoint url"),
});

const GcpAuthConfigSchema = z.object({
  client_email: z.string().describe("Email address of the Google Cloud service account"),
  private_key: z.string().describe("Private key of the Google Cloud service account"),
  project_id: z.string().describe("Project ID in the Google Cloud service account"),
  token_uri: z.string().optional().default("https://oauth2.googleapis.com/token").describe("Token URI of the Google Cloud service account"),
  entries_uri: z
    .string()
    .optional()
    .default("https://secretmanager.googleapis.com/v1")
    .describe("The API access endpoint for the Google Secrets Manager"),
  scope: z
    .array(z.string())
    .optional()
    .default(["https://www.googleapis.com/auth/cloud-platform"])
    .describe("Access scopes of the Google Cloud service account"),
});

const GcpSecretBaseSchema = z.object({
  project_id: z.string().describe("GCP project ID"),
  auth_config: GcpAuthConfigSchema.optional(),
  auth_file: z.string().optional().describe("Path to the Google Cloud service account authentication JSON file"),
  ssl_verify: z.boolean().optional().default(true).describe("Enable SSL verification"),
});

export const SecretSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("vault"), ...VaultSecretSchema.shape }),
  z.object({ type: z.literal("aws"), ...AwsSecretSchema.shape }),
  z.object({ type: z.literal("gcp"), ...GcpSecretBaseSchema.shape }),
]);

export const SecretTypeSchema = z.enum(["vault", "aws", "gcp"]);

export const GetSecretSchema = z
  .object({
    id: z.string().optional().describe("secret id"),
    manager: SecretTypeSchema.describe("secret manager type"),
  })
  .merge(PaginationSchema);

export const UpdateSecretSchema = z.object({
  id: z.string().describe("secret id"),
  manager: SecretTypeSchema.describe("secret manager type"),
  secret: SecretSchema,
});

export const CreateSecretSchema = z.object({
  id: z.string().optional().describe("secret id"),
  manager: SecretTypeSchema.describe("secret manager type"),
  secret: SecretSchema,
});

export const DeleteSecretSchema = z.object({
  id: z.string().describe("secret id"),
  manager: SecretTypeSchema.describe("secret manager type"),
});
