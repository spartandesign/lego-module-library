"use client";

/* eslint-disable @next/next/no-img-element -- Static GitHub Pages export uses local preview assets. */

import { useMemo, useState } from "react";

type Category = "Sensors & inputs" | "Circuit building" | "Servo mechanisms" | "micro:bit";
type StatusTone = "verified" | "tuned" | "prototype";

type Module = {
  id: string;
  title: string;
  version: string;
  category: Category;
  status: string;
  statusTone: StatusTone;
  image: string;
  imagePosition?: string;
  summary: string;
  learning: string;
  projectFit: string[];
  hardware: string[];
  parts: string[];
  teacherNote: string;
  studentTip: string;
  download: string;
};

const modules: Module[] = [
  {
    id: "flex-paddle",
    title: "Flex-Sensor Paddle",
    version: "v3.3 · M3 clamp",
    category: "Sensors & inputs",
    status: "Verified mechanism",
    statusTone: "verified",
    image: "/images/flex-paddle.png",
    summary: "A compact three-point bending paddle with a guided flex sensor and side-loaded M3 connector clamp.",
    learning: "Turns a changing bend into a repeatable analog input while protecting the sensor connector.",
    projectFit: ["P2.4", "P3.2", "Analog input"],
    hardware: ["Flex sensor", "2× M3 × 8", "2× M3 nuts", "Hinge pin"],
    parts: ["F-fit base", "Paddle", "Connector clamp", "Optional test pin"],
    teacherNote: "The bending geometry is proven. Version 3.3 keeps the paddle path clear and uses resistor-module-style captive nuts.",
    studentTip: "Install the printed/striped sensor side upward and tighten the clamp only enough to stop the stiff connector from lifting.",
    download: "/downloads/flex-paddle-module-v3-3.zip",
  },
  {
    id: "flex-door",
    title: "Flex-Sensor Door / Flap",
    version: "v1.6 · 8-32 hinge",
    category: "Sensors & inputs",
    status: "Classroom-tested motion",
    statusTone: "verified",
    image: "/images/flex-door.png",
    summary: "A door-like flap that bends the active sensor region about 45 mm from the connector and stops near 80 degrees.",
    learning: "Connects physical door position to analog readings and makes sensor wear, range, and calibration visible.",
    projectFit: ["P2.4", "P3.2", "Position sensing"],
    hardware: ["Flex sensor", "8-32 × 1.75 in", "8-32 nut", "2× M3 × 8"],
    parts: ["Matched base", "Extended flap", "10 mm guide", "M3 clamp"],
    teacherNote: "The open end lets the strip slide while the extended flap and fixed support protect the vulnerable stem.",
    studentTip: "Move the flap slowly on the first test and confirm the striped active area bends—not the white connector stem.",
    download: "/downloads/flex-door-flap-module-v1-6.zip",
  },
  {
    id: "pressure-pad",
    title: "FSR Pressure Pad",
    version: "v1.1 · wider stem",
    category: "Sensors & inputs",
    status: "Physical pocket fit verified",
    statusTone: "verified",
    image: "/images/pressure-pad.png",
    summary: "A removable object platform and centered puck focus force onto a flat FSR402-style pressure sensor.",
    learning: "Helps students trigger the sensor with classroom objects instead of relying on a fingertip press.",
    projectFit: ["P3.2", "Force input", "Object trigger"],
    hardware: ["29ILFSR402 / FSR402", "Mini zip tie"],
    parts: ["F-fit base", "Top plate", "0.8 / 1.0 / 1.2 mm pucks"],
    teacherNote: "The circular pocket was physically confirmed; the stem channel was widened to 7.8 mm from the coupon result.",
    studentTip: "Start with the 1.0 mm puck. The empty platform should read like no platform, while a light press should change the value.",
    download: "/downloads/fsr402-pressure-pad-module-v1-1.zip",
  },
  {
    id: "pressure-universal",
    title: "Universal Pressure Testbed",
    version: "v2 · interchangeable tops",
    category: "Sensors & inputs",
    status: "Fit-tuned design",
    statusTone: "tuned",
    image: "/images/pressure-universal.png",
    summary: "A compact FSR pedestal with a three-guide carrier, hard stops, removable puck, and multiple object platforms.",
    learning: "Lets teams compare actuator shape, platform area, trigger threshold, and repeatability on the same sensor base.",
    projectFit: ["P3.2", "Design iteration", "Testing"],
    hardware: ["FSR402-style sensor", "2× M3 × 6", "2× M3 nuts"],
    parts: ["F-fit base", "Guide carrier", "M3 clamp", "Three tops", "Two pucks"],
    teacherNote: "Use it as a trigger/input testbed, not a calibrated scale. FSR readings vary with preload and actuator geometry.",
    studentTip: "Change only one top or puck at a time, then record the empty and loaded readings before comparing designs.",
    download: "/downloads/fsr402-universal-pressure-module-v2.zip",
  },
  {
    id: "photocell",
    title: "Photocell Module Family",
    version: "v1 · ambient / beam / cover",
    category: "Sensors & inputs",
    status: "Curriculum-ready prototype",
    statusTone: "prototype",
    image: "/images/photocell.png",
    summary: "Three compact housings use the same 5 mm GL55-series photoresistor for ambient, interrupted-beam, or covered-light tests.",
    learning: "Makes light interactions purposeful instead of treating every photocell as an exposed room-light sensor.",
    projectFit: ["P2.4", "P3.2", "Light input"],
    hardware: ["5 mm GL5516 / GL5528", "2× M3 terminals per module"],
    parts: ["Ambient base", "Beam base", "Cover base", "Activity guide"],
    teacherNote: "All three versions use the same Coupon-F interface and end-loaded M3 terminal approach.",
    studentTip: "Choose the housing that matches the interaction: a shadow, a blocked beam, or opening a cover.",
    download: "/downloads/photocell-module-family-v1.zip",
  },
  {
    id: "potentiometer",
    title: "Potentiometer Control Dial",
    version: "v1 · 3-terminal input",
    category: "Sensors & inputs",
    status: "Curriculum-ready prototype",
    statusTone: "prototype",
    image: "/images/potentiometer.png",
    summary: "A supportless vertical mount for a common 16 mm, 10 kΩ potentiometer with three protected M3 terminals.",
    learning: "Provides a continuous analog dial for combinations, thresholds, LED brightness, servo position, or interaction choices.",
    projectFit: ["P2.4", "P3.2", "Continuous control"],
    hardware: ["16 mm 10 kΩ potentiometer", "3× M3 × 6", "3× M3 nuts", "Short wires"],
    parts: ["F-fit base", "Combination knob", "Accessible wing knob", "Activity guide"],
    teacherNote: "The printed base uses a 7.8 mm bushing opening; start with the included 5.9 mm knob bore.",
    studentTip: "Connect the center pin to SIG. Swap the two outside connections if clockwise rotation changes the value the wrong way.",
    download: "/downloads/potentiometer-control-dial-module-v1.zip",
  },
  {
    id: "resistor",
    title: "Compact Resistor Terminal",
    version: "v2 · 5 × 3 studs",
    category: "Circuit building",
    status: "Fit-tuned module",
    statusTone: "tuned",
    image: "/images/resistor.png",
    summary: "A protected ¼-watt resistor cradle with metal M3 terminals sized for one or two alligator clips.",
    learning: "Moves repeated clip wear away from fragile resistor leads and makes voltage-divider junctions easier to see.",
    projectFit: ["P2.4", "P3.2", "Voltage divider"],
    hardware: ["47 kΩ ¼ W resistor", "2× M3 × 6", "2× M3 nuts", "2× washers"],
    parts: ["Single compact F-fit base"],
    teacherNote: "The 40 × 24 mm body is scaled to the resistor and uses captive metal nuts rather than threads cut into PLA.",
    studentTip: "Loop each resistor lead beneath its washer and tighten gently. The shared terminal can accept clips on opposite sides.",
    download: "/downloads/compact-resistor-module-v2.zip",
  },
  {
    id: "led",
    title: "Three-LED M3 Terminal Module",
    version: "v2.3 · polarity labels",
    category: "Circuit building",
    status: "Classroom fit verified",
    statusTone: "verified",
    image: "/images/led-module.png",
    summary: "Three 5 mm LEDs are held together with clearly marked positive and negative M3 connection points.",
    learning: "Protects LED leads, keeps polarity visible, and gives alligator clips durable metal contact points.",
    projectFit: ["P2.4", "P3.2", "Visual output"],
    hardware: ["3× 5 mm LEDs", "6× M3 terminals", "Current-limiting resistors"],
    parts: ["Single F-fit labeled base"],
    teacherNote: "The LED body and terminal layout worked physically; the underside was updated to the project’s Coupon-F fit.",
    studentTip: "Match the longer LED lead to + before bending the leads toward the M3 terminals. Never omit the required resistor.",
    download: "/downloads/three-led-m3-module-v2-3.zip",
  },
  {
    id: "buzzer",
    title: "Piezo Buzzer Terminal Module",
    version: "v2 · PLTW 26SMDBZ1",
    category: "Circuit building",
    status: "Fit-tuned design",
    statusTone: "tuned",
    image: "/images/buzzer.png",
    summary: "A compact holder aligns the buzzer’s own terminal holes with M3 screws and large alligator-clip contact surfaces.",
    learning: "Makes polarity and durable sound-output wiring visible while keeping hardware above the LEGO interface.",
    projectFit: ["P2.4", "P3.2", "Sound output"],
    hardware: ["PLTW 26SMDBZ1 buzzer", "2× M3 × 8", "2× M3 nuts", "2× washers"],
    parts: ["19.5 mm default F-fit base", "STL and 3MF"],
    teacherNote: "The default terminal spacing is 19.5 mm. Check the actual board before printing a classroom batch.",
    studentTip: "Place − on the left and + on the right, then tighten only enough for reliable electrical contact.",
    download: "/downloads/piezo-buzzer-module-v2.zip",
  },
  {
    id: "microbit",
    title: "micro:bit Original-Guide Stand",
    version: "v5 · exact retrofit",
    category: "micro:bit",
    status: "Exact-model fit",
    statusTone: "tuned",
    image: "/images/microbit-stand.png",
    summary: "An upright LEGO stand built around the native dimensions and orientation of the original printed alligator-clip guide.",
    learning: "Keeps the display visible while preserving access to P0, P1, P2, 3V, and GND during testing.",
    projectFit: ["P2.4", "P3.2", "Testbed organization"],
    hardware: ["micro:bit", "Original 56 mm clip guide"],
    parts: ["Single exact-guide F-fit stand"],
    teacherNote: "The guide drops into a continuous 56.8 mm cradle; five front openings match the five large micro:bit contacts.",
    studentTip: "Lower the printed guide and micro:bit into the stand together, with the LED display facing the open front.",
    download: "/downloads/microbit-original-guide-stand-v5.zip",
  },
  {
    id: "servo-horizontal",
    title: "SG90 Horizontal Cradle",
    version: "v1.3 · reversible label-up",
    category: "Servo mechanisms",
    status: "Physical fit tuned",
    statusTone: "tuned",
    image: "/images/servo-horizontal.png",
    summary: "A low-profile SG90 mount with dual horn gaps, a central wire exit, and a screw-fastened retaining strap.",
    learning: "Provides a shared base for horizontal pointers, linkages, continuous-servo spools, and student mechanisms.",
    projectFit: ["P2.4", "P3.2", "Servo foundation"],
    hardware: ["SG90-size servo", "2× original mounting screws"],
    parts: ["F-fit base", "Retaining strap"],
    teacherNote: "The 12.4 mm body fit and 1.8 mm screw pilots came from the project’s physical coupon tests.",
    studentTip: "Keep the label upward, choose the horn-side gap that gives the wire the straighter path, then install the strap.",
    download: "/downloads/sg90-horizontal-cradle-v1-3.zip",
  },
  {
    id: "servo-vertical",
    title: "SG90 Vertical Cradle",
    version: "v1 · compact 7 × 3",
    category: "Servo mechanisms",
    status: "Servo dimensions verified",
    statusTone: "verified",
    image: "/images/servo-vertical.png",
    summary: "A compact upright SG90 mount with aligned mounting-ear pilots and wire portals in both towers.",
    learning: "Supports upright wheels, levers, flags, pointers, and continuous-rotation mechanisms on a small footprint.",
    projectFit: ["P2.4", "P3.2", "Servo foundation"],
    hardware: ["SG90-size servo", "2× original mounting screws"],
    parts: ["Single 56 × 24 mm F-fit base"],
    teacherNote: "The cradle uses a 12.5 mm body channel, 27.5 mm ear spacing, and 1.8 mm pilots.",
    studentTip: "Route the cable through the closest lower portal before seating both mounting ears on the tower tops.",
    download: "/downloads/sg90-vertical-cradle-7x3-v1.zip",
  },
  {
    id: "servo-gauge",
    title: "Upright Dashboard Gauge",
    version: "v1.8 · label-up",
    category: "Servo mechanisms",
    status: "Iteratively fit tuned",
    statusTone: "tuned",
    image: "/images/servo-gauge.png",
    summary: "A dashboard-style SG90 gauge with a visible horn pointer and three interchangeable 60 mm panels.",
    learning: "Maps sensor values or program states to a physical display students can read across the table.",
    projectFit: ["P2.4", "P3.2", "Physical display"],
    hardware: ["Positional SG90", "Single-arm horn", "Original servo screws"],
    parts: ["Label-up F-fit base", "Retaining strap", "Three panels"],
    teacherNote: "Version 1.8 preserves the successful panel width and moves the opening to the right for label-up servo installation.",
    studentTip: "Center the servo before attaching the pointer, then test the full sweep slowly to avoid rubbing the panel.",
    download: "/downloads/sg90-upright-dashboard-gauge-v1-8.zip",
  },
  {
    id: "servo-latch",
    title: "Positional Latch / Deadbolt",
    version: "v1 · horn-as-bolt",
    category: "Servo mechanisms",
    status: "Ready for first prototype",
    statusTone: "prototype",
    image: "/images/servo-latch.png",
    summary: "The included single-arm SG90 horn rotates into an open-top reinforced keeper to model a physical lock.",
    learning: "Gives P2.4 safe projects a clear locked/unlocked output with adjustable software endpoints.",
    projectFit: ["P2.4", "Security mechanism", "Digital output"],
    hardware: ["Positional SG90", "Single-arm horn", "Original servo screws"],
    parts: ["F-fit latch base", "Retaining strap"],
    teacherNote: "Start near 90° unlocked and 0° locked, but tune the endpoints for each servo and horn before student use.",
    studentTip: "Never force the horn against the keeper. Move in small angle steps until you find safe LOCKED and UNLOCKED values.",
    download: "/downloads/sg90-latch-deadbolt-module-v1.zip",
  },
  {
    id: "servo-door",
    title: "Positional Door / Flap Linkage",
    version: "v1 · adjustable crank",
    category: "Servo mechanisms",
    status: "Ready for first prototype",
    statusTone: "prototype",
    image: "/images/servo-door.png",
    summary: "A positional SG90 drives a separate 8-32 hinged flap through selectable printed links and crank holes.",
    learning: "Lets students compare range of motion, linkage length, force, and mechanical advantage.",
    projectFit: ["P2.4", "P3.2", "Mechanical linkage"],
    hardware: ["Positional SG90", "8-32 × 1.75 in", "Paperclip wire pins"],
    parts: ["F-fit base", "Hinged flap", "Retaining strap", "Three link lengths"],
    teacherNote: "The three links and crank holes make this a useful mechanism-design investigation, not only a finished actuator.",
    studentTip: "Start with the 26.0 mm link and middle crank hole, then move the servo in small software steps to find safe limits.",
    download: "/downloads/sg90-door-flap-linkage-module-v1.zip",
  },
];

const filters: Array<"All" | Category> = [
  "All",
  "Sensors & inputs",
  "Circuit building",
  "Servo mechanisms",
  "micro:bit",
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

export function ModuleLibrary() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState<"students" | "teachers">("students");

  const visibleModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return modules.filter((module) => {
      const matchesFilter = filter === "All" || module.category === filter;
      const searchable = [
        module.title,
        module.version,
        module.category,
        module.summary,
        module.learning,
        module.projectFit.join(" "),
        module.hardware.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [filter, query]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PLTW LEGO Module Library home">
          <span className="brand-mark" aria-hidden="true">IM</span>
          <span>
            <strong>Module Library</strong>
            <small>Innovators &amp; Makers classroom testbed</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#library">Library</a>
          <a href="#print-standard">Print standard</a>
          <a href="#classroom">Classroom use</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">LEGO-COMPATIBLE · A1 MINI · SUPPORTLESS</p>
          <h1>Build the interaction.<br />Protect the parts.</h1>
          <p className="hero-lead">
            A shared library of compact modules developed through classroom feedback—so students can focus on sensing,
            coding, circuitry, and mechanisms instead of fighting fragile connections.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#library">Browse 15 modules</a>
            <a className="button button-secondary" href="#print-standard">Use the print standard</a>
          </div>
          <dl className="hero-stats" aria-label="Library summary">
            <div><dt>15</dt><dd>download packs</dd></div>
            <div><dt>1</dt><dd>shared F-fit interface</dd></div>
            <div><dt>0</dt><dd>supports on standard parts</dd></div>
          </dl>
        </div>

        <div className="hero-gallery" aria-label="Selected module previews">
          <figure className="gallery-main">
            <img src={asset("/images/flex-door.png")} alt="Flex-sensor door and flap module assembly preview" />
            <figcaption>Flex-sensor door · active-zone bend</figcaption>
          </figure>
          <figure className="gallery-small gallery-top">
            <img src={asset("/images/servo-gauge.png")} alt="SG90 dashboard gauge assembly preview" />
            <figcaption>Servo gauge</figcaption>
          </figure>
          <figure className="gallery-small gallery-bottom">
            <img src={asset("/images/microbit-stand.png")} alt="micro:bit stand assembly preview" />
            <figcaption>micro:bit stand</figcaption>
          </figure>
        </div>
      </section>

      <section className="audience-strip" aria-labelledby="audience-title">
        <div>
          <p className="section-kicker">TWO WAYS IN</p>
          <h2 id="audience-title">Useful at the student table and the teacher desk.</h2>
        </div>
        <div className="audience-switch" role="group" aria-label="Choose your view">
          <button className={audience === "students" ? "active" : ""} onClick={() => setAudience("students")}>For students</button>
          <button className={audience === "teachers" ? "active" : ""} onClick={() => setAudience("teachers")}>For teachers</button>
        </div>
        <p className="audience-copy">
          {audience === "students"
            ? "Start with what the module does, collect the hardware, follow the student tip, and download only the print-ready parts."
            : "See curriculum fit, first-prototype cautions, shared print settings, and which designs have been physically verified or still need a pilot print."}
        </p>
      </section>

      <section className="library-section" id="library" aria-labelledby="library-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">THE LIBRARY</p>
            <h2 id="library-title">Find the right testbed module.</h2>
          </div>
          <p>Every download contains the main printable parts and a brief README. Fit coupons and reference meshes are intentionally omitted from these streamlined packs.</p>
        </div>

        <div className="library-tools">
          <label className="search-field">
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try: P2.4, flex, servo, light…"
            />
          </label>
          <div className="filter-row" role="group" aria-label="Filter modules by category">
            {filters.map((option) => (
              <button key={option} className={filter === option ? "active" : ""} onClick={() => setFilter(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="results-line" aria-live="polite">
          <span>{visibleModules.length} {visibleModules.length === 1 ? "module" : "modules"}</span>
          {(filter !== "All" || query) && (
            <button onClick={() => { setFilter("All"); setQuery(""); }}>Clear filters</button>
          )}
        </div>

        <div className="module-grid">
          {visibleModules.map((module) => (
            <article className="module-card" key={module.id}>
              <div className="card-image">
                <img
                  src={asset(module.image)}
                  alt={`${module.title} preview`}
                  loading="lazy"
                  style={{ objectPosition: module.imagePosition ?? "center" }}
                />
                <span className={`status status-${module.statusTone}`}>{module.status}</span>
              </div>
              <div className="card-body">
                <div className="card-meta"><span>{module.category}</span><span>{module.version}</span></div>
                <h3>{module.title}</h3>
                <p className="card-summary">{module.summary}</p>
                <p className="learning"><strong>Why it helps:</strong> {module.learning}</p>
                <div className="tag-row" aria-label="Project connections">
                  {module.projectFit.map((tag) => <span key={tag}>{tag}</span>)}
                </div>

                <details>
                  <summary>Hardware &amp; classroom notes</summary>
                  <div className="details-grid">
                    <div>
                      <h4>Hardware</h4>
                      <ul>{module.hardware.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                    <div>
                      <h4>Print pack</h4>
                      <ul>{module.parts.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  </div>
                  <p><strong>Teacher note:</strong> {module.teacherNote}</p>
                  <p><strong>Student tip:</strong> {module.studentTip}</p>
                </details>

                <a className="download-link" href={asset(module.download)} download>
                  Download print pack <span aria-hidden="true">↓</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {visibleModules.length === 0 && (
          <div className="empty-state">
            <h3>No modules match that search.</h3>
            <p>Try a component name, a project number, or clear the category filter.</p>
          </div>
        )}
      </section>

      <section className="print-standard" id="print-standard" aria-labelledby="print-title">
        <div className="standard-intro">
          <p className="section-kicker">SHARED PRINT STANDARD</p>
          <h2 id="print-title">One reliable starting profile.</h2>
          <p>These settings prioritize durable classroom handling, clean M3 features, and consistent LEGO clutch on a Bambu A1 mini.</p>
        </div>
        <div className="settings-grid">
          <div><strong>0.20 mm</strong><span>Standard layer profile</span></div>
          <div><strong>4 walls</strong><span>Strength at towers and terminals</span></div>
          <div><strong>20% gyroid</strong><span>General-purpose infill</span></div>
          <div><strong>Supports off</strong><span>Use supplied orientation</span></div>
          <div><strong>PLA</strong><span>First classroom prototype</span></div>
          <div><strong>0.4 mm</strong><span>Standard nozzle</span></div>
        </div>
        <div className="fit-callout">
          <strong>Coupon-F LEGO interface</strong>
          <p>The shared underside uses a 6.60 mm split-ring clutch tube with a 4.80 mm center and a 0.90 mm relief slot. Keep the LEGO cavity on the build plate and preserve the first-layer settings that produced the successful coupon.</p>
        </div>
      </section>

      <section className="classroom-section" id="classroom" aria-labelledby="classroom-title">
        <div className="classroom-heading">
          <p className="section-kicker">BEFORE A CLASS SET</p>
          <h2 id="classroom-title">Pilot one. Record what worked. Then scale.</h2>
        </div>
        <ol className="process-list">
          <li><span>01</span><div><strong>Print one complete module</strong><p>Use the supplied orientation and common profile. Avoid automatic orientation.</p></div></li>
          <li><span>02</span><div><strong>Check the physical component</strong><p>Confirm nut loading, wire routing, sensor fit, horn clearance, and connector strain relief.</p></div></li>
          <li><span>03</span><div><strong>Test the full input or output range</strong><p>Move slowly, record resting values, and set software limits before student use.</p></div></li>
          <li><span>04</span><div><strong>Save the working printer profile</strong><p>LEGO clutch depends on filament, cooling, and first-layer calibration. Reuse the proven combination.</p></div></li>
        </ol>
      </section>

      <footer>
        <div>
          <strong>PLTW LEGO Module Library</strong>
          <p>Independent classroom design resource for the Innovators &amp; Makers testbed.</p>
        </div>
        <p className="disclaimer">Not affiliated with or endorsed by Project Lead The Way or the LEGO Group. PLTW, micro:bit, and LEGO names are used only to describe compatibility and classroom context.</p>
      </footer>
    </main>
  );
}
