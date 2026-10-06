import { PixelStar } from "@/icons";

export default function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} onClick={() => onChange?.(i)} style={{ background: 'none', border: 'none', padding: 0, cursor: onChange ? 'pointer' : 'default' }}>
          <PixelStar size={12} color="#F2C66D" filled={i <= rating} />
        </button>
      ))}
    </div>
  )
}