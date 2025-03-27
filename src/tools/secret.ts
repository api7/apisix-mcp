import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GetSecretSchema, UpdateSecretSchema, CreateSecretSchema, DeleteSecretSchema } from "../schemas/secret.js";
import { makeAdminAPIRequest } from "../adminAPI.js";

const setupSecretTools = (server: McpServer) => {
  server.tool("get_secret_by_id", "Get a secret by ID", GetSecretSchema.shape, async (args) => {
    if (args.id) {
      return await makeAdminAPIRequest(`/secrets/${args.manager}/${args.id}`);
    } else {
      let query = "";

      return await makeAdminAPIRequest(`/secrets/${args.manager}?page=${args.page}&page_size=${args.page_size}${query}`);
    }
  });

  server.tool("create_secret", "Create a secret", CreateSecretSchema.shape, async (args) => {
    const secretId = args.id;

    if (secretId) {
      return await makeAdminAPIRequest(`/secrets/${args.manager}/${secretId}`, "PUT", args.secret);
    } else {
      return await makeAdminAPIRequest(`/secrets/${args.manager}`, "POST", args.secret);
    }
  });

  server.tool("update_secret", "Update specific attributes of an existing secret", UpdateSecretSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/secrets/${args.manager}/${args.id}`, "PATCH", args.secret);
  });

  server.tool("delete_secret", "Delete a secret by ID", DeleteSecretSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/secrets/${args.manager}/${args.id}`, "DELETE");
  });
};

export default setupSecretTools;
