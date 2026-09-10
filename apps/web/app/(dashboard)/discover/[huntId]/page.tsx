import HuntDetailPage from "~/components/discover/HuntDetailPage";

type PageProps = {
  params: Promise<{
    huntId: string;
  }>;
};

export default async function DiscoverHuntPage({ params }: PageProps) {
  const { huntId } = await params;

  return <HuntDetailPage huntId={huntId} />;
}
