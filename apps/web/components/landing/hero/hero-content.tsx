import Reveal from "~/components/animation/reveal";

import HeroBadge from "./hero-badge";
import HeroButtons from "./hero-buttons";
import HeroTrust from "./hero-trust";

export default function HeroContent() {
  return (
    <div className="max-w-xl">
      <Reveal>
        <HeroBadge />
      </Reveal>

      <Reveal>
        <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          Discover

          <span className="mt-2 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Hidden Treasures.
          </span>
        </h1>
      </Reveal>

      <Reveal>
        <p className="mt-8 text-lg leading-8 text-zinc-400">
          Create immersive treasure hunts, challenge your friends,
          and build unforgettable adventures that players love
          exploring.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-10">
          <HeroButtons />
        </div>
      </Reveal>

      <Reveal>
        <HeroTrust />
      </Reveal>
    </div>
  );
}