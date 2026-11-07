import map from "@/data/map.json";

type Loc = {
  id: string;
  name: string;
  kind: "office" | "warehouse";
  note?: string;
  point: [number, number];
  label: "e" | "w" | "n" | "s";
  dy?: number;
};

const data = map as unknown as {
  viewBox: [number, number, number, number];
  land: string;
  equator: [[number, number], [number, number]];
  origin: { name: string; point: [number, number] };
  locations: Loc[];
};

/** Five-point star centred on 0,0 with the given outer radius. */
function star(r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 ? r * 0.45 : r;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(Math.cos(a) * rad).toFixed(2)},${(Math.sin(a) * rad).toFixed(2)}`);
  }
  return pts.join(" ");
}

function labelProps(l: Loc) {
  const gap = 11;
  switch (l.label) {
    case "e":
      return { x: gap, y: 4 + (l.dy ?? 0), textAnchor: "start" as const };
    case "w":
      return { x: -gap, y: 4 + (l.dy ?? 0), textAnchor: "end" as const };
    case "n":
      return { x: 0, y: -gap + (l.dy ?? 0), textAnchor: "middle" as const };
    case "s":
      return { x: 0, y: gap + 7 + (l.dy ?? 0), textAnchor: "middle" as const };
  }
}

/**
 * The Darby network: six U.S. warehouses, the Armonk headquarters and the Thailand office,
 * with the equator and the Malaysian and Indonesian origin marked in Olein.
 */
export type Region = "us" | "asia";
const regionOf = (l: Loc): Region => (l.point[0] < 600 ? "us" : "asia");

export function NetworkMap({ region = null }: { region?: Region | null }) {
  const [vx, vy, vw, vh] = data.viewBox;
  const [[ex0], [ex1]] = data.equator;
  const eqY = data.equator[0][1];
  const title = "Map of Darby's warehouses and offices";
  const desc =
    "Warehouses at Baltimore, Savannah, Houston, Los Angeles, Oakland and Tacoma; headquarters in Armonk, New York; an office in Thailand; palm sourced from Malaysia and Indonesia on the equator.";

  return (
    <svg
      className="netmap"
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      role="img"
      aria-labelledby="netmap-title netmap-desc"
      style={{ aspectRatio: `${vw} / ${vh}` }}
    >
      <title id="netmap-title">{title}</title>
      <desc id="netmap-desc">{desc}</desc>
      <path className="netmap__land" d={data.land} />
      <line className="netmap__equator" x1={ex0} x2={ex1} y1={eqY} y2={eqY} />
      <text className={`netmap__origin${region === "us" ? " netmap__origin--dim" : ""}`} x={data.origin.point[0]} y={eqY - 9} textAnchor="middle">
        {data.origin.name}
      </text>
      <text className="netmap__origin netmap__origin--deg" x={vx + 14} y={eqY - 6}>
        0°
      </text>
      {data.locations.map((l) => {
        const lp = labelProps(l);
        return (
          <g
            key={l.id}
            className={`netmap__loc netmap__loc--${l.kind}${region && regionOf(l) !== region ? " netmap__loc--dim" : ""}`}
            transform={`translate(${l.point[0]} ${l.point[1]})`}
          >
            <circle className="netmap__halo" r={13} />
            <polygon className="netmap__star" points={star(l.kind === "office" ? 9 : 7.5)} />
            <text className="netmap__label" {...lp}>
              {l.name}
              {l.note ? (
                <tspan className="netmap__note" x={lp.x} dy={13}>
                  {l.note}
                </tspan>
              ) : null}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
