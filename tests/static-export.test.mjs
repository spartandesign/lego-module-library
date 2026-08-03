import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const exportedIndex = new URL("../out/index.html", import.meta.url);

test("exports the module library landing page", async () => {
  const html = await readFile(exportedIndex, "utf8");

  assert.match(html, /PLTW LEGO Module Library/);
  assert.match(html, /Build the interaction/);
  assert.match(html, /Flex-Sensor Paddle/);
  assert.match(html, /Upright Dashboard Gauge/);
  assert.match(html, /For teachers/);
  assert.match(html, /For students/);
});

test("ships every public module download and preview", async () => {
  const html = await readFile(exportedIndex, "utf8");
  const publicPaths = [
    ...html.matchAll(/(?:src|href)=["']([^"']+(?:\.png|\.zip))["']/g),
  ].map((match) => match[1]);

  assert.ok(publicPaths.length >= 30, "expected previews and download links");

  for (const publicPath of publicPaths) {
    const normalized = publicPath
      .replace(/^https?:\/\/[^/]+/i, "")
      .replace(/^\/lego-module-library/, "")
      .replace(/^\//, "");
    await access(new URL(`../public/${normalized}`, import.meta.url));
  }

  await access(new URL("../public/.nojekyll", import.meta.url));
  await access(new URL("../public/og-module-library.png", import.meta.url));
  await access(new URL("../.github/workflows/deploy-pages.yml", import.meta.url));
  await access(root);
});
