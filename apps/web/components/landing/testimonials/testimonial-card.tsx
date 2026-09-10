import Card from "~/components/ui/cardd";

type TestimonialCardProps = {
  name: string;
  role: string;
  review: string;
};

export default function TestimonialCard({
  name,
  role,
  review,
}: TestimonialCardProps) {
  return (
    <Card className="h-full p-6 hover:border-violet-500/30 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-bold text-white">
          {name.charAt(0)}
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {name}
          </h3>

          <p className="text-sm text-zinc-400">
            {role}
          </p>
        </div>
      </div>

      <p className="mt-6 leading-7 text-zinc-400">
        "{review}"
      </p>
    </Card>
  );
}