"use client";

/* eslint-disable @next/next/no-img-element -- Static GitHub Pages export uses local preview assets. */

import { useMemo, useState } from "react";

type Category = "Sensors & inputs" | "Circuit building" | "Servo mechanisms" | "micro:bit";
type StatusTone = "classroom" | "mechanism" | "fit" | "prototype";

type HistoryItem = {
  version: string;
  problem: string;
  change: string;
  result: string;
  state: "Current" | "Superseded";
};

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
  dualMount?: boolean;
  cardboardDownload?: string;
  cardboardMount?: "internal" | "edge-tabs";
};

const modules: Module[] = [
  {
    id: "flex-paddle",
    title: "Flex-Sensor Paddle",
    version: "v3.5 · indexed M3 + 3.6 mm paths",
    category: "Sensors & inputs",
    status: "Mechanism confirmed",
    statusTone: "mechanism",
    image: "/images/flex-paddle.png",
    summary: "A three-point bending paddle with 30 solid roof supports, six anchored Coupon-F bores, two internal 3.6 × 1.8 mm paths, and two corrected indexed M3 terminals.",
    learning: "Turns a changing bend into a repeatable analog input while protecting the sensor connector.",
    projectFit: ["P2.4", "P3.2", "Analog input"],
    hardware: ["Flex sensor", "2× M3 × 8", "2× M3 nuts", "Hinge pin"],
    parts: ["Unified dual-mount base", "30 solid roof supports", "6 open Coupon-F bores + C anchors", "Two internal 3.6 × 1.8 mm paths", "Paddle + connector clamp"],
    teacherNote: "The paddle mechanism is physically confirmed. Version 3.5 preserves the clamp, paddle, hinge pin, sensor clearance, and all 52 LEGO seating clearances. It adds 30 full 5.20 × 2.85 mm roof supports and six split-aligned C anchors while keeping all six Coupon-F bores open. Both 3.6 × 1.8 mm paths are clear. Two localized 5.55 mm-AF × 2.45 mm cuts correct the inherited side-loaded tunnels so both nominal 5.50 mm-AF × 2.40 mm nuts sweep without collision at the documented 0° index; both screw bores remain open. Pilot the complete revised assembly before classroom quantities.",
    studentTip: "Install the printed/striped sensor side upward and tighten the clamp only enough to stop the stiff connector from lifting.",
    download: "/downloads/flex-paddle-module-v3-5-solid-supports-anchor-feet-3p6.zip",
    dualMount: true,
  },
  {
    id: "flex-door",
    title: "Flex-Sensor Door / Flap",
    version: "v1.8 · 29 supports + 3.6 mm paths",
    category: "Sensors & inputs",
    status: "Mechanism confirmed",
    statusTone: "mechanism",
    image: "/images/flex-door.png",
    summary: "A confirmed flex-sensor flap with 29 solid roof supports, six anchored Coupon-F bores, two internal 3.6 × 1.8 mm paths, and two indexed M3 terminals.",
    learning: "Connects physical door position to analog readings and makes sensor wear, range, and calibration visible.",
    projectFit: ["P2.4", "P3.2", "Position sensing"],
    hardware: ["Flex sensor", "8-32 × 1.75 in", "8-32 nut", "2× M3 × 8"],
    parts: ["Unified dual-mount base", "29 solid roof supports", "6 open Coupon-F bores + C anchors", "Two internal 3.6 × 1.8 mm paths", "Extended flap + 10 mm guide"],
    teacherNote: "Version 1.8 preserves the physically confirmed 45 mm bend and 8-32 hinge plus the door, guide, clamp, pin, stem support, raised deck, and all 48 LEGO seating clearances. It adds 29 full 5.20 × 2.85 mm supports and six C anchors while leaving all six Coupon-F bores open. Both 3.6 × 1.8 mm paths, two 0° indexed M3 nut routes, and two screw bores are clear without corrective nut cuts. Pilot the revised LEGO, cardboard, M3, sensor, and motion assembly before quantities.",
    studentTip: "Move the flap slowly on the first test and confirm the striped active area bends—not the white connector stem.",
    download: "/downloads/flex-door-flap-module-v1-8-solid-supports-anchor-feet-3p6.zip",
    dualMount: true,
  },
  {
    id: "pressure-pad",
    title: "FSR Pressure Pad",
    version: "v1.4 · 39 supports + 3.6 mm paths",
    category: "Sensors & inputs",
    status: "Fit confirmed",
    statusTone: "fit",
    image: "/images/pressure-pad.png",
    summary: "A removable object platform and puck above 39 solid roof supports, six anchored Coupon-F bores, and two internal 3.6 × 1.8 mm paths.",
    learning: "Helps students trigger the sensor with classroom objects instead of relying on a fingertip press.",
    projectFit: ["P3.2", "Force input", "Object trigger"],
    hardware: ["29ILFSR402 / FSR402", "Mini zip tie"],
    parts: ["Unified dual-mount base", "39 solid roof supports", "6 open Coupon-F bores + C anchors", "Two internal 3.6 × 1.8 mm paths", "Top plate + three pucks"],
    teacherNote: "Version 1.4 preserves the physically confirmed circular pocket, corrected 7.8 mm stem channel, top plate, actuator stem, three pucks, and all 60 LEGO seating clearances. It adds 39 full 5.20 × 2.85 mm supports and six split-aligned C anchors while keeping all six Coupon-F bores and both 3.6 × 1.8 mm paths open. M3 hardware is not used on this base. Pilot the complete revised sensor, LEGO, cardboard, and brass-fastener assembly before quantities.",
    studentTip: "Start with the 1.0 mm puck. The empty platform should read like no platform, while a light press should change the value.",
    download: "/downloads/fsr402-pressure-pad-module-v1-4-solid-supports-anchor-feet-3p6.zip",
    dualMount: true,
  },
  {
    id: "pressure-universal",
    title: "Universal Pressure Testbed",
    version: "v2.6 · 49 supports + 3.6 mm paths",
    category: "Sensors & inputs",
    status: "Prototype",
    statusTone: "prototype",
    image: "/images/pressure-universal.png",
    summary: "An FSR testbed with 49 solid roof supports, six anchored Coupon-F bores, two internal 3.6 × 1.8 mm paths, and two indexed end-loaded M3 terminals.",
    learning: "Lets teams compare actuator shape, platform area, trigger threshold, and repeatability on the same sensor base.",
    projectFit: ["P3.2", "Design iteration", "Testing"],
    hardware: ["FSR402-style sensor", "2× M3 × 6", "2× M3 nuts"],
    parts: ["Unified dual-mount base", "49 solid roof supports", "6 open Coupon-F bores + C anchors", "Two internal 3.6 × 1.8 mm paths", "Carrier + tops + pucks"],
    teacherNote: "Version 2.6 preserves the FSR pocket, carrier, clamp, three tops, two pucks, hard stops, and all 72 LEGO seating clearances. It adds 49 full 5.20 × 2.85 mm supports with a validated 0.05 mm roof overlap and six C anchors while keeping all six Coupon-F bores open. Both 3.6 × 1.8 mm paths, two extended-end 0° indexed M3 nut routes, and two screw bores are clear without corrective nut cuts. This remains a trigger testbed, not a calibrated scale; pilot the full revised assembly.",
    studentTip: "Change only one top or puck at a time, then record the empty and loaded readings before comparing designs.",
    download: "/downloads/fsr402-universal-pressure-module-v2-6-solid-supports-anchor-feet-3p6.zip",
    dualMount: true,
  },
  {
    id: "photocell",
    title: "Photocell Module Family",
    version: "v1.6 · 3.6 mm paths + anchor feet",
    category: "Sensors & inputs",
    status: "Prototype",
    statusTone: "prototype",
    image: "/images/photocell.png",
    summary: "Three GL55 photocell bases each use eight solid roof supports, four anchored Coupon-F bores, two open 3.6 × 1.8 mm paths, and two indexed M3 terminals.",
    learning: "Makes light interactions purposeful instead of treating every photocell as an exposed room-light sensor.",
    projectFit: ["P2.4", "P3.2", "Light input"],
    hardware: ["5 mm GL5516 / GL5528", "2× M3 terminals per module"],
    parts: ["Ambient + / P base", "Beam + / P base", "Cover + / P base", "8 supports + 4 open bores/C anchors per base", "Two open 3.6 × 1.8 mm paths per base"],
    teacherNote: "Version 1.6 preserves all three upper housings and + / P labels. Each base has eight full 5.20 × 2.85 mm supports, four open Coupon-F bores with split-aligned C anchors, 20 clear body LEGO positions plus four clear tab-continuation positions, two open 3.6 × 1.8 mm paths, two 30° indexed outward-loading nut routes, and two open screw bores; no corrective nut cuts were needed. The photocell is non-polarized. Pilot every selected housing with the actual LEGO, sensor, M3 hardware, cardboard, and brass fasteners.",
    studentTip: "Choose the interaction, then connect + to 3V and P to the micro:bit signal/resistor junction.",
    download: "/downloads/photocell-module-family-v1-6-solid-supports-anchor-feet-3p6.zip",
    dualMount: true,
  },
  {
    id: "potentiometer",
    title: "Potentiometer Control Dial",
    version: "v1.4 · indexed M3 + 3.6 mm paths",
    category: "Sensors & inputs",
    status: "Prototype",
    statusTone: "prototype",
    image: "/images/potentiometer.png",
    summary: "A vertical 16 mm potentiometer mount with 11 solid roof supports, four anchored Coupon-F bores, two open 3.6 × 1.8 mm paths, and three indexed M3 terminals.",
    learning: "Provides a continuous analog dial for combinations, thresholds, LED brightness, servo position, or interaction choices.",
    projectFit: ["P2.4", "P3.2", "Continuous control"],
    hardware: ["16 mm 10 kΩ potentiometer", "3× M3 × 6", "3× M3 nuts", "Short wires"],
    parts: ["Unified dual-mount base", "11 solid roof supports", "4 open Coupon-F bores + C anchors", "Two open 3.6 × 1.8 mm paths", "Two knobs + fit coupons"],
    teacherNote: "Do not print the old base with circular cardboard ears: its end tab blocks the middle M3 path. Version 1.4 preserves the panel, bushing, labels, knobs, 11 full 5.20 × 2.85 mm supports, four open Coupon-F bores with C anchors, 24 body LEGO clearances, and four tab-continuation clearances. Both long-side paths are open at 3.6 × 1.8 mm. All three +X nut routes pass full nominal 5.50 mm-AF × 2.40 mm sweeps at the documented 30° index, all three screw bores remain open, and no corrective nut cuts were needed. Pilot the complete assembly.",
    studentTip: "Connect the center pin to SIG. Swap the two outside connections if clockwise rotation changes the value the wrong way.",
    download: "/downloads/potentiometer-control-dial-module-v1-4-solid-supports-anchor-feet-3p6.zip",
    dualMount: true,
  },
  {
    id: "resistor",
    title: "Compact Resistor Terminal",
    version: "v2.9 · 3.6 mm paths",
    category: "Circuit building",
    status: "Fit confirmed",
    statusTone: "fit",
    image: "/images/resistor.png",
    summary: "A protected ¼-watt resistor cradle with two M3 terminals, four solid roof supports, four anchored Coupon-F bores, and two open 3.6 × 1.8 mm cardboard paths.",
    learning: "Moves repeated clip wear away from fragile resistor leads and makes voltage-divider junctions easier to see.",
    projectFit: ["P2.4", "P3.2", "Voltage divider"],
    hardware: ["47 kΩ ¼ W resistor", "2× M3 × 6", "2× M3 nuts", "2× washers"],
    parts: ["F-fit dual-mount base", "4 solid roof supports", "4 open Coupon-F bores + C anchors", "Two open 3.6 × 1.8 mm brad paths", "Raised + / − labels"],
    teacherNote: "The v2.7 LEGO fit was physically reported excellent. Version 2.9 preserves the v2.8 cradle, polarity labels, two indexed M3 nut paths, two screw bores, four solid roof supports, and four open Coupon-F bores with C anchors while widening only the two cardboard openings to 3.6 × 1.8 mm. The exact mesh is validated; pilot the revised cardboard fit before classroom quantities.",
    studentTip: "Loop each resistor lead beneath its washer and tighten gently. The shared terminal can accept clips on opposite sides.",
    download: "/downloads/compact-resistor-module-v2-9-dual-mount-polarity-3p6.zip",
    dualMount: true,
  },
  {
    id: "single-led",
    title: "Single-LED M3 Terminal Module",
    version: "v1.1 · 3.6 mm paths",
    category: "Circuit building",
    status: "Prototype",
    statusTone: "prototype",
    image: "/images/single-led-module.png",
    summary: "One 5 mm LED uses two marked M3 terminals, four solid roof supports, four anchored Coupon-F bores, and two open 3.6 × 1.8 mm cardboard paths.",
    learning: "Protects one LED’s leads, keeps polarity visible, and gives alligator clips durable metal contact points without using the three-output footprint.",
    projectFit: ["P2.4", "P3.2", "Visual output"],
    hardware: ["1× 5 mm LED", "2× M3 × 6", "2× M3 nuts", "2× washers", "Current-limiting resistor"],
    parts: ["Compact dual-mount base", "Two M3 terminals", "4 solid roof supports", "4 open Coupon-F bores + C anchors", "Two open 3.6 × 1.8 mm brad paths"],
    teacherNote: "Version 1.1 starts from the validated v1.0 module and widens only its two open cardboard paths to 3.6 × 1.8 mm. It retains four solid roof supports, four open Coupon-F bores with aligned C anchors, two indexed M3 nut paths, two screw bores, the centered 5.25 mm blind LED pocket, its solid floor, and both lead exits. Pilot the complete LED, LEGO, M3, and cardboard assembly before classroom quantities.",
    studentTip: "Bend the LED leads gently toward the marked terminals, connect the longer lead to +, and always use the required current-limiting resistor.",
    download: "/downloads/single-led-m3-module-v1-1-open-tabs-solid-supports-anchor-feet-3p6.zip",
    dualMount: true,
  },
  {
    id: "led",
    title: "Three-LED M3 Terminal Module",
    version: "v2.8 · indexed M3 + 3.6 mm paths",
    category: "Circuit building",
    status: "Mechanism confirmed",
    statusTone: "mechanism",
    image: "/images/led-module.png",
    summary: "Three 5 mm LEDs use six indexed M3 nut paths and screw bores, 18 solid roof supports, six anchored Coupon-F bores, and two open 3.6 × 1.8 mm cardboard paths.",
    learning: "Protects LED leads, keeps polarity visible, and gives alligator clips durable metal contact points.",
    projectFit: ["P2.4", "P3.2", "Visual output"],
    hardware: ["3× 5 mm LEDs", "6× M3 terminals", "Current-limiting resistors"],
    parts: ["F-fit dual-mount base", "Six indexed M3 terminals", "18 solid roof supports", "6 open Coupon-F bores + C anchors", "Two open 3.6 × 1.8 mm brad paths"],
    teacherNote: "The LED holder and terminal layout worked physically. Version 2.8 retains all 18 solid non-gripping roof supports, six open Coupon-F bores with aligned C anchors, six screw bores, and three 5.25 mm LED pockets. Both cardboard paths are 3.6 × 1.8 mm, and all six 5.5 mm-AF × 2.4 mm nuts now have zero-collision swept loading paths in the documented 30° indexed orientation. Pilot the revised M3 and cardboard fit before a class set.",
    studentTip: "Match the longer LED lead to + before bending the leads toward the M3 terminals. Never omit the required resistor.",
    download: "/downloads/three-led-m3-module-v2-8-open-tabs-solid-supports-anchor-feet-3p6.zip",
    dualMount: true,
  },
  {
    id: "buzzer",
    title: "Piezo Buzzer Terminal Module",
    version: "v2.3 · 3.6 mm paths",
    category: "Circuit building",
    status: "Prototype",
    statusTone: "prototype",
    image: "/images/buzzer.png",
    summary: "A compact buzzer holder keeps two M3 nut paths clear above four solid roof supports, four anchored Coupon-F bores, and two open 3.6 × 1.8 mm cardboard paths.",
    learning: "Makes polarity and durable sound-output wiring visible while keeping hardware above the LEGO interface.",
    projectFit: ["P2.4", "P3.2", "Sound output"],
    hardware: ["PLTW 26SMDBZ1 buzzer", "2× M3 × 8", "2× M3 nuts", "2× washers"],
    parts: ["19.5 mm dual-mount base", "4 solid roof supports", "4 open Coupon-F bores + C anchors", "Two open 3.6 × 1.8 mm brad paths", "Fit coupons"],
    teacherNote: "Version 2.3 preserves the 19.5 mm locator, two indexed M3 nut paths, two screw bores, four solid roof supports, and four open Coupon-F bores with C anchors while widening only the two open cardboard paths to 3.6 × 1.8 mm. The complete buzzer remains a prototype; pilot the actual board, terminals, sound, LEGO fit, M3 hardware, and cardboard mount before a class set.",
    studentTip: "Place − on the left and + on the right, then tighten only enough for reliable electrical contact.",
    download: "/downloads/piezo-buzzer-module-v2-3-open-tabs-solid-supports-anchor-feet-3p6.zip",
    dualMount: true,
  },
  {
    id: "microbit",
    title: "micro:bit Original-Guide Stand",
    version: "v5.6 · reinforced towers + 3.6 mm paths",
    category: "micro:bit",
    status: "Mechanism confirmed",
    statusTone: "mechanism",
    image: "/images/microbit-stand.png",
    summary: "An upright exact-guide stand with full-height reinforced towers, 39 solid roof supports, six anchored Coupon-F bores, and two internal 3.6 × 1.8 mm cardboard paths.",
    learning: "Keeps the display visible while preserving access to P0, P1, P2, 3V, and GND during testing.",
    projectFit: ["P2.4", "P3.2", "Testbed organization"],
    hardware: ["micro:bit", "Included 56 mm clip guide STL", "2× classroom brass fasteners"],
    parts: ["Reinforced exact-guide stand", "Full-height rear/outward tower spines", "39 solid roof supports", "6 open Coupon-F bores + C anchors", "Microbit Alligator Clip Guide v2", "3.2 / 3.4 / 3.6 mm brad coupon"],
    teacherNote: "The guide and LEGO relationships are inherited from the confirmed stand, but the original 5.10 mm-thick towers physically snapped. Version 5.6 adds full-height rear/outward L-shaped spines and smooth supportless root buttresses without changing either guide-facing surface. The upper tower area is about 2× and calculated bending inertia is 3.76–4.63× the v5.5 value. All 39 roof supports and six open Coupon-F bores with C anchors remain unchanged, all 60 LEGO seating clearances remain open, and both 3.6 × 1.8 mm paths are preserved. Pilot tower durability before classroom quantities.",
    studentTip: "Slide the micro:bit into the guide first, hold the printed base—not a tower—and lower the guide vertically between the towers.",
    download: "/downloads/microbit-original-guide-stand-v5-6-reinforced-towers-solid-supports-3p6.zip",
    dualMount: true,
  },
  {
    id: "servo-horizontal",
    title: "SG90 Horizontal Cradle",
    version: "v1.6 · 3.6 mm paths",
    category: "Servo mechanisms",
    status: "Fit confirmed",
    statusTone: "fit",
    image: "/images/servo-horizontal.png",
    summary: "A supportless SG90 cradle with 29 solid roof supports, six anchored Coupon-F bores, two internal 3.6 × 1.8 mm cardboard paths, dual horn gaps, and a retaining strap.",
    learning: "Provides a shared base for horizontal pointers, linkages, continuous-servo spools, and student mechanisms.",
    projectFit: ["P2.4", "P3.2", "Servo foundation"],
    hardware: ["SG90-size servo", "2× original mounting screws"],
    parts: ["Dual-mount F-fit base", "29 solid roof supports", "6 open Coupon-F bores + C anchors", "Two internal 3.6 × 1.8 mm paths", "Retaining strap"],
    teacherNote: "Version 1.6 preserves the confirmed 12.4 mm body fit, 1.8 mm pilots, horn gaps, wire exit, strap, all 29 solid roof supports, and six open Coupon-F bores with C anchors. Only the two top-open internal cardboard paths are widened to 3.6 × 1.8 mm. Pilot the revised cardboard fit and complete servo assembly before quantities.",
    studentTip: "Keep the label upward, choose the horn-side gap that gives the wire the straighter path, then install the strap.",
    download: "/downloads/sg90-horizontal-cradle-v1-6-internal-paths-solid-supports-anchor-feet.zip",
    dualMount: true,
  },
  {
    id: "servo-vertical",
    title: "SG90 Vertical Cradle",
    version: "v1.3 · 3.6 mm open paths",
    category: "Servo mechanisms",
    status: "Fit confirmed",
    statusTone: "fit",
    image: "/images/servo-vertical.png",
    summary: "A compact upright SG90 mount with 15 solid roof supports, six anchored Coupon-F bores, two open 3.6 × 1.8 mm cardboard paths, aligned ear pilots, and wire portals.",
    learning: "Supports upright wheels, levers, flags, pointers, and continuous-rotation mechanisms on a small footprint.",
    projectFit: ["P2.4", "P3.2", "Servo foundation"],
    hardware: ["SG90-size servo", "2× original mounting screws"],
    parts: ["Open-tab F-fit base", "13 full + 2 portal-trimmed solid supports", "6 open Coupon-F bores + C anchors", "Two open 3.6 × 1.8 mm paths", "Brad-fit coupon"],
    teacherNote: "Version 1.3 preserves the confirmed 12.5 mm body channel, 27.5 mm ear spacing, 1.8 mm pilots, wire portals, six open Coupon-F bores with C anchors, and all four tab-continuation LEGO clearances. Its 15 solid supports remain 13 full-round plus two portal-trimmed supports with solid cores; only the two open cardboard paths are widened to 3.6 × 1.8 mm. Pilot the revised tabs before quantities.",
    studentTip: "Route the cable through the closest lower portal before seating both mounting ears on the tower tops.",
    download: "/downloads/sg90-vertical-cradle-v1-3-open-tabs-solid-supports-anchor-feet.zip",
    dualMount: true,
  },
  {
    id: "servo-gauge",
    title: "Upright Dashboard Gauge",
    version: "v2.1 · 3.6 mm paths",
    category: "Servo mechanisms",
    status: "Mechanism confirmed",
    statusTone: "mechanism",
    image: "/images/servo-gauge.png",
    summary: "A supportless SG90 gauge with 29 solid roof supports, six anchored Coupon-F bores, two internal 3.6 × 1.8 mm paths, and three interchangeable 60 mm panels.",
    learning: "Maps sensor values or program states to a physical display students can read across the table.",
    projectFit: ["P2.4", "P3.2", "Physical display"],
    hardware: ["Positional SG90", "Single-arm horn", "Original servo screws"],
    parts: ["Label-up dual-mount base", "29 solid roof supports", "6 open Coupon-F bores + C anchors", "Two internal 3.6 × 1.8 mm paths", "Retaining strap", "Three panels"],
    teacherNote: "Version 2.1 preserves the successful panel width, label-up holder, servo fit, pointer clearance, wire exit, retaining strap, all three panels, 29 solid roof supports, and six open Coupon-F bores with C anchors. Only its two top-open internal cardboard paths are widened to 3.6 × 1.8 mm. Pilot the revised cardboard fit and full pointer sweep before quantities.",
    studentTip: "Center the servo before attaching the pointer, then test the full sweep slowly to avoid rubbing the panel.",
    download: "/downloads/sg90-upright-dashboard-gauge-v2-1-solid-supports-anchor-feet.zip",
    dualMount: true,
  },
  {
    id: "servo-latch",
    title: "Positional Latch / Deadbolt",
    version: "v1.3 · 3.6 mm paths",
    category: "Servo mechanisms",
    status: "Prototype",
    statusTone: "prototype",
    image: "/images/servo-latch.png",
    summary: "A supportless SG90 latch retains 29 solid roof supports, six anchored Coupon-F bores, and two internal 3.6 × 1.8 mm paths beneath its reinforced keeper.",
    learning: "Gives P2.4 safe projects a clear locked/unlocked output with adjustable software endpoints.",
    projectFit: ["P2.4", "Security mechanism", "Digital output"],
    hardware: ["Positional SG90", "Single-arm horn", "Original servo screws"],
    parts: ["Dual-mount latch base", "29 solid roof supports", "6 open Coupon-F bores + C anchors", "Two internal 3.6 × 1.8 mm paths", "Retaining strap"],
    teacherNote: "Version 1.3 preserves the keeper, horn clearance, servo fit, retaining strap, 29 solid roof supports, and six open Coupon-F bores with C anchors while widening only the two top-open internal cardboard paths to 3.6 × 1.8 mm. Start near 90° unlocked and 0° locked, then physically pilot the cardboard fit, motion, and safe endpoints.",
    studentTip: "Never force the horn against the keeper. Move in small angle steps until you find safe LOCKED and UNLOCKED values.",
    download: "/downloads/sg90-latch-deadbolt-module-v1-3-solid-supports-anchor-feet.zip",
    dualMount: true,
  },
  {
    id: "servo-door",
    title: "Positional Door / Flap Linkage",
    version: "v1.3 · 3.6 mm paths",
    category: "Servo mechanisms",
    status: "Prototype",
    statusTone: "prototype",
    image: "/images/servo-door.png",
    summary: "A supportless SG90 door base retains 39 solid roof supports, six anchored Coupon-F bores, and two internal 3.6 × 1.8 mm paths for its hinged flap linkage.",
    learning: "Lets students compare range of motion, linkage length, force, and mechanical advantage.",
    projectFit: ["P2.4", "P3.2", "Mechanical linkage"],
    hardware: ["Positional SG90", "8-32 × 1.75 in", "Paperclip wire pins"],
    parts: ["Dual-mount base", "39 solid roof supports", "6 open Coupon-F bores + C anchors", "Two internal 3.6 × 1.8 mm paths", "Hinged flap", "Three link lengths"],
    teacherNote: "Version 1.3 preserves the 8-32 hinge, 0.5 mm flap side clearance, servo fit, retaining strap, three links, two 3.6 mm flap attachment holes, all 39 solid roof supports, and six open Coupon-F bores with C anchors. Only the two top-open internal cardboard paths are widened to 3.6 × 1.8 mm. Physically pilot cardboard fit, binding, force, and safe endpoints.",
    studentTip: "Start with the 26.0 mm link, test each of the two flap attachment holes, and move the servo in small software steps to find safe limits.",
    download: "/downloads/sg90-door-flap-linkage-module-v1-3-solid-supports-anchor-feet.zip",
    dualMount: true,
  },
];

const developmentHistory: Record<string, HistoryItem[]> = {
  "flex-paddle": [
    { version: "v2.8-v3.1", problem: "Screw heads blocked paddle travel; a drilled zip-tie workaround proved the bending geometry.", change: "Moved retention away from the paddle and preserved the proven three-point bend.", result: "Paddle motion and sensor response were physically confirmed.", state: "Superseded" },
    { version: "v3.3", problem: "The connector still needed side-to-side control and serviceable nuts.", change: "Added a surrounding M3 clamp with resistor-style captive nut loading.", result: "Mechanism-confirmed foundation retained by the dual-mount revisions.", state: "Superseded" },
    { version: "v3.4", problem: "The paddle needed a direct cardboard mounting option.", change: "Added two recessed 3.4 × 1.8 mm paths to the Coupon-F base.", result: "Superseded after the shared audit found hollow safe roof-support centers and slight interference along both inherited full nut sweeps.", state: "Superseded" },
    { version: "v3.5", problem: "Thirty safe roof centers needed support, the paths needed 3.6 mm openings, and both side-loaded nuts needed provable full-sweep clearance.", change: "Added 30 full supports and six C anchors, widened both paths to 3.6 × 1.8 mm, and made two localized 5.55 mm-AF × 2.45 mm clearance cuts at the documented 0° index while retaining six open bores, 52 LEGO clearances, and two screw axes.", result: "Current exact-mesh recommendation; the mechanism is confirmed and the complete revised LEGO, M3, and cardboard assembly needs one physical pilot.", state: "Current" },
  ],
  "flex-door": [
    { version: "v1.4", problem: "A bend near the connector stem produced little useful value change.", change: "Moved the bend to 45 mm and changed the hinge to 8-32 hardware.", result: "The 45 mm bend and 8-32 hinge were physically confirmed.", state: "Superseded" },
    { version: "v1.6", problem: "The strip could slide upward and needed more stem support at 90 degrees.", change: "Extended the flap while preserving the proven v1.4 motion.", result: "Mechanism-confirmed foundation retained by the dual-mount revisions.", state: "Superseded" },
    { version: "v1.7", problem: "The confirmed mechanism needed direct cardboard mounting.", change: "Added two recessed 3.4 × 1.8 mm paths to the Coupon-F base.", result: "Superseded because the broad roof still relied on hollow safe support centers.", state: "Superseded" },
    { version: "v1.8", problem: "Twenty-nine safe roof centers needed support and both cardboard paths needed the 3.6 mm opening.", change: "Added 29 full supports and six split-aligned C anchors and widened both paths to 3.6 × 1.8 mm while retaining six open bores, 48 LEGO clearances, two clear 0° indexed nut routes, two screw bores, and the complete upper mechanism.", result: "Current exact-mesh mechanism-confirmed recommendation; physically pilot the revised dual mount, M3 hardware, sensor, and flap motion.", state: "Current" },
  ],
  "pressure-pad": [
    { version: "v1.1", problem: "The round pocket fit, but the connector-equipped sensor stem was too tight.", change: "Widened the stem channel to 7.8 mm.", result: "Circular pocket fit was confirmed; wider channel followed the physical coupon result.", state: "Superseded" },
    { version: "v1.2", problem: "The earlier download still used the older LEGO underside.", change: "Combined the wider channel with the preferred Coupon-F interface.", result: "Fit-confirmed sensor foundation retained by the dual-mount revisions.", state: "Superseded" },
    { version: "v1.3", problem: "The pressure pad needed direct cardboard mounting.", change: "Added two recessed 3.4 × 1.8 mm paths to the Coupon-F base.", result: "Superseded because 39 safe support centers remained hollow beneath the broad roof.", state: "Superseded" },
    { version: "v1.4", problem: "Thirty-nine safe roof centers needed support and both paths needed the 3.6 mm opening.", change: "Added 39 full supports and six C anchors and widened both paths to 3.6 × 1.8 mm while retaining six open bores, all 60 LEGO clearances, the confirmed pocket, top plate, actuator stem, and three pucks; M3 is not used.", result: "Current exact-mesh fit-confirmed recommendation; pilot the complete sensor, LEGO, cardboard, and brass-fastener assembly.", state: "Current" },
  ],
  "pressure-universal": [
    { version: "v2-v2.3", problem: "The interchangeable surfaces worked as a design direction, but captive nuts did not reliably align with the screw axes.", change: "Extended the connector area and iterated the clamp and nut tunnels.", result: "Superseded because assembly access remained unreliable.", state: "Superseded" },
    { version: "v2.4", problem: "Nuts could not be seated accurately from the earlier openings.", change: "Both nuts now load from the extended connector end into 5.8 mm pockets.", result: "Printable mechanism foundation retained by the dual-mount revisions.", state: "Superseded" },
    { version: "v2.5", problem: "The testbed needed compact cardboard mounting.", change: "Added two recessed 3.4 × 1.8 mm paths without changing the carrier, clamp, tops, or pucks.", result: "Superseded because 49 safe support centers remained hollow beneath the roof.", state: "Superseded" },
    { version: "v2.6", problem: "Forty-nine safe roof centers needed support and both paths needed the 3.6 mm opening.", change: "Added 49 full supports with a validated 0.05 mm roof overlap and six C anchors and widened both paths to 3.6 × 1.8 mm while retaining six open bores, 72 LEGO clearances, two clear 0° indexed end-loaded nut routes, and two screw bores.", result: "Current watertight prototype; physically pilot the sensor, M3 clamp, interchangeable parts, LEGO, and cardboard assembly.", state: "Current" },
  ],
  photocell: [
    { version: "Concept", problem: "One exposed photocell did not demonstrate the different interactions used in P2.4 and P3.2.", change: "Separated ambient, interrupted-beam, and covered-light interactions.", result: "Three useful activity-specific concepts were selected.", state: "Superseded" },
    { version: "v1", problem: "The family needed durable terminals and the shared LEGO interface.", change: "Added M3 terminals and Coupon-F undersides to all three housings.", result: "Component housings and activity fit still require physical testing.", state: "Superseded" },
    { version: "v1.1", problem: "The first cardboard adaptation used the older edge-tab construction.", change: "Added brass-fastener tabs, but their enclosed underside was not the final supportless standard.", result: "Superseded before classroom confirmation.", state: "Superseded" },
    { version: "v1.2", problem: "The family needed cardboard mounting without blocking the M3 nut openings or creating a hidden partition.", change: "Placed open 3.4 × 1.8 mm brick-style tabs on the opposite edges from the end-loaded nuts and joined their cavities to the LEGO underside.", result: "Mounting geometry established for the labeled revision.", state: "Superseded" },
    { version: "v1.3", problem: "Students needed to distinguish the supply and signal terminals during voltage-divider assembly.", change: "Added raised + and P markings to all three bases without changing the v1.2 mounting or sensor geometry.", result: "Terminal convention established for the solid-foot revision.", state: "Superseded" },
    { version: "v1.4", problem: "Solid feet intended to improve bridging were placed on the actual LEGO stud centers.", change: "Withdrew the package after visual review showed that it could not seat on a LEGO plate.", result: "Do not print; superseded before physical testing.", state: "Superseded" },
    { version: "v1.5", problem: "The supportless underside still needed solid roof supports without blocking LEGO studs.", change: "Preserved the four corner Coupon-F clutch tubes and filled the eight non-gripping tubes at their original between-stud centers.", result: "Corrected solid-support foundation; superseded by the unified anchor-foot and 3.6 mm revision.", state: "Superseded" },
    { version: "v1.6", problem: "All three bases needed first-layer clutch anchors and the shared 3.6 mm cardboard opening.", change: "Each base retains eight full supports and gains four split-aligned C anchors while keeping four Coupon-F bores, 20 body and four tab-continuation LEGO clearances, two 3.6 × 1.8 mm paths, two clear 30° indexed nut routes, and two screw bores.", result: "Current exact-mesh three-base prototype; physically pilot Ambient, Beam, or Cover with the selected sensor, M3 hardware, LEGO, and cardboard interface.", state: "Current" },
  ],
  potentiometer: [
    { version: "Concept", problem: "Students needed a repeatable continuous input for both curriculum projects.", change: "Selected a common 16 mm, 10 kOhm potentiometer with three visible terminals.", result: "Control and wiring requirements established.", state: "Superseded" },
    { version: "v1", problem: "The shaft, bushing, knob, and terminal access had to remain supportless.", change: "Added a vertical mount, two knob choices, three M3 terminals, and the Coupon-F underside.", result: "Working design foundation; physical component and full-assembly confirmation remain pending.", state: "Superseded" },
    { version: "v1.1", problem: "The first cardboard adaptation kept enclosed edge tabs on the same ends as the M3 nut-loading paths.", change: "Widened the brass-fastener slit to 3.4 × 1.8 mm but retained the obstructed tab layout.", result: "Superseded before classroom confirmation; do not use as the current dual-mount base.", state: "Superseded" },
    { version: "v1.2", problem: "The module needed stronger first-layer anchoring and supportless cardboard mounting without blocking any M3 nut path.", change: "Added four split-aligned C feet, kept all 15 tube bores hollow, and moved open brick-style tabs to the long sides.", result: "Physical support-free print failed: long cavity-roof bridges collapsed into loose strands because the 11 non-gripping support centers were hollow.", state: "Superseded" },
    { version: "v1.3", problem: "The physically failed roof needed local support without blocking LEGO studs or the four compliant clutch bores.", change: "Filled all 11 non-gripping between-stud tube centers through the roof, retained four open Coupon-F bores with aligned C anchors, and preserved both open tabs and every M3 path.", result: "Supportless correction retained; superseded by the shared 3.6 mm path revision.", state: "Superseded" },
    { version: "v1.4", problem: "Both long-side cardboard paths needed the 3.6 mm opening and every nut route needed full-sweep verification.", change: "Widened both paths to 3.6 × 1.8 mm while retaining 11 supports, four open bores and C anchors, 24 body and four continuation LEGO clearances, three clear 30° indexed +X nut routes, and three screw bores; no corrective nut cuts were needed.", result: "Current exact-mesh correction; physically pilot the complete potentiometer, M3, LEGO, cardboard, and knob assembly.", state: "Current" },
  ],
  resistor: [
    { version: "v1-v2", problem: "The first body was too large and printed holes were too loose to hold screws.", change: "Reduced the footprint to 40 x 24 mm and changed to captive metal M3 nuts.", result: "Compact terminal arrangement and nut method were physically successful.", state: "Superseded" },
    { version: "v2.1-v2.6", problem: "Early cardboard extensions obstructed LEGO seating, printed poorly, or interfered with the M3 nut-loading path.", change: "Removed the internal partition and changed to open, brick-style external tabs with no floor below the brad head.", result: "Superseded by the physically tested v2.7 geometry.", state: "Superseded" },
    { version: "v2.7", problem: "The dual-mount version needed dependable LEGO clutch and accessible end-loaded nuts.", change: "Combined the F-fit underside, open tabs, 3.4 × 1.8 mm slits, and unobstructed captive-nut access.", result: "Physical test: LEGO fit was reported excellent.", state: "Superseded" },
    { version: "v2.8", problem: "Students still needed terminal polarity visible from above.", change: "Added raised + and − symbols without changing the confirmed v2.7 mounting geometry.", result: "Mechanically fit-confirmed foundation; superseded by the widened-path v2.9 package.", state: "Superseded" },
    { version: "v2.9", problem: "The shared classroom brass-fastener standard moved from a 3.4 mm to a 3.6 mm overall opening.", change: "Widened only the two open paths to 3.6 × 1.8 mm while retaining four solid supports, four open Coupon-F bores with C anchors, polarity labels, and both indexed M3 paths and screw bores.", result: "Current exact-mesh recommendation; the inherited LEGO fit is confirmed and the revised cardboard opening needs one physical pilot.", state: "Current" },
  ],
  "single-led": [
    { version: "Concept", problem: "A one-output activity did not need the footprint or six terminals of the three-LED module.", change: "Selected the confirmed compact resistor dual-mount foundation for one centered 5 mm LED and two durable M3 terminals.", result: "Established a smaller one-LED layout without introducing a new LEGO or cardboard interface.", state: "Superseded" },
    { version: "v1.0", problem: "The compact module still needed supportless roof geometry, clear captive-nut loading, polarity guidance, and a stable LED pocket.", change: "Preserved four solid roof supports, four open Coupon-F bores with aligned C anchors, two end-loaded M3 paths, and open tabs; replaced the resistor cradle with a centered 5.25 mm blind LED pocket.", result: "Validated one-LED foundation; superseded by the shared 3.6 mm cardboard-path revision.", state: "Superseded" },
    { version: "v1.1", problem: "The two cardboard openings needed to match the 3.6 mm classroom fastener standard.", change: "Widened only both open paths to 3.6 × 1.8 mm while retaining four supports, four open bores and C anchors, two indexed nut paths and screw bores, the blind LED floor, and both lead exits.", result: "Current watertight, clearance-validated prototype; pilot the complete LED, M3, LEGO, and cardboard assembly.", state: "Current" },
  ],
  led: [
    { version: "v2-v2.2", problem: "The LED holder worked, but the first LEGO underside did not; polarity also needed to be obvious.", change: "Added durable M3 terminals and + / - markings.", result: "LED bodies and terminal arrangement worked physically.", state: "Superseded" },
    { version: "v2.3", problem: "The otherwise successful top needed the preferred clutch geometry.", change: "Applied the Coupon-F underside without changing the LED layout.", result: "LED and LEGO features were retained as the working foundation.", state: "Superseded" },
    { version: "v2.4", problem: "The first cardboard adaptation used the older edge-tab construction.", change: "Added brass-fastener tabs, but their enclosed underside was not the final supportless standard.", result: "Superseded before classroom confirmation.", state: "Superseded" },
    { version: "v2.5", problem: "The LED module needed the same open, unobstructed cardboard mounting learned from the resistor module.", change: "Added 3.4 × 1.8 mm open brick-style tabs on the ends while leaving all six M3 nut slots accessible.", result: "Established the correct tab and portal geometry; superseded by the anchored first-layer revision before a full dual-mount pilot.", state: "Superseded" },
    { version: "v2.6", problem: "The six Coupon-F rings still began as narrow first-layer islands even though the tab paths were already correct.", change: "Added six 0.60 mm C-shaped pads aligned to the inward clutch splits while preserving all 24 original tube centerlines, both open tab portals, and every LED and M3 opening.", result: "Superseded after the supportless-printing audit found all 18 non-clutch roof-support tubes still hollow.", state: "Superseded" },
    { version: "v2.7", problem: "Eighteen hollow non-gripping tubes left repeated unsupported circular bridges beneath the broad cavity roof.", change: "Made all 18 non-gripping centers solid through the roof while preserving six open Coupon-F bores and C anchors, both open tabs, all three LED pockets, six screw axes, and six M3 nut-loading paths.", result: "Solid-support foundation retained; superseded after an indexed swept-nut audit found the six loading routes needed additional clearance.", state: "Superseded" },
    { version: "v2.8", problem: "All six nuts needed provable loading clearance and both cardboard paths needed the 3.6 mm classroom opening.", change: "Cut six localized 30° indexed 5.55 mm-AF × 2.45 mm clearance routes and widened both paths to 3.6 × 1.8 mm while retaining 18 supports, six open bores and C anchors, six screw bores, and three LED pockets.", result: "Current exact-mesh recommendation: all six nominal indexed nut sweeps are zero-collision; pilot the M3 orientation and revised cardboard fit physically.", state: "Current" },
  ],
  buzzer: [
    { version: "v1", problem: "The buzzer terminal holes accepted M3 hardware loosely, but the module did not fit the testbed plate.", change: "Reworked the underside around the shared skirt and clutch experiments.", result: "Superseded by the Coupon-F result.", state: "Superseded" },
    { version: "v2.0", problem: "The final buzzer body and terminal spacing still needed the preferred LEGO interface.", change: "Applied the F-fit bottom and retained 19.5 mm terminal spacing.", result: "Established the current terminal and component foundation.", state: "Superseded" },
    { version: "v2.1", problem: "The buzzer needed a cardboard mounting option.", change: "Added 3.4 × 1.8 mm slits to enclosed circular edge tabs.", result: "Superseded because the tabs began as annular islands and retained hidden undersides.", state: "Superseded" },
    { version: "v2.2", problem: "The hollow roof supports and enclosed tabs were not suitable for dependable support-free printing.", change: "Made the four non-gripping tube centers solid, added four split-aligned C anchors, and replaced round tabs with open brick-style paths while preserving both M3 nut tunnels.", result: "Supportless foundation retained; superseded by the shared 3.6 mm path revision.", state: "Superseded" },
    { version: "v2.3", problem: "Both open cardboard paths needed the classroom-standard 3.6 mm overall opening.", change: "Widened only the two paths to 3.6 × 1.8 mm while preserving four solid supports, four open Coupon-F bores with C anchors, the 19.5 mm locator, two indexed nut paths, and two screw bores.", result: "Current watertight prototype; pilot the actual buzzer, M3 contact, LEGO clutch, cardboard fasteners, and sound output.", state: "Current" },
  ],
  microbit: [
    { version: "v3-v5", problem: "Estimated guide orientation and pockets did not match the original printed guide.", change: "Measured the actual guide mesh and built a continuous 6.7 x 56.8 mm open-top cradle.", result: "The stand now matches the exact 5.85 x 56 x 11.2 mm guide geometry.", state: "Superseded" },
    { version: "v5.1", problem: "The exact-guide stand still used the earlier LEGO underside.", change: "Added the Coupon-F underside and bundled the exact guide with its attribution.", result: "Guide and LEGO fit recommendation retained.", state: "Superseded" },
    { version: "v5.2", problem: "The first cardboard version used a 2.8 × 1.4 mm slit.", change: "Added two internal recessed brad locations without changing the LEGO underside.", result: "Physical test failed: the measured 3.0 mm fastener legs would not pass through the printed opening.", state: "Superseded" },
    { version: "v5.3", problem: "The cardboard fastener opening was undersized for the classroom brass fastener.", change: "Enlarged both internal slits to 3.4 × 1.8 mm and added a 3.2 / 3.4 / 3.6 mm fit coupon.", result: "Established the corrected compact path geometry; superseded by the anchored first-layer revision before physical confirmation.", state: "Superseded" },
    { version: "v5.4", problem: "The six Coupon-F rings still began as narrow first-layer islands even though the internal cardboard paths already printed without support.", change: "Added six 0.60 mm C-shaped pads aligned with the inward clutch splits while preserving all 45 hollow tube centerlines, both top-open brad paths, the compact footprint, and all exact-guide geometry.", result: "Anchor-foot foundation retained; superseded because 39 safe non-clutch roof-support centers remained hollow.", state: "Superseded" },
    { version: "v5.5", problem: "Thirty-nine hollow non-clutch centers left repeated unsupported roof bridges, and the paths needed the 3.6 mm classroom opening.", change: "Added 39 full 5.20 × 2.85 mm supports and widened both top-open paths while retaining the six open Coupon-F bores, exact guide, and all LEGO clearances.", result: "Superseded after physical use showed that both inherited 5.10 mm-thick towers could snap above their short root gussets.", state: "Superseded" },
    { version: "v5.6", problem: "The 49 mm-tall towers retained about 40 mm of unbraced length above their original gussets and failed in physical use.", change: "Added full-height 2.4–2.5 mm rear/outward L-shaped spines and smooth supportless buttresses rising to 28–30 mm while preserving the exact guide-facing and center-facing surfaces.", result: "Current watertight, clearance-validated recommendation; upper tower area is about 2× and calculated bending inertia is 3.76–4.63×, but physical tower durability still needs a pilot.", state: "Current" },
  ],
  "servo-horizontal": [
    { version: "Coupon-v1.2", problem: "The servo body fit at 12.4 mm, but it could slide out and wire routing forced one orientation.", change: "Added retention, larger horn-side gaps, and wire exits at both ends.", result: "Body width and 1.8 mm pilot dimensions were physically confirmed.", state: "Superseded" },
    { version: "v1.3", problem: "The servo needed label-up installation in either direction.", change: "Added dual horn gaps, central wire relief, and a retaining strap.", result: "Fit-confirmed servo foundation retained by later versions.", state: "Superseded" },
    { version: "v1.4", problem: "The confirmed cradle needed cardboard mounting inside its footprint.", change: "Added two top-open 3.4 × 1.8 mm internal fastener paths.", result: "Path geometry retained; hollow non-gripping roof supports were superseded after the potentiometer print failure.", state: "Superseded" },
    { version: "v1.5", problem: "Twenty-nine hollow support centers left repeated circular bridges beneath the cavity roof.", change: "Made every non-gripping center solid and added six split-aligned C anchors without changing the servo, strap, horn, wire, or internal-path geometry.", result: "Fit-confirmed solid-support foundation; superseded by the shared 3.6 mm path revision.", state: "Superseded" },
    { version: "v1.6", problem: "Both internal cardboard paths needed the 3.6 mm classroom opening.", change: "Widened only those paths to 3.6 × 1.8 mm while retaining 29 solid supports, six open Coupon-F bores and C anchors, the confirmed cradle, strap, horn gaps, and wire exit.", result: "Current exact-mesh recommendation; servo fit is confirmed and the revised cardboard interface needs one physical pilot.", state: "Current" },
  ],
  "servo-vertical": [
    { version: "Fit coupon", problem: "The SG90 dimensions and pilot size needed direct confirmation.", change: "Tested 12.4 mm body width, 27.5 mm ear spacing, and 1.8 mm pilots.", result: "Core servo dimensions were physically confirmed.", state: "Superseded" },
    { version: "v1", problem: "An upright mount was needed on a compact 7 x 3 footprint with wire access.", change: "Added two mounting towers and lower wire portals.", result: "Fit-confirmed servo foundation retained by the dual-mount revisions.", state: "Superseded" },
    { version: "v1.1", problem: "The compact cradle needed a cardboard option.", change: "Added enclosed circular end tabs with widened fastener slits.", result: "Superseded before confirmation because the closed tab construction was not the supportless standard.", state: "Superseded" },
    { version: "v1.2", problem: "The cradle needed bridge-safe roof support and truly open cardboard paths.", change: "Made 15 non-gripping centers solid, anchored six open Coupon-F bores, and rebuilt the end tabs as open 3.4 × 1.8 mm portals from the clean v1 base.", result: "Fit-confirmed supportless foundation; superseded by the shared 3.6 mm path revision.", state: "Superseded" },
    { version: "v1.3", problem: "Both open tab paths needed the 3.6 mm classroom opening.", change: "Widened only those paths to 3.6 × 1.8 mm while retaining 13 full and two portal-trimmed solid supports, six open bores and C anchors, four continuation clearances, and the confirmed servo towers.", result: "Current exact-mesh recommendation; servo dimensions are confirmed and the revised tabs need one physical pilot.", state: "Current" },
  ],
  "servo-gauge": [
    { version: "v1-v1.7", problem: "The horn lacked sweep clearance, panel holders snapped, markings failed, and panels were repeatedly too narrow.", change: "Strengthened edge-length holders, corrected the panel width, reduced the opening, and simplified markings.", result: "The v1.7 panel width was physically reported correct.", state: "Superseded" },
    { version: "v1.8", problem: "The successful-width gauge still forced the servo label downward.", change: "Mirrored the primary opening for label-up installation while preserving panel width.", result: "Label-up mechanism foundation retained by later revisions.", state: "Superseded" },
    { version: "v1.9", problem: "The gauge needed compact cardboard fastening without external projections.", change: "Added two top-open 3.4 × 1.8 mm internal paths.", result: "Mounting paths retained; hollow roof supports were superseded after physical bridge failure on the related potentiometer base.", state: "Superseded" },
    { version: "v2.0", problem: "Twenty-nine hollow non-gripping centers left repeated bridges under the broad base roof.", change: "Made those centers solid and added six split-aligned C anchors while preserving the label-up holder, panels, strap, pointer clearance, wire exit, and cardboard paths.", result: "Mechanism-confirmed supportless foundation; superseded by the shared 3.6 mm path revision.", state: "Superseded" },
    { version: "v2.1", problem: "Both internal cardboard paths needed the 3.6 mm classroom opening.", change: "Widened only those paths to 3.6 × 1.8 mm while retaining 29 supports, six open bores and C anchors, the label-up holder, all panels, strap, pointer clearance, and wire exit.", result: "Current exact-mesh mechanism-confirmed recommendation; pilot the revised cardboard fit and complete pointer sweep.", state: "Current" },
  ],
  "servo-latch": [
    { version: "Concept", problem: "P2.4 needed a visible physical locked/unlocked output.", change: "Selected the SG90 horn itself as a rotating bolt.", result: "Simple mechanism direction established.", state: "Superseded" },
    { version: "v1", problem: "The bolt needed a safe keeper and adjustable software endpoints.", change: "Added an open-top reinforced keeper and retained the shared servo cradle geometry.", result: "Mechanism foundation retained by later revisions.", state: "Superseded" },
    { version: "v1.1", problem: "The latch needed cardboard mounting without changing its keeper.", change: "Added two top-open 3.4 × 1.8 mm internal paths.", result: "Mounting paths retained; hollow roof supports were superseded before a full motion pilot.", state: "Superseded" },
    { version: "v1.2", problem: "Twenty-nine hollow support centers created unnecessary bridge risks beneath the base roof.", change: "Made every non-gripping center solid and added six C anchors while preserving the keeper, strap, servo fit, horn clearance, and internal paths.", result: "Supportless mechanism foundation; superseded by the shared 3.6 mm path revision.", state: "Superseded" },
    { version: "v1.3", problem: "Both internal cardboard paths needed the 3.6 mm classroom opening.", change: "Widened only those paths to 3.6 × 1.8 mm while retaining 29 supports, six open bores and C anchors, the keeper, strap, servo fit, and horn clearance.", result: "Current watertight prototype awaiting physical cardboard, motion, endpoint, LEGO, and binding tests.", state: "Current" },
  ],
  "servo-door": [
    { version: "Concept", problem: "Students needed to see how servo rotation becomes flap motion.", change: "Chose a separate 8-32 hinge and adjustable crank linkage.", result: "Mechanism-learning goals and hardware were defined.", state: "Superseded" },
    { version: "v1", problem: "One linkage geometry would hide mechanical-advantage tradeoffs.", change: "Included three link lengths and two flap attachment holes.", result: "Mechanism foundation retained by later revisions.", state: "Superseded" },
    { version: "v1.1", problem: "The door mechanism needed cardboard mounting without external tabs.", change: "Added two top-open 3.4 × 1.8 mm internal paths.", result: "Path geometry retained; hollow roof supports were superseded before physical motion testing.", state: "Superseded" },
    { version: "v1.2", problem: "Thirty-nine hollow non-gripping centers left repeated roof bridges across the largest servo base.", change: "Made those centers solid and added six C anchors while preserving the 8-32 hinge, flap clearance, two attachment holes, three links, strap, servo fit, and internal paths.", result: "Supportless mechanism foundation; superseded by the shared 3.6 mm path revision.", state: "Superseded" },
    { version: "v1.3", problem: "Both internal cardboard paths needed the 3.6 mm classroom opening.", change: "Widened only those paths to 3.6 × 1.8 mm while retaining 39 supports, six open bores and C anchors, the hinge, flap clearance, two attachment holes, three links, strap, and servo fit.", result: "Current watertight prototype awaiting physical cardboard, endpoint, binding, force, and LEGO testing.", state: "Current" },
  ],
};

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
        module.status,
        developmentHistory[module.id].map((item) => `${item.version} ${item.problem} ${item.change} ${item.result}`).join(" "),
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
          <a href="#build-guides">Build guides</a>
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
          <p>Every download contains the main printable parts and a README. The newest supportless dual-mount packs also include fit coupons, dimensions, validation notes, previews, and the source builder.</p>
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

        <div className="status-legend" aria-label="Physical testing status key">
          <span className="status status-classroom">Classroom confirmed</span><p>Final version physically tested.</p>
          <span className="status status-mechanism">Mechanism confirmed</span><p>Motion or electrical function tested; a later fit detail changed.</p>
          <span className="status status-fit">Fit confirmed</span><p>Component or LEGO fit tested; full activity still pending.</p>
          <span className="status status-prototype">Prototype</span><p>Designed and printable; awaiting physical confirmation.</p>
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

                <details className="history-details">
                  <summary>Development history</summary>
                  <ol className="history-list">
                    {developmentHistory[module.id].map((item) => (
                      <li key={item.version}>
                        <div className="history-heading">
                          <strong>{item.version}</strong>
                          <span className={`history-state history-${item.state.toLowerCase()}`}>{item.state}</span>
                        </div>
                        <p><b>Problem:</b> {item.problem}</p>
                        <p><b>Change:</b> {item.change}</p>
                        <p><b>Test result:</b> {item.result}</p>
                      </li>
                    ))}
                  </ol>
                </details>

                <a className="download-link" href={asset(module.download)} download>
                  {module.dualMount ? "Download LEGO + cardboard pack" : "Download print pack"} <span aria-hidden="true">↓</span>
                </a>
                {module.cardboardDownload ? (
                  <a className="download-link cardboard-download" href={asset(module.cardboardDownload)} download>
                    {module.cardboardMount === "edge-tabs" ? "Cardboard edge-tab prototype" : "Cardboard dual-mount prototype"} <span aria-hidden="true">↓</span>
                  </a>
                ) : !module.dualMount ? (
                  <p className="mount-note">LEGO-only: two recessed brad heads do not safely fit this compact layout.</p>
                ) : null}
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
          <p>Begin with Bambu Studio&apos;s 0.20 mm Standard profile and leave the remaining process settings at their defaults.</p>
        </div>
        <div className="settings-grid">
          <div><strong>0.20 mm</strong><span>Standard layer profile</span></div>
          <div><strong>Default walls</strong><span>Use the selected Bambu profile</span></div>
          <div><strong>Default infill</strong><span>No module-specific override</span></div>
          <div><strong>Supports off</strong><span>Use supplied orientation</span></div>
          <div><strong>PLA</strong><span>First classroom prototype</span></div>
          <div><strong>0.4 mm</strong><span>Standard nozzle</span></div>
        </div>
        <div className="fit-callout">
          <strong>Coupon-F LEGO interface</strong>
          <p>The shared underside uses a 6.60 mm split-ring clutch tube with a 4.80 mm center and a 0.90 mm relief slot. Keep the LEGO cavity on the build plate and preserve the first-layer settings that produced the successful coupon.</p>
        </div>
        <div className="fit-callout dual-mount-callout">
          <strong>Direct cardboard dual mount</strong>
          <p>The compact resistor v2.9 preserves the physically fit-confirmed v2.7 LEGO foundation while adopting the shared 3.6 × 1.8 mm brass-fastener opening. Current supportless modules make every safe non-gripping roof-support center solid while keeping the true Coupon-F bores open with split-aligned C anchors. Each revised complete assembly still needs one physical pilot before classroom quantities.</p>
        </div>
      </section>

      <section className="build-guides" id="build-guides" aria-labelledby="build-guides-title">
        <div className="build-guides-heading">
          <p className="section-kicker">TEACHER BUILD GUIDES</p>
          <h2 id="build-guides-title">Prepare durable classroom components in batches.</h2>
          <p>
            Use these preparation notes for the parts that need wiring or hardware before students begin. Soldering is
            an adult or trained-teacher preparation task; students connect to the finished M3 terminals with alligator clips.
          </p>
        </div>

        <article className="guide-card guide-card-featured">
          <div className="guide-card-heading">
            <div>
              <p className="guide-label">FSR 402 · PART 30-81794</p>
              <h3>Solder-tab pressure-sensor preparation</h3>
            </div>
            <span className="guide-badge">50-sensor batch</span>
          </div>

          <div className="guide-facts" aria-label="FSR 402 reference dimensions">
            <div><strong>18.3 mm</strong><span>outer sensing disk</span></div>
            <div><strong>14.68 mm</strong><span>active area</span></div>
            <div><strong>7.62 mm</strong><span>solder-tab tail width</span></div>
            <div><strong>0.46 mm</strong><span>nominal thickness</span></div>
          </div>

          <div className="guide-columns">
            <div>
              <h4>Consumables for 50 finished sensors</h4>
              <ul className="supply-list">
                <li><span>FSR 402, Interlink 30-81794</span><strong>50; buy 55 if possible</strong></li>
                <li><span>Red 26–30 AWG stranded wire</span><strong>10 m / 33 ft</strong></li>
                <li><span>Black 26–30 AWG stranded wire</span><strong>10 m / 33 ft</strong></li>
                <li><span>1/8 in heat-shrink tubing</span><strong>2 m / 7 ft</strong></li>
                <li><span>Lead-free rosin-core electronics solder</span><strong>100 g spool</strong></li>
                <li><span>No-clean electronics flux</span><strong>1–2 pens</strong></li>
                <li><span>Heat-resistant double-sided tape</span><strong>1 roll</strong></li>
                <li><span>Kapton tape</span><strong>1 roll, optional</strong></li>
              </ul>
              <p className="guide-note">
                Quantity assumes two 150 mm color-coded leads per sensor. Ten meters per color includes approximately
                one-third extra for trimming and mistakes.
              </p>
            </div>

            <div>
              <h4>Reusable tools</h4>
              <ul className="check-list">
                <li>Temperature-controlled soldering station with a 1–2 mm chisel tip</li>
                <li>Iron stand, brass tip cleaner, and silicone work mat</li>
                <li>Fume extractor and safety glasses</li>
                <li>26–30 AWG wire stripper and flush cutters</li>
                <li>Flat heat-resistant fixture or helping hands</li>
                <li>Small heat gun with a reducer nozzle</li>
                <li>Digital multimeter for before-and-after checks</li>
              </ul>
              <div className="warning-box">
                <strong>Protect the sensor.</strong>
                <p>Do not solder inside the printed PLA module, solder to exposed silver traces, crease the tail, or heat the sensor with the heat gun.</p>
              </div>
            </div>
          </div>

          <div className="batch-workflow">
            <h4>Batch workflow</h4>
            <ol>
              <li><span>01</span><p><strong>Cut and prepare.</strong> Make 50 red and 50 black 150 mm leads. Strip and pre-tin approximately 3 mm at one end.</p></li>
              <li><span>02</span><p><strong>Hold the sensor flat.</strong> Secure it to a heat-resistant fixture with double-sided tape. Keep the sensing disk and tail unstressed.</p></li>
              <li><span>03</span><p><strong>Pre-tin the tabs.</strong> Use no-clean flux and the shortest practical iron contact. Work on the supplied gold solder tabs only.</p></li>
              <li><span>04</span><p><strong>Join one wire at a time.</strong> Reflow each pre-tinned wire to its tab using approximately 1–2 seconds of contact at a time.</p></li>
              <li><span>05</span><p><strong>Insulate separately.</strong> Cover each joint with its own approximately 10 mm heat-shrink piece and direct hot air away from the tail.</p></li>
              <li><span>06</span><p><strong>Test before mounting.</strong> Confirm continuity and verify that resistance decreases when the sensing disk is pressed.</p></li>
              <li><span>07</span><p><strong>Install with strain relief.</strong> Clamp only insulated wire or heat-shrink. Never clamp the flexible tail or solder joints.</p></li>
              <li><span>08</span><p><strong>Terminate at M3 hardware.</strong> Route the two wires to separate captive-nut terminals with large washers for alligator clips.</p></li>
            </ol>
          </div>

          <div className="module-adaptation">
            <h4>Pressure-module CAD adaptation</h4>
            <p>
              Keep the proven circular pocket, pressure plate, centered puck, guides, and hard stops. Widen the tail
              channel to about 8.2 mm, replace the female-connector pocket with an open solder-joint bay, add two isolated
              wire channels, and place the M3 terminals above the LEGO cavity. The strain-relief clamp must grip the
              insulated leads—not the tabs.
            </p>
          </div>
        </article>

        <div className="guide-grid">
          <article className="guide-card">
            <p className="guide-label">SHARED ELECTRICAL HARDWARE</p>
            <h3>M3 terminal stock for a classroom set</h3>
            <ul className="check-list">
              <li>M3 × 6 mm and M3 × 8 mm machine screws</li>
              <li>Standard M3 hex nuts for captive pockets</li>
              <li>9–12 mm outside-diameter M3 washers</li>
              <li>26–30 AWG stranded hookup wire in several colors</li>
              <li>Alligator leads with intact insulation</li>
            </ul>
            <p className="guide-note">For 50 two-terminal modules, stock at least 120 screws, 120 nuts, and 120 washers so damaged or lost hardware does not stop a class.</p>
          </article>

          <article className="guide-card">
            <p className="guide-label">QUALITY CONTROL</p>
            <h3>Check every prepared sensor twice</h3>
            <ul className="check-list">
              <li>Before mounting: inspect joints, insulation, and resistance response.</li>
              <li>After mounting: confirm the tail stays flat and the wires cannot pull on the tabs.</li>
              <li>With the platform installed: verify no-load and light-press readings.</li>
              <li>Label failures and keep them out of the classroom-ready bin.</li>
            </ul>
          </article>

          <article className="guide-card">
            <p className="guide-label">WIRING</p>
            <h3>Connect the pressure sensor as a divider</h3>
            <ul className="check-list">
              <li>One FSR terminal connects to 3V.</li>
              <li>The other terminal connects to the shared signal/resistor junction.</li>
              <li>The fixed resistor’s opposite terminal connects to GND.</li>
              <li>The FSR itself is non-polarized; consistent wire colors simplify instruction.</li>
            </ul>
          </article>
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
