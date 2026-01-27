import Hero from "@/components/Hero";
import About from "@/components/About";
import ScienceAdvantage from "@/components/ScienceAdvantage";
import BodyPrinciples from "@/components/BodyPrinciples";
import HealingProcess from "@/components/HealingProcess";
import ExtrasensoryDevelopment from "@/components/ExtrasensoryDevelopment";
import SignupStrip from "@/components/SignupStrip";
import CategoriesBlock from "@/components/CategoriesBlock";
import GymnasticsBlock from "@/components/GymnasticsBlock";
import InfoSection from "@/components/InfoSection";
import GiftBlock from "@/components/GiftBlock";
import ApplicationForm from "@/components/ApplicationForm";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <About />
      <ScienceAdvantage />
      <BodyPrinciples />
      <HealingProcess />
      <ExtrasensoryDevelopment />
      <SignupStrip />
      <CategoriesBlock />
      <GymnasticsBlock />
      <InfoSection />
      <GiftBlock />
      <ApplicationForm />
      <CTASection />
    </div>
  );
}
