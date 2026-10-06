"use client";

import { useState } from "react"

export default function Settings() {
  const [name, setName] = useState('Alex')
  const [email, setEmail] = useState('alex@groovebox.app')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [currency, setCurrency] = useState('USD')
  const [defaultFormat, setDefaultFormat] = useState('vinyl')
  const [saved, setSaved] = useState(false)

  const labelStyle = { fontSize: 11, color: '#A69BC8', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5, marginBottom: 4, display: 'block' }
  const inputStyle = { width: '100%', height: 38, padding: '0 12px', fontSize: 13, borderRadius: 0 }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="card-pixel" style={{ background: '#2a2845', padding: '20px 22px', marginBottom: 16 }}>
      <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#F2C66D', marginBottom: 18 }}>{title}</div>
      {children}
    </div>
  )

  return (
    <div style={{ padding: '24px 28px 40px', maxWidth: 680 }}>
      {saved && (
        <div style={{ padding: '10px 16px', background: '#91C9AD22', border: '2px solid #91C9AD55', color: '#91C9AD', fontSize: 13, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Press Start 2P', fontSize: 8 }}>✓ SAVED</span> Settings updated successfully.
        </div>
      )}
      <Section title="PROFILE">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div><label style={labelStyle}>Display Name</label><input className="input-pixel" style={inputStyle} value={name} onChange={e => setName(e.target.value)} /></div>
          <div><label style={labelStyle}>Email</label><input className="input-pixel" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} /></div>
        </div>
      </Section>
      <Section title="DISPLAY PREFERENCES">
        <div style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
          {(['dark', 'light'] as const).map(t => (
            <button key={t} onClick={() => setTheme(t)} className="btn-pixel" style={{ padding: '8px 20px', background: theme === t ? '#F2C66D' : 'transparent', color: theme === t ? '#24243A' : '#A69BC8', border: '2px solid ' + (theme === t ? '#F2C66D' : 'rgba(166,155,200,0.3)') }}>
              {t === 'dark' ? '◑ DARK' : '○ LIGHT'}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: '#A69BC8', marginTop: 8 }}>Light theme coming soon!</div>
      </Section>
      <Section title="COLLECTION PREFERENCES">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={labelStyle}>Default Format</label>
            <select className="input-pixel" style={{ ...inputStyle }} value={defaultFormat} onChange={e => setDefaultFormat(e.target.value)}>
              <option value="vinyl">Vinyl</option><option value="cd">CD</option><option value="cassette">Cassette</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Currency</label>
            <select className="input-pixel" style={{ ...inputStyle }} value={currency} onChange={e => setCurrency(e.target.value)}>
              <option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </Section>
      <div className="flex gap-3">
        <button className="btn-pixel" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000) }} style={{ background: '#91C9AD', color: '#24243A', padding: '10px 24px' }}>SAVE CHANGES</button>
        <button className="btn-pixel" onClick={() => { }} style={{ background: '#E87575', color: '#FFF2D5', padding: '10px 24px', marginLeft: 'auto' }}>SIGN OUT</button>
      </div>
    </div>
  )
}
