import React, { useId } from "react";
import { art } from "../game";
import { Scene } from "../styles";
import { AvatarLayers } from "./Avatar";
export default function Room({
  outfit,
  room,
  onOpen,
  interactive = true,
  className,
}) {
  const uid = useId().replace(/:/g, "");
  const activate = (fn) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };
  const props = (label, panel) =>
    interactive
      ? {
          role: "button",
          tabIndex: 0,
          "aria-label": label,
          className: "interactable",
          onClick: () => onOpen(panel),
          onKeyDown: activate(() => onOpen(panel)),
        }
      : {};
  return (
    <Scene
      viewBox="0 0 1536 1024"
      preserveAspectRatio="xMidYMid slice"
      aria-label="오후 햇살이 드는 나의 방"
      className={className}
    >
      <defs>
        <radialGradient id={`${uid}-rug`}>
          <stop
            stopColor={
              room.rug === "rose"
                ? "#c5a094"
                : room.rug === "cream"
                  ? "#d9c7a9"
                  : "#a6aa8e"
            }
          />
          <stop
            offset="1"
            stopColor={
              room.rug === "rose"
                ? "#886556"
                : room.rug === "cream"
                  ? "#ac9472"
                  : "#707a60"
            }
          />
        </radialGradient>
        <pattern
          id={`${uid}-weave`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 2H8M2 0V8" stroke="#e2d7bc" opacity=".16" />
        </pattern>
        <clipPath id={`${uid}-wall`}>
          <path d="M441 0H1226V463H441Z" />
        </clipPath>
      </defs>
      <image href={art + "room.png"} width="1536" height="1024" />
      {room.wall !== "peach" && (
        <rect
          className="room-wall"
          width="1536"
          height="660"
          clipPath={`url(#${uid}-wall)`}
          fill={room.wall === "mint" ? "#9aab90" : "#a391ad"}
          opacity=".43"
        />
      )}
      <g {...props("러그 꾸미기", "decorate")}>
        <ellipse cx="787" cy="869" rx="305" ry="78" fill="#241c1529" />
        <ellipse
          cx="779"
          cy="861"
          rx="300"
          ry="77"
          fill={`url(#${uid}-rug)`}
          stroke="#c2b091"
          strokeWidth="4"
        />
        <ellipse
          cx="779"
          cy="861"
          rx="277"
          ry="66"
          fill={`url(#${uid}-weave)`}
          stroke="#d4c6a3"
          strokeWidth="2"
          opacity=".6"
        />
        <ellipse
          cx="779"
          cy="861"
          rx="266"
          ry="60"
          fill="none"
          stroke="#dbcdb0"
          strokeDasharray="2 5"
          strokeWidth="1.5"
          opacity=".5"
        />
      </g>
      <g
        {...props("옷장 열기", "closet")}
        className={`wardrobe-object ${interactive ? "interactable" : ""}`}
      >
        <title>옷장을 열어볼까요?</title>
        <ellipse cx="1097" cy="768" rx="120" ry="20" fill="#251a1340" />
        <image
          href={art + "wardrobe.png"}
          x="895"
          y="90"
          width="400"
          height="700"
        />
      </g>
      {room.plant && (
        <g className="plant-position">
          <g {...props("화분 꾸미기", "decorate")}>
            <title>작은 방 꾸미기</title>
            <rect x="290" y="470" width="270" height="415" fill="transparent" />
            <g className="plant" pointerEvents="none">
              <image
                href={art + "plant.png"}
                x="303"
                y="484"
                width="240"
                height="385"
              />
            </g>
          </g>
        </g>
      )}
      <g
        {...props("인형 크게 보고 옷 입히기", "closet")}
        className={`scene-avatar ${interactive ? "interactable" : ""}`}
      >
        <g transform="translate(548 223) scale(.425)">
          {interactive && (
            <path
              d="M420 10H610L690 350 770 850 690 1510H400L350 1000 270 850 350 300Z"
              fill="transparent"
            />
          )}
          <AvatarLayers outfit={outfit} />
        </g>
      </g>
      <g {...props("책상 위 편지 읽기", "letter")}>
        <title>당신에게 온 편지</title>
        <rect
          x="1355"
          y="429"
          width="145"
          height="108"
          rx="12"
          fill="transparent"
        />
        <path d="m1410 454 39-12 4 26-39 10Z" fill="#f5e4c1" stroke="#9d795a" />
        <path d="m1410 454 23 8 16-20" fill="none" stroke="#9d795a" />
      </g>
      <path
        className="room-light"
        d="M0 130 360 185 1050 1000 430 1024Z"
        fill="#ffe9b1"
        opacity=".1"
      />
      <g className="dust" fill="#fff3ca">
        {[
          [420, 350, 1.5],
          [480, 260, 1.2],
          [380, 580, 1.8],
          [560, 490, 1],
          [650, 620, 1.7],
          [500, 680, 1.3],
          [435, 430, 1],
          [570, 360, 1.5],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>
    </Scene>
  );
}
