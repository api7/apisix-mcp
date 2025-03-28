#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import setupRouteTools from "./tools/route.js";
import setupServiceTools from "./tools/service.js";
import setupUpstreamTools from "./tools/upstream.js";
import setupConsumerTools from "./tools/consumer.js";
import setupSSLTools from "./tools/ssl.js";
import setupGlobalRuleTools from "./tools/global-rule.js";
import setupConsumerGroupTools from "./tools/consumer-group.js";
import setupPluginTools from "./tools/plugin.js";
import setupStreamRouteTools from "./tools/stream-route.js";
import setupSecretTools from "./tools/secret.js";
import setupCommonTools from "./tools/common.js";
import setupProtoTools from "./tools/proto.js";

const server = new McpServer({
  name: "apisix-mcp",
  version: "0.0.3",
});

setupCommonTools(server);
setupRouteTools(server);
setupServiceTools(server);
setupUpstreamTools(server);
setupConsumerTools(server);
setupSSLTools(server);
setupGlobalRuleTools(server);
setupConsumerGroupTools(server);
setupPluginTools(server);
setupStreamRouteTools(server);
setupSecretTools(server);
setupProtoTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("APISIX MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
