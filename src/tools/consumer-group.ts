import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CreateConsumerGroupSchema, UpdateConsumerGroupSchema } from "../schemas/consumer-group.js";
import makeAdminAPIRequest from "../adminAPI.js";

const setupConsumerGroupTools = (server: McpServer) => {
  server.tool("create_consumer_group", "Create a consumer group", CreateConsumerGroupSchema.shape, async (args) => {
    const groupId = args.id;
    if (!groupId) {
      return await makeAdminAPIRequest("/consumer_groups", "POST", args.consumerGroup);
    } else {
      return await makeAdminAPIRequest(`/consumer_groups/${groupId}`, "PUT", args.consumerGroup);
    }
  });

  server.tool(
    "update_consumer_group",
    "Update specific attributes of an existing consumer group",
    UpdateConsumerGroupSchema.shape,
    async (args) => {
      return await makeAdminAPIRequest(`/consumer_groups/${args.id}`, "PATCH", args.consumerGroup);
    }
  );
};

export default setupConsumerGroupTools;
