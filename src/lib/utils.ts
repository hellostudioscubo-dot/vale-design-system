import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge ships its own default list of Tailwind's *stock* class
 * groups (e.g. font-size only knows the default `xs`…`9xl` scale). Our
 * custom type-scale tokens (`text-auxiliar`, `text-corpo`…) don't match
 * that list, so by default twMerge misclassifies them as *text-color*
 * utilities (`text-{value}` is its catch-all) — which then "wins" a
 * conflict against a real color like `text-text-inverse` and silently
 * drops it. Registering our tokens under the `font-size` group fixes that.
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "titulo-g",
            "titulo-m",
            "numero",
            "timer",
            "corpo",
            "auxiliar",
            "legenda",
          ],
        },
      ],
    },
  },
});

/**
 * Merge Tailwind class lists safely — later classes win over earlier
 * conflicting ones, instead of both being emitted (clsx alone would do that).
 */
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
