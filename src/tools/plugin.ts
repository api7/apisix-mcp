import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { makeAdminAPIRequest } from "../adminAPI.js";
import {
  CreateOrUpdatePluginMetadataSchema,
  DeletePluginMetadataSchema,
  GetPluginSchemaSchema,
  GetPluginMetadataSchema,
  UpdatePluginConfigSchema,
  CreatePluginConfigSchema,
} from "../schemas/plugin.js";

const setupPluginTools = (server: McpServer) => {
  server.tool("get_all_plugin_names", "Get all plugin names", async () => {
    return await makeAdminAPIRequest(`/plugins/list`);
  });

  server.tool(
    "get_plugin_schema",
    "Get all plugins schema or a specific plugin schema by name",
    GetPluginSchemaSchema.shape,
    async (args) => {
      let query = "";
      if (args.type) {
        query = `?type=${args.type}`;
      }
      if (args.name) {
        return await makeAdminAPIRequest(`/plugins/${args.name}`);
      } else {
        return await makeAdminAPIRequest(`/plugins${query}`);
      }
    }
  );

  server.tool("get_plugin_metadata", "Get metadata for a specific plugin", GetPluginMetadataSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/plugin_metadata/${args.name}`);
  });

  server.tool("create_plugin_config", "Create a new plugin config", CreatePluginConfigSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/plugin_configs`, "PUT", args);
  });

  server.tool("update_plugin_config", "Update a plugin config", UpdatePluginConfigSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/plugin_configs/${args.id}`, "PATCH", args);
  });

  server.tool(
    "create_or_update_plugin_metadata",
    "Create or update plugin metadata",
    CreateOrUpdatePluginMetadataSchema.shape,
    async (args) => {
      return await makeAdminAPIRequest(`/plugin_metadata/${args.name}`, "PUT", args.metadata);
    }
  );

  server.tool("delete_plugin_metadata", "Delete plugin metadata", DeletePluginMetadataSchema.shape, async (args) => {
    return await makeAdminAPIRequest(`/plugin_metadata/${args.name}`, "DELETE");
  });
};

export default setupPluginTools;
