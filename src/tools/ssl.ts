import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CreateSSLSchema, UpdateSSLSchema } from "../schemas/ssl.js";
import { makeAdminAPIRequest } from "../adminAPI.js";

const setupSSLTools = (server: McpServer) => {
  server.tool("create_ssl", "Create an SSL certificate", CreateSSLSchema.shape, async (args) => {
    const sslId = args.id;
    if (!sslId) {
      return await makeAdminAPIRequest(`/ssls`, "POST", args.ssl);
    } else {
      return await makeAdminAPIRequest(`/ssls/${sslId}`, "PUT", args.ssl);
    }
  });

  server.tool("update_ssl", "Update specific attributes of an existing SSL certificate", UpdateSSLSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/ssls/${args.id}`, "PATCH", args.ssl);
  });
};

export default setupSSLTools;
