import { LoadingBar } from "@/components/atoms/LoadingBar";
import { cn } from "@/lib/utils";

/**
 * SplashScreen — Figma: Fluxo do App - mobile → Splash. A template: the
 * app's launch screen, full-bleed illustration behind the wordmark and a
 * loading bar. Images are supplied by the consuming app via props (same
 * choice as `EggCard`'s `imageSrc` — see its doc comment): a 7MB hero photo
 * has no place in a published npm package.
 */
export interface SplashScreenProps {
  backgroundImageSrc: string;
  logoSrc: string;
  logoAlt?: string;
  loadingValue: number;
  loadingMax?: number;
  loadingLabel?: string;
  className?: string;
}

export function SplashScreen({
  backgroundImageSrc,
  logoSrc,
  logoAlt = "Vale",
  loadingValue,
  loadingMax = 100,
  loadingLabel,
  className,
}: SplashScreenProps) {
  return (
    <div className={cn("relative flex h-full min-h-[844px] w-full flex-col justify-end overflow-hidden bg-surface-muted", className)}>
      <img
        src={backgroundImageSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />
      <img
        src={logoSrc}
        alt={logoAlt}
        className="absolute left-1/2 top-[9%] w-1/2 -translate-x-1/2"
      />
      <div className="relative px-8 pb-16">
        <LoadingBar value={loadingValue} max={loadingMax} label={loadingLabel} />
      </div>
    </div>
  );
}
