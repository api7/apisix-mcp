import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { makeAdminAPIRequest } from "../adminAPI.js";
import { CreateOrUpdateProtoSchema } from "../schemas/protos.js";

const setupProtoTools = (server: McpServer) => {
  server.tool("create_or_update_proto", "Create or update a proto", CreateOrUpdateProtoSchema.shape, async (args) => {
    const protoId = args.id;
    if (protoId) {
      return await makeAdminAPIRequest(`/protos/${protoId}`, "PUT", args.proto);
    } else {
      return await makeAdminAPIRequest("/protos", "POST", args.proto);
    }
  });
};

export default setupProtoTools;
