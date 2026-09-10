import DashboardHuntDetailPage from "~/components/dashboard/DashboardHuntDetailPage";

type PageProps = {
  params: Promise<{
    huntId: string;
  }>;
};

export default async function DashboardHuntPage({ params }: PageProps) {
  const { huntId } = await params;

  return <DashboardHuntDetailPage huntId={huntId} />;
}
