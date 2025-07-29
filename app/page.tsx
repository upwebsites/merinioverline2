import HeroSection from '@/components/HeroSection';
import PresentationSection from '@/components/PresentationSection';
import StrengthsSection from '@/components/StrengthsSection';
import SatisfactionSection from '@/components/SatisfactionSection';
import ChooseTypeSection from '@/components/ChooseTypeSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PresentationSection />
      <StrengthsSection />
      <SatisfactionSection />
      <ChooseTypeSection />
      <Footer variant="private" />
    </main>
  );
}