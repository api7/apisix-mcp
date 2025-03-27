# APISIX Model Context Protocol (MCP) Server

APISIX-MCP is a Model Context Protocol Server designed to streamline the management of APISIX infrastructure through natural language processing. This service enables seamless integration with large language models (LLMs), allowing developers and operators to interact with APISIX resources using conversational interfaces.

https://github.com/user-attachments/assets/081e878c-225e-4ff8-a9c5-5813f4784cfe


## Support Operations

### Common Operations

- `get_resource`: Retrieve resources by type (routes, services, upstreams, etc.)
- `delete_resource`: Remove resources by ID

### API Resources Operations

- `create_route`/`update_route`/`delete_route`: Manage routes
- `create_service`/`update_service`/`delete_service`: Manage services
- `create_upstream`/`update_upstream`/`delete_upstream`: Manage upstream
- `create_ssl`/`update_ssl`/`delete_ssl`: Manage SSL certificates
- `create_or_update_proto`: Manage protobuf definitions
- `create_or_update_stream_route`: Manage stream routes

### Plugin Operations

- `get_all_plugin_names`: Get all available plugin names
- `get_plugin_info`/`get_plugins_by_type`/`get_plugin_schema`: Retrieve plugins configuration
- `create_plugin_config`/`update_plugin_config`: Manage plugin configurations
- `create_global_rule`/`update_global_rule`: Manage plugin global rules
- `get_plugin_metadata`/`create_or_update_plugin_metadata`/`delete_plugin_metadata`: Manage plugin metadata

### Security Configuration

- `get_secret_by_id`/`create_secret`/`update_secret`: Manage secrets
- `create_or_update_consumer`/`delete_consumer`: Manage consumers
- `get_credential`/`create_or_update_credential`/`delete_credential`/: Manage consumer credentials
- `create_consumer_group`/`delete_consumer_group`: Manage consumer groups

## Configuration in AI client

1. Follow the APISIX [Getting Started](https://docs.api7.ai/apisix/getting-started/) guide to set up and run APISIX.

2. Configure your AI client (Cursor, Claude, Copilot, etc.) with these settings:

```json
{
  "mcpServers": {
    "apisix-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "apisix-mcp"
      ],
      "env": {
        "APISIX_SERVER_HOST": "your-apisix-server-host",
        "APISIX_ADMIN_API_PORT": "your-apisix-admin-api-port",
        "APISIX_ADMIN_API_PREFIX": "your-apisix-admin-api-prefix",
        "APISIX_API_KEY": "your-apisix-api-key"
      }
    }
  }
}
```

## Environment Variables

| Variable                  | Description                                 | Default Value                      |
| ------------------------- | ------------------------------------------- | ---------------------------------- |
| `APISIX_SERVER_HOST`      | Host that have access to your APISIX server | `http://127.0.0.1`                 |
| `APISIX_ADMIN_API_PORT`   | Admin API port                              | `9180`                             |
| `APISIX_ADMIN_API_PREFIX` | Admin API prefix                            | `/apisix/admin`                    |
| `APISIX_API_KEY`          | Admin API authentication key                | `edd1c9f034335f136f87ad84b625c8f1` |

To view or modify Admin API configurations in APISIX, refer to the [Admin API](https://apisix.apache.org/docs/apisix/admin-api) documentation.
