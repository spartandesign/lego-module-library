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
  assert.match(html, /v1\.3 · solid supports \+ anchor feet/);
  assert.match(html, /v2\.6 · open tabs \+ anchor feet/);
  assert.match(html, /v5\.4 · internal paths \+ anchor feet/);
  assert.match(html, /v2\.2 · open tabs \+ solid supports/);
  assert.match(html, /v1\.5 · solid supports \+ anchor feet/);
  assert.match(html, /v2\.0 · solid supports \+ anchor feet/);
  assert.match(html, /Do not print the old base with circular cardboard ears/);
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
  await access(
    new URL(
      "../public/downloads/potentiometer-control-dial-module-v1-3-solid-supports-anchor-feet.zip",
      import.meta.url,
    ),
  );
  for (const supersededPotentiometerZip of [
    "potentiometer-control-dial-module-v1-1-dual-mount-3p4.zip",
    "potentiometer-control-dial-module-v1-2-open-tabs-anchor-feet.zip",
    "potentiometer-control-dial-module-v1-dual-mount-edge-tabs-3dot.zip",
    "potentiometer-control-dial-module-v1.zip",
  ]) {
    await assert.rejects(
      access(
        new URL(
          `../public/downloads/${supersededPotentiometerZip}`,
          import.meta.url,
        ),
      ),
    );
  }
  await access(
    new URL(
      "../public/downloads/three-led-m3-module-v2-6-open-tabs-anchor-feet.zip",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../public/downloads/microbit-original-guide-stand-v5-4-internal-paths-anchor-feet.zip",
      import.meta.url,
    ),
  );
  for (const moduleZip of [
    "piezo-buzzer-module-v2-2-open-tabs-solid-supports-anchor-feet.zip",
    "sg90-horizontal-cradle-v1-5-internal-paths-solid-supports-anchor-feet.zip",
    "sg90-vertical-cradle-v1-2-open-tabs-solid-supports-anchor-feet.zip",
    "sg90-upright-dashboard-gauge-v2-0-solid-supports-anchor-feet.zip",
    "sg90-latch-deadbolt-module-v1-2-solid-supports-anchor-feet.zip",
    "sg90-door-flap-linkage-module-v1-2-solid-supports-anchor-feet.zip",
  ]) {
    await access(new URL(`../public/downloads/${moduleZip}`, import.meta.url));
  }
  await access(new URL("../.github/workflows/deploy-pages.yml", import.meta.url));
  await access(root);
});
