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
  assert.match(html, /Single-LED M3 Terminal Module/);
  assert.match(html, /v3\.5 · indexed M3 \+ 3\.6 mm paths/);
  assert.match(html, /30 solid roof supports/);
  assert.match(html, /both nominal 5\.50 mm-AF × 2\.40 mm nuts sweep without collision/);
  assert.match(html, /v1\.8 · 29 supports \+ 3\.6 mm paths/);
  assert.match(html, /v1\.4 · 39 supports \+ 3\.6 mm paths/);
  assert.match(html, /v2\.6 · 49 supports \+ 3\.6 mm paths/);
  assert.match(html, /v1\.6 · 3\.6 mm paths \+ anchor feet/);
  assert.match(html, /eight full 5\.20 × 2\.85 mm supports/);
  assert.match(html, /v1\.4 · indexed M3 \+ 3\.6 mm paths/);
  assert.match(html, /All three \+X nut routes pass full nominal/);
  assert.match(html, /v2\.9 · 3\.6 mm paths/);
  assert.match(html, /v1\.1 · 3\.6 mm paths/);
  assert.match(html, /v2\.8 · indexed M3 \+ 3\.6 mm paths/);
  assert.match(html, /18 solid roof supports/);
  assert.match(html, /six indexed M3 nut paths and screw bores/);
  assert.match(html, /v5\.6 · reinforced towers \+ 3\.6 mm paths/);
  assert.match(html, /calculated bending inertia is 3\.76–4\.63×/);
  assert.match(html, /all 60 LEGO seating clearances remain open/);
  assert.match(html, /v2\.3 · 3\.6 mm paths/);
  assert.match(html, /v1\.6 · 3\.6 mm paths/);
  assert.match(html, /v1\.3 · 3\.6 mm open paths/);
  assert.match(html, /v2\.1 · 3\.6 mm paths/);
  assert.match(html, /13 full \+ 2 portal-trimmed solid supports/);
  assert.match(html, /Do not print the old base with circular cardboard ears/);
  assert.match(html, /For teachers/);
  assert.match(html, /For students/);
  assert.doesNotMatch(html, /flex-paddle-module-v3-4-dual-mount-3p4\.zip/);
  assert.doesNotMatch(html, /flex-door-flap-module-v1-7-dual-mount-3p4\.zip/);
  assert.doesNotMatch(html, /fsr402-pressure-pad-module-v1-3-dual-mount-3p4\.zip/);
  assert.doesNotMatch(html, /fsr402-universal-pressure-module-v2-5-dual-mount-3p4\.zip/);
  assert.doesNotMatch(html, /microbit-original-guide-stand-v5-5-solid-supports-internal-paths-anchor-feet-3p6\.zip/);
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
      "../public/downloads/potentiometer-control-dial-module-v1-4-solid-supports-anchor-feet-3p6.zip",
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
      "../public/downloads/compact-resistor-module-v2-9-dual-mount-polarity-3p6.zip",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../public/downloads/three-led-m3-module-v2-8-open-tabs-solid-supports-anchor-feet-3p6.zip",
      import.meta.url,
    ),
  );
  await access(new URL("../public/images/led-module.png", import.meta.url));
  await access(new URL("../public/images/single-led-module.png", import.meta.url));
  await access(
    new URL(
      "../public/downloads/single-led-m3-module-v1-1-open-tabs-solid-supports-anchor-feet-3p6.zip",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../public/downloads/microbit-original-guide-stand-v5-6-reinforced-towers-solid-supports-3p6.zip",
      import.meta.url,
    ),
  );
  for (const moduleZip of [
    "flex-paddle-module-v3-5-solid-supports-anchor-feet-3p6.zip",
    "flex-door-flap-module-v1-8-solid-supports-anchor-feet-3p6.zip",
    "fsr402-pressure-pad-module-v1-4-solid-supports-anchor-feet-3p6.zip",
    "fsr402-universal-pressure-module-v2-6-solid-supports-anchor-feet-3p6.zip",
    "photocell-module-family-v1-6-solid-supports-anchor-feet-3p6.zip",
    "piezo-buzzer-module-v2-3-open-tabs-solid-supports-anchor-feet-3p6.zip",
    "sg90-horizontal-cradle-v1-6-internal-paths-solid-supports-anchor-feet.zip",
    "sg90-vertical-cradle-v1-3-open-tabs-solid-supports-anchor-feet.zip",
    "sg90-upright-dashboard-gauge-v2-1-solid-supports-anchor-feet.zip",
    "sg90-latch-deadbolt-module-v1-3-solid-supports-anchor-feet.zip",
    "sg90-door-flap-linkage-module-v1-3-solid-supports-anchor-feet.zip",
  ]) {
    await access(new URL(`../public/downloads/${moduleZip}`, import.meta.url));
  }
  for (const preview of [
    "flex-paddle.png",
    "flex-door.png",
    "pressure-pad.png",
    "pressure-universal.png",
    "photocell.png",
    "potentiometer.png",
    "resistor.png",
    "single-led-module.png",
    "led-module.png",
    "buzzer.png",
    "microbit-stand.png",
    "servo-horizontal.png",
    "servo-vertical.png",
    "servo-gauge.png",
    "servo-latch.png",
    "servo-door.png",
  ]) {
    await access(new URL(`../public/images/${preview}`, import.meta.url));
  }
  await access(new URL("../.github/workflows/deploy-pages.yml", import.meta.url));
  await access(root);
});
