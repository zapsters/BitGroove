import { Album } from "@/types";
import AlbumArt from "./albumArt";
import FormatBadge from "./formatBadge";
import StarRating from "./starRating";

export default function AlbumCardGrid({ album, onClick }: { album: Album; onClick: () => void }) {
  return (
    <div
      className="album-card card-pixel"
      onClick={onClick}
      style={{ background: '#2a2845', cursor: 'pointer', overflow: 'hidden', transition: 'transform 0.12s, box-shadow 0.12s', position: 'relative' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 rgba(0,0,0,0.5)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 rgba(0,0,0,0.35)' }}
    >
      <AlbumArt album={album} size="md" />
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#FFF2D5', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{album.title}</div>
        <div style={{ fontSize: 12, color: '#A69BC8', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{album.artist}</div>
        <div className="flex items-center justify-between">
          <FormatBadge format={album.format} />
          <StarRating rating={album.rating} />
        </div>
        <div style={{ fontSize: 11, color: '#A69BC8', marginTop: 5 }}>{album.year} · {album.genre}</div>
      </div>
      <div className="album-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(36,36,58,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.15s' }}>
        <span style={{ fontFamily: 'Press Start 2P', fontSize: 8, color: '#F2C66D' }}>VIEW ▶</span>
      </div>
    </div>
  )
}
