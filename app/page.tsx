import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { StatsSection } from '../components/landing/StatsSection';
import { WhyChooseUs } from '../components/landing/WhyChooseUs';
import { SubjectsSection } from '../components/landing/SubjectsSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';
import { FAQSection } from '../components/landing/FAQSection';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <StatsSection />
      <WhyChooseUs />
      <SubjectsSection />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
    </div>
  );
}
