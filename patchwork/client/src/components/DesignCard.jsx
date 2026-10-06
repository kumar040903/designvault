import { Link } from 'react-router-dom';

export function Preview({ colors, layout }) {
  const [a, b, c] = colors;
  const shapes = {
    hero: (
      <>
        <rect width="160" height="110" fill={a} />
        <rect x="14" y="16" width="70" height="8" rx="2" fill={b} />
        <rect x="14" y="30" width="50" height="5" rx="2" fill={b} opacity=".55" />
        <rect x="14" y="50" width="36" height="13" rx="6" fill={c} />
        <circle cx="122" cy="62" r="30" fill={c} />
        <circle cx="108" cy="52" r="14" fill={b} opacity=".85" />
      </>
    ),
    cards: (
      <>
        <rect width="160" height="110" fill={a} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={10 + i * 50} y="18" width="42" height="74" rx="5" fill={i === 1 ? c : b} />
            <rect x={16 + i * 50} y="26" width="30" height="24" rx="3" fill={a} opacity=".55" />
            <rect x={16 + i * 50} y="58" width="28" height="4" rx="2" fill={a} />
            <rect x={16 + i * 50} y="67" width="18" height="4" rx="2" fill={a} opacity=".6" />
          </g>
        ))}
      </>
    ),
    dashboard: (
      <>
        <rect width="160" height="110" fill={a} />
        <rect width="32" height="110" fill={b} />
        <rect x="44" y="14" width="46" height="22" rx="4" fill={b} opacity=".15" />
        <rect x="98" y="14" width="46" height="22" rx="4" fill={c} opacity=".55" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={46 + i * 20} y={100 - (22 + ((i * 17) % 38))} width="13" height={22 + ((i * 17) % 38)} rx="2" fill={i === 3 ? c : b} />
        ))}
      </>
    ),
    split: (
      <>
        <rect width="80" height="110" fill={a} />
        <rect x="80" width="80" height="110" fill={b} />
        <rect x="12" y="22" width="48" height="8" rx="2" fill={b} />
        <rect x="12" y="38" width="38" height="5" rx="2" fill={b} opacity=".55" />
        <rect x="96" y="22" width="48" height="8" rx="2" fill={a} />
        <rect x="96" y="70" width="40" height="14" rx="7" fill={c} />
        <rect x="12" y="70" width="40" height="14" rx="7" fill={c} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 160 110" className="preview" role="img" aria-label={`${layout} layout preview`} preserveAspectRatio="xMidYMid slice">
      {shapes[layout] || shapes.hero}
    </svg>
  );
}

export default function DesignCard({ design }) {
  const d = design;
  return (
    <Link to={`/design/${d.id}`} className="card">
      <Preview colors={d.colors} layout={d.layout} />
      <div className="card-body">
        <h3>{d.title}</h3>
        <p className="muted">by @{d.author}</p>
        {d.remixOf && <span className="tag remix">Remix</span>}
        <p className="stats">
          {d.likes} likes, {d.comments.length} comments, {d.remixCount || 0} remixes
        </p>
      </div>
    </Link>
  );
}
