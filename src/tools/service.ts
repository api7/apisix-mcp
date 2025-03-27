import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CreateServiceSchema, UpdateServiceSchema } from "../schemas/service.js";
import { makeAdminAPIRequest } from "../adminAPI.js";

const setupServiceTools = (server: McpServer) => {
  server.tool("create_service", "Create or update a service", CreateServiceSchema.shape, async (args) => {
    const serviceId = args.id;
    if (!serviceId) {
      return await makeAdminAPIRequest(`/services`, "POST", args.service);
    } else {
      return await makeAdminAPIRequest(`/services/${serviceId}`, "PUT", args.service);
    }
  });

  server.tool("update_service", "Update specific attributes of an existing service", UpdateServiceSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/services/${args.id}`, "PATCH", args.service);
  });
};

export default setupServiceTools;
