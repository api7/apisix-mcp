import { DeleteResourceSchema, GetResourceSchema } from "../schemas/common.js";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import makeAdminAPIRequest from "../adminAPI.js";

const setupCommonTools = (server: McpServer) => {
  server.tool("get_resource", "Get resource details by ID or list all resources", GetResourceSchema.shape, async (args) => {
    if (args.id) {
      return await makeAdminAPIRequest(`/${args.type}/${args.id}`);
    } else {
      let query = "";
      if (args.name) {
        query += `&name=${args.name}`;
      }
      if (args.labels) {
        query += `&labels=${args.labels}`;
      }
      if (args.uri) {
        query += `&uri=${args.uri}`;
      }
      return await makeAdminAPIRequest(`/${args.type}?page=${args.page}&page_size=${args.page_size}${query}`);
    }
  });

  server.tool("delete_resource", "Delete a resource by ID", DeleteResourceSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/${args.type}/${args.id}`, "DELETE");
  });
};

export default setupCommonTools;
