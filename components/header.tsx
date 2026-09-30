"use client";
// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  return (
    <header style={{ background: '#1e1d32', borderBottom: '2px solid rgba(166,155,200,0.1)', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexShrink: 0 }}>
      <h1 style={{ fontFamily: 'Press Start 2P', fontSize: 13, color: '#FFF2D5', textShadow: '2px 2px 0 rgba(0,0,0,0.4)', margin: 0 }}>TITLE</h1>
      {/* <div className="flex items-center gap-3" style={{ flex: 1, maxWidth: 420, marginLeft: 24 }}>
        {onSearch && (
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#A69BC8', fontSize: 14 }}>◎</span>
            <input
              className="input-pixel"
              style={{ width: '100%', height: 36, paddingLeft: 32, paddingRight: 12, fontSize: 13 }}
              placeholder="Search albums, artists..."
              value={searchValue ?? ''}
              onChange={e => onSearch(e.target.value)}
            />
          </div>
        )}
      </div> */}
      <div className="flex items-center gap-3">
        <button className="btn-pixel" onClick={() => { }} style={{ background: '#E87575', color: '#FFF2D5', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14 }}>＋</span> ADD ALBUM
        </button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #E87575, #F4A987)', border: '2px solid rgba(166,155,200,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Press Start 2P', fontSize: 9, color: '#FFF2D5', cursor: 'pointer' }}>A</div>
      </div>
    </header>
  )
}