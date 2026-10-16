/**
 * Small line icons used across the site.
 * Usage: <Icon name="clock" />
 */

const paths = {
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  left: <path d="M15 5l-7 7 7 7" />,
  right: <path d="M9 5l7 7-7 7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6l8.5 7 8.5-7" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
} as const;

/** Brand icons are filled shapes rather than outlines */
const filledPaths = {
  tiktok: (
    <path d="M16.6 3c.4 2.2 1.8 3.7 4 3.9v3.2a7.6 7.6 0 0 1-4-1.2v6.3c0 3.6-2.6 5.8-5.8 5.8A5.6 5.6 0 0 1 5.2 15.4c0-3.4 2.9-5.9 6.5-5.4v3.3c-1.6-.4-3.2.6-3.2 2.1 0 1.3 1 2.3 2.3 2.3 1.4 0 2.4-.9 2.4-2.7V3h3.4z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6V21h-4v-5c0-1.2 0-2.75-1.68-2.75s-1.94 1.3-1.94 2.65V21h-4z" />
  ),
} as const;

export type IconName = keyof typeof paths | keyof typeof filledPaths;

export function Icon({ name }: { name: IconName }) {
  if (name in filledPaths) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {filledPaths[name as keyof typeof filledPaths]}
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name as keyof typeof paths]}
    </svg>
  );
}
