/**
 * Companion illustrations — exported from Figma (Components → Egg Card,
 * https://www.figma.com/design/CiJCwsSvwdxtorWL8uUHQQ, node 422:51),
 * 2026-09-09. Three life stages × six character colors = the full set
 * EggCard's Figma component covers. These were the one asset EggCard
 * always needed from outside (see its own doc comment) — consuming apps
 * can still pass their own `imageSrc`, but now don't have to.
 */
import eggLilas from "./egg-lilas.png";
import eggAmbar from "./egg-ambar.png";
import eggSalvia from "./egg-salvia.png";
import eggAmeixa from "./egg-ameixa.png";
import eggAreia from "./egg-areia.png";
import eggDourado from "./egg-dourado.png";
import hatchlingLilas from "./hatchling-lilas.png";
import hatchlingAmbar from "./hatchling-ambar.png";
import hatchlingSalvia from "./hatchling-salvia.png";
import hatchlingAmeixa from "./hatchling-ameixa.png";
import hatchlingAreia from "./hatchling-areia.png";
import hatchlingDourado from "./hatchling-dourado.png";
import adultLilas from "./adult-lilas.png";
import adultAmbar from "./adult-ambar.png";
import adultSalvia from "./adult-salvia.png";
import adultAmeixa from "./adult-ameixa.png";
import adultAreia from "./adult-areia.png";
import adultDourado from "./adult-dourado.png";

export type CompanionColor = "Lilás" | "Âmbar" | "Sálvia" | "Ameixa" | "Areia" | "Dourado";

/** Keyed to match EggCard's `stage` prop exactly. */
export const companionImages = {
  egg: {
    Lilás: eggLilas,
    Âmbar: eggAmbar,
    Sálvia: eggSalvia,
    Ameixa: eggAmeixa,
    Areia: eggAreia,
    Dourado: eggDourado,
  },
  hatchling: {
    Lilás: hatchlingLilas,
    Âmbar: hatchlingAmbar,
    Sálvia: hatchlingSalvia,
    Ameixa: hatchlingAmeixa,
    Areia: hatchlingAreia,
    Dourado: hatchlingDourado,
  },
  youngAdult: {
    Lilás: adultLilas,
    Âmbar: adultAmbar,
    Sálvia: adultSalvia,
    Ameixa: adultAmeixa,
    Areia: adultAreia,
    Dourado: adultDourado,
  },
} as const satisfies Record<"egg" | "hatchling" | "youngAdult", Record<CompanionColor, string>>;
