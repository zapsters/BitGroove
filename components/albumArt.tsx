import { PixelCassette, PixelCD, PixelVinyl } from "@/icons";
import { Format } from "@/types";

export default function AlbumArt({ album, size = 'md' }: { album: { title: string; artist: string; color: string; format: Format }; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 48, md: 80, lg: 200 }
  const px = sizes[size]
  const initials = album.title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden flex-shrink-0"
      style={{
        width: px, height: px,
        background: `linear-gradient(135deg, ${album.color}33 0%, ${album.color}66 100%)`,
        border: `2px solid ${album.color}55`,
        boxShadow: `3px 3px 0 rgba(0,0,0,0.4)`,
        imageRendering: 'pixelated',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${album.color}22 1px, transparent 1px)`, backgroundSize: '4px 4px' }} />
      <span style={{ fontFamily: 'Press Start 2P', fontSize: size === 'lg' ? 28 : size === 'md' ? 14 : 8, color: album.color, textShadow: '2px 2px 0 rgba(0,0,0,0.5)', zIndex: 1 }}>{initials}</span>
      <div style={{ position: 'absolute', bottom: 4, right: 4 }}>
        {album.format === 'vinyl' && <PixelVinyl size={size === 'lg' ? 20 : 10} color={album.color} />}
        {album.format === 'cd' && <PixelCD size={size === 'lg' ? 18 : 9} color={album.color} />}
        {album.format === 'cassette' && <PixelCassette size={size === 'lg' ? 18 : 9} color={album.color} />}
      </div>
    </div>
  )
}
