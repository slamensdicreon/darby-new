"use client";

import { useState } from "react";
import { NetworkMap, type Region } from "./NetworkMap";

const REGIONS: { id: Region | "all"; label: string }[] = [
  { id: "all", label: "Whole network" },
  { id: "us", label: "United States" },
  { id: "asia", label: "Southeast Asia" },
];

/** The network map with region toggles that highlight the relevant markers. */
export function GlobalPresence() {
  const [region, setRegion] = useState<Region | "all">("all");
  return (
    <div className="presence">
      <div role="group" aria-label="Show region" className="filters presence__toggles">
        {REGIONS.map((r) => (
          <button key={r.id} type="button" className="pill pill--dark" aria-pressed={region === r.id} onClick={() => setRegion(r.id)}>
            {r.label}
          </button>
        ))}
      </div>
      <div className="network__map">
        <NetworkMap region={region === "all" ? null : region} />
      </div>
    </div>
  );
}
