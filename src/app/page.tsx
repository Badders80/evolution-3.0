import ImageBand from "@/components/media/ImageBand";
import MissionCombo from "@/components/marketing/MissionCombo";
import { Section } from "@/components/site/Section";
import { Footer } from "@/components/site/Footer";
import { HeroSection } from "@/components/site/HeroSection";
import { SectionShell } from "@/components/layout/SectionShell";
import { NavBar } from "@/components/NavBar";
import { MARKETING } from "@/lib/assets";
import content from "@/content/marketing.json";

export default function Page() {
  const c = (content as { missionCombo: any }).missionCombo;

  return (
    <>
      <NavBar />
      
      {/* Hero Section */}
      <HeroSection />
      
      <main className="space-y-16">
        <SectionShell id="mission" spaceY={2}>
          <MissionCombo mission={c.mission} support={c.support} />
        </SectionShell>
        
        <ImageBand src="/images/content/Background-hooves-back-and-white.jpg" alt="Track rail detail" height={320} />
        
        <SectionShell id="feature-flags">
          <Section
            title="Feature Flags"
            imageSrc={MARKETING.band1}
            imageRatio="16:9"
            body={
              <>
                <p>Toggle heavy UI and switch between mock and real APIs from the Dev Bar -- no rebuilds needed.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    URL overrides (e.g., <code className="px-2 py-1 bg-gray-100 rounded text-sm">?apiMode=real</code>)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Environment defaults (<code className="px-2 py-1 bg-gray-100 rounded text-sm">NEXT_PUBLIC_*</code>)
                  </li>
                </ul>
              </>
            }
          />
        </SectionShell>
        
        <ImageBand src="/images/content/Hooves-on-grass.png" alt="Hooves on grass" height={320} />
        
        <SectionShell id="code-splitting">
          <Section
            title="Code-Splitting by Default"
            imageSrc={MARKETING.band2}
            imageRatio="1:1"
            reverse
            body={<p>Heavy components are dynamically imported so the core UI stays fast while prototyping.</p>}
          />
        </SectionShell>
        
        <SectionShell id="mock-real-seam">
          <Section
            title="Mock → Real Seam"
            imageSrc={MARKETING.alt.horseAndFoal}
            imageRatio="4:3"
            body={<p>Shared types and adapters let you wire real endpoints later without touching UI components.</p>}
          />
        </SectionShell>
        
        <Footer />
      </main>
    </>
  );
}