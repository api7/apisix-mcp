import axios from "axios";
import {
  APISIX_SERVER_HOST,
  APISIX_ADMIN_API_PORT,
  APISIX_ADMIN_API_PREFIX,
  APISIX_ADMIN_KEY,
} from "./env.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export async function makeAdminAPIRequest(
  path: string,
  method: string = "GET",
  data?: object
): Promise<CallToolResult> {
  const baseUrl = `${APISIX_SERVER_HOST}:${APISIX_ADMIN_API_PORT}${APISIX_ADMIN_API_PREFIX}`;
  const url = `${baseUrl}${path}`;

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "X-API-KEY": APISIX_ADMIN_KEY,
        "Content-Type": "application/json",
      },
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Request failed: ${method} ${url}`);
      console.error(
        `Status: ${error.response?.status}, Error: ${error.message}`
      );

      if (error.response?.data) {
        try {
          const stringifiedData = JSON.stringify(error.response.data);
          console.error(`Response data: ${stringifiedData}`);
        } catch {
          console.error(`Response data: [Cannot parse as JSON]`);
        }
      }

      return {
        isError: true,
        content: [
          {
            type: "text",
            text: JSON.stringify(
              `Status: ${error.response?.status}\nMessage: ${error.message}
Data:\n${JSON.stringify(error.response?.data || {}, null, 2)}`,
              null,
              2
            ),
          },
        ],
      };
    } else {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: JSON.stringify(error, null, 2),
          },
        ],
      };
    }
  }
}

export default makeAdminAPIRequest;
