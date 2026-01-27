import Hero from "@/components/Hero";
import About from "@/components/About";
import GymnasticsBlock from "@/components/GymnasticsBlock";
import CategoriesBlock from "@/components/CategoriesBlock";
import InfoSection from "@/components/InfoSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <About />
      <GymnasticsBlock />
      <CategoriesBlock />
      <InfoSection />
      <CTASection />
    </div>
  );
}
