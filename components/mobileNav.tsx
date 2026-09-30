"use client";
// ─── Mobile Nav ───────────────────────────────────────────────────────────────

type Page = 'dashboard' | 'collection' | 'discover' | 'wishlist' | 'statistics' | 'settings'

export const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'collection', label: 'My Collection', icon: '♫' },
  { id: 'discover', label: 'Discover', icon: '◎' },
  { id: 'wishlist', label: 'Wishlist', icon: '♥' },
  { id: 'statistics', label: 'Statistics', icon: '▦' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

export function MobileNav() {
  const current = "settings";
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#1a1928', borderTop: '2px solid rgba(166,155,200,0.15)', display: 'flex', zIndex: 40 }}>
      {NAV_ITEMS.slice(0, 5).map(item => (
        <button key={item.id} onClick={() => alert(item.id)} style={{ flex: 1, padding: '10px 4px 8px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <span style={{ fontSize: 18, color: current === item.id ? '#F2C66D' : '#A69BC8' }}>{item.icon}</span>
          <span style={{ fontFamily: 'Press Start 2P', fontSize: 5, color: current === item.id ? '#F2C66D' : '#A69BC8' }}>{item.label.split(' ')[0].toUpperCase().slice(0, 4)}</span>
        </button>
      ))}
    </nav>
  )
}