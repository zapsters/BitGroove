// ─── Pixel Art SVG Components ─────────────────────────────────────────────────

export function PixelVinyl({ size = 32, color = '#F2C66D', spin = false }: { size?: number; color?: string; spin?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={`pixel-art ${spin ? 'spin-slow' : ''}`} style={{ imageRendering: 'pixelated' }}>
      <circle cx="8" cy="8" r="7" fill="#1a1a2e" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="8" r="4" fill="#24243A" stroke={color} strokeWidth="0.5" />
      <circle cx="8" cy="8" r="1.5" fill={color} />
      <line x1="1" y1="8" x2="5" y2="8" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="11" y1="8" x2="15" y2="8" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="8" y1="1" x2="8" y2="5" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="8" y1="11" x2="8" y2="15" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

export function PixelCassette({ size = 24, color = '#A69BC8' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 12" className="pixel-art" style={{ imageRendering: 'pixelated' }}>
      <rect x="1" y="1" width="14" height="10" rx="1" fill="#24243A" stroke={color} strokeWidth="1.5" />
      <rect x="3" y="3" width="4" height="3" rx="0.5" fill="#39365B" stroke={color} strokeWidth="0.5" />
      <rect x="9" y="3" width="4" height="3" rx="0.5" fill="#39365B" stroke={color} strokeWidth="0.5" />
      <circle cx="5" cy="4.5" r="1" fill={color} opacity="0.7" />
      <circle cx="11" cy="4.5" r="1" fill={color} opacity="0.7" />
      <rect x="3" y="7" width="10" height="1" fill={color} opacity="0.3" />
    </svg>
  )
}

export function PixelCD({ size = 24, color = '#91C9AD' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="pixel-art" style={{ imageRendering: 'pixelated' }}>
      <circle cx="8" cy="8" r="7" fill="#1a1a2e" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="8" r="5" fill="#2a2a4a" stroke={color} strokeWidth="0.5" opacity="0.5" />
      <circle cx="8" cy="8" r="3" fill="#24243A" stroke={color} strokeWidth="0.5" opacity="0.7" />
      <circle cx="8" cy="8" r="1.5" fill="#24243A" stroke={color} strokeWidth="1" />
      <line x1="2" y1="5" x2="6" y2="7" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="14" y1="11" x2="10" y2="9" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

export function PixelNote({ size = 16, color = '#F2C66D' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 10" className="pixel-art" style={{ imageRendering: 'pixelated' }}>
      <rect x="2" y="0" width="5" height="1" fill={color} />
      <rect x="2" y="1" width="1" height="6" fill={color} />
      <rect x="1" y="5" width="3" height="2" rx="1" fill={color} />
    </svg>
  )
}

export function PixelStar({ size = 12, color = '#F2C66D', filled = true }: { size?: number; color?: string; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" className="pixel-art" style={{ imageRendering: 'pixelated' }}>
      <polygon
        points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
        fill={filled ? color : 'transparent'}
        stroke={color}
        strokeWidth="0.8"
      />
    </svg>
  )
}