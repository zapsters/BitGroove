"use client";

import AlbumArt from "@/components/albumArt";
import StatCard from "@/components/statCard";
import { INITIAL_ALBUMS, INITIAL_WISHLIST } from "@/defaultData";
import { PixelCD, PixelVinyl } from "@/icons";
import { Album, WishlistItem } from "@/types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function Dashboard({ albums, wishlist, onAlbum }: { albums: Album[]; wishlist: WishlistItem[]; onAlbum: (a: Album) => void }) {
  if (!albums) albums = INITIAL_ALBUMS
  if (!wishlist) wishlist = INITIAL_WISHLIST
  const recent = [...albums].sort((a, b) => b.addedDate.localeCompare(a.addedDate)).slice(0, 6)
  const vinylCount = albums.filter(a => a.format === 'vinyl').length
  const cdCount = albums.filter(a => a.format === 'cd').length
  const cassetteCount = albums.filter(a => a.format === 'cassette').length
  const pieData = [
    { name: 'Vinyl', value: vinylCount, color: '#E87575' },
    { name: 'CD', value: cdCount, color: '#91C9AD' },
    { name: 'Cassette', value: cassetteCount, color: '#F4A987' },
  ]

  return (
    <div style={{ padding: '28px 28px 40px' }}>
      {/* Greeting */}
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#A69BC8', marginBottom: 8 }}>♪ WELCOME BACK</div>
          <h2 style={{ fontFamily: 'Press Start 2P', fontSize: 18, color: '#FFF2D5', margin: 0, textShadow: '3px 3px 0 rgba(0,0,0,0.4)' }}>ALEX! <span style={{ color: '#F2C66D' }}>★</span></h2>
          <p style={{ color: '#A69BC8', fontSize: 14, marginTop: 8 }}>Your collection is sounding great today.</p>
        </div>
        <div style={{ position: 'relative', opacity: 0.3 }}>
          <PixelVinyl size={80} color="#F2C66D" spin />
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Albums" value={albums.length} sub="in collection" color="#F2C66D" icon={<PixelVinyl size={24} color="#F2C66D" />} />
        <StatCard label="Vinyl Records" value={vinylCount} sub="pressed to wax" color="#E87575" icon={<PixelVinyl size={24} color="#E87575" />} />
        <StatCard label="CDs & Cassettes" value={cdCount + cassetteCount} sub={`${cdCount} CDs · ${cassetteCount} tapes`} color="#91C9AD" icon={<PixelCD size={22} color="#91C9AD" />} />
        <StatCard label="Wishlist" value={wishlist.length} sub="albums to find" color="#F4A987" icon={<span style={{ fontSize: 22, color: '#F4A987' }}>♥</span>} />
      </div>

      {/* Recently Added + Pie Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, marginBottom: 28 }}>
        {/* Recently Added */}
        <div className="card-pixel" style={{ background: '#2a2845', padding: '20px 22px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#F2C66D' }}>RECENTLY ADDED</span>
            <a href="collection" style={{ fontFamily: 'Press Start 2P', fontSize: 7, color: '#A69BC8', background: 'none', border: 'none', cursor: 'pointer' }}>SEE ALL →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
            {recent.map(a => (
              <div key={a.id} className="cursor-pointer" onClick={() => onAlbum(a)} style={{ transition: 'transform 0.1s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}>
                <AlbumArt album={a} size="md" />
                <div style={{ fontSize: 10, color: '#FFF2D5', marginTop: 5, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Format Pie */}
        <div className="card-pixel" style={{ background: '#2a2845', padding: '20px 22px' }}>
          <div style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#F2C66D', marginBottom: 16 }}>BY FORMAT</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#39365B', border: '2px solid rgba(166,155,200,0.3)', color: '#FFF2D5', fontFamily: 'Outfit', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 4 }}>
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-2" style={{ fontSize: 12 }}>
                <div style={{ width: 10, height: 10, background: d.color, border: `1px solid ${d.color}` }} />
                <span style={{ color: '#A69BC8' }}>{d.name}</span>
                <span style={{ color: '#FFF2D5', fontWeight: 600, marginLeft: 'auto' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wishlist preview */}
      <div className="card-pixel" style={{ background: '#2a2845', padding: '20px 22px' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: '#F4A987' }}>♥ WISHLIST PREVIEW</span>
          <a href="wishlist" style={{ fontFamily: 'Press Start 2P', fontSize: 7, color: '#A69BC8', background: 'none', border: 'none', cursor: 'pointer' }}>SEE ALL →</a>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {wishlist.slice(0, 4).map(w => (
            <div key={w.id} className="flex items-center gap-3 card-pixel" style={{ background: '#312f5a', padding: '10px 14px', flex: 1 }}>
              <div style={{ width: 40, height: 40, background: w.color + '33', border: `2px solid ${w.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Press Start 2P', fontSize: 8, color: w.color }}>{w.title[0]}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#FFF2D5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.title}</div>
                <div style={{ fontSize: 11, color: '#A69BC8' }}>{w.artist}</div>
                <span style={{ fontFamily: 'Press Start 2P', fontSize: 6, padding: '1px 4px', background: w.priority === 'high' ? '#E8757522' : w.priority === 'medium' ? '#F2C66D22' : '#91C9AD22', color: w.priority === 'high' ? '#E87575' : w.priority === 'medium' ? '#F2C66D' : '#91C9AD', border: `1px solid currentColor` }}>{w.priority.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}