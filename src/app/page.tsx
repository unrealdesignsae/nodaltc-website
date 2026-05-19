import { NodeCanvas } from "@/components/node-canvas";
import { Navbar } from "@/components/navbar";
import { HeroV2 } from "@/components/hero-v2";
import HalideLanding from "@/components/halide-landing";

import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { StatsSection } from "@/components/stats-section";

import { Founder } from "@/components/founder";
import { TechStack } from "@/components/tech-stack";
import { TechStackIntro } from "@/components/tech-stack-intro";
import { Projects } from "@/components/projects";
import { CTABand } from "@/components/cta-band";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";


export default function Home() {
  return (
    <>
      <NodeCanvas />
      <Navbar />
      <HeroV2 />
      <HalideLanding />

      <Services />
      <Process />
      <TechStackIntro />
      <TechStack />
      <StatsSection />

      <Founder />
      <Projects />
      <CTABand />
      <Contact />
      <Footer />

    </>
  );
}
