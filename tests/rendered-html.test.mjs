import assert from "node:assert/strict";
import test from "node:test";

const canonicalDescription =
  "Axodus is a research-driven initiative developing a proposed ecosystem of interoperable, AI-native organizational platforms for governed knowledge, institutional workflows, and digital services.";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    process.pid + "-" + Date.now() + "-" + pathname,
  );
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost" + pathname, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("homepage renders canonical metadata and visible answer", async () => {
  const html = await render("/");

  assert.match(
    html,
    /<title>Axodus — Research-driven AI-native organizational platforms<\/title>/,
  );
  assert.match(html, /<link rel="canonical" href="https://axodus.country/">/);
  assert.match(html, /What is Axodus?/);
  assert.match(html, new RegExp(canonicalDescription));
  assert.match(html, /application/ld+json/);
});

test("what-is page renders the public explanation", async () => {
  const html = await render("/what-is-axodus/");

  assert.match(html, /What is Axodus?/);
  assert.match(html, new RegExp(canonicalDescription));
  assert.match(html, /bounded local governance domains/i);
  assert.match(html, /Documentation/);
});
