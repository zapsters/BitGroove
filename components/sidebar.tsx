"use client";
// ─── Sidebar ──────────────────────────────────────────────────────────────────

import { PixelVinyl } from "@/icons";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';

type Page = 'dashboard' | 'collection' | 'discover' | 'wishlist' | 'statistics' | 'settings'

export const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'collection', label: 'My Collection', icon: '♫' },
  { id: 'discover', label: 'Discover', icon: '◎' },
  { id: 'wishlist', label: 'Wishlist', icon: '♥' },
  { id: 'statistics', label: 'Statistics', icon: '▦' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

export function Sidebar() {
  const router = useRouter()
  var pathname = usePathname().slice(1);
  if (pathname.length == 0) pathname = "dashboard"
  console.log(pathname)
  return (
    <aside style={{ background: '#1a1928', borderRight: '2px solid rgba(166,155,200,0.15)', width: 220, display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '2px solid rgba(166,155,200,0.1)' }}>
        <div className="flex items-center gap-3">
          <PixelVinyl size={36} color="#F2C66D" spin />
          <div>
            <div style={{ fontFamily: 'Press Start 2P', fontSize: 10, color: '#F2C66D', lineHeight: 1.4, textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>BIT</div>
            <div style={{ fontFamily: 'Press Start 2P', fontSize: 10, color: '#F4A987', lineHeight: 1.4, textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>GROOVE</div>
          </div>
        </div>
        <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
          {['♪', '♫', '♩'].map((n, i) => <span key={i} className="twinkle" style={{ color: '#A69BC8', fontSize: 10, animationDelay: `${i * 0.6}s` }}>{n}</span>)}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() =>
              router.push(item.id == "dashboard" ? "./" : item.id)}
            className={pathname === item.id ? 'nav-active' : ''}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '11px 20px',
              background: 'none', border: 'none',
              borderLeft: pathname === item.id ? '3px solid #F2C66D' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'background 0.15s',
              textAlign: 'left',
            }}
            onMouseEnter={e => { if (pathname !== item.id) (e.currentTarget as HTMLElement).style.background = 'rgba(166,155,200,0.07)' }}
            onMouseLeave={e => { if (pathname !== item.id) (e.currentTarget as HTMLElement).style.background = 'none' }}
          >
            <span style={{ fontSize: 16, color: pathname === item.id ? '#F2C66D' : '#A69BC8', width: 20, textAlign: 'center' }}>{item.icon}</span>
            <span style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: pathname === item.id ? 600 : 400, color: pathname === item.id ? '#FFF2D5' : '#A69BC8' }}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '2px solid rgba(166,155,200,0.1)' }}>
        <div className="flex items-center gap-2">
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #E87575, #F4A987)', border: '2px solid rgba(166,155,200,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Press Start 2P', fontSize: 8, color: '#FFF2D5' }}>A</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#FFF2D5' }}>Apollo</div>
            <div style={{ fontSize: 11, color: '#A69BC8' }}>## albums</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

