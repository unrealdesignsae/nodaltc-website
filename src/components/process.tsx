"use client";

import dynamic from "next/dynamic";

const NebulaCube = dynamic(
  () => import("@/components/ui/nebula-cube").then((m) => m.NebulaCube),
  { ssr: false }
);

export function Process() {
  return (
    <section id="about">
      <NebulaCube />
    </section>
  );
}
