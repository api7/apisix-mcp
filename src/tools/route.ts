import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { makeAdminAPIRequest } from "../adminAPI.js";
import { CreateRouteSchema, UpdateRouteSchema } from "../schemas/route.js";

const setupRouteTools = (server: McpServer) => {
  server.tool("create_route", "Create a route", CreateRouteSchema.shape, async (args) => {
    const routeId = args.id;

    if (routeId) {
      return await makeAdminAPIRequest(`/routes/${routeId}`, "PUT", args.route);
    } else {
      return await makeAdminAPIRequest(`/routes`, "POST", args.route);
    }
  });

  server.tool("update_route", "Update specific attributes of an existing route", UpdateRouteSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/routes/${args.id}`, "PATCH", args.route);
  });
};

export default setupRouteTools;
