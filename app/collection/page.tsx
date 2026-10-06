"use client";

import AlbumCardGrid from "@/components/albumCardGrid";
import AlbumCardList from "@/components/albumCardList";
import { INITIAL_ALBUMS } from "@/defaultData";
import { PixelVinyl } from "@/icons";
import { Album } from "@/types";
import { useMemo, useState } from "react";

export default function Collection({ albums, onAlbum, onAddAlbum }: { albums: Album[]; onAlbum: (a: Album) => void; onAddAlbum: () => void }) {
  if (!albums) albums = INITIAL_ALBUMS
  const [search, setSearch] = useState('')
  const [format, setFormat] = useState<string>('all')
  const [genre, setGenre] = useState<string>('all')
  const [sort, setSort] = useState<string>('added')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const genres = useMemo(() => ['all', ...Array.from(new Set(albums.map(a => a.genre))).sort()], [albums])

  const filtered = useMemo(() => {
    let arr = albums
    if (search) arr = arr.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.artist.toLowerCase().includes(search.toLowerCase()))
    if (format !== 'all') arr = arr.filter(a => a.format === format)
    if (genre !== 'all') arr = arr.filter(a => a.genre === genre)
    if (sort === 'title') arr = [...arr].sort((a, b) => a.title.localeCompare(b.title))
    else if (sort === 'artist') arr = [...arr].sort((a, b) => a.artist.localeCompare(b.artist))
    else if (sort === 'year') arr = [...arr].sort((a, b) => b.year - a.year)
    else arr = [...arr].sort((a, b) => b.addedDate.localeCompare(a.addedDate))
    return arr
  }, [albums, search, format, genre, sort])

  return (
    <div style={{ padding: '24px 28px 40px' }}>
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap" style={{ marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#A69BC8' }}>◎</span>
          <input className="input-pixel" style={{ width: '100%', height: 36, paddingLeft: 32, paddingRight: 12, fontSize: 13 }} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {([['format', format, setFormat, [['all', 'All Formats'], ['vinyl', 'Vinyl'], ['cd', 'CD'], ['cassette', 'Cassette']]], ['genre', genre, setGenre, genres.map(g => [g, g === 'all' ? 'All Genres' : g])], ['sort', sort, setSort, [['added', 'Date Added'], ['title', 'Album Title'], ['artist', 'Artist'], ['year', 'Release Year']]]] as const).map(([key, val, setter, opts]: any) => (
          <select key={key} className="input-pixel" style={{ height: 36, padding: '0 12px', fontSize: 12 }} value={val} onChange={e => setter(e.target.value)}>
            {opts.map(([v, l]: [string, string]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ))}
        <div className="flex" style={{ border: '2px solid rgba(166,155,200,0.3)' }}>
          {(['grid', 'list'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding: '6px 12px', background: view === v ? '#F2C66D22' : 'transparent', border: 'none', color: view === v ? '#F2C66D' : '#A69BC8', cursor: 'pointer', fontSize: 14, transition: 'background 0.1s' }}>
              {v === 'grid' ? '⊞' : '☰'}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div style={{ fontFamily: 'Press Start 2P', fontSize: 8, color: '#A69BC8', marginBottom: 16 }}>
        {filtered.length} ALBUM{filtered.length !== 1 ? 'S' : ''} {search || format !== 'all' || genre !== 'all' ? '(FILTERED)' : ''}
      </div>

      {/* Grid / List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ marginBottom: 20, opacity: 0.5 }}>
            <PixelVinyl size={64} color="#A69BC8" />
          </div>
          <div style={{ fontFamily: 'Press Start 2P', fontSize: 10, color: '#A69BC8', marginBottom: 12 }}>NO ALBUMS FOUND</div>
          <p style={{ color: '#A69BC8', fontSize: 14, marginBottom: 20 }}>Try adjusting your filters or add your first album.</p>
          <button className="btn-pixel" onClick={onAddAlbum} style={{ background: '#E87575', color: '#FFF2D5', padding: '10px 20px' }}>ADD YOUR FIRST ALBUM</button>
        </div>
      ) : view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
          {filtered.map(a => <AlbumCardGrid key={a.id} album={a} onClick={() => onAlbum(a)} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(a => <AlbumCardList key={a.id} album={a} onClick={() => onAlbum(a)} />)}
        </div>
      )}
    </div>
  )
}
