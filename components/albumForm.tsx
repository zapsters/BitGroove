"use client";

import { useState } from "react";
import StarRating from "./starRating";
import { AlbumFormData, Condition, Format } from "@/types";

export const BLANK_FORM: AlbumFormData = { title: '', artist: '', year: new Date().getFullYear().toString(), genre: '', format: 'vinyl', condition: 'Very Good', rating: 3, purchasePrice: '', purchaseDate: new Date().toISOString().slice(0, 10), notes: '' }

export default function AlbumForm({ initial, onSave, onCancel, saveLabel = 'SAVE TO COLLECTION' }: { initial?: AlbumFormData; onSave: (data: AlbumFormData) => void; onCancel: () => void; saveLabel?: string }) {
  const [form, setForm] = useState<AlbumFormData>(initial ?? BLANK_FORM)
  const set = (k: keyof AlbumFormData, v: any) => setForm(f => ({ ...f, [k]: v }))

  const labelStyle = { fontSize: 11, color: '#A69BC8', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5, marginBottom: 4, display: 'block' }
  const inputStyle = { width: '100%', height: 38, padding: '0 12px', fontSize: 13, borderRadius: 0 }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
      {[['title', 'Album Title', 'text'], ['artist', 'Artist', 'text'], ['year', 'Release Year', 'number'], ['genre', 'Genre', 'text'], ['purchasePrice', 'Purchase Price ($)', 'number'], ['purchaseDate', 'Purchase Date', 'date']].map(([k, l, t]) => (
        <div key={k}>
          <label style={labelStyle}>{l}</label>
          <input type={t} className="input-pixel" style={inputStyle} value={(form as any)[k]} onChange={e => set(k as keyof AlbumFormData, e.target.value)} />
        </div>
      ))}
      <div>
        <label style={labelStyle}>Format</label>
        <select className="input-pixel" style={{ ...inputStyle }} value={form.format} onChange={e => set('format', e.target.value as Format)}>
          <option value="vinyl">Vinyl</option><option value="cd">CD</option><option value="cassette">Cassette</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Condition</label>
        <select className="input-pixel" style={{ ...inputStyle }} value={form.condition} onChange={e => set('condition', e.target.value as Condition)}>
          {(['Mint', 'Near Mint', 'Very Good+', 'Very Good', 'Good', 'Fair'] as Condition[]).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{ gridColumn: '1/-1' }}>
        <label style={labelStyle}>Personal Rating</label>
        <div className="flex items-center gap-3">
          <StarRating rating={form.rating} onChange={r => set('rating', r)} />
          <span style={{ fontSize: 12, color: '#A69BC8' }}>{form.rating}/5</span>
        </div>
      </div>
      <div style={{ gridColumn: '1/-1' }}>
        <label style={labelStyle}>Personal Notes</label>
        <textarea className="input-pixel" style={{ width: '100%', height: 80, padding: '8px 12px', fontSize: 13, resize: 'vertical' }} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Your thoughts on this album..." />
      </div>
      <div className="flex gap-3" style={{ gridColumn: '1/-1', marginTop: 8 }}>
        <button className="btn-pixel" onClick={() => onSave(form)} style={{ background: '#91C9AD', color: '#24243A', padding: '10px 20px', flex: 1 }}>{saveLabel}</button>
        <button className="btn-pixel" onClick={onCancel} style={{ background: 'transparent', border: '2px solid rgba(166,155,200,0.3)', color: '#A69BC8', padding: '10px 20px' }}>CANCEL</button>
      </div>
    </div>
  )
}
