import { SmoothScroll } from "@/components/SmoothScroll";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LifespanHealthspan } from "@/components/sections/LifespanHealthspan";
import { ThreePillars } from "@/components/sections/ThreePillars";
import { Process } from "@/components/sections/Process";
import { Witness } from "@/components/sections/Witness";
import { Membership } from "@/components/sections/Membership";
import { Location } from "@/components/sections/Location";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <main className="relative">
        <HeroSplit />
        <LifespanHealthspan />
        <ThreePillars />
        <Process />
        <Witness />
        <Membership />
        <Location />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
