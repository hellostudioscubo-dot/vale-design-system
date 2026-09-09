/**
 * Typography tokens — Figma text styles (Foundations → Typography).
 * Fraunces (variable serif) for display/number moments, Poppins for
 * everything functional (body, labels, captions).
 */

export const fontFamily = {
  display: '"Fraunces", "Georgia", serif',
  body: '"Poppins", "Segoe UI", sans-serif',
} as const;

export interface TypeStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
}

export const typeScale = {
  display: {
    fontFamily: fontFamily.display,
    fontWeight: 400,
    fontSize: "44px",
    lineHeight: "1.2",
  },
  tituloG: {
    fontFamily: fontFamily.display,
    fontWeight: 400,
    fontSize: "28px",
    lineHeight: "1.3",
  },
  tituloM: {
    fontFamily: fontFamily.display,
    fontWeight: 400,
    fontSize: "22px",
    lineHeight: "1.3",
  },
  numero: {
    fontFamily: fontFamily.display,
    fontWeight: 400,
    fontSize: "36px",
    lineHeight: "1.1",
  },
  numeroConquista: {
    fontFamily: fontFamily.display,
    fontWeight: 700,
    fontSize: "36px",
    lineHeight: "1.1",
  },
  timer: {
    fontFamily: fontFamily.display,
    fontWeight: 400,
    fontSize: "56px",
    lineHeight: "1.1",
  },
  corpo: {
    fontFamily: fontFamily.body,
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "1.6",
  },
  corpoM: {
    fontFamily: fontFamily.body,
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "1.6",
  },
  auxiliar: {
    fontFamily: fontFamily.body,
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "1.5",
  },
  legenda: {
    fontFamily: fontFamily.body,
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "1.4",
  },
} as const satisfies Record<string, TypeStyle>;

export type TypeScaleToken = keyof typeof typeScale;
