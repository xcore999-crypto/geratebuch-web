import { cn } from "@/lib/cn";

export type IconName =
  | "wrench"
  | "shield-check"
  | "tool"
  | "bolt"
  | "user-shield"
  | "chat"
  | "check-circle"
  | "exclamation-triangle"
  | "arrow-right"
  | "phone"
  | "envelope"
  | "map-pin"
  | "clock"
  | "building"
  | "chevron-down"
  | "chevron-right"
  | "x-mark"
  | "menu"
  | "grid"
  | "device"
  | "inbox"
  | "document"
  | "briefcase"
  | "folder"
  | "calendar"
  | "user"
  | "lock"
  | "download"
  | "search"
  | "plus"
  | "check"
  | "shield"
  | "layers"
  | "globe"
  | "logout"
  | "sun"
  | "waveform"
  | "waves"
  | "droplet"
  | "needle"
  | "target"
  | "pulse"
  | "snowflake"
  | "plug"
  | "camera"
  | "instagram"
  | "shopping-bag"
  | "whatsapp"
  | "play";

const paths: Record<IconName, React.ReactNode> = {
  wrench: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.7 6.3a4 4 0 0 0-5.6 4.5L4 16v3.5h3.5l5.2-5.1a4 4 0 0 0 4.5-5.6l-2.6 2.6-2.1-.5-.5-2.1 2.7-2.5Z"
    />
  ),
  "shield-check": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3.5 5 6v5.4c0 4.2 2.9 7.3 7 8.6 4.1-1.3 7-4.4 7-8.6V6l-7-2.5Z M9.3 12.2l1.8 1.8 3.6-3.7"
    />
  ),
  tool: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m6 20 4.5-4.5m0 0a3 3 0 1 0 3-3l6 6-2 2-6-6a3 3 0 0 0-3-3l-3 3 2 2ZM4 9l2-2 2 2-2 2-2-2Z"
    />
  ),
  bolt: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.5 3 5 13.5h5.5L11 21l7.5-10.5H13L12.5 3Z" />
  ),
  "user-shield": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.5 19.5c.7-2.9 3-4.5 5.5-4.5s4.8 1.6 5.5 4.5M16.5 8.5l3.5-1.3 3.5 1.3v2.6c0 2.4-1.5 4.1-3.5 4.9-2-.8-3.5-2.5-3.5-4.9V8.5Z"
    />
  ),
  chat: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5.5h16v10H9.5L5 19v-3.5H4v-10Z"
    />
  ),
  "check-circle": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8.5 12.3l2.3 2.3 4.7-4.8"
    />
  ),
  "exclamation-triangle": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4 2.5 20h19L12 4ZM12 10.5v4M12 17h.01"
    />
  ),
  "arrow-right": <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" />,
  phone: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 4.5h3.2l1.3 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.3V17.5c0 1.1-1 2-2.2 1.9C9.4 18.8 5.2 14.6 4.6 8.7 4.5 7.5 5.4 6.5 6.5 6.5"
    />
  ),
  envelope: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
    />
  ),
  "map-pin": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
  ),
  clock: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3 2"
    />
  ),
  building: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 21V4.5h9V21M14 21h5V10l-5-2.2M8 8h2M8 11.5h2M8 15h2M17 13.5h1M17 17h1"
    />
  ),
  "chevron-down": <path strokeLinecap="round" strokeLinejoin="round" d="m5.5 8.5 6.5 6.5 6.5-6.5" />,
  "chevron-right": <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 5.5 6.5 6.5-6.5 6.5" />,
  "x-mark": <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />,
  menu: <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />,
  grid: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 4.5h6.2v6.2H4.5V4.5Zm9 0h6.2v6.2h-6.2V4.5Zm-9 9h6.2v6.2H4.5v-6.2Zm9 0h6.2v6.2h-6.2v-6.2Z"
    />
  ),
  device: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 5.5h14v10H5v-10Zm3 13.5h8M12 15.5V19"
    />
  ),
  inbox: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 12.5h4.2l1.3 2.5h5l1.3-2.5H20M4 12.5 5.6 6h12.8L20 12.5M4 12.5V18h16v-5.5"
    />
  ),
  document: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Zm7 0V8h4M9 12.5h6M9 15.5h6M9 9.5h2"
    />
  ),
  briefcase: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.5 8.5h17v10h-17v-10Zm5-2v-1a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6.5v1M3.5 13.5h17"
    />
  ),
  folder: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6.5h5.2l1.6 2H20v10.5H4V6.5Z"
    />
  ),
  calendar: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 5.5h14v14H5v-14ZM5 9.5h14M8.5 3.5v3.5M15.5 3.5v3.5"
    />
  ),
  user: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20c1-3.5 4-5.5 7.5-5.5s6.5 2 7.5 5.5"
    />
  ),
  lock: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.5 10.5h11v9h-11v-9ZM8.5 10.5V7a3.5 3.5 0 1 1 7 0v3.5M12 14.5v2"
    />
  ),
  download: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3.5v11m0 0 4-4m-4 4-4-4M4.5 17v3h15v-3"
    />
  ),
  search: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20.5 20.5 16 16"
    />
  ),
  plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15M4.5 12h15" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.5 5 5 10-11" />,
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3.5 5 6v5.4c0 4.2 2.9 7.3 7 8.6 4.1-1.3 7-4.4 7-8.6V6l-7-2.5Z"
    />
  ),
  layers: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12 3 8 4.5-8 4.5-8-4.5L12 3Zm-8 8 8 4.5 8-4.5M4 15.5 12 20l8-4.5"
    />
  ),
  globe: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z"
    />
  ),
  logout: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 8V6.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V16M13 12H3.5m0 0 3-3m-3 3 3 3"
    />
  ),
  sun: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4"
    />
  ),
  waveform: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12h3V8h2v8h2V6h2v12h2v-9h2v5h2V9h2v3h2"
    />
  ),
  waves: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
    />
  ),
  droplet: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3.5c3 4 6 7.7 6 11a6 6 0 1 1-12 0c0-3.3 3-7 6-11Z"
    />
  ),
  needle: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 6v2M10 5v2M14 5v2M18 6v2M6 12v2M10 11v2M14 11v2M18 12v2M8 18h8"
    />
  ),
  target: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12h.01"
    />
  ),
  pulse: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12h3l2-3 2 6 2-9 2 6h7"
    />
  ),
  snowflake: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2v20M3.5 7l17 10M20.5 7l-17 10"
    />
  ),
  plug: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 2v4M15 2v4M7 6h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5V6ZM12 15v3M9 21h6"
    />
  ),
  camera: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1ZM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    />
  ),
  instagram: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 3.5h9a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm5.1-9.2h.01"
    />
  ),
  "shopping-bag": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2"
    />
  ),
  whatsapp: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 11.7a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 11.7Zm-11.5-4c.4 3.8 2.2 5.8 5.9 7l1.2-1.6-2.6-1.3-.8 1c-1.1-.5-2-1.4-2.5-2.5l1-.8-1.2-2.7-1 .9Z"
    />
  ),
  play: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 5.5v13l10-6.5-10-6.5Z" />
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.7,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
