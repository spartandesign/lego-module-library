import type { Metadata } from "next";
import { ModuleLibrary } from "./ModuleLibrary";

export const metadata: Metadata = {
  title: "PLTW LEGO Module Library",
  description:
    "A teacher-and-student library of classroom-ready LEGO-compatible testbed modules, printable files, hardware lists, and assembly guidance.",
};

export default function Home() {
  return <ModuleLibrary />;
}
