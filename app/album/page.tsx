import AlbumArt from "@/components/albumArt";
import FormatBadge from "@/components/formatBadge";
import StarRating from "@/components/starRating";
import { Album } from "@/types";
"use client";

import { useState } from "react"

export default function AlbumDetail({ album, onBack, onEdit, onDelete }: { album: Album; onBack: () => void; onEdit: (a: Album) => void; onDelete: (id: string) => void }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div style={{ padding: '24px 28px 40px' }}>
      <button onClick={onBack} style={{ fontFamily: 'Press Start 2P', fontSize: 8, color: '#A69BC8', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
        ← BACK TO COLLECTION
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }}>
        {/* Left: Art + actions */}
        <div>
          <AlbumArt album={album} size="lg" />
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexDirection: 'column' }}>
            <button className="btn-pixel" onClick={() => onEdit(album)} style={{ background: '#F2C66D', color: '#24243A', padding: '9px', width: '100%' }}>✎ EDIT ALBUM</button>
            <button className="btn-pixel" onClick={() => setShowDeleteConfirm(true)} style={{ background: 'transparent', color: '#E87575', border: '2px solid #E87575', padding: '9px', width: '100%' }}>✕ DELETE</button>
          </div>
          {/* Wishlist check */}
          <div className="card-pixel" style={{ background: '#2a2845', padding: 14, marginTop: 16 }}>
            <div style={{ fontFamily: 'Press Start 2P', fontSize: 7, color: '#F4A987', marginBottom: 8 }}>♥ WISHLIST</div>
            <div style={{ fontSize: 12, color: '#A69BC8' }}>Not in your wishlist</div>
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <div style={{ marginBottom: 6 }}><FormatBadge format={album.format} /></div>
          <h2 style={{ fontFamily: 'Press Start 2P', fontSize: 16, color: '#FFF2D5', margin: '8px 0 4px', textShadow: '2px 2px 0 rgba(0,0,0,0.4)', lineHeight: 1.5 }}>{album.title}</h2>
          <div style={{ fontSize: 18, color: '#A69BC8', fontWeight: 600, marginBottom: 12 }}>{album.artist}</div>
          <div className="flex items-center gap-12" style={{ marginBottom: 20 }}>
            <div><div style={{ fontSize: 11, color: '#A69BC8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}>Year</div><div style={{ fontSize: 15, color: '#FFF2D5', fontWeight: 600 }}>{album.year}</div></div>
            <div><div style={{ fontSize: 11, color: '#A69BC8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}>Genre</div><div style={{ fontSize: 15, color: '#FFF2D5', fontWeight: 600 }}>{album.genre}</div></div>
            <div><div style={{ fontSize: 11, color: '#A69BC8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}>Rating</div><StarRating rating={album.rating} /></div>
          </div>

          {/* Collection details */}
          <div className="card-pixel" style={{ background: '#2a2845', padding: '18px 20px', marginBottom: 20 }}>
            <div style={{ fontFamily: 'Press Start 2P', fontSize: 8, color: '#F2C66D', marginBottom: 14 }}>COLLECTION DETAILS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
              {[['Condition', album.condition], ['Purchase Price', `$${album.purchasePrice}`], ['Purchase Date', album.purchaseDate], ['Edition', 'Standard']].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 11, color: '#A69BC8', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>{k}</div>
                  <div style={{ fontSize: 14, color: '#FFF2D5', fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            {album.notes && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(166,155,200,0.15)' }}>
                <div style={{ fontSize: 11, color: '#A69BC8', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500, marginBottom: 6 }}>Personal Notes</div>
                <div style={{ fontSize: 13, color: '#FFF2D5', lineHeight: 1.6, fontStyle: 'italic' }}>"{album.notes}"</div>
              </div>
            )}
          </div>

          {/* Track listing */}
          <div className="card-pixel" style={{ background: '#2a2845', padding: '18px 20px' }}>
            <div style={{ fontFamily: 'Press Start 2P', fontSize: 8, color: '#91C9AD', marginBottom: 14 }}>♫ TRACK LISTING</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
              {album.tracks.map((t, i) => (
                <div key={i} className="flex items-center gap-3" style={{ padding: '4px 0', borderBottom: '1px solid rgba(166,155,200,0.1)' }}>
                  <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: '#A69BC8', width: 18 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 12, color: '#FFF2D5' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="card-pixel" style={{ background: '#2a2845', padding: '28px 32px', maxWidth: 380, width: '90%', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Press Start 2P', fontSize: 11, color: '#E87575', marginBottom: 16 }}>DELETE ALBUM?</div>
            <p style={{ color: '#A69BC8', fontSize: 14, marginBottom: 24 }}>Remove <strong style={{ color: '#FFF2D5' }}>{album.title}</strong> from your collection? This cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button className="btn-pixel" onClick={() => setShowDeleteConfirm(false)} style={{ background: 'transparent', border: '2px solid rgba(166,155,200,0.3)', color: '#A69BC8', padding: '9px 18px' }}>CANCEL</button>
              <button className="btn-pixel" onClick={() => { onDelete(album.id); setShowDeleteConfirm(false); onBack() }} style={{ background: '#E87575', color: '#FFF2D5', padding: '9px 18px' }}>DELETE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
