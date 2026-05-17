import { toast } from "sonner";

export default function ComingSoon({ feature }: { feature: string }) {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <span className="text-3xl">🚧</span>
      </div>
      <h2 className="text-xl font-bold">{feature}</h2>
      <p className="text-muted-foreground mt-2 max-w-sm">
        This feature is coming in a future milestone. Stay tuned!
      </p>
    </div>
  );
}