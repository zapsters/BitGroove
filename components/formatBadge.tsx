import { PixelCassette, PixelCD, PixelVinyl } from "@/icons"
import { Format } from "@/types"

const formatColors: Record<Format, string> = { vinyl: '#E87575', cd: '#91C9AD', cassette: '#F4A987' }

export default function FormatBadge({ format }: { format: Format }) {
  return (
    <span style={{
      background: formatColors[format] + '22',
      border: `1px solid ${formatColors[format]}66`,
      color: formatColors[format],
      fontFamily: 'Press Start 2P', fontSize: 7,
      padding: '2px 5px',
      display: 'inline-flex', alignItems: 'center', gap: 3,
    }}>
      {format === 'vinyl' && <PixelVinyl size={8} color={formatColors[format]} />}
      {format === 'cd' && <PixelCD size={8} color={formatColors[format]} />}
      {format === 'cassette' && <PixelCassette size={8} color={formatColors[format]} />}
      {format.toUpperCase()}
    </span>
  )
}