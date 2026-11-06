/**
 * The Equator Line wordmark. The letters carry a halo stroke in the background colour so
 * the gold line reads as passing behind them, so `ground` must match the surface it sits on.
 */
const LETTERS =
  "M75 0V-697H271Q443 -697 537.5 -604.5Q632 -512 632 -343Q632 -177 538.5 -88.5Q445 0 270 0ZM177 -94H261Q346 -94 406.0 -118.0Q466 -142 497.5 -198.0Q529 -254 529 -347Q529 -439 498.0 -495.5Q467 -552 409.0 -577.5Q351 -603 270 -603H177Z M993.0 0 1264.0 -697H1343.0L1613.0 0H1502.0L1304.0 -549L1105.0 0ZM1153.0 -155 1184.0 -246H1422.0L1456.0 -155Z M2003.0 0V-697H2218.0Q2300.0 -697 2351.5 -673.0Q2403.0 -649 2427.5 -604.5Q2452.0 -560 2452.0 -499Q2452.0 -409 2400.5 -358.0Q2349.0 -307 2252.0 -299Q2235.0 -298 2213.0 -298.0Q2191.0 -298 2172.0 -298H2105.0V0ZM2389.0 0 2210.0 -310 2314.0 -323 2506.0 0ZM2105.0 -388H2208.0Q2250.0 -388 2281.5 -398.5Q2313.0 -409 2332.0 -433.0Q2351.0 -457 2351.0 -498Q2351.0 -539 2332.0 -562.5Q2313.0 -586 2281.0 -596.0Q2249.0 -606 2208.0 -606H2105.0Z M2906.0 0V-697H3136.0Q3237.0 -697 3294.5 -651.0Q3352.0 -605 3352.0 -522Q3352.0 -472 3330.0 -433.5Q3308.0 -395 3268.0 -374Q3328.0 -356 3358.0 -311.5Q3388.0 -267 3388.0 -199Q3388.0 -105 3329.0 -52.5Q3270.0 0 3163.0 0ZM3008.0 -94H3156.0Q3287.0 -94 3287.0 -204Q3287.0 -257 3256.5 -286.0Q3226.0 -315 3171.0 -315H3008.0ZM3008.0 -406H3148.0Q3194.0 -406 3222.5 -433.0Q3251.0 -460 3251.0 -507Q3251.0 -553 3221.0 -578.0Q3191.0 -603 3136.0 -603H3008.0Z M3990.0 0V-270L3744.0 -697H3860.0L4038.0 -372L4220.0 -697H4335.0L4092.0 -270V0Z";

const GROUNDS = { frond: "#1E3B2F", deep: "#132A22", kernel: "#F3EDE2", white: "#FFFFFF" } as const;

export function Wordmark({
  height = 26,
  ground = "frond",
  label = "Darby",
}: {
  height?: number;
  ground?: keyof typeof GROUNDS;
  label?: string;
}) {
  const width = Math.round((height * 5445) / 837);
  const onLight = ground === "kernel" || ground === "white";
  return (
    <svg
      width={width}
      height={height}
      viewBox="-550 -767 5445.0 837"
      role="img"
      aria-label={label}
      style={{ display: "block", flexShrink: 0 }}
    >
      <rect x="-550" y="-370" width="5445.0" height="42" fill="#D9A13B" />
      <path
        d={LETTERS}
        fill={onLight ? "#14161A" : "#F3EDE2"}
        stroke={GROUNDS[ground]}
        strokeWidth="104"
        strokeLinejoin="round"
        paintOrder="stroke"
      />
    </svg>
  );
}
