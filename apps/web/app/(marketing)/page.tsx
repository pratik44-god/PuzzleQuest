import Navbar from "~/components/layout/navbar";
import Footer from "~/components/layout/footer";

import Hero from "~/components/landing/hero";
import Stats from "~/components/landing/stats";
import Features from "~/components/landing/features";
import Trending from "~/components/landing/trending";
import Testimonials from "~/components/landing/testimonials";
import CTA from "~/components/landing/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Trending />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

