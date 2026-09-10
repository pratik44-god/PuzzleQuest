import Container from "~/components/ui/container";

export default function DiscoverHero() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15),transparent_55%)]" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400">
            Explore Hunts
          </span>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl">
            Discover Your Next
            <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Find treasure hunts created by explorers around
            the world. Choose your challenge and start
            hunting.
          </p>
        </div>
      </Container>
    </section>
  );
}