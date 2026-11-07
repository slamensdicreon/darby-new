/**
 * Builds src/data/map.json for the network map on the Contact page: world land as one
 * SVG path, plus every location projected into the same coordinate space.
 * Re-run after changing locations:  node scripts/map/generate.cjs
 */
const fs = require("fs");
const path = require("path");
const { geoNaturalEarth1, geoPath } = require("d3-geo");
const { feature } = require("topojson-client");

const root = path.resolve(__dirname, "../..");
const world = require("world-atlas/land-110m.json");
const land = feature(world, world.objects.land);

// Locations. Coordinates are [longitude, latitude]. `label` places the text relative to
// the star: e (east), w (west), n (north), s (south), with an optional pixel nudge.
const locations = [
  { id: "armonk", name: "Armonk, NY", kind: "office", note: "Headquarters", coords: [-73.714, 41.126], label: "e", dy: -12 },
  { id: "thailand", name: "Thailand", kind: "office", note: "Office", coords: [100.5, 13.75], label: "e" },
  { id: "baltimore", name: "Baltimore, MD", kind: "warehouse", coords: [-76.612, 39.29], label: "e", dy: 17 },
  { id: "savannah", name: "Savannah, GA", kind: "warehouse", coords: [-81.1, 32.08], label: "e", dy: 4 },
  { id: "houston", name: "Houston, TX", kind: "warehouse", coords: [-95.37, 29.76], label: "s" },
  { id: "los-angeles", name: "Los Angeles, CA", kind: "warehouse", coords: [-118.24, 34.05], label: "e", dy: 6 },
  { id: "oakland", name: "Oakland, CA", kind: "warehouse", coords: [-122.27, 37.8], label: "e", dy: -6 },
  { id: "tacoma", name: "Tacoma, WA", kind: "warehouse", coords: [-122.44, 47.25], label: "e" },
];

// Origin region, drawn as a label on the equator rather than a marker.
const origin = { name: "Malaysia · Indonesia", coords: [109, 0] };

const WIDTH = 1200;
const projection = geoNaturalEarth1().fitWidth(WIDTH, { type: "Sphere" });
const pathFor = geoPath(projection);

// Crop to the part of the world the network occupies.
const [x0] = projection([-131, 0]);
const [x1] = projection([146, 0]);
const [, y0] = projection([0, 62]);
const [, y1] = projection([0, -18]);
const viewBox = [x0, y0, x1 - x0, y1 - y0].map((n) => Math.round(n * 10) / 10);

const round = ([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
const out = {
  viewBox,
  land: pathFor(land).replace(/(\d+\.\d{2})\d+/g, "$1"),
  equator: [round(projection([-180, 0])), round(projection([180, 0]))],
  origin: { ...origin, point: round(projection(origin.coords)) },
  locations: locations.map((l) => ({ ...l, point: round(projection(l.coords)) })),
};

const outFile = path.join(root, "src/data/map.json");
fs.writeFileSync(outFile, JSON.stringify(out));
console.log("wrote", path.relative(root, outFile), `${Math.round(fs.statSync(outFile).size / 1024)} KB`);
