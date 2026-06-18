import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { fileURLToPath } from "node:url";
import { handleBusinessMockApiRequest, type BusinessMockApiMethod } from "./business.mock-api.js";

export interface BusinessMockServerOptions {
  host?: string;
  port?: number;
}

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 8791;

const readBody = async (request: IncomingMessage): Promise<unknown> => {
  const chunks: Uint8Array[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.from(Buffer.isBuffer(chunk) ? chunk : String(chunk)));
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return undefined;
  return JSON.parse(raw);
};

const writeJson = (response: ServerResponse, statusCode: number, payload: unknown): void => {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
};

export const createBusinessMockApiServer = () =>
  createServer(async (request, response) => {
    if (request.method === "OPTIONS") {
      writeJson(response, 204, null);
      return;
    }

    try {
      const body = ["POST", "PATCH"].includes(request.method ?? "") ? await readBody(request) : undefined;
      const result = handleBusinessMockApiRequest({
        method: request.method as BusinessMockApiMethod,
        path: request.url ?? "/",
        body
      });
      writeJson(response, result.statusCode, result.response);
    } catch (error) {
      writeJson(response, 400, {
        data: null,
        meta: {
          requestId: "business-api-mock-invalid-json",
          timestamp: new Date().toISOString(),
          source: "@axodus/business-runtime",
          version: "v1",
          mock: true,
          readOnly: true
        },
        errors: [
          {
            code: "BUSINESS_INVALID_JSON",
            message: error instanceof Error ? error.message : "Invalid JSON request body.",
            severity: "WARNING",
            details: { executionMode: "MOCK_READ_ONLY" }
          }
        ],
        runtime: {
          governanceStatus: "MOCK_GOVERNANCE_REVIEW_ONLY",
          treasuryStatus: "MOCK_TREASURY_VISIBILITY_ONLY",
          acsStatus: "MOCK_ACS_VISIBILITY_ONLY",
          telemetryStatus: "MOCK_TELEMETRY_ENABLED",
          executionMode: "MOCK_READ_ONLY",
          nonExecutionGuarantee: "NO_GOVERNANCE_TREASURY_DEBENTURE_ACS_CONTRACT_OR_BILLING_EXECUTION"
        }
      });
    }
  });

export const startBusinessMockApiServer = (options: BusinessMockServerOptions = {}) => {
  const host = options.host ?? process.env.BUSINESS_MOCK_API_HOST ?? DEFAULT_HOST;
  const port = options.port ?? Number(process.env.BUSINESS_MOCK_API_PORT ?? DEFAULT_PORT);
  const server = createBusinessMockApiServer();

  server.listen(port, host, () => {
    const address = server.address();
    const resolvedPort = typeof address === "object" && address ? address.port : port;
    console.info(`Business mock API listening on http://${host}:${resolvedPort}/api/v1/business`);
  });

  return server;
};

const executedFile = process.argv[1] ? fileURLToPath(import.meta.url) === process.argv[1] : false;

if (executedFile) {
  startBusinessMockApiServer();
}
