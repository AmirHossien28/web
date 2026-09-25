import React from 'react';
import { PageId, LocaleKey, ProjectItem } from '../../types';
import { HeroSection } from '../marketing/HeroSection';
import { LiveTicker } from '../marketing/LiveTicker';
import { EcommerceShowcase } from '../marketing/EcommerceShowcase';
import { ServicesGrid } from '../marketing/ServicesGrid';
import { TemplatesShowcase } from '../marketing/TemplatesShowcase';
import { CaseStudiesSection } from '../marketing/CaseStudiesSection';
import { ArchitectureSection } from '../marketing/ArchitectureSection';
import { PricingSection } from '../marketing/PricingSection';
import { TestimonialsSection } from '../marketing/TestimonialsSection';
import { BlogSection } from '../marketing/BlogSection';
import { FaqSection } from '../marketing/FaqSection';
import { CtaSection } from '../marketing/CtaSection';

interface HomeViewProps {
  currentLocale: LocaleKey;
  isLightMode: boolean;
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenConsultModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLocale,
  isLightMode,
  onNavigate,
  onSelectProject,
  onOpenConsultModal,
}) => {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero & Interactive Consultation Widget */}
      <HeroSection
        currentLocale={currentLocale}
        isLightMode={isLightMode}
        onNavigate={onNavigate}
        onOpenConsultModal={onOpenConsultModal}
      />

      {/* 2. Live Operational Uptime & Performance Ticker */}
      <LiveTicker
        isLightMode={isLightMode}
        onSelectProject={onSelectProject}
        onNavigate={onNavigate}
      />

      {/* 3. High-Tech Animated E-Commerce Showcase */}
      <EcommerceShowcase
        currentLocale={currentLocale}
        onNavigate={onNavigate}
        onOpenConsultModal={onOpenConsultModal}
      />

      {/* 4. 6 Solution Bento Cards */}
      <ServicesGrid
        isLightMode={isLightMode}
        onNavigate={onNavigate}
        onOpenConsultModal={onOpenConsultModal}
      />

      {/* 5. Interactive Templates & Live Previews */}
      <TemplatesShowcase
        isLightMode={isLightMode}
        onPreviewTemplate={onSelectProject}
        onOpenConsultModal={onOpenConsultModal}
      />

      {/* 6. Real Projects & Case Studies (Adak Steel, etc.) */}
      <CaseStudiesSection
        isLightMode={isLightMode}
        onSelectProject={onSelectProject}
        onOpenConsultModal={onOpenConsultModal}
      />

      {/* 7. Technical Architecture Pipeline & Comparison Table */}
      <ArchitectureSection isLightMode={isLightMode} />

      {/* 8. Transparent 3-Tier Pricing Packages */}
      <PricingSection
        isLightMode={isLightMode}
        onNavigate={onNavigate}
        onOpenConsultModal={onOpenConsultModal}
      />

      {/* 9. Verified Executive Testimonials */}
      <TestimonialsSection isLightMode={isLightMode} />

      {/* 10. Knowledge Blog & Articles */}
      <BlogSection
        isLightMode={isLightMode}
        onNavigate={onNavigate}
      />

      {/* 11. FAQ Accordion */}
      <FaqSection
        currentLocale={currentLocale}
        isLightMode={isLightMode}
        onOpenConsultModal={onOpenConsultModal}
      />

      {/* 12. Final High-Conversion Consultation & Instant Callback */}
      <CtaSection
        currentLocale={currentLocale}
        isLightMode={isLightMode}
      />
    </div>
  );
};
