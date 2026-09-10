import { Eye, Globe, Save } from "lucide-react";
import Button from "~/components/ui/buttton";

export default function PreviewActions({
  onContinue,
  onSaveDraft,
  onPublish,
  isLoading = false,
}: {
  onContinue: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  isLoading?: boolean;
}) {
  return (
    <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-[#090c17]/90 p-4 backdrop-blur-xl sm:grid-cols-3 sm:p-5">
      <Button variant="secondary" size="lg" onClick={onContinue} disabled={isLoading} leftIcon={<Eye size={19} />}>
        <div className="text-left">
          <p className="font-bold">Continue Editing</p>
          <p className="mt-0.5 text-xs font-normal text-zinc-500">Go back to questions</p>
        </div>
      </Button>

      <Button variant="secondary" size="lg" onClick={onSaveDraft} disabled={isLoading} loading={isLoading} leftIcon={<Save size={19} />}>
        <div className="text-left">
          <p className="font-bold">Save Draft</p>
          <p className="mt-0.5 text-xs font-normal text-zinc-500">Save your progress</p>
        </div>
      </Button>

      <Button variant="primary" size="lg" onClick={onPublish} disabled={isLoading} loading={isLoading} leftIcon={<Globe size={19} />}>
        <div className="text-left">
          <p className="font-bold">Publish Hunt</p>
          <p className="mt-0.5 text-xs font-normal text-white/60">Make your hunt live</p>
        </div>
      </Button>
    </div>
  );
}