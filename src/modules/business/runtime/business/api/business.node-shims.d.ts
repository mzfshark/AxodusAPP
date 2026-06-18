declare module "node:http" {
  export interface IncomingMessage extends AsyncIterable<Uint8Array | string> {
    method?: string;
    url?: string;
  }

  export interface ServerResponse {
    writeHead(statusCode: number, headers?: Record<string, string>): this;
    end(data?: string | null): this;
  }

  export interface Server {
    listen(port: number, host: string, callback?: () => void): this;
    address(): string | { port: number } | null;
    close(callback?: () => void): this;
  }

  export function createServer(
    listener: (request: IncomingMessage, response: ServerResponse) => void | Promise<void>
  ): Server;
}

declare module "node:url" {
  export function fileURLToPath(url: string | URL): string;
}

declare const Buffer: {
  isBuffer(value: unknown): boolean;
  from(value: Uint8Array | string): Uint8Array;
  concat(chunks: Uint8Array[]): { toString(encoding?: string): string };
};

declare const process: {
  argv: string[];
  env: Record<string, string | undefined>;
};
