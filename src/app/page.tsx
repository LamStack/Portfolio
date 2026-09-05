import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { FloatingNav } from "@/components/scroll/FloatingNav";
import { Hero } from "@/components/scroll/Hero";
import { AboutJourney } from "@/components/scroll/AboutJourney";
import { FlagshipProject } from "@/components/scroll/FlagshipProject";
import { ProjectGallery } from "@/components/scroll/ProjectGallery";
import { AchievementsReel } from "@/components/scroll/AchievementsReel";
import { CertificationsStrip } from "@/components/scroll/CertificationsStrip";
import { ArcadeSection } from "@/components/scroll/ArcadeSection";
import { Contact } from "@/components/scroll/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <FloatingNav />
      <main>
        <Hero />
        <AboutJourney />
        <FlagshipProject />
        <ProjectGallery />
        <AchievementsReel />
        <CertificationsStrip />
        <ArcadeSection />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
