import { About } from "@/components/x/About";
import { Contact, Footer } from "@/components/x/Contact";
import { FeaturedStack } from "@/components/x/FeaturedStack";
import { Hero } from "@/components/x/Hero";
import { Marquee } from "@/components/x/Marquee";
import { Nav } from "@/components/x/Nav";
import { Planner } from "@/components/x/Planner";
import { ProcessLine } from "@/components/x/ProcessLine";
import { ProjectsRail } from "@/components/x/ProjectsRail";
import { ServicesGrid } from "@/components/x/ServicesGrid";

const MARQUEE_TOP = ["Web apps", "Mobile apps", "AI agents", "Dashboards", "Automations"];
const MARQUEE_BOTTOM = ["SaaS", "Websites", "Desktop apps", "Payments", "APIs", "Cloud"];

export default function Home() {
  return (
    <div className="grain min-h-screen overflow-x-clip bg-night font-sans text-white selection:bg-sand selection:text-night">
      <Nav />
      <main>
        <Hero />
        <Marquee top={MARQUEE_TOP} bottom={MARQUEE_BOTTOM} />
        <FeaturedStack />
        <ProjectsRail />
        <ServicesGrid />
        <ProcessLine />
        <Planner />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
