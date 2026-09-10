import Container from "~/components/ui/container";

import HeroBackground from "./hero-background";
import HeroContent from "./hero-content";
import HeroPreviewCard from "./hero-preview-card";

import Floating from "~/components/animation/floating";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />

      <Container>
        <div className="relative grid min-h-[calc(100vh-80px)] items-center gap-20 py-12 lg:grid-cols-2">
          <HeroContent />

          <div className="hidden justify-center lg:flex">
            <Floating>
              <HeroPreviewCard />
            </Floating>
          </div>
        </div>
      </Container>
    </section>
  );
}