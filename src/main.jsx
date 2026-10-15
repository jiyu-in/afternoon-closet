import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { STORAGE_KEY, readData, catalog, looks, normalizeOutfit } from "./game";
import Icon from "./components/Icon";
import Avatar, { GarmentPreview } from "./components/Avatar";
import Room from "./components/Room";
import {
  Global,
  Auxiliary,
  PreviewFix,
  CompactLandscape,
  Game,
  Vignette,
  Corner,
  RoundButton,
  Dock,
  DockButton,
  SceneCaption,
  Overlay,
  Fitting,
  Panel,
  PanelHead,
  PanelBody,
  Tabs,
  Grid,
  Item,
  Action,
  Field,
  TextArea,
  PanelFoot,
  Toast,
  Quiet,
  SectionLabel,
} from "./styles";
const navigation = [
  ["closet", "closet", "옷장"],
  ["decorate", "flower", "방 꾸미기"],
  ["letter", "letter", "편지"],
  ["diary", "diary", "다이어리"],
  ["neighbors", "neighbors", "이웃"],
];
const labels = {
  closet: ["나의 옷장", "DRESSING ROOM"],
  decorate: ["방에 취향을 담아", "MY LITTLE ATELIER"],
  letter: ["오늘의 편지", "A LETTER FOR YOU"],
  diary: ["오후의 다이어리", "SMALL MOMENTS"],
  neighbors: ["이웃의 오후", "NEIGHBORHOOD · SAMPLE"],
  settings: ["작은 설정", "A QUIET AFTERNOON"],
};
const categories = [
  ["looks", "코디 세트"],
  ["top", "상의"],
  ["bottom", "하의"],
  ["dress", "원피스"],
  ["shoes", "신발"],
  ["accessory", "소품"],
  ["saved", "보관함"],
];
const dateString = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
  timeZone: "Asia/Seoul",
}).format(new Date());
function App() {
  const [data, setData] = useState(readData),
    [page, setPage] = useState(null),
    [category, setCategory] = useState("looks"),
    [zoom, setZoom] = useState(false),
    [toast, setToast] = useState(""),
    [saveName, setSaveName] = useState(""),
    [diaryTitle, setDiaryTitle] = useState(""),
    [diaryText, setDiaryText] = useState(""),
    [mood, setMood] = useState("차분해요");
  const toastTimer = useRef(),
    panelHeading = useRef(),
    returnFocus = useRef();
  function notify(t) {
    setToast(t);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3000);
  }
  const update = (fn) => setData(fn);
  useEffect(() => {
    try {
      const original = localStorage.getItem(STORAGE_KEY);
      let originalVersion;
      try {
        originalVersion = JSON.parse(original)?.version;
      } catch {
        /* Keep the raw backup before repairing malformed storage. */
      }
      if (
        original &&
        originalVersion !== 2 &&
        !localStorage.getItem("afternoon-closet-v1-backup")
      )
        localStorage.setItem("afternoon-closet-v1-backup", original);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      notify("저장 공간을 확인해 주세요. 현재 변경은 이 창에서만 유지돼요.");
    }
  }, [data]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  useEffect(() => {
    setZoom(false);
    if (page) {
      returnFocus.current = document.activeElement;
      panelHeading.current?.focus();
    } else {
      returnFocus.current?.focus?.();
    }
  }, [page]);
  useEffect(() => {
    const escape = (e) => {
      if (e.key === "Escape") setPage(null);
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  function open(id) {
    setPage((p) => (p === id ? null : id));
  }
  function choose(type, item) {
    update((d) => ({
      ...d,
      outfit: normalizeOutfit({
        ...d.outfit,
        [type]: item.id,
        ...(type === "top" || type === "bottom" ? { dress: null } : {}),
      }),
    }));
    notify(
      `${item.name} ${item.id === "none" ? "· 소품을 벗었어요" : "· 입었어요"}`,
    );
  }
  function wearLook(look) {
    update((d) => ({ ...d, outfit: normalizeOutfit(look) }));
    notify(`${look.name} · 갈아입었어요`);
  }
  function saveOutfit(e) {
    e.preventDefault();
    if (data.saved.length >= 12) {
      notify("보관함이 가득 찼어요. 코디 하나를 비워 주세요.");
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
    notify("마음에 드는 코디를 보관했어요");
  }
  const isFitting = page === "closet" || page === "decorate";
  return (
    <>
      <Global />
      <Auxiliary />
      <PreviewFix />
      <CompactLandscape />
      <Game data-motion={data.settings.motion} aria-label="오후의 옷장 게임">
        <Room outfit={data.outfit} room={data.room} onOpen={open} />
        <Vignette />
        <Corner>
          <span className="brand">오후의 옷장</span>
          <span className="date">
            {dateString}
            <br />
            오후 세 시의 작은 방
          </span>
        </Corner>
        <Corner $right>
          <div className="weather" title="게임 속 날씨: 맑음, 22도">
            <Icon name="sun" size={19} />
            <span>맑음 · 22°</span>
          </div>
          <RoundButton
            title="설정"
            aria-label="설정 열기"
            onClick={() => open("settings")}
          >
            <Icon name="settings" size={18} />
          </RoundButton>
        </Corner>
        {!page && <SceneCaption>햇살이 머무는 나의 작은 방</SceneCaption>}
        {page && (
          <Overlay $fitting={isFitting}>
            {isFitting && (
              <Fitting>
                <div className="fitting-oval" />
                {page === "closet" ? (
                  <>
                    <span className="fitting-title">
                      THE AFTERNOON WARDROBE
                    </span>
                    <div className="fitting-floor" />
                    <Avatar
                      className={`avatar${zoom ? " is-zoomed" : ""}`}
                      outfit={data.outfit}
                    />
                    <button
                      className="zoom-control"
                      aria-label="인형 확대 보기"
                      aria-pressed={zoom}
                      title="의상 디테일 확대"
                      onClick={() => setZoom((v) => !v)}
                    >
                      {zoom ? "전체 보기" : "디테일 확대"}
                    </button>
                    <span className="fitting-label">
                      지금, 가장 나다운 모습
                    </span>
                  </>
                ) : (
                  <div
                    style={{
                      position: "relative",
                      height: "90%",
                      width: "100%",
                      overflow: "hidden",
                      borderRadius: 12,
                      border: "1px solid #cbbb9f",
                    }}
                  >
                    <Room
                      outfit={data.outfit}
                      room={data.room}
                      interactive={false}
                    />
                  </div>
                )}
              </Fitting>
            )}
            <Panel
              $fitting={isFitting}
              $wide={page === "diary" || page === "neighbors"}
              role="region"
              aria-labelledby="panel-heading"
            >
              <PanelHead>
                <Icon
                  name={
                    navigation.find((x) => x[0] === page)?.[1] || "settings"
                  }
                  size={23}
                />
                <div>
                  <h1
                    ref={panelHeading}
                    tabIndex={-1}
                    id="panel-heading"
                    style={{ outline: "none" }}
                  >
                    {labels[page][0]}
                  </h1>
                  <p>{labels[page][1]}</p>
                </div>
                <button
                  className="close"
                  aria-label="패널 닫기"
                  title="방으로 돌아가기 · Esc"
                  onClick={() => setPage(null)}
                >
                  <Icon name="close" size={19} />
                </button>
              </PanelHead>
              {page === "closet" && (
                <>
                  <PanelBody>
                    <Tabs aria-label="옷 종류">
                      {categories.map(([id, label]) => (
                        <button
                          key={id}
                          aria-pressed={category === id}
                          onClick={() => setCategory(id)}
                        >
                          {label}
                        </button>
                      ))}
                    </Tabs>
                    {category === "looks" ? (
                      <>
                        <Quiet style={{ marginBottom: 15 }}>
                          세 가지 오후, 나만의 조합으로.
                        </Quiet>
                        <Grid>
                          {looks.map((l) => (
                            <Item
                              key={l.id}
                              aria-label={`${l.name} 코디 입기`}
                              $active={
                                data.outfit.top === l.top &&
                                data.outfit.bottom === l.bottom &&
                                data.outfit.dress === l.dress
                              }
                              onClick={() => wearLook(l)}
                            >
                              <div className="preview" style={{ height: 200 }}>
                                <Avatar outfit={l} />
                              </div>
                              <span className="item-name">{l.name}</span>
                              <small>{l.subtitle}</small>
                            </Item>
                          ))}
                        </Grid>
                      </>
                    ) : category === "saved" ? (
                      <>
                        {data.saved.length === 0 ? (
                          <Quiet style={{ padding: "25px 0" }}>
                            아직 빈 보관함이에요.
                            <br />
                            지금의 코디를 아래에서 저장해 보세요.
                          </Quiet>
                        ) : (
                          <Grid>
                            {data.saved.map((s) => (
                              <div key={s.id} style={{ position: "relative" }}>
                                <Item
                                  style={{ width: "100%" }}
                                  onClick={() =>
                                    wearLook({ ...s.outfit, name: s.name })
                                  }
                                  aria-label={`${s.name} 불러오기`}
                                >
                                  <div
                                    className="preview"
                                    style={{ height: 170 }}
                                  >
                                    <Avatar outfit={s.outfit} />
                                  </div>
                                  <span className="item-name">{s.name}</span>
                                  <small>눌러서 다시 입기</small>
                                </Item>
                                <button
                                  aria-label={`${s.name} 삭제`}
                                  title="코디 삭제"
                                  onClick={() => {
                                    update((d) => ({
                                      ...d,
                                      saved: d.saved.filter(
                                        (x) => x.id !== s.id,
                                      ),
                                    }));
                                    notify("코디를 보관함에서 비웠어요");
                                  }}
                                  style={{
                                    position: "absolute",
                                    right: 6,
                                    top: 6,
                                    border: 0,
                                    background: "#fcf7ebdd",
                                    padding: 7,
                                    borderRadius: "50%",
                                    color: "#9b7c60",
                                  }}
                                >
                                  <Icon name="trash" size={14} />
                                </button>
                              </div>
                            ))}
                          </Grid>
                        )}
                      </>
                    ) : (
                      <>
                        <Grid>
                          {catalog[category].map((item) => {
                            const selected =
                              category === "top" || category === "bottom"
                                ? !data.outfit.dress &&
                                  data.outfit[category] === item.id
                                : data.outfit[category] === item.id;
                            return (
                              <Item
                                key={item.id}
                                aria-label={item.name}
                                $active={selected}
                                aria-pressed={selected}
                                onClick={() => choose(category, item)}
                              >
                                <div className="preview">
                                  <GarmentPreview item={item} type={category} />
                                </div>
                                <span className="item-name">{item.name}</span>
                                <small>{item.note}</small>
                                {selected && (
                                  <span className="tick">
                                    <Icon name="check" size={12} />
                                  </span>
                                )}
                              </Item>
                            );
                          })}
                        </Grid>
                        {data.outfit.dress &&
                          (category === "top" || category === "bottom") && (
                            <Quiet style={{ marginTop: 14 }}>
                              상·하의를 고르면 원피스를 벗고 갈아입어요.
                            </Quiet>
                          )}
                      </>
                    )}
                  </PanelBody>
                  <PanelFoot>
                    <form onSubmit={saveOutfit} className="save-row">
                      <Field
                        aria-label="코디 이름"
                        maxLength={30}
                        value={saveName}
                        onChange={(e) => setSaveName(e.target.value)}
                        placeholder="이 코디의 이름은?"
                      />
                      <Action $primary type="submit">
                        <Icon name="heart" size={15} />
                        저장
                      </Action>
                    </form>
                    <p className="subtle">
                      나의 코디 {data.saved.length} / 12 · 이 브라우저에
                      보관해요
                    </p>
                  </PanelFoot>
                </>
              )}
              {page === "decorate" && (
                <PanelBody>
                  <SectionLabel>01 · 벽의 색</SectionLabel>
                  <div style={{ display: "flex", gap: 10, marginBottom: 27 }}>
                    {[
                      ["peach", "살구빛 오후", "#bf8e78"],
                      ["lavender", "라일락 안개", "#aa9aaf"],
                      ["mint", "초록 쉼표", "#9da68e"],
                    ].map(([id, name, color]) => (
                      <button
                        key={id}
                        aria-label={name}
                        aria-pressed={data.room.wall === id}
                        title={name}
                        onClick={() =>
                          update((d) => ({
                            ...d,
                            room: { ...d.room, wall: id },
                          }))
                        }
                        style={{
                          flex: 1,
                          padding: "14px 5px",
                          border: `1px solid ${data.room.wall === id ? "#9a7157" : "#ded0bc"}`,
                          borderRadius: 7,
                          background: "#f2e9d9",
                          fontSize: 10,
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            height: 33,
                            width: 33,
                            background: color,
                            borderRadius: "50%",
                            margin: "0 auto 10px",
                            boxShadow: "inset 0 0 0 3px #ffffff40",
                          }}
                        />
                        {name}
                      </button>
                    ))}
                  </div>
                  <SectionLabel>02 · 발끝의 러그</SectionLabel>
                  <Tabs>
                    {[
                      ["sage", "세이지"],
                      ["rose", "로즈"],
                      ["cream", "크림"],
                    ].map(([id, name]) => (
                      <button
                        key={id}
                        aria-pressed={data.room.rug === id}
                        onClick={() =>
                          update((d) => ({
                            ...d,
                            room: { ...d.room, rug: id },
                          }))
                        }
                      >
                        {name}
                      </button>
                    ))}
                  </Tabs>
                  <SectionLabel>03 · 작은 초록 친구</SectionLabel>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      background: "#eee5d4",
                      padding: 18,
                      borderRadius: 8,
                    }}
                  >
                    <img
                      src="/art/plant.png"
                      alt="올리브 화분"
                      style={{ width: 65, height: 110, objectFit: "contain" }}
                    />
                    <div>
                      <Quiet>창가의 올리브 나무</Quiet>
                      <Action
                        style={{ marginTop: 10 }}
                        onClick={() =>
                          update((d) => ({
                            ...d,
                            room: { ...d.room, plant: !d.room.plant },
                          }))
                        }
                      >
                        {data.room.plant ? "화분 치우기" : "화분 놓기"}
                      </Action>
                    </div>
                  </div>
                  <Quiet style={{ marginTop: 20 }}>
                    작은 변화는 자동으로 기억해요.
                  </Quiet>
                </PanelBody>
              )}
              {page === "letter" && (
                <PanelBody
                  style={{
                    textAlign: "center",
                    background: "linear-gradient(140deg,#fbf4e5,#eee1c8)",
                    paddingTop: 35,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      placeItems: "center",
                      color: "#a88665",
                      marginBottom: 24,
                    }}
                  >
                    <Icon name="letter" size={35} />
                  </div>
                  <p
                    style={{
                      fontSize: 9,
                      letterSpacing: 4,
                      color: "#aa8a68",
                      marginBottom: 20,
                    }}
                  >
                    DEAR, YOU
                  </p>
                  <h2
                    style={{
                      fontFamily: "Georgia,Batang,serif",
                      fontSize: 20,
                      fontWeight: 400,
                      lineHeight: 1.7,
                    }}
                  >
                    아무것도 아닌 날의
                    <br />
                    반짝임
                  </h2>
                  <div
                    style={{
                      fontSize: 12,
                      lineHeight: 2.6,
                      color: "#8a7057",
                      margin: "26px 0 30px",
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
                    오늘을 충분히 아름답게 만들 거예요.
                    <br />
                    <br />
                    오늘도 당신의 속도로 걸어가요.
                    <br />
                    <small>— 오후의 옷장에서</small>
                  </div>
                  <Action
                    $primary
                    onClick={() => {
                      update((d) => ({ ...d, letter: true }));
                      notify("편지를 마음에 간직했어요");
                    }}
                  >
                    <Icon name="heart" size={15} />
                    {data.letter ? "마음에 간직한 편지" : "마음에 간직하기"}
                  </Action>
                </PanelBody>
              )}
              {page === "diary" && (
                <PanelBody>
                  <div
                    className="diary-layout"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(min(100%,260px),1fr))",
                      gap: 25,
                    }}
                  >
                    <div>
                      <SectionLabel>오늘의 한 페이지</SectionLabel>
                      <Quiet>{dateString}</Quiet>
                      <Tabs style={{ marginTop: 16 }}>
                        {["차분해요", "포근해요", "설레요", "조금 지쳐요"].map(
                          (m) => (
                            <button
                              key={m}
                              aria-pressed={mood === m}
                              onClick={() => setMood(m)}
                            >
                              {m}
                            </button>
                          ),
                        )}
                      </Tabs>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!diaryText.trim()) return;
                          update((d) => ({
                            ...d,
                            entries: [
                              {
                                id: crypto.randomUUID(),
                                date: new Date().toISOString(),
                                title: diaryTitle.trim() || "이름 없는 오후",
                                text: diaryText.trim(),
                                mood,
                                outfit: { ...d.outfit },
                              },
                              ...d.entries,
                            ],
                          }));
                          setDiaryTitle("");
                          setDiaryText("");
                          notify("오늘의 마음과 코디를 함께 기록했어요");
                        }}
                      >
                        <Field
                          aria-label="다이어리 제목"
                          value={diaryTitle}
                          maxLength={80}
                          onChange={(e) => setDiaryTitle(e.target.value)}
                          placeholder="오늘을 부르는 이름"
                        />
                        <TextArea
                          aria-label="다이어리 내용"
                          required
                          maxLength={3000}
                          value={diaryText}
                          onChange={(e) => setDiaryText(e.target.value)}
                          placeholder="작은 순간을 적어보세요."
                        />
                        <Action $primary type="submit">
                          <Icon name="diary" size={16} />
                          지금의 코디와 함께 기록
                        </Action>
                      </form>
                    </div>
                    <div>
                      <SectionLabel>
                        지나온 오후들 · {data.entries.length}
                      </SectionLabel>
                      {data.entries.length === 0 ? (
                        <Quiet style={{ marginTop: 28 }}>
                          아직 비어 있는 페이지.
                          <br />
                          당신의 첫 번째 이야기를 기다려요.
                        </Quiet>
                      ) : (
                        data.entries.map((e) => (
                          <article
                            key={e.id}
                            style={{
                              padding: "16px 0",
                              borderBottom: "1px solid #decfb8",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 8,
                                alignItems: "center",
                              }}
                            >
                              <Quiet>
                                {Number.isNaN(Date.parse(e.date))
                                  ? "어느 오후"
                                  : new Intl.DateTimeFormat("ko-KR", {
                                      month: "short",
                                      day: "numeric",
                                      timeZone: "Asia/Seoul",
                                    }).format(new Date(e.date))}{" "}
                                · {e.mood}
                              </Quiet>
                              <button
                                aria-label={`${e.title} 기록 삭제`}
                                onClick={() =>
                                  update((d) => ({
                                    ...d,
                                    entries: d.entries.filter(
                                      (x) => x.id !== e.id,
                                    ),
                                  }))
                                }
                                style={{
                                  border: 0,
                                  background: "none",
                                  padding: 5,
                                  color: "#aa8f72",
                                }}
                              >
                                <Icon name="trash" size={15} />
                              </button>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: 10,
                                marginTop: 10,
                              }}
                            >
                              <Avatar
                                outfit={e.outfit}
                                label="기록한 날의 코디"
                                style={{}}
                                className="diary-avatar"
                              />
                              <div style={{ minWidth: 0 }}>
                                <h3
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 500,
                                    overflowWrap: "anywhere",
                                    margin: "5px 0 10px",
                                  }}
                                >
                                  {e.title}
                                </h3>
                                <p
                                  style={{
                                    fontSize: 11,
                                    lineHeight: 1.9,
                                    color: "#8c745a",
                                    whiteSpace: "pre-wrap",
                                    overflowWrap: "anywhere",
                                  }}
                                >
                                  {e.text}
                                </p>
                              </div>
                            </div>
                          </article>
                        ))
                      )}
                    </div>
                  </div>
                </PanelBody>
              )}
              {page === "neighbors" && (
                <PanelBody>
                  <Quiet style={{ marginBottom: 20 }}>
                    서로 다른 취향이 머무는, 세 이웃의 작은 방.
                    <br />
                    실제 사용자와 연결되지 않는 샘플 공간이에요.
                  </Quiet>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                      gap: 14,
                    }}
                  >
                    {[
                      ["소담", "찻잎 향을 모으는 오후", 0, "mint", "sage"],
                      ["하루", "장미가 피는 창가", 1, "peach", "rose"],
                      ["유나", "골목길을 걷다가", 2, "lavender", "cream"],
                    ].map(([name, bio, index, wall, rug]) => (
                      <article
                        key={name}
                        style={{
                          border: "1px solid #d9c7ad",
                          borderRadius: 9,
                          overflow: "hidden",
                          background: "#f3ead9",
                        }}
                      >
                        <div style={{ position: "relative", height: 185 }}>
                          <Room
                            outfit={looks[index]}
                            room={{ wall, rug, plant: true }}
                            interactive={false}
                          />
                        </div>
                        <div style={{ padding: 16 }}>
                          <h3
                            style={{
                              fontSize: 14,
                              fontFamily: "Georgia,Batang,serif",
                              fontWeight: 500,
                            }}
                          >
                            {name}의 오후
                          </h3>
                          <Quiet style={{ fontSize: 10, margin: "9px 0 13px" }}>
                            {bio}
                          </Quiet>
                          <Action
                            onClick={() => {
                              if (data.visits.includes(name)) {
                                notify("이미 마음을 전한 이웃이에요");
                                return;
                              }
                              update((d) => ({
                                ...d,
                                visits: [...d.visits, name],
                              }));
                              notify(`${name}에게 인사를 남겼어요 · 샘플 체험`);
                            }}
                          >
                            <Icon name="heart" size={14} />
                            {data.visits.includes(name)
                              ? "마음을 전했어요"
                              : "다정한 인사"}
                          </Action>
                        </div>
                      </article>
                    ))}
                  </div>
                </PanelBody>
              )}
              {page === "settings" && (
                <PanelBody>
                  <SectionLabel>나에게 맞는 오후</SectionLabel>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 15,
                      fontSize: 12,
                      padding: "18px 0",
                      borderBottom: "1px solid #e2d4bf",
                    }}
                  >
                    햇살과 작은 움직임
                    <input
                      type="checkbox"
                      checked={data.settings.motion}
                      onChange={(e) =>
                        update((d) => ({
                          ...d,
                          settings: { ...d.settings, motion: e.target.checked },
                        }))
                      }
                    />
                  </label>
                  <Quiet style={{ marginTop: 25 }}>
                    코디와 방, 다이어리는 이 브라우저에 저장돼요. 브라우저
                    데이터를 지우면 기록이 사라질 수 있어요.
                  </Quiet>
                  <Quiet style={{ marginTop: 16 }}>
                    기존 옷장은 새로운 의상으로 이어져요. 이전 데이터는 첫 실행
                    시 별도로 보관해요.
                  </Quiet>
                  <Quiet style={{ marginTop: 25 }}>
                    오후의 옷장 · 작은 취향이 머무는 방<br />
                    일러스트 에셋 · Original AI-assisted artwork
                  </Quiet>
                </PanelBody>
              )}
            </Panel>
          </Overlay>
        )}
        <Dock aria-label="게임 도구 모음">
          {navigation.map(([id, icon, name]) => (
            <DockButton
              key={id}
              $active={page === id}
              aria-pressed={page === id}
              title={name}
              onClick={() => open(id)}
            >
              <Icon name={icon} />
              {name}
              {id === "letter" && !data.letter && <small />}
            </DockButton>
          ))}
        </Dock>
        {toast && <Toast role="status">{toast}</Toast>}
      </Game>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
