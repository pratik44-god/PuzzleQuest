import Container from "~/components/ui/container";
import SectionTitle from "~/components/ui/section-title";

import HuntCard from "./hunt-card";
import { TRENDING_HUNTS } from "./data";

export default function Trending() {
  return (
    <section className="py-28">
      <Container>
        <SectionTitle
          badge="Trending"
          title="Popular Treasure Hunts"
          description="Community favorites waiting to be explored."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {TRENDING_HUNTS.map((hunt) => (
            <HuntCard
              key={hunt.title}
              {...hunt}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}