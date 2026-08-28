import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const canonicalDescription =
  "Axodus is a research-driven initiative developing a proposed ecosystem of interoperable, AI-native organizational platforms for governed knowledge, institutional workflows, and digital services.";

const officialSameAs = [
  "https://github.com/axodus/",
  "https://github.com/Axodus/Institutional",
  "https://docs.axodus.country/",
  "https://axodus.medium.com/",
  "https://axodus.substack.com/",
  "https://axodus.notion.site/Axodus-39355b1b6c9880f884ade5ce28b4dc6d",
];

async function fetchPath(pathname, accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    process.pid + "-" + Date.now() + "-" + pathname,
  );
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost" + pathname, {
      headers: { accept },
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

  return response;
}

async function render(pathname) {
  const response = await fetchPath(pathname);

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
  assert.match(html, /<link rel="canonical" href="https:\/\/axodus\.country\/"\/>/);
  assert.match(html, /What is Axodus?/);
  assert.match(html, new RegExp(canonicalDescription));
  assert.match(html, /application\/ld\+json/);
});

test("what-is page renders the public explanation", async () => {
  const html = await render("/what-is-axodus/");

  assert.match(html, /<title>What is Axodus\?<\/title>/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/axodus\.country\/what-is-axodus\/"\/>/,
  );
  assert.match(html, /property="og:title" content="What is Axodus\?"/);
  assert.match(html, /What is Axodus?/);
  assert.match(html, new RegExp(canonicalDescription));
  assert.match(html, /Mauricio ZF — CEO and author/);
  assert.match(html, /what-is-axodus-hero\.jpeg/);
  assert.match(
    html,
    /alt="Conceptual diagram of an axis connecting identity, architecture, governance, knowledge, and digital services\."/,
  );
  assert.match(html, /bounded local governance domains/i);
  assert.match(html, /href="\/governance"/);
  assert.match(html, /href="\/research"/);
  assert.match(html, /href="https:\/\/docs\.axodus\.country\/"/);
  assert.match(html, /href="https:\/\/github\.com\/Axodus\/Institutional"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(
    html,
    /draft status|editorial version|claims review|publication readiness|human approval|channel authorization|channel ownership|blockers?|worksheets?|directives?/i,
  );
});

test("platforms page distinguishes external platforms from unlinked concepts", async () => {
  const html = await render("/platforms/");

  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/axodus\.country\/platforms\/"\/>/,
  );
  assert.match(html, /application\/ld\+json/);
  assert.match(html, new RegExp(canonicalDescription));

  for (const href of [
    "https://academy.country/",
    "https://marketplace.country/",
    "https://bba.country/",
    "https://acs.axodus.country/",
    "https://governance.country/",
  ]) {
    assert.match(html, new RegExp(`href="${href}"`));
  }

  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, />DeFi</);
  assert.match(html, />Mining</);
  assert.match(html, />Lotto</);
  assert.match(html, /No official destination/g);
  assert.doesNotMatch(html, /href="[^"]*(defi|mining|lotto)[^"]*"/i);
  assert.match(html, /No acceptance, adoption, partnership, or domain migration is asserted/);
});

test("platforms JSON-LD preserves the canonical organization entity", async () => {
  const html = await render("/platforms/");
  const match = html.match(
    /<script type="application\/ld\+json">([^<]+)<\/script>/,
  );

  assert.ok(match, "Expected rendered JSON-LD script");
  const data = JSON.parse(match[1]);
  const organization = data["@graph"].find(
    (entry) => entry["@id"] === "https://axodus.country/#organization",
  );

  assert.equal(organization["@type"], "ResearchOrganization");
  assert.equal(organization.description, canonicalDescription);
  assert.deepEqual(organization.sameAs, officialSameAs);
});

test("sitemap and robots expose only the approved public index", async () => {
  const sitemapModule = await import(
    new URL("../app/sitemap.ts", import.meta.url).href +
      `?test=${process.pid}-${Date.now()}`
  );
  const sitemap = sitemapModule.default();
  const approvedUrls = [
    "/",
    "/what-is-axodus/",
    "/architecture/",
    "/governance/",
    "/research/",
    "/publications/",
    "/platforms/",
  ].map((pathname) => `https://axodus.country${pathname}`);

  assert.deepEqual(
    sitemap.map((entry) => entry.url),
    approvedUrls,
  );

  const robots = await readFile(
    new URL("../public/robots.txt", import.meta.url),
    "utf8",
  );
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/axodus\.country\/sitemap\.xml/);
});
