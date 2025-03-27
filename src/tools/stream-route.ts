import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CreateOrUpdateStreamRouteSchema } from "../schemas/stream-route.js";
import { makeAdminAPIRequest } from "../adminAPI.js";

const setupStreamRouteTools = (server: McpServer) => {
  server.tool("create_or_update_stream_route", "Create or update a stream route", CreateOrUpdateStreamRouteSchema.shape, async (args) => {
    const routeId = args.id;

    if (routeId) {
      return await makeAdminAPIRequest(`/stream_routes/${routeId}`, "PUT", args.route);
    } else {
      return await makeAdminAPIRequest(`/stream_routes`, "POST", args.route);
    }
  });
};

export default setupStreamRouteTools;
