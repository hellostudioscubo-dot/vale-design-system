/**
 * Screen-flow illustrations — exported from Figma ("Fluxo do App - mobile",
 * https://www.figma.com/design/CiJCwsSvwdxtorWL8uUHQQ, node 1:2), 2026-09-09.
 * Storybook/demo only, same policy as `assets/companions` (see its own doc
 * comment): every template component takes these as props (`imageSrc`,
 * `backgroundImageSrc`...) — a consuming app supplies its own real content,
 * these just make the stories and demo render something real instead of a
 * gray box. Not part of the published npm package (see README → "Assets").
 */
import splashScene from "./splash-scene.png";
import valeScene from "./vale-scene.png";
import sessionEndCard from "./session-end-card.png";
import companionAchievement from "./companion-achievement.png";

export const screenImages = {
  /** Splash — the waterfall/companion illustration behind the wordmark. */
  splashScene,
  /** Vale — the full-bleed habitat scene behind the stats card. */
  valeScene,
  /** Fim de sessão — "Cartão do dragão". */
  sessionEndCard,
  /** Hoje — "Cartão de conquistas" illustration. */
  companionAchievement,
} as const;
