import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { UpdateUpstreamSchema, CreateUpstreamSchema } from "../schemas/upstream.js";
import { makeAdminAPIRequest } from "../adminAPI.js";

const setupUpstreamTools = (server: McpServer) => {
  server.tool("create_upstream", "Create an upstream service with load balancing settings", CreateUpstreamSchema.shape, async (args) => {
    const upstreamId = args.id;
    if (!upstreamId) {
      return await makeAdminAPIRequest(`/upstreams`, "POST", args.upstream);
    } else {
      return await makeAdminAPIRequest(`/upstreams/${upstreamId}`, "PUT", args.upstream);
    }
  });

  server.tool("update_upstream", "Update specific attributes of an existing upstream", UpdateUpstreamSchema.shape, async (args) => {
    if (!args.id) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ error: "Upstream ID is required for updates" }, null, 2),
          },
        ],
      };
    }

    return await makeAdminAPIRequest(`/upstreams/${args.id}`, "PATCH", args.upstream);
  });
};

export default setupUpstreamTools;
