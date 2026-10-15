import React, { useId } from "react";
import { art, normalizeOutfit } from "../game";
// All artwork is registered against a 1024 × 1536 paper-doll rig.
// Per-layer transforms compensate for transparent image margins, never for a changed pose.
export const registration = {
  blouse: "translate(194 78) scale(.62 .58)",
  knit: "translate(190 95) scale(.63 .65)",
  skirt: "translate(123 252) scale(.76 .58)",
  trousers: "translate(-36 95) scale(1.07 .87)",
  linen: "translate(150 127) scale(.70 .95)",
  loafers: "translate(142 535) scale(.72 .65)",
  satchel: "translate(405 218) scale(.46 .46)",
};
const files = {
  blouse: "blouse.png",
  knit: "knit.png",
  skirt: "skirt.png",
  trousers: "trousers.png",
  linen: "dress.png",
  loafers: "shoes.png",
  satchel: "bag.png",
};
export function AvatarLayers({ outfit }) {
  const o = normalizeOutfit(outfit),
    uid = useId().replace(/:/g, "");
  const layer = (id) =>
    id && files[id] ? (
      <image
        data-layer={id}
        key={id}
        href={art + files[id]}
        width="1024"
        height="1536"
        transform={registration[id]}
      />
    ) : null;
  return (
    <g
      pointerEvents="none"
      data-avatar="paper-doll"
      data-outfit={o.dress || `${o.top}-${o.bottom}`}
    >
      <defs>
        <mask
          id={`${uid}-body`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1024"
          height="1536"
        >
          <rect width="1024" height="1536" fill="white" />
          {o.dress && (
            <>
              <rect x="340" y="335" width="360" height="430" fill="black" />
              <path
                id={`${uid}-arm`}
                d="M360 335H404L425 420 405 500 395 550 379 600 356 650 332 700 321 740 324 810 313 852 270 852 275 780 290 740 301 700 312 650 321 600 336 550 353 500 358 450 361 400Z"
                fill="white"
              />
              <use
                href={`#${uid}-arm`}
                transform="translate(1040 0) scale(-1 1)"
              />
            </>
          )}
          {!o.dress && o.top === "knit" && (
            <path d="M630 285H700V420H670L650 350Z" fill="black" />
          )}
          <rect x="429" y="285" width="17" height="66" fill="black" />
          <rect x="598" y="285" width="19" height="66" fill="black" />
        </mask>
        <clipPath id={`${uid}-hair`}>
          <path d="M438 210Q410 230 421 285L438 327Q470 358 484 318L467 274 474 232Z" />
        </clipPath>
        <clipPath id={`${uid}-hands`}>
          <path d="M270 760H335V870H270ZM704 760H775V872H704Z" />
        </clipPath>
      </defs>
      <image
        data-layer="base"
        mask={`url(#${uid}-body)`}
        href={art + "base.png"}
        width="1024"
        height="1536"
      />
      {layer(o.shoes)}
      {o.dress ? (
        layer(o.dress)
      ) : (
        <>
          {layer(o.bottom)}
          {layer(o.top)}
        </>
      )}
      <image
        data-layer="hair-front"
        href={art + "base.png"}
        width="1024"
        height="1536"
        clipPath={`url(#${uid}-hair)`}
      />
      {o.accessory !== "none" && layer(o.accessory)}
      <image
        data-layer="hands-front"
        href={art + "base.png"}
        width="1024"
        height="1536"
        clipPath={`url(#${uid}-hands)`}
      />
    </g>
  );
}
export default function Avatar({
  outfit,
  className = "",
  label = "현재 코디를 입은 인형",
}) {
  return (
    <svg
      className={className}
      viewBox="180 0 670 1536"
      role="img"
      aria-label={label}
    >
      <AvatarLayers outfit={outfit} />
    </svg>
  );
}
export function GarmentPreview({ item, type }) {
  const views = {
    top: "50 250 920 950",
    bottom: "70 550 900 1000",
    dress: "100 120 850 1350",
    shoes: "300 1250 420 300",
    accessory: "400 110 570 1140",
  };
  return item.asset ? (
    <svg
      viewBox={views[type] || "0 0 1024 1536"}
      role="img"
      aria-label={item.name}
      style={{ width: "100%", height: "100%" }}
    >
      <image href={art + item.asset} width="1024" height="1536" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 100 100"
      style={{ height: 60, color: "#b19a7e" }}
      aria-hidden="true"
    >
      <path
        d="M50 20C42 5 15 10 15 32c0 23 35 47 35 47s35-24 35-47C85 10 58 5 50 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}
