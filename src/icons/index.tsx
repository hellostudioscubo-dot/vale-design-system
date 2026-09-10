import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

/**
 * Base props for every icon in the set: 24×24 grid, 1.5px open stroke,
 * rounded caps/joins — matches Foundations → Icons in Figma.
 * Icons are decorative by default (`aria-hidden`); the accessible name
 * belongs to the visible label or the interactive element that wraps them.
 */
function iconDefaults(props: IconProps): IconProps {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function PlanIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  );
}

export function CareerIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M7 10.5V16c0 1.1 2.24 2 5 2s5-.9 5-2v-5.5" />
    </svg>
  );
}

export function ValeIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M4 17 9 7l4 6 3-4 4 8" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M8 6.5v11l9-5.5-9-5.5Z" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12H5M19 12h2.5M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

/** Ícone/voltar — back navigation, used on every detail-style screen header. */
export function BackIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="m10 5-7 7 7 7M3 12h18" />
    </svg>
  );
}

/** Ícone/arquivar — archive an item (Detalhe do item, Progresso, Certificados headers). */
export function ArchiveIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M3 7h18M5 7v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7M4 4h16a1 1 0 0 1 1 1v2H3V5a1 1 0 0 1 1-1ZM10 12h4" />
    </svg>
  );
}

/** Ícone/adicionar — new item (Plano/Carreira header, "+"). */
export function AddIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** Ícone/ajustes — settings (gear), Hoje/Vale header and bottom-sheet entry point. */
export function SettingsIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

/** Ícone/exportar — export data (Ajustes → Conta). */
export function ExportIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M12 15V4M8 8l4-4 4 4M5 15v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

/** Ícone/certificado — a completed course (Certificados list). */
export function CertificateIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <circle cx="12" cy="8" r="5" />
      <path d="m9 12.5-1.5 7L12 17l4.5 2.5-1.5-7" />
    </svg>
  );
}

/** Ícone/publicacao — a public post/article (Certificados list). */
export function PublicationIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M4 5a1 1 0 0 1 1-1h11l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z" />
      <path d="M16 4v4h4M8 13h8M8 17h5" />
    </svg>
  );
}

/** Ícone/projeto — a shipped project (Certificados list). */
export function ProjectIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M3 7a1 1 0 0 1 1-1h4l2 2h10a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" />
    </svg>
  );
}

/** Ícone/parar — end the focus session (a filled square, not an outline). */
export function StopIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Small disclosure chevron — settings rows that open a picker. */
export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

/**
 * Google's "G" mark — a real logo, not a line icon, so (unlike every icon
 * above) it doesn't follow the 1.5px-stroke/currentColor convention: brand
 * marks need their real multi-color identity to stay recognizable. Used
 * only by LoginScreen's "Continuar com Google" button.
 */
export function GoogleIcon(props: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="#4285F4"
        d="M23.04 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.19a5.3 5.3 0 0 1-2.3 3.48v2.89h3.72c2.18-2 3.43-4.96 3.43-8.55Z"
      />
      <path
        fill="#34A853"
        d="M12 23.5c3.1 0 5.7-1.03 7.6-2.78l-3.71-2.89c-1.03.69-2.36 1.1-3.89 1.1-2.99 0-5.52-2.02-6.43-4.73H1.74v2.98A11.5 11.5 0 0 0 12 23.5Z"
      />
      <path
        fill="#FBBC05"
        d="M5.57 14.2a6.9 6.9 0 0 1 0-4.4V6.82H1.74a11.5 11.5 0 0 0 0 10.36l3.83-2.98Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.07c1.69 0 3.2.58 4.4 1.72l3.3-3.3C17.7 1.64 15.1.5 12 .5A11.5 11.5 0 0 0 1.74 6.82l3.83 2.98C6.48 7.09 9.01 5.07 12 5.07Z"
      />
    </svg>
  );
}

/**
 * Apple's mark — a real logo (see GoogleIcon's doc comment for why this pair
 * doesn't follow the stroke-icon convention). Used only by LoginScreen's
 * "Continuar com Apple" button.
 */
export function AppleIcon(props: IconProps) {
  return (
    <svg width={16} height={18} viewBox="0 0 16 18" fill="currentColor" aria-hidden {...props}>
      <path d="M13.15 9.53c-.02-2.06 1.68-3.05 1.76-3.1-.96-1.4-2.45-1.6-2.98-1.62-1.27-.13-2.48.75-3.12.75-.65 0-1.63-.73-2.68-.71-1.38.02-2.65.8-3.36 2.03-1.43 2.48-.36 6.16 1.03 8.18.68.99 1.5 2.1 2.57 2.06 1.03-.04 1.42-.66 2.67-.66 1.24 0 1.6.66 2.68.64 1.11-.02 1.81-1.01 2.49-2 .78-1.15 1.1-2.27 1.12-2.32-.02-.01-2.15-.83-2.18-3.25ZM11.1 3.28c.57-.7.96-1.66.85-2.62-.83.03-1.83.55-2.42 1.24-.53.61-.99 1.6-.87 2.53.91.07 1.85-.46 2.44-1.15Z" />
    </svg>
  );
}
