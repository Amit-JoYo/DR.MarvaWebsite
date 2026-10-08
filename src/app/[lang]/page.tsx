import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Materials } from "@/components/Materials";
import { Results } from "@/components/Results";
import { Treatments } from "@/components/Treatments";

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <Hero />
      <Results />
      <Treatments />
      <Materials />
      <Contact />
    </main>
  );
}
