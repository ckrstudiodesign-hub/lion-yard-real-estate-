import { WordmarkStacked } from "@/components/ui/Wordmark";

export default function Loading() {
  return (
    <div className="flex h-[100svh] w-full flex-col items-center justify-center bg-ink relative overflow-hidden">
      {/* Ambient light for dark logos on dark backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-bone/10 rounded-full blur-[80px] pointer-events-none" />

      {/* 
        Smooth fading logo with a subtle progress bar below it.
      */}
      <div className="relative z-10 flex flex-col items-center gap-10 opacity-0 animate-in fade-in duration-[1200ms] fill-mode-forwards">
        <div className="animate-pulse">
          <WordmarkStacked className="text-bone" />
        </div>
        
        <span className="block h-[1px] w-12 bg-champagne overflow-hidden relative">
          <span className="absolute inset-0 block bg-bone translate-x-[-100%] animate-[progress_1.5s_ease-in-out_infinite]" />
        </span>
      </div>
    </div>
  );
}
