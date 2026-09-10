import Container from "~/components/ui/container";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h3 className="text-2xl font-bold text-white">
              PuzzleQuest
            </h3>

            <p className="mt-2 text-zinc-500">
              Create • Explore • Conquer
            </p>
          </div>

          <div className="flex gap-8 text-zinc-400">
            <button className="hover:text-white">
              Privacy
            </button>

            <button className="hover:text-white">
              Terms
            </button>

            <button className="hover:text-white">
              Contact
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}