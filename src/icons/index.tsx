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
