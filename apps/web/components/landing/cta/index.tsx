import ProtectedButton from "~/components/auth/ProtectedButton";
import Container from "~/components/ui/container";
import Card from "~/components/ui/cardd";
import { Sparkles, Compass } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28">
      <Container>
        <Card className="relative overflow-hidden border-white/[0.08] bg-[#0b0b10] p-12 text-center transition-all duration-300 hover:border-violet-500/30 sm:p-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-[90px]" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
              <Sparkles size={24} />
            </div>

            <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
              Ready to Begin Your Adventure?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              Create your first treasure hunt and challenge players
              from around the world.
            </p>

            <div className="mt-10 flex justify-center">
              <ProtectedButton
                href="/login"
                variant="primary"
                size="lg"
                className="
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_12px_35px_rgba(139,92,246,0.25)]
                "
              >
                Get Started
              </ProtectedButton>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-600">
              <Compass size={14} className="text-violet-400/70" />
              Your next adventure starts with one idea.
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}