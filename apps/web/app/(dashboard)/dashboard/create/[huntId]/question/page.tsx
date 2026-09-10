import CreateQuestion from "~/components/CreateQuestion/CreateQuestion";

type PageProps = {
  params: Promise<{
    huntId: string;
  }>;
};

export default async function CreateQuestionPage({ params }: PageProps) {
  const { huntId } = await params;

  return <CreateQuestion huntId={huntId} />;
}

