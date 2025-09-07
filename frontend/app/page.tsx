import Hero from '../components/Hero'
import FeaturesSection from '../components/FeaturesSection'
import EventsPreview from '../components/EventsPreview'
import StatsSection from '../components/StatsSection'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturesSection />
      <EventsPreview />
      <StatsSection />
      <CTASection />
    </main>
  );
}
