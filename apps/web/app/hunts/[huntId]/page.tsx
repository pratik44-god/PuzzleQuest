import HuntPlayPage from "~/components/hunts/hunt-play-page";

type PageProps = {
  params: Promise<{
    huntId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { huntId } = await params;

  return <HuntPlayPage huntId={huntId} />;
}
