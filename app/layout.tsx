import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = "https://ttansopalucks.github.io/pltw-lego-module-library/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PLTW LEGO Module Library",
    template: "%s | PLTW LEGO Module Library",
  },
  description:
    "Printable LEGO-compatible classroom modules for PLTW Innovators & Makers projects, organized for students and teachers.",
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
  openGraph: {
    title: "PLTW LEGO Module Library",
    description: "Classroom-tested connections, sensor holders, and servo mechanisms for the shared LEGO testbed.",
    type: "website",
    url: siteUrl,
    images: ["og-module-library.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
