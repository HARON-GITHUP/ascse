const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export function SearchIcon({ size = 20, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <circle cx="11" cy="11" r="6.75" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  )
}

export function BagIcon({ size = 21, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M5.2 8.2h13.6l.85 11.1a1.7 1.7 0 0 1-1.7 1.8H6.05a1.7 1.7 0 0 1-1.7-1.8L5.2 8.2Z" />
      <path d="M9 9V6.8a3 3 0 0 1 6 0V9" />
    </svg>
  )
}

export function MenuIcon({ size = 22, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M4 7.2h16" />
      <path d="M7 12h13" />
      <path d="M4 16.8h16" />
    </svg>
  )
}

export function CloseIcon({ size = 20, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

export function ArrowLeftIcon({ size = 18, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  )
}

export function ArrowUpLeftIcon({ size = 18, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M18 18 6 6" />
      <path d="M6 15V6h9" />
    </svg>
  )
}

export function TruckIcon({ size = 21, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M3.5 6.5h10.2v10.2H3.5z" />
      <path d="M13.7 10h3.6l3.2 3.2v3.5h-6.8" />
      <circle cx="7" cy="18" r="1.7" />
      <circle cx="17.2" cy="18" r="1.7" />
    </svg>
  )
}

export function RefreshIcon({ size = 21, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M20 7.4v5h-5" />
      <path d="M4 16.6v-5h5" />
      <path d="M6.3 9.1a7.2 7.2 0 0 1 11.9-1.7L20 9" />
      <path d="M17.7 14.9A7.2 7.2 0 0 1 5.8 16.6L4 15" />
    </svg>
  )
}

export function ChatIcon({ size = 21, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2 1.2-4.1A7.5 7.5 0 1 1 20 11.5Z" />
      <path d="M8.5 11.5h.01" />
      <path d="M12 11.5h.01" />
      <path d="M15.5 11.5h.01" />
    </svg>
  )
}

export function CheckIcon({ size = 18, strokeWidth = 1.8, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="m5 12.5 4.4 4.4L19 6.9" />
    </svg>
  )
}

export function PlusIcon({ size = 16, strokeWidth = 1.8, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

export function MinusIcon({ size = 16, strokeWidth = 1.8, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function TrashIcon({ size = 16, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M4.5 7h15" />
      <path d="M9 7V4.5h6V7" />
      <path d="m6.5 7 .8 13h9.4l.8-13" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  )
}

export function InstagramIcon({ size = 18, strokeWidth = 1.5, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.6 6.5h.01" />
    </svg>
  )
}

export function MailIcon({ size = 18, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6L19.5 7" />
    </svg>
  )
}

export function PhoneIcon({ size = 18, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M8.2 4.2 5.6 6.1c-1.1.8-1.5 2.3-.8 3.5 2.2 3.8 5.6 7.2 9.4 9.4 1.2.7 2.7.3 3.5-.8l1.9-2.6-4-2.6-1.7 1.7a15 15 0 0 1-5.6-5.6l1.7-1.7-1.8-3.2Z" />
    </svg>
  )
}

export function SparkleIcon({ size = 14, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 2.5c.4 4.9 2.6 7.1 7.5 7.5-4.9.4-7.1 2.6-7.5 7.5-.4-4.9-2.6-7.1-7.5-7.5 4.9-.4 7.1-2.6 7.5-7.5Z" />
    </svg>
  )
}

export function HeartIcon({ size = 20, strokeWidth = 1.6, filled = false, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path
        d="M12 20.2S4.4 15.7 4.4 10.3a4.2 4.2 0 0 1 7.6-2.4 4.2 4.2 0 0 1 7.6 2.4c0 5.4-7.6 9.9-7.6 9.9Z"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  )
}

export function UserIcon({ size = 20, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.2 20a6.8 6.8 0 0 1 13.6 0" />
    </svg>
  )
}

export function LockIcon({ size = 18, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <rect x="5" y="10" width="14" height="10" rx="2.4" />
      <path d="M8.3 10V7.7a3.7 3.7 0 0 1 7.4 0V10" />
      <path d="M12 14.2v2.2" />
    </svg>
  )
}

export function EyeIcon({ size = 18, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M2.8 12S6.3 6.2 12 6.2 21.2 12 21.2 12 17.7 17.8 12 17.8 2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="2.7" />
    </svg>
  )
}

export function EyeOffIcon({ size = 18, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M4 4 20 20" />
      <path d="M9.9 6.6A9.8 9.8 0 0 1 12 6.2c5.7 0 9.2 5.8 9.2 5.8a17 17 0 0 1-2.3 3.1" />
      <path d="M14.7 17.3a10 10 0 0 1-2.7.5C6.3 17.8 2.8 12 2.8 12a17.6 17.6 0 0 1 3.1-3.8" />
      <path d="M10 10a2.8 2.8 0 0 0 4 4" />
    </svg>
  )
}

export function GoogleIcon({ size = 18, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" {...props}>
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.2h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.8 3-4.4 3-7.5Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6Z" />
      <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2a10 10 0 0 0-8.9 5.5l3.3 2.6C7.2 7.6 9.4 5.9 12 5.9Z" />
    </svg>
  )
}

export function StarIcon({ size = 13, filled = true, strokeWidth = 1.4, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path
        d="m12 3.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8L12 3.6Z"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  )
}

export function WatchIcon({ size = 22, strokeWidth = 1.5, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="12" r="5.2" />
      <path d="M9.2 7.1 8.7 3.2h6.6l-.5 3.9" />
      <path d="M9.2 16.9l-.5 3.9h6.6l-.5-3.9" />
      <path d="M12 9.3V12l1.8 1.2" />
    </svg>
  )
}

export function PauseIcon({ size = 15, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <rect x="6" y="4.5" width="4" height="15" rx="1" />
      <rect x="14" y="4.5" width="4" height="15" rx="1" />
    </svg>
  )
}

export function PlayIcon({ size = 15, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M8 4.8v14.4L19.2 12 8 4.8Z" />
    </svg>
  )
}

export function RotateIcon({ size = 15, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M20 7.4v5h-5" />
      <path d="M18.4 8.6A7.4 7.4 0 1 0 19.4 15" />
    </svg>
  )
}

export function QuoteIcon({ size = 28, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M9.2 5.4c-3 1.4-4.8 3.9-4.8 7.1 0 3.2 1.8 5.2 4.3 5.2 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.4-3.2-3.4-.4 0-.8.1-1.1.2.3-1.4 1.3-2.6 2.8-3.5L9.2 5.4Zm9.4 0c-3 1.4-4.8 3.9-4.8 7.1 0 3.2 1.8 5.2 4.3 5.2 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.4-3.2-3.4-.4 0-.8.1-1.1.2.3-1.4 1.3-2.6 2.8-3.5l-1.8-1.9Z" />
    </svg>
  )
}

export function BellIcon({ size = 19, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M18 8.6a5.4 5.4 0 0 0-10.8 0c-.5-.8-1.2-1.3-2-1.3-.2 0-.4.15-.4.34v.5a4.6 4.6 0 0 0 9.2 0v-.5c0-.2-.2-.35-.4-.34-.8 0-1.5.5-2 1.3Z" />
      <path d="M10 18.5a2.2 2.2 0 0 0 4 0" />
    </svg>
  )
}

export function PackageIcon({ size = 20, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M21 8.2 12 3.1 3 8.2v7.6l9 5.1 9-5.1v-7.6Z" />
      <path d="M3 8.2 12 12.9l9-4.7" />
      <path d="M12 12.9v8.3" />
    </svg>
  )
}

export function ChartIcon({ size = 20, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M20 20H8" />
    </svg>
  )
}

export function SettingsIcon({ size = 20, strokeWidth = 1.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...baseProps} strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 13 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 10 15.4a1.7 1.7 0 0 0-1.51-1H5a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 6.6 10a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 11 5.6a1.7 1.7 0 0 0 1-1.51V5a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 14.6 9.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19 13.4a1.7 1.7 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z" />
    </svg>
  )
}
