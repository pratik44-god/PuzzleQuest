import Container from "~/components/ui/container";
import SectionTitle from "~/components/ui/section-title";

import TestimonialCard from "./testimonial-card";

const TESTIMONIALS = [
  {
    name: "Krish",
    role: "Puzzle Creator",
    review:
      "Building treasure hunts has never been this easy. The UI is beautiful and fun.",
  },
  {
    name: "Darshan",
    role: "Explorer",
    review:
      "Every hunt feels like a real adventure. I keep coming back every weekend.",
  },
  {
    name: "Rohit",
    role: "Community Leader",
    review:
      "The leaderboard and community challenges make PuzzleQuest addictive.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28">
      <Container>
        <SectionTitle
          badge="Testimonials"
          title="Loved By Our Community"
          description="Thousands of creators and explorers use PuzzleQuest every day."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <TestimonialCard
              key={item.name}
              {...item}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}