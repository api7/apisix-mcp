import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CreateGlobalRuleSchema, UpdateGlobalRuleSchema } from "../schemas/plugin.js";
import { makeAdminAPIRequest } from "../adminAPI.js";

const setupGlobalRuleTools = (server: McpServer) => {
  server.tool("create_global_rule", "Create a global rule", CreateGlobalRuleSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/global_rules/${args.id}`, "PUT", args);
  });

  server.tool("update_global_rule", "Update specific attributes of an existing global rule", UpdateGlobalRuleSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/global_rules/${args.id}`, "PATCH", args);
  });
};

export default setupGlobalRuleTools;
