import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import styled, { createGlobalStyle } from "styled-components";
const Global = createGlobalStyle`*{box-sizing:border-box}body{margin:0;background:#f6f3ed;color:#554c47;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:14px}button,input,textarea{font:inherit}button{cursor:pointer;color:inherit}button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid #9aab87;outline-offset:3px}button{transition:background .2s,transform .2s}button:hover{filter:brightness(.97)}h1,h2,h3,p{margin:0}button:disabled{opacity:.5;cursor:default}`;
const Shell = styled.div`
  max-width: 1440px;
  margin: auto;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 216px 1fr;
  @media (max-width: 850px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
const Side = styled.aside`
  border-right: 1px solid #e6dfd5;
  padding: 40px 22px;
  background: #f9f6f0;
  display: flex;
  flex-direction: column;
  gap: 36px;
  @media (max-width: 850px) {
    padding: 18px;
    gap: 20px;
    border-right: 0;
    border-bottom: 1px solid #e6dfd5;
  }
`;
const Logo = styled.div`
  text-align: center;
  color: #73594a;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -1px;
  small {
    display: block;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 3px;
    margin-top: 10px;
  }
`;
const Nav = styled.nav`
  display: grid;
  gap: 8px;
  @media (max-width: 850px) {
    display: flex;
    overflow: auto;
    gap: 5px;
  }
`;
const NavButton = styled.button`
  border: 0;
  text-align: left;
  white-space: nowrap;
  padding: 14px 16px;
  background: ${(p) => (p.$active ? "#e9e6d9" : "transparent")};
  border-radius: 9px;
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  span {
    margin-right: 12px;
    font-size: 18px;
  }
`;
const Main = styled.main`
  min-width: 0;
  padding: 32px 38px 24px;
  @media (max-width: 1100px) {
    padding: 24px 20px;
  }
  @media (max-width: 550px) {
    padding: 22px 14px;
  }
`;
const Top = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e7e0d6;
  padding-bottom: 23px;
  margin-bottom: 28px;
  color: #908377;
  font-size: 12px;
  gap: 12px;
`;
const Pill = styled.span`
  background: #eeeadf;
  border-radius: 30px;
  padding: 9px 14px;
  white-space: nowrap;
`;
const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 15px;
  margin-bottom: 24px;
  h1 {
    font-family: Georgia, "Malgun Gothic", serif;
    font-size: 29px;
    font-weight: 500;
    letter-spacing: -1px;
  }
  p {
    color: #a09387;
    margin-top: 10px;
    line-height: 1.7;
  }
  @media (max-width: 550px) {
    align-items: start;
    h1 {
      font-size: 25px;
    }
  }
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(290px, 1fr);
  gap: 22px;
  @media (max-width: 1050px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
const Card = styled.section`
  border: 1px solid #e5ddd1;
  border-radius: 16px;
  background: #fcfaf6;
  overflow: hidden;
`;
const Button = styled.button`
  border: 1px solid ${(p) => (p.$primary ? "#84735f" : "#e1d8cc")};
  border-radius: 8px;
  background: ${(p) => (p.$primary ? "#84735f" : "#fffdf8")};
  color: ${(p) => (p.$primary ? "white" : "#786959")};
  padding: 11px 16px;
  font-size: 12px;
  white-space: nowrap;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
const Tabs = styled.div`
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  margin: 20px 0;
`;
const Tab = styled.button`
  padding: 8px 13px;
  border: 1px solid ${(p) => (p.$active ? "#a8977d" : "#e7dfd4")};
  border-radius: 20px;
  background: ${(p) => (p.$active ? "#eee8dc" : "transparent")};
  font-size: 12px;
`;
const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
`;
const Item = styled.button`
  padding: 10px 6px 12px;
  border: 1px solid ${(p) => (p.$active ? "#9b8669" : "#e8e0d6")};
  border-radius: 10px;
  background: ${(p) => (p.$active ? "#f0ebe1" : "#f7f3ec")};
  position: relative;
  min-width: 0;
  font-size: 11px;
  svg {
    width: 100%;
    height: 78px;
    display: block;
    margin-bottom: 6px;
  }
`;
const Lower = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 22px;
  @media (max-width: 550px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
const Note = styled.div`
  padding: 22px;
  h3 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
  }
  p {
    font-size: 12px;
    color: #97887a;
    line-height: 1.9;
  }
`;
const Toast = styled.div`
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  background: #685a4b;
  color: white;
  padding: 13px 24px;
  border-radius: 30px;
  z-index: 10;
  box-shadow: 0 5px 25px #554c4720;
  text-align: center;
  max-width: 90vw;
`;
const Field = styled.input`
  width: 100%;
  border: 1px solid #e1d7ca;
  background: #fffdf9;
  border-radius: 8px;
  padding: 12px;
  color: #65564a;
`;
const initial = {
  outfit: { top: "cream", bottom: "rose", hair: "brown", accessory: "none" },
  saved: [],
  room: { wall: "peach", rug: "sage", plant: true },
  entries: [],
  letter: false,
  visits: [],
};
function read() {
  try {
    const v = JSON.parse(localStorage.getItem("afternoon-closet-v1"));
    return v
      ? {
          ...initial,
          ...v,
          outfit: { ...initial.outfit, ...v.outfit },
          room: { ...initial.room, ...v.room },
        }
      : initial;
  } catch {
    return initial;
  }
}
const colors = {
  cream: "#ece1c7",
  blue: "#a4b9c1",
  pink: "#dcb3ad",
  rose: "#bd8d7f",
  sage: "#9faa8e",
  brown: "#695044",
  dark: "#463c38",
  gold: "#c3a66c",
  peach: "#efe0d3",
  lavender: "#e4dfe9",
  mint: "#e0e7db",
};
const inventory = {
  top: [
    ["cream", "크림 니트"],
    ["blue", "구름 블라우스"],
    ["pink", "딸기 카디건"],
  ],
  bottom: [
    ["rose", "로즈 스커트"],
    ["sage", "올리브 스커트"],
    ["cream", "바닐라 스커트"],
  ],
  hair: [
    ["brown", "밤색 단발"],
    ["dark", "흑갈색 단발"],
    ["gold", "햇살 단발"],
  ],
  accessory: [
    ["none", "자연 그대로"],
    ["pink", "리본 머리핀"],
    ["gold", "작은 꽃핀"],
  ],
};
function Garment({ type, color }) {
  const c = colors[color] || "#bba98d";
  return (
    <svg viewBox="0 0 100 90" aria-hidden="true">
      <g stroke="#857666" strokeWidth="1.5" strokeLinejoin="round">
        {type === "top" ? (
          <>
            <path
              d="M34 17L19 24 7 49 23 57 31 44 29 77H71L69 44 77 57 93 49 81 24 66 17Q50 30 34 17Z"
              fill={c}
            />
            <path
              d="M36 18Q50 40 64 18M35 65H65M33 70H67"
              fill="none"
              opacity=".55"
            />
          </>
        ) : type === "bottom" ? (
          <>
            <path d="M33 18H67L84 75Q50 86 16 75Z" fill={c} />
            <path
              d="M32 24H68M39 27L33 76M50 27V79M61 27L67 76"
              fill="none"
              opacity=".5"
            />
          </>
        ) : type === "hair" ? (
          <>
            <path d="M21 68V40C19 0 81 0 79 40V68L62 74H38Z" fill={c} />
            <path d="M32 39Q50 52 68 39V52C68 77 32 77 32 52Z" fill="#f2d7c0" />
            <path d="M28 42Q50 42 61 24L74 44V26L48 14 29 23Z" fill={c} />
          </>
        ) : color === "none" ? (
          <>
            <circle cx="50" cy="45" r="23" fill="none" strokeDasharray="4 4" />
            <path d="M38 45H62" />
          </>
        ) : color === "pink" ? (
          <>
            <path
              d="M48 43Q12 9 17 54Q30 66 48 47Q84 74 83 32Q69 23 48 43Z"
              fill={c}
            />
            <circle cx="49" cy="45" r="7" fill="#c49287" />
          </>
        ) : (
          <>
            <path
              d="M50 45C13 28 35 5 50 31C65 5 87 28 62 45C87 62 65 85 50 59C35 85 13 62 38 45Z"
              fill="#e5cfa1"
            />
            <circle cx="50" cy="45" r="9" fill="#b79858" />
          </>
        )}
      </g>
    </svg>
  );
}
function Doll({ outfit, x = 0, y = 0, scale = 1 }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      stroke="#745a49"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <ellipse cx="0" cy="139" rx="42" ry="8" fill="#9d806529" stroke="none" />
      <path d="M-17 96L-15 127H-3L-1 96M3 96L5 127H17L19 96" fill="#edcbb3" />
      <path
        d="M-17 121Q-32 139-6 137L-3 124M4 124L7 137Q33 138 18 121"
        fill="#765d4b"
      />
      <path
        d="M-27 29L-43 75Q-41 87-34 80L-18 48M27 29L43 75Q41 87 34 80L18 48"
        fill="#f2d7c0"
      />
      <path
        d="M-23 25L-36 38 -30 59 -23 53 -24 75H24L23 53 30 59 36 38 23 25 9 21H-9Z"
        fill={colors[outfit.top]}
      />
      <path d="M-23 65H23L37 106Q0 118-37 106Z" fill={colors[outfit.bottom]} />
      <path
        d="M-18 71L-24 106M-6 71L-8 111M6 71L8 111M18 71L24 106"
        stroke="#fff"
        opacity=".25"
      />
      <path d="M-9 12V25Q0 34 9 25V12" fill="#efd0b8" />
      <path
        d="M-34 10V-28C-37-82 37-82 34-28V10L20 19H-20Z"
        fill={colors[outfit.hair]}
      />
      <ellipse cy="-19" rx="26" ry="34" fill="#f2d7c0" />
      <path
        d="M-30-23Q-4-25 12-48Q18-30 31-23V-44L13-60-12-62-30-45Z"
        fill={colors[outfit.hair]}
      />
      <g fill="#574b41" stroke="none">
        <ellipse cx="-10" cy="-17" rx="2" ry="3" />
        <ellipse cx="10" cy="-17" rx="2" ry="3" />
      </g>
      <path d="M-4-5Q0-2 4-5" fill="none" />
      <g fill="#d89c8c" stroke="none" opacity=".5">
        <ellipse cx="-16" cy="-8" rx="5" ry="3" />
        <ellipse cx="16" cy="-8" rx="5" ry="3" />
      </g>
      {outfit.accessory !== "none" && (
        <g transform="translate(23 -43)">
          <path
            d="M0 0Q-20-16-15 3Q-10 10 0 3Q17 14 16-5Q9-11 0 0Z"
            fill={colors[outfit.accessory]}
          />
          <circle r="3" fill="#e6cba6" />
        </g>
      )}
    </g>
  );
}
function Room({ outfit, room }) {
  return (
    <svg
      viewBox="0 0 620 470"
      role="img"
      aria-label="햇살이 드는 내 방과 현재 코디를 입은 인형"
      style={{ display: "block", width: "100%" }}
    >
      <defs>
        <pattern id="wall" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill={colors[room.wall]} />
          <path d="M12 0V24" stroke="#fff" opacity=".22" />
        </pattern>
        <pattern
          id="floor"
          width="115"
          height="35"
          patternUnits="userSpaceOnUse"
        >
          <rect width="115" height="35" fill="#cdb091" />
          <path d="M0 0H115M0 0V35" stroke="#b49473" opacity=".45" />
        </pattern>
      </defs>
      <rect width="620" height="325" fill="url(#wall)" />
      <path d="M0 325H620V470H0Z" fill="url(#floor)" />
      <path d="M0 316H620V329H0" fill="#e8d7bf" />
      <path d="M99 83L253 84 381 357 209 357Z" fill="#fff7d4" opacity=".22" />
      <rect x="63" y="54" width="162" height="190" rx="70" fill="#d1b99c" />
      <path d="M76 234V131C76 42 212 42 212 131V234Z" fill="#e4ebdf" />
      <path d="M80 192Q116 161 151 190Q187 158 209 178V230H80" fill="#c8d2b6" />
      <path d="M143 67V235M77 148H212" stroke="#faf0dd" strokeWidth="8" />
      <path
        d="M57 62Q79 51 94 65L84 249 51 251Q70 144 57 62M202 65Q220 51 238 63Q223 148 242 250L210 249Z"
        fill="#f7efde"
        stroke="#d8c7ad"
      />
      <path d="M58 163L86 163M210 163H233" stroke="#b8a17f" strokeWidth="5" />
      <rect
        x="381"
        y="69"
        width="154"
        height="251"
        rx="7"
        fill="#af8f6d"
        stroke="#8d7055"
        strokeWidth="2"
      />
      <rect x="390" y="79" width="136" height="230" rx="5" fill="#d5b999" />
      <path
        d="M458 80V308M398 91H448V294H398ZM469 91H518V294H469Z"
        fill="none"
        stroke="#b29778"
        strokeWidth="2"
      />
      <circle cx="448" cy="198" r="3" fill="#84694c" />
      <circle cx="469" cy="198" r="3" fill="#84694c" />
      <path d="M395 319V334M520 319V334" stroke="#8f7053" strokeWidth="7" />
      <ellipse
        cx="297"
        cy="390"
        rx="147"
        ry="49"
        fill={colors[room.rug]}
        stroke="#e1d8bb"
        strokeWidth="3"
      />
      <ellipse
        cx="297"
        cy="390"
        rx="131"
        ry="40"
        fill="none"
        stroke="#e2dfc5"
        opacity=".5"
      />
      <rect x="74" y="291" width="88" height="49" rx="5" fill="#b99a7c" />
      <path d="M82 339V364M153 339V364" stroke="#95765b" strokeWidth="7" />
      <rect x="83" y="299" width="70" height="28" rx="3" fill="#d1b698" />
      <circle cx="118" cy="312" r="3" fill="#8b7058" />
      <path d="M101 290V264Q118 246 135 264V290" fill="#d6c5ad" />
      <ellipse cx="118" cy="259" rx="20" ry="6" fill="#f0e6d4" />
      {room.plant && (
        <g>
          <path d="M558 355V259" stroke="#788463" strokeWidth="4" />
          <g fill="#8c9b76" stroke="#778966">
            <ellipse
              cx="543"
              cy="272"
              rx="11"
              ry="24"
              transform="rotate(-35 543 272)"
            />
            <ellipse
              cx="573"
              cy="287"
              rx="12"
              ry="27"
              transform="rotate(35 573 287)"
            />
            <ellipse
              cx="543"
              cy="310"
              rx="11"
              ry="23"
              transform="rotate(-48 543 310)"
            />
            <ellipse cx="559" cy="253" rx="10" ry="22" />
          </g>
          <path d="M536 337H581L574 375H543Z" fill="#bc8970" />
          <path d="M533 335H584V344H533Z" fill="#d2a08a" />
        </g>
      )}
      <rect x="279" y="90" width="56" height="68" rx="2" fill="#a8896a" />
      <rect x="284" y="95" width="46" height="58" fill="#f4ead7" />
      <path
        d="M307 140V111M307 125Q286 107 293 129L307 135Q328 114 320 136Z"
        fill="#a8ae87"
        stroke="#8e9976"
      />
      <Doll outfit={outfit} x={290} y={254} scale={1.08} />
      <g fill="#f8eccb">
        <path d="M340 200l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" />
        <path d="M241 176l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
      </g>
    </svg>
  );
}
const navs = [
  ["room", "⌂", "내 방"],
  ["decorate", "❀", "방 꾸미기"],
  ["letter", "✉", "오늘의 편지"],
  ["diary", "▤", "다이어리"],
  ["neighbors", "♧", "이웃 산책"],
];
function App() {
  const [data, setData] = useState(read),
    [page, setPage] = useState("room"),
    [category, setCategory] = useState("top"),
    [toast, setToast] = useState(""),
    [title, setTitle] = useState(""),
    [entry, setEntry] = useState(""),
    [mood, setMood] = useState("포근해요"),
    [saveName, setSaveName] = useState("");
  function update(fn) {
    setData((prev) => {
      const next = fn(prev);
      try {
        localStorage.setItem("afternoon-closet-v1", JSON.stringify(next));
      } catch {
        notify("저장 공간이 부족해요. 브라우저 설정을 확인해 주세요.");
      }
      return next;
    });
  }
  function notify(t) {
    setToast(t);
    window.clearTimeout(window.afternoonToast);
    window.afternoonToast = setTimeout(() => setToast(""), 3200);
  }
  function save() {
    if (data.saved.length >= 12) {
      notify("코디는 12개까지 보관할 수 있어요. 이전 코디를 삭제해 주세요.");
      return;
    }
    update((d) => ({
      ...d,
      saved: [
        ...d.saved,
        {
          id: crypto.randomUUID(),
          name: saveName.trim() || `오후의 코디 ${d.saved.length + 1}`,
          outfit: { ...d.outfit },
        },
      ],
    }));
    setSaveName("");
    notify("코디를 옷장에 소중히 보관했어요 ♡");
  }
  return (
    <>
      <Global />
      <Shell>
        <Side>
          <Logo>
            <div style={{ fontSize: 35, fontWeight: 400, marginBottom: 10 }}>
              ♧
            </div>
            오후의 옷장<small>AFTERNOON CLOSET</small>
          </Logo>
          <Nav>
            {navs.map(([id, icon, label]) => (
              <NavButton
                key={id}
                $active={page === id}
                onClick={() => setPage(id)}
              >
                <span>{icon}</span>
                {label}
                {id === "letter" && !data.letter && (
                  <small style={{ color: "#ba806c", marginLeft: 8 }}>•</small>
                )}
              </NavButton>
            ))}
          </Nav>
          <div
            style={{
              marginTop: "auto",
              borderTop: "1px solid #e7dfd4",
              paddingTop: 22,
              fontSize: 12,
              lineHeight: 2,
              color: "#9b8a79",
            }}
          >
            <div>느리게 흘러도 괜찮은 하루</div>
            <div style={{ fontSize: 10 }}>나만의 취향이 머무는 작은 공간</div>
          </div>
        </Side>
        <Main>
          <Top>
            <span>나를 위한 작은 쉼표, 오후의 옷장</span>
            <Pill>
              ☀ 포근한 오후 · 22°C <small>(방 안의 날씨)</small>
            </Pill>
          </Top>
          <Heading>
            <div>
              <h1>
                {
                  {
                    room: "어서 와요, 나의 작은 방",
                    decorate: "취향이 머무는 공간",
                    letter: "당신에게 도착한 편지",
                    diary: "오늘의 마음을 남겨요",
                    neighbors: "다정한 이웃을 만나러",
                  }[page]
                }
              </h1>
              <p>
                {
                  {
                    room: "햇살 한 줌, 좋아하는 옷 한 벌. 오늘은 어떤 나를 만나볼까요?",
                    decorate: "작은 변화로 방 안에 새로운 계절을 들여보세요.",
                    letter: "잠시 숨을 고르고, 당신을 위한 문장을 읽어보세요.",
                    diary: "반짝이던 순간도, 조금 흐린 마음도 모두 괜찮아요.",
                    neighbors:
                      "서로 다른 취향, 함께 나누는 작은 일상. 샘플 이웃들의 방이에요.",
                  }[page]
                }
              </p>
            </div>
            <span
              style={{ fontSize: 11, color: "#9e8c79", whiteSpace: "nowrap" }}
            >
              ✧ MY LITTLE WORLD
            </span>
          </Heading>
          {(page === "room" || page === "decorate") && (
            <Layout>
              <div>
                <Card>
                  <Row style={{ padding: "17px 20px", fontSize: 12 }}>
                    <span>⌂ 나의 포근한 방</span>
                    <span style={{ color: "#a39685", fontSize: 11 }}>
                      햇살이 머무는 시간
                    </span>
                  </Row>
                  <Room outfit={data.outfit} room={data.room} />
                  <Row
                    style={{
                      padding: "16px 20px",
                      fontSize: 11,
                      color: "#998a7b",
                    }}
                  >
                    <span>✧ 오늘도 나답게, 천천히</span>
                    <span>나의 공간 01</span>
                  </Row>
                </Card>
                <Lower>
                  <Card>
                    <Note>
                      <h3>✉ 오늘의 작은 편지</h3>
                      <p>
                        잘하려는 마음보다,
                        <br />
                        좋아하는 마음을 먼저 챙겨요.
                      </p>
                      <button
                        onClick={() => setPage("letter")}
                        style={{
                          border: 0,
                          background: "none",
                          padding: "12px 0 0",
                          fontSize: 11,
                          color: "#94715c",
                        }}
                      >
                        편지 펼쳐보기 ↗
                      </button>
                    </Note>
                  </Card>
                  <Card>
                    <Note>
                      <h3>❀ 오후의 기록</h3>
                      <p>
                        오늘 입은 옷, 오늘의 기분.
                        <br />
                        작은 순간을 오래 기억해요.
                      </p>
                      <button
                        onClick={() => setPage("diary")}
                        style={{
                          border: 0,
                          background: "none",
                          padding: "12px 0 0",
                          fontSize: 11,
                          color: "#94715c",
                        }}
                      >
                        다이어리 쓰기 ↗
                      </button>
                    </Note>
                  </Card>
                </Lower>
              </div>
              <Card style={{ padding: 22 }}>
                {page === "room" ? (
                  <>
                    <Row>
                      <h2 style={{ fontSize: 18, fontWeight: 500 }}>
                        나의 옷장
                      </h2>
                      <span style={{ fontSize: 11, color: "#9b8c7a" }}>
                        작은 취향 수집
                      </span>
                    </Row>
                    <p style={{ fontSize: 12, color: "#a29281", marginTop: 9 }}>
                      마음에 드는 아이템을 눌러 입어보세요.
                    </p>
                    <Tabs>
                      {[
                        ["top", "상의"],
                        ["bottom", "하의"],
                        ["hair", "헤어"],
                        ["accessory", "소품"],
                        ["saved", "저장 코디"],
                      ].map(([id, label]) => (
                        <Tab
                          key={id}
                          $active={category === id}
                          onClick={() => setCategory(id)}
                        >
                          {label}
                        </Tab>
                      ))}
                    </Tabs>
                    {category === "saved" ? (
                      <div>
                        {data.saved.length === 0 ? (
                          <p
                            style={{
                              padding: "25px 0",
                              fontSize: 12,
                              color: "#9c8d7d",
                            }}
                          >
                            아직 저장한 코디가 없어요.
                            <br />
                            마음에 드는 조합을 보관해 보세요.
                          </p>
                        ) : (
                          data.saved.map((s) => (
                            <Row
                              key={s.id}
                              style={{
                                borderBottom: "1px solid #e7dfd5",
                                padding: "12px 0",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 12,
                                  overflowWrap: "anywhere",
                                }}
                              >
                                {s.name}
                              </span>
                              <div style={{ display: "flex", gap: 5 }}>
                                <Button
                                  onClick={() => {
                                    update((d) => ({
                                      ...d,
                                      outfit: { ...s.outfit },
                                    }));
                                    notify("저장한 코디로 갈아입었어요");
                                  }}
                                >
                                  입기
                                </Button>
                                <Button
                                  aria-label={`${s.name} 삭제`}
                                  onClick={() =>
                                    update((d) => ({
                                      ...d,
                                      saved: d.saved.filter(
                                        (x) => x.id !== s.id,
                                      ),
                                    }))
                                  }
                                >
                                  ×
                                </Button>
                              </div>
                            </Row>
                          ))
                        )}
                      </div>
                    ) : (
                      <Items>
                        {inventory[category].map(([id, label]) => (
                          <Item
                            key={id}
                            $active={data.outfit[category] === id}
                            aria-pressed={data.outfit[category] === id}
                            onClick={() =>
                              update((d) => ({
                                ...d,
                                outfit: { ...d.outfit, [category]: id },
                              }))
                            }
                          >
                            <Garment type={category} color={id} />
                            {label}
                            {data.outfit[category] === id && (
                              <span
                                style={{
                                  position: "absolute",
                                  right: 7,
                                  top: 6,
                                  color: "#8e785b",
                                }}
                              >
                                ✓
                              </span>
                            )}
                          </Item>
                        ))}
                      </Items>
                    )}
                    <div
                      style={{
                        borderTop: "1px solid #e5ddd1",
                        marginTop: 24,
                        paddingTop: 20,
                      }}
                    >
                      <Row style={{ fontSize: 12, marginBottom: 12 }}>
                        <span>오늘의 코디를 기억해요</span>
                        <span>♡</span>
                      </Row>
                      <Field
                        aria-label="코디 이름"
                        placeholder="코디 이름 (선택)"
                        maxLength={30}
                        value={saveName}
                        onChange={(e) => setSaveName(e.target.value)}
                      />
                      <Button
                        $primary
                        style={{ width: "100%", marginTop: 10 }}
                        onClick={save}
                      >
                        ♡ 코디 저장하기
                      </Button>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: 10,
                          color: "#a49584",
                          marginTop: 12,
                        }}
                      >
                        옷장 속에 차곡차곡 · {data.saved.length} / 12
                      </p>
                    </div>
                    <div
                      style={{
                        background: "#f0ece1",
                        padding: 17,
                        borderRadius: 10,
                        marginTop: 25,
                        color: "#96856f",
                        fontSize: 11,
                        lineHeight: 1.9,
                      }}
                    >
                      ✳ 취향에는 정답이 없어요.
                      <br />
                      지금 마음이 가는 색으로 나를 채워보세요.
                    </div>
                  </>
                ) : (
                  <>
                    <h2 style={{ fontSize: 18, fontWeight: 500 }}>
                      작은 방 꾸미기
                    </h2>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#9c8d7b",
                        margin: "12px 0 24px",
                      }}
                    >
                      선택한 순간, 방의 분위기가 바뀌어요.
                    </p>
                    <h3 style={{ fontSize: 13 }}>벽지</h3>
                    <Tabs>
                      {[
                        ["peach", "살구빛 오후"],
                        ["lavender", "라일락 안개"],
                        ["mint", "초록 쉼표"],
                      ].map(([id, label]) => (
                        <Tab
                          key={id}
                          $active={data.room.wall === id}
                          onClick={() =>
                            update((d) => ({
                              ...d,
                              room: { ...d.room, wall: id },
                            }))
                          }
                        >
                          {label}
                        </Tab>
                      ))}
                    </Tabs>
                    <h3 style={{ fontSize: 13 }}>러그</h3>
                    <Tabs>
                      {[
                        ["sage", "세이지"],
                        ["rose", "로즈"],
                        ["cream", "크림"],
                      ].map(([id, label]) => (
                        <Tab
                          key={id}
                          $active={data.room.rug === id}
                          onClick={() =>
                            update((d) => ({
                              ...d,
                              room: { ...d.room, rug: id },
                            }))
                          }
                        >
                          {label}
                        </Tab>
                      ))}
                    </Tabs>
                    <Button
                      onClick={() =>
                        update((d) => ({
                          ...d,
                          room: { ...d.room, plant: !d.room.plant },
                        }))
                      }
                    >
                      {data.room.plant ? "화분 잠시 치우기" : "초록 화분 놓기"}
                    </Button>
                    <p
                      style={{ fontSize: 11, color: "#9c8d7b", marginTop: 24 }}
                    >
                      변경 사항은 이 브라우저에 자동 저장돼요.
                    </p>
                  </>
                )}
              </Card>
            </Layout>
          )}
          {page === "letter" && (
            <Card
              style={{
                maxWidth: 760,
                margin: "30px auto",
                padding: "50px 30px",
                textAlign: "center",
                background: "#fbf6e9",
              }}
            >
              <span style={{ fontSize: 32 }}>✉</span>
              <p
                style={{
                  letterSpacing: 3,
                  fontSize: 10,
                  color: "#a28d73",
                  margin: "20px 0",
                }}
              >
                A LETTER FOR YOU
              </p>
              <h2
                style={{
                  fontFamily: "Georgia,serif",
                  fontWeight: 400,
                  fontSize: 25,
                }}
              >
                아무것도 아닌 날의 반짝임
              </h2>
              <div
                style={{
                  lineHeight: 2.6,
                  margin: "28px auto",
                  maxWidth: 440,
                  color: "#8b7865",
                }}
              >
                창가에 앉아 햇빛을 바라보는 시간,
                <br />
                좋아하는 옷의 단추를 잠그는 순간.
                <br />
                <br />
                대단한 일이 없어도 괜찮아요.
                <br />
                당신이 고른 작은 기쁨들이 모여
                <br />
                오늘을 충분히 아름답게 만들어 줄 거예요.
                <br />
                <br />
                오늘도 당신의 속도로 걸어가요.
                <br />
                <span style={{ fontSize: 12 }}>— 오후의 옷장에서</span>
              </div>
              <Button
                $primary
                onClick={() => {
                  update((d) => ({ ...d, letter: true }));
                  notify("편지를 마음에 간직했어요");
                }}
              >
                {data.letter ? "♡ 마음에 간직한 편지" : "♡ 마음에 간직하기"}
              </Button>
            </Card>
          )}
          {page === "diary" && (
            <Layout>
              <Card style={{ padding: 28 }}>
                <h2 style={{ fontWeight: 500, fontSize: 19 }}>
                  오늘의 한 페이지
                </h2>
                <p
                  style={{
                    margin: "12px 0 22px",
                    color: "#9b8b79",
                    fontSize: 12,
                  }}
                >
                  {new Intl.DateTimeFormat("ko-KR", {
                    dateStyle: "full",
                  }).format(new Date())}
                </p>
                <label>오늘의 기분</label>
                <Tabs>
                  {["포근해요", "설레요", "차분해요", "조금 지쳐요"].map(
                    (x) => (
                      <Tab
                        key={x}
                        $active={mood === x}
                        onClick={() => setMood(x)}
                      >
                        {x}
                      </Tab>
                    ),
                  )}
                </Tabs>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!entry.trim()) return;
                    update((d) => ({
                      ...d,
                      entries: [
                        {
                          id: crypto.randomUUID(),
                          date: new Date().toISOString(),
                          title: title.trim() || "이름 없는 오후",
                          text: entry.trim(),
                          mood,
                          outfit: { ...d.outfit },
                        },
                        ...d.entries,
                      ],
                    }));
                    setTitle("");
                    setEntry("");
                    notify("오늘의 마음을 기록했어요");
                  }}
                >
                  <Field
                    aria-label="다이어리 제목"
                    placeholder="오늘의 제목"
                    value={title}
                    maxLength={80}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    aria-label="다이어리 내용"
                    required
                    maxLength={3000}
                    placeholder="오늘은 어떤 하루였나요?"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: 200,
                      resize: "vertical",
                      border: "1px solid #e1d7ca",
                      borderRadius: 8,
                      padding: 14,
                      margin: "12px 0",
                      background: "#fffdf9",
                      lineHeight: 1.9,
                      color: "#65564a",
                    }}
                  />
                  <Button $primary type="submit">
                    오늘의 코디와 함께 기록하기
                  </Button>
                </form>
              </Card>
              <div>
                {data.entries.length === 0 ? (
                  <Card>
                    <Note>
                      <h3>아직 비어 있는 페이지</h3>
                      <p>
                        첫 번째 이야기를 들려주세요.
                        <br />
                        기록한 날의 코디도 함께 남아요.
                      </p>
                    </Note>
                  </Card>
                ) : (
                  data.entries.map((e) => (
                    <Card key={e.id} style={{ padding: 22, marginBottom: 14 }}>
                      <Row>
                        <span style={{ fontSize: 11, color: "#9b8b79" }}>
                          {new Date(e.date).toLocaleDateString("ko-KR")} ·{" "}
                          {e.mood}
                        </span>
                        <Button
                          aria-label={`${e.title} 기록 삭제`}
                          onClick={() =>
                            update((d) => ({
                              ...d,
                              entries: d.entries.filter((x) => x.id !== e.id),
                            }))
                          }
                        >
                          삭제
                        </Button>
                      </Row>
                      <h3
                        style={{
                          marginTop: 15,
                          fontSize: 16,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {e.title}
                      </h3>
                      <p
                        style={{
                          whiteSpace: "pre-wrap",
                          overflowWrap: "anywhere",
                          lineHeight: 1.9,
                          marginTop: 12,
                          color: "#8c7b69",
                        }}
                      >
                        {e.text}
                      </p>
                      <div
                        style={{
                          height: 140,
                          marginTop: 15,
                          background: "#f1e9dd",
                          borderRadius: 8,
                        }}
                      >
                        <svg
                          viewBox="-65 -80 130 230"
                          style={{ width: "100%", height: "100%" }}
                          aria-label="기록한 날의 코디"
                        >
                          <Doll outfit={e.outfit} />
                        </svg>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Layout>
          )}
          {page === "neighbors" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                gap: 20,
              }}
            >
              {[
                ["소담", "책과 초록을 좋아해요.", "sage", "mint", "brown"],
                [
                  "하루",
                  "장밋빛 오후를 모으고 있어요.",
                  "rose",
                  "peach",
                  "gold",
                ],
                [
                  "유나",
                  "차 한 잔의 여유를 나눠요.",
                  "cream",
                  "lavender",
                  "dark",
                ],
              ].map(([name, bio, bottom, wall, hair]) => (
                <Card key={name}>
                  <Room
                    outfit={{ top: "cream", bottom, hair, accessory: "pink" }}
                    room={{ wall, rug: bottom, plant: true }}
                  />
                  <Note>
                    <Row>
                      <h3>
                        {name}의 방{" "}
                        <small style={{ color: "#a29280", fontSize: 10 }}>
                          SAMPLE
                        </small>
                      </h3>
                      <span>♧</span>
                    </Row>
                    <p>{bio}</p>
                    <Button
                      style={{ marginTop: 16 }}
                      onClick={() => {
                        if (data.visits.includes(name)) {
                          notify("이미 다정한 인사를 남겼어요");
                          return;
                        }
                        update((d) => ({ ...d, visits: [...d.visits, name] }));
                        notify(`${name}에게 인사를 남겼어요. (샘플 체험)`);
                      }}
                    >
                      {data.visits.includes(name)
                        ? "♡ 인사를 남긴 이웃"
                        : "♡ 다정한 인사 남기기"}
                    </Button>
                  </Note>
                </Card>
              ))}
            </div>
          )}
          <footer
            style={{
              marginTop: 30,
              textAlign: "center",
              fontSize: 10,
              letterSpacing: 1,
              color: "#ac9f90",
            }}
          >
            작은 취향이 모여, 나다운 하루가 되는 곳 · 오후의 옷장
            <br />
            <span style={{ display: "block", marginTop: 8, letterSpacing: 0 }}>
              기록은 이 브라우저에 저장됩니다.
            </span>
          </footer>
        </Main>
      </Shell>
      {toast && <Toast role="status">{toast}</Toast>}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
