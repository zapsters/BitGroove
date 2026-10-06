export default function StatCard({ label, value, sub, color, icon }: { label: string; value: string | number; sub?: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="card-pixel" style={{ background: '#2a2845', padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
      <div style={{ width: 48, height: 48, background: color + '22', border: `2px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'Press Start 2P', fontSize: 18, color: '#FFF2D5', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, color: '#A69BC8', marginTop: 5, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: color, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  )
}
