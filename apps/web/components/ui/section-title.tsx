import Badge from "./badge";

type Props = {
  badge: string;
  title: string;
  description: string;
};

export default function SectionTitle({
  badge,
  title,
  description,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge>{badge}</Badge>

      <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-lg text-zinc-400">
        {description}
      </p>
    </div>
  );
}