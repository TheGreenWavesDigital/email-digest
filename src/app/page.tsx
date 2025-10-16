import Banner from "@/components/Banner";
import CallToAction from "@/components/CTA";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import LearnMore from "@/components/Learnmore";

export default function Home() {
  return (
    <div>
      <Banner />
      <Features />
      <HowItWorks />
      <LearnMore />
      <CallToAction />
    </div>
  );
}
