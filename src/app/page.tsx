import { About } from "@/components/portfolio/About";
import { Automations } from "@/components/portfolio/Automations";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { DemoShowcase } from "@/components/portfolio/DemoShowcase";
import { Hero } from "@/components/portfolio/Hero";
import { Navbar } from "@/components/portfolio/Navbar";
import { Process } from "@/components/portfolio/Process";
import { Services } from "@/components/portfolio/Services";
import { Work } from "@/components/portfolio/Work";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <DemoShowcase />
        <Automations />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
