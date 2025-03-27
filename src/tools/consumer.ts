import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CreateOrUpdateConsumerSchema, GetCredentialSchema, DeleteCredentialSchema, CreateCredentialSchema } from "../schemas/consumer.js";
import { makeAdminAPIRequest } from "../adminAPI.js";

const setupConsumerTools = (server: McpServer) => {
  server.tool(
    "create_or_update_consumer",
    "Create or update a consumer, if the consumer already exists, it will be updated",
    CreateOrUpdateConsumerSchema.shape,
    async (args) => {
      return await makeAdminAPIRequest(`/consumers`, "PUT", args);
    }
  );

  server.tool("get_credential", "Get all credentials or a specific credential for a consumer", GetCredentialSchema.shape, async (args) => {
    if (args.id) {
      return await makeAdminAPIRequest(`/consumers/${args.username}/credentials/${args.id}`, "GET");
    }
    return await makeAdminAPIRequest(`/consumers/${args.username}/credentials`, "GET");
  });

  server.tool("create_or_update_credential", "Create or update a credential for a consumer", CreateCredentialSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/consumers/${args.username}/credentials/${args.id}`, "PUT", args);
  });

  server.tool("delete_credential", "Delete a credential for a consumer", DeleteCredentialSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/consumers/${args.username}/credentials/${args.id}`, "DELETE");
  });
};

export default setupConsumerTools;
