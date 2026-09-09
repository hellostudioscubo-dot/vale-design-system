/**
 * Brand marks — exported from Figma (Foundations → Logo,
 * https://www.figma.com/design/CiJCwsSvwdxtorWL8uUHQQ, node 424:44),
 * 2026-09-09. `favicon` is a real SVG (single vector layer, scales
 * cleanly); the wordmark is shipped as PNG — Figma's SVG export flattens
 * this particular node with a stray full-frame background rect baked in
 * (an export quirk, not a design intent), so PNG (transparent, verified)
 * is the safe choice until that's revisited directly in Figma.
 */
import faviconUrl from "./favicon.svg";
import logoGrafite from "./logo-grafite.png";
import logoRoxo from "./logo-roxo.png";
import logoBranco from "./logo-branco.png";

export { faviconUrl };

/** Wordmark, transparent background. `branco` is for dark surfaces only —
 *  it's white-on-nothing, not paired with its own dark backing. */
export const logo = {
  grafite: logoGrafite,
  roxo: logoRoxo,
  branco: logoBranco,
} as const;
