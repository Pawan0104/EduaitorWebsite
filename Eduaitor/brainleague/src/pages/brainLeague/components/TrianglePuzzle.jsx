import { useMemo } from "react";

const S = 300;
const H = S * Math.sqrt(3) / 2;

/**
 * Renders a subdivided triangle of side `n` (subdivisions). The number of
 * triangles inside it is computed in questions.js (countTriangles).
 */
export default function TrianglePuzzle({ n = 4, size = 280 }) {
  const scale = size / S;

  const lines = useMemo(() => {
    const pt = (u, v) => {
      // A = top (S/2,0), B = bottom-left (0,H), C = bottom-right (S,H)
      const x = S / 2 + ((v - u) / n) * (S / 2);
      const y = ((v + u) / n) * H;
      return { x, y };
    };
    const seg = [];
    // Boundaries (u+v=n, u=0, v=0)
    seg.push({ u1: n, v1: 0, u2: 0, v2: n }); // base
    seg.push({ u1: 0, v1: 0, u2: 0, v2: n }); // left
    seg.push({ u1: 0, v1: 0, u2: n, v2: 0 }); // right
    // u = const family (parallel to base)
    for (let u = 1; u < n; u++) seg.push({ u1: u, v1: 0, u2: u, v2: n - u });
    // v = const family
    for (let v = 1; v < n; v++) seg.push({ u1: 0, v1: v, u2: n - v, v2: v });
    // u + v = w family
    for (let w = 1; w < n; w++) seg.push({ u1: w, v1: 0, u2: 0, v2: w });

    const points = (o) => pt(o.u1, o.v1);
    return seg.map((o) => {
      const p1 = points(o);
      const p2 = pt(o.u2, o.v2);
      return {
        x1: p1.x * scale,
        y1: p1.y * scale,
        x2: p2.x * scale,
        y2: p2.y * scale,
      };
    });
  }, [n, scale]);

  return (
    <svg
      viewBox={`0 0 ${S * scale} ${H * scale}`}
      style={{ width: size, height: H * scale }}
      role="img"
      aria-label="Triangle counting puzzle"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#334155"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}