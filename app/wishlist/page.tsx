"use client";

import FormatBadge from "@/components/formatBadge";
import { INITIAL_WISHLIST } from "@/defaultData";
import { Condition, CONDITIONS, Format, Priority, WishlistItem } from "@/types";
import { useState } from "react";

const priorityColors: Record<Priority, string> = { low: '#91C9AD', medium: '#F2C66D', high: '#E87575' }

export default function Wishlist({ wishlist, onMoveToCollection, onAddWishlist }: { wishlist: WishlistItem[]; onMoveToCollection: (id: string, form: { format: Format; condition: Condition; price: string; date: string }) => void; onAddWishlist: (item: WishlistItem) => void }) {
  if (!wishlist) wishlist = INITIAL_WISHLIST

  const [moveId, setMoveId] = useState<string | null>(null)
  const [moveForm, setMoveForm] = useState({ format: 'vinyl' as Format, condition: 'Very Good' as Condition, price: '', date: new Date().toISOString().slice(0, 10) })
  const totalCost = wishlist.reduce((s, w) => s + w.targetPrice, 0)
  const highCount = wishlist.filter(w => w.priority === 'high').length

  const inputStyle = { width: '100%', height: 36, padding: '0 10px', fontSize: 13, borderRadius: 0 }

  return (
    <div style={{ padding: '24px 28px 40px' }}>
      {/* Summary bar */}
      <div className="card-pixel" style={{ background: '#2a2845', padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 32, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 28, opacity: 0.5 }}>♥</span>
          <div>
            <div style={{ fontFamily: 'Press Start 2P', fontSize: 16, color: '#FFF2D5' }}>{wishlist.length}</div>
            <div style={{ fontSize: 12, color: '#A69BC8' }}>Total Items</div>
          </div>
        </div>
        <div style={{ width: 1, height: 40, background: 'rgba(166,155,200,0.15)' }} />
        <div>
          <div style={{ fontFamily: 'Press Start 2P', fontSize: 16, color: '#F2C66D' }}>${totalCost}</div>
          <div style={{ fontSize: 12, color: '#A69BC8' }}>Est. Total Cost</div>
        </div>
        <div style={{ width: 1, height: 40, background: 'rgba(166,155,200,0.15)' }} />
        <div>
          <div style={{ fontFamily: 'Press Start 2P', fontSize: 16, color: '#E87575' }}>{highCount}</div>
          <div style={{ fontSize: 12, color: '#A69BC8' }}>High Priority</div>
        </div>
        <button className="btn-pixel" onClick={() => { }} style={{ marginLeft: 'auto', background: '#F4A987', color: '#24243A', padding: '9px 16px' }}>+ ADD TO WISHLIST</button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {wishlist.map(w => (
          <div key={w.id} className="card-pixel" style={{ background: '#2a2845', overflow: 'hidden' }}>
            <div style={{ height: 8, background: priorityColors[w.priority] }} />
            <div style={{ padding: '14px 16px 16px' }}>
              <div className="flex items-start justify-between gap-2" style={{ marginBottom: 12 }}>
                <div style={{ width: 56, height: 56, background: w.color + '33', border: `2px solid ${w.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Press Start 2P', fontSize: 12, color: w.color }}>{w.title[0]}</span>
                </div>
                <span style={{ fontFamily: 'Press Start 2P', fontSize: 6, padding: '2px 5px', background: priorityColors[w.priority] + '22', color: priorityColors[w.priority], border: `1px solid ${priorityColors[w.priority]}` }}>{w.priority.toUpperCase()}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#FFF2D5', marginBottom: 2 }}>{w.title}</div>
              <div style={{ fontSize: 12, color: '#A69BC8', marginBottom: 8 }}>{w.artist} · {w.year}</div>
              <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                <FormatBadge format={w.format} />
                <span style={{ fontSize: 13, color: '#F2C66D', fontWeight: 700 }}>~${w.targetPrice}</span>
              </div>
              <button className="btn-pixel" onClick={() => setMoveId(w.id)} style={{ background: '#91C9AD', color: '#24243A', padding: '7px 0', width: '100%', fontSize: 7 }}>MOVE TO COLLECTION ▶</button>
            </div>
          </div>
        ))}
      </div>

      {/* Move modal */}
      {moveId && (() => {
        const item = wishlist.find(w => w.id === moveId)!
        return (
          <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
            <div className="card-pixel" style={{ background: '#2a2845', padding: '28px 32px', maxWidth: 420, width: '90%' }}>
              <div style={{ fontFamily: 'Press Start 2P', fontSize: 10, color: '#91C9AD', marginBottom: 8 }}>MOVE TO COLLECTION</div>
              <div style={{ fontSize: 14, color: '#FFF2D5', fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: '#A69BC8', marginBottom: 20 }}>{item.artist}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{ fontSize: 11, color: '#A69BC8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4, display: 'block' }}>Format</label>
                  <select className="input-pixel" style={inputStyle} value={moveForm.format} onChange={e => setMoveForm(f => ({ ...f, format: e.target.value as Format }))}>
                    <option value="vinyl">Vinyl</option><option value="cd">CD</option><option value="cassette">Cassette</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: '#A69BC8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4, display: 'block' }}>Condition</label>
                  <select className="input-pixel" style={inputStyle} value={moveForm.condition} onChange={e => setMoveForm(f => ({ ...f, condition: e.target.value as Condition }))}>
                    {(CONDITIONS as Condition[]).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: '#A69BC8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4, display: 'block' }}>Price ($)</label>
                  <input type="number" className="input-pixel" style={inputStyle} value={moveForm.price} onChange={e => setMoveForm(f => ({ ...f, price: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: '#A69BC8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4, display: 'block' }}>Purchase Date</label>
                  <input type="date" className="input-pixel" style={inputStyle} value={moveForm.date} onChange={e => setMoveForm(f => ({ ...f, date: e.target.value }))} />
                </div>
              </div>
              <div className="flex gap-3">
                <button className="btn-pixel" onClick={() => { onMoveToCollection(moveId, moveForm); setMoveId(null) }} style={{ background: '#91C9AD', color: '#24243A', padding: '10px 20px', flex: 1 }}>CONFIRM ▶</button>
                <button className="btn-pixel" onClick={() => setMoveId(null)} style={{ background: 'transparent', border: '2px solid rgba(166,155,200,0.3)', color: '#A69BC8', padding: '10px 20px' }}>CANCEL</button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
