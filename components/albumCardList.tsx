import { Album } from "@/types";
import AlbumArt from "./albumArt";
import FormatBadge from "./formatBadge";
import StarRating from "./starRating";

export default function AlbumCardList({ album, onClick }: { album: Album; onClick: () => void }) {
  return (
    <div
      className="card-pixel"
      onClick={onClick}
      style={{ background: '#2a2845', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, padding: '10px 16px', transition: 'background 0.1s' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#312f5a'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#2a2845'}
    >
      <AlbumArt album={album} size="sm" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#FFF2D5' }}>{album.title}</div>
        <div style={{ fontSize: 12, color: '#A69BC8' }}>{album.artist}</div>
      </div>
      <div style={{ fontSize: 12, color: '#A69BC8', width: 60, textAlign: 'center' }}>{album.year}</div>
      <div style={{ width: 80 }}><FormatBadge format={album.format} /></div>
      <StarRating rating={album.rating} />
      <span style={{ fontSize: 12, color: '#91C9AD', fontWeight: 600 }}>${album.purchasePrice}</span>
    </div>
  )
}
