"use client";

import AlbumForm, { BLANK_FORM } from "@/components/albumForm";
import { PixelVinyl } from "@/icons";
import { Album, AlbumFormData } from "@/types";
import { useState } from "react";

const MOCK_SEARCH_RESULTS = [
  { id: 'm1', title: 'Abbey Road', artist: 'The Beatles', year: 1969, color: '#F2C66D' },
  { id: 'm2', title: 'The Dark Side of the Moon', artist: 'Pink Floyd', year: 1973, color: '#91C9AD' },
  { id: 'm3', title: 'Blonde on Blonde', artist: 'Bob Dylan', year: 1966, color: '#E87575' },
  { id: 'm4', title: 'What\'s Going On', artist: 'Marvin Gaye', year: 1971, color: '#F4A987' },
  { id: 'm5', title: 'Exile on Main St.', artist: 'The Rolling Stones', year: 1972, color: '#A69BC8' },
  { id: 'm6', title: 'Horses', artist: 'Patti Smith', year: 1975, color: '#91C9AD' },
]

export default function Discover({ onSave, onBack }: { onSave: (a: Album) => void; onBack: () => void }) {
  const [tab, setTab] = useState<'search' | 'custom'>('search')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<typeof MOCK_SEARCH_RESULTS>([])
  const [selected, setSelected] = useState<(typeof MOCK_SEARCH_RESULTS)[0] | null>(null)
  const [saved, setSaved] = useState(false)

  const doSearch = () => {
    if (!query.trim()) return
    setLoading(true)
    setResults([])
    setTimeout(() => { setLoading(false); setResults(MOCK_SEARCH_RESULTS.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.artist.toLowerCase().includes(query.toLowerCase()) || query.length > 1)) }, 900)
  }

  const handleSave = (form: AlbumFormData) => {
    const album: Album = {
      id: Date.now().toString(),
      title: form.title, artist: form.artist, year: parseInt(form.year) || 2024,
      genre: form.genre, format: form.format, condition: form.condition,
      rating: form.rating, purchasePrice: parseFloat(form.purchasePrice) || 0,
      purchaseDate: form.purchaseDate, notes: form.notes,
      tracks: [],
      color: selected?.color ?? '#A69BC8',
      addedDate: new Date().toISOString().slice(0, 10),
    }
    onSave(album)
    setSaved(true)
  }

  if (saved) return (
    <div style={{ padding: '80px 28px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🎵</div>
      <div style={{ fontFamily: 'Press Start 2P', fontSize: 12, color: '#91C9AD', marginBottom: 12, textShadow: '2px 2px 0 rgba(0,0,0,0.4)' }}>ADDED TO COLLECTION!</div>
      <p style={{ color: '#A69BC8', fontSize: 14, marginBottom: 24 }}>Your album has been saved successfully.</p>
      <button className="btn-pixel" onClick={onBack} style={{ background: '#91C9AD', color: '#24243A', padding: '10px 20px' }}>VIEW COLLECTION →</button>
    </div>
  )

  return (
    <div style={{ padding: '24px 28px 40px' }}>
      {/* Tabs */}
      <div className="flex" style={{ borderBottom: '2px solid rgba(166,155,200,0.15)', marginBottom: 24 }}>
        {([['search', '◎ SEARCH MUSICBRAINZ'], ['custom', '✎ CUSTOM ALBUM']] as const).map(([t, l]) => (
          <button key={t} onClick={() => setTab(t)} style={{ fontFamily: 'Press Start 2P', fontSize: 8, padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer', color: tab === t ? '#F2C66D' : '#A69BC8', borderBottom: tab === t ? '2px solid #F2C66D' : '2px solid transparent', marginBottom: -2, transition: 'color 0.15s' }}>{l}</button>
        ))}
      </div>

      {tab === 'search' && !selected && (
        <div>
          <div className="flex gap-3" style={{ marginBottom: 24 }}>
            <input className="input-pixel" style={{ flex: 1, height: 44, padding: '0 16px', fontSize: 14 }} placeholder="Search for an album or artist..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSearch()} />
            <button className="btn-pixel" onClick={doSearch} style={{ background: '#F2C66D', color: '#24243A', padding: '0 20px', height: 44 }}>SEARCH</button>
          </div>
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card-pixel" style={{ background: '#2a2845', padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 60, height: 60, background: 'rgba(166,155,200,0.1)', animation: 'twinkle 1s ease-in-out infinite' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ height: 10, background: 'rgba(166,155,200,0.1)', marginBottom: 8 }} />
                    <div style={{ height: 8, background: 'rgba(166,155,200,0.07)', width: '70%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && results.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {results.map(r => (
                <div key={r.id} className="card-pixel" style={{ background: '#2a2845', padding: 16, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#312f5a'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#2a2845'}>
                  <div style={{ width: 60, height: 60, background: r.color + '33', border: `2px solid ${r.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Press Start 2P', fontSize: 10, color: r.color }}>{r.title[0]}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#FFF2D5', marginBottom: 2 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: '#A69BC8', marginBottom: 8 }}>{r.artist} · {r.year}</div>
                    <button className="btn-pixel" onClick={() => setSelected(r)} style={{ background: '#E87575', color: '#FFF2D5', padding: '5px 10px', fontSize: 7 }}>SELECT ▶</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && results.length === 0 && query && (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#A69BC8', marginBottom: 12 }}>NO RESULTS</div>
              <p style={{ color: '#A69BC8', fontSize: 14, marginBottom: 16 }}>Try a different search or add it manually.</p>
              <button className="btn-pixel" onClick={() => setTab('custom')} style={{ background: 'transparent', border: '2px solid #A69BC8', color: '#A69BC8', padding: '9px 18px' }}>ADD MANUALLY</button>
            </div>
          )}
          {!loading && results.length === 0 && !query && (
            <div style={{ textAlign: 'center', padding: 60, opacity: 0.6 }}>
              <div style={{ marginBottom: 12, opacity: 0.4 }}><PixelVinyl size={48} color="#A69BC8" /></div>
              <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#A69BC8' }}>SEARCH TO DISCOVER</div>
            </div>
          )}
        </div>
      )}

      {tab === 'search' && selected && (
        <div>
          <div className="flex items-center gap-3" style={{ marginBottom: 24, padding: '14px 16px', background: '#2a2845', border: '2px solid rgba(166,155,200,0.2)' }}>
            <div style={{ width: 56, height: 56, background: selected.color + '33', border: `2px solid ${selected.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Press Start 2P', fontSize: 12, color: selected.color }}>{selected.title[0]}</span>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#FFF2D5' }}>{selected.title}</div>
              <div style={{ fontSize: 13, color: '#A69BC8' }}>{selected.artist} · {selected.year}</div>
            </div>
            <button onClick={() => setSelected(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#A69BC8', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>
          <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#F2C66D', marginBottom: 18 }}>ENTER COLLECTION DETAILS</div>
          <AlbumForm initial={{ ...BLANK_FORM, title: selected.title, artist: selected.artist, year: selected.year.toString() }} onSave={handleSave} onCancel={() => setSelected(null)} />
        </div>
      )}

      {tab === 'custom' && (
        <div>
          <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#F2C66D', marginBottom: 18 }}>ENTER ALBUM DETAILS</div>
          <AlbumForm onSave={handleSave} onCancel={() => setTab('search')} />
        </div>
      )}
    </div>
  )
}