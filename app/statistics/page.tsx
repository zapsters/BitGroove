"use client";

import StatCard from "@/components/statCard"
import { INITIAL_ALBUMS } from "@/defaultData";
import { PixelStar, PixelVinyl } from "@/icons"
import { Album } from "@/types"
import { useMemo } from "react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function Statistics({ albums }: { albums: Album[] }) {
  if (!albums) albums = INITIAL_ALBUMS

  const total = albums.length
  const totalSpent = albums.reduce((s, a) => s + a.purchasePrice, 0)
  const avgRating = albums.length ? (albums.reduce((s, a) => s + a.rating, 0) / albums.length).toFixed(1) : '0'

  const artistCounts = Object.entries(albums.reduce<Record<string, number>>((acc, a) => ({ ...acc, [a.artist]: (acc[a.artist] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const topArtist = artistCounts[0]?.[0] ?? 'N/A'

  const formatDist = [
    { name: 'Vinyl', value: albums.filter(a => a.format === 'vinyl').length, color: '#E87575' },
    { name: 'CD', value: albums.filter(a => a.format === 'cd').length, color: '#91C9AD' },
    { name: 'Cassette', value: albums.filter(a => a.format === 'cassette').length, color: '#F4A987' },
  ]

  const monthData = useMemo(() => {
    const counts: Record<string, number> = {}
    albums.forEach(a => { const m = a.addedDate.slice(0, 7); counts[m] = (counts[m] || 0) + 1 })
    return Object.entries(counts).sort().slice(-8).map(([m, c]) => ({ month: m.slice(5), count: c }))
  }, [albums])

  return (
    <div style={{ padding: '24px 28px 40px' }}>
      {/* Top stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        <StatCard label="Albums Owned" value={total} color="#F2C66D" icon={<PixelVinyl size={24} color="#F2C66D" />} />
        <StatCard label="Total Spent" value={`$${totalSpent}`} color="#91C9AD" icon={<span style={{ fontSize: 22, color: '#91C9AD' }}>$</span>} />
        <StatCard label="Avg Rating" value={`${avgRating}★`} color="#F4A987" icon={<PixelStar size={22} color="#F4A987" />} />
        <StatCard label="Top Artist" value={topArtist.split(' ').slice(-1)[0]} sub={topArtist} color="#A69BC8" icon={<span style={{ fontSize: 22, color: '#A69BC8' }}>♪</span>} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Donut chart */}
        <div className="card-pixel" style={{ background: '#2a2845', padding: '20px 22px' }}>
          <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#F2C66D', marginBottom: 16 }}>FORMAT DISTRIBUTION</div>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={formatDist} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                  {formatDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#39365B', border: '2px solid rgba(166,155,200,0.3)', color: '#FFF2D5', fontFamily: 'Outfit', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {formatDist.map(d => (
                <div key={d.name}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 10, height: 10, background: d.color }} />
                      <span style={{ fontSize: 13, color: '#A69BC8' }}>{d.name}</span>
                    </div>
                    <span style={{ fontSize: 13, color: '#FFF2D5', fontWeight: 700 }}>{d.value}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(166,155,200,0.1)', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${total ? (d.value / total) * 100 : 0}%`, background: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly acquisitions bar chart */}
        <div className="card-pixel" style={{ background: '#2a2845', padding: '20px 22px' }}>
          <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#F2C66D', marginBottom: 16 }}>ALBUMS BY MONTH</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={monthData} barSize={18}>
              <XAxis dataKey="month" tick={{ fill: '#A69BC8', fontSize: 10, fontFamily: 'Space Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#A69BC8', fontSize: 10 }} axisLine={false} tickLine={false} width={20} />
              <Tooltip contentStyle={{ background: '#39365B', border: '2px solid rgba(166,155,200,0.3)', color: '#FFF2D5', fontFamily: 'Outfit', fontSize: 12 }} cursor={{ fill: 'rgba(166,155,200,0.07)' }} />
              <Bar dataKey="count" fill="#E87575" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top artists */}
      <div className="card-pixel" style={{ background: '#2a2845', padding: '20px 22px' }}>
        <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#F2C66D', marginBottom: 16 }}>TOP ARTISTS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {artistCounts.map(([artist, count], i) => (
            <div key={artist} className="flex items-center gap-3">
              <span style={{ fontFamily: 'Space Mono', fontSize: 11, color: '#A69BC8', width: 20 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 14, color: '#FFF2D5', flex: 1 }}>{artist}</span>
              <div style={{ width: 140, height: 8, background: 'rgba(166,155,200,0.1)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${(count / artistCounts[0][1]) * 100}%`, background: ['#E87575', '#91C9AD', '#F4A987', '#A69BC8', '#F2C66D', '#E87575'][i] }} />
              </div>
              <span style={{ fontFamily: 'Space Mono', fontSize: 11, color: '#A69BC8', width: 16, textAlign: 'right' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
