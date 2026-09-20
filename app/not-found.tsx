import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-display text-fluid-3xl font-bold text-gradient-brand">
          404
        </h1>
        <p className="mt-4 max-w-md text-balance text-lg text-muted-foreground">
          This page drifted off into the void. Let&apos;s get you back on track.
        </p>
        <Button href="/" className="mt-8" variant="default">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Button>
      </div>
    </div>
  );
}
