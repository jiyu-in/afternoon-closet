export const STORAGE_KEY = "afternoon-closet-v1";
export const art = "/art/";
export const catalog = {
  top: [
    {
      id: "blouse",
      name: "작은 진주 블라우스",
      note: "아이보리 · 코튼 포플린",
      asset: "blouse.png",
    },
    {
      id: "knit",
      name: "오후의 케이블 니트",
      note: "오트밀 · 포근한 울",
      asset: "knit.png",
    },
  ],
  bottom: [
    {
      id: "skirt",
      name: "찻잎 플리츠 스커트",
      note: "브라운 · 울 체크",
      asset: "skirt.png",
    },
    {
      id: "trousers",
      name: "산책길 와이드 팬츠",
      note: "차콜 · 부드러운 트윌",
      asset: "trousers.png",
    },
  ],
  dress: [
    {
      id: "linen",
      name: "마른 장미 원피스",
      note: "더스티 로즈 · 리넨",
      asset: "dress.png",
    },
  ],
  shoes: [
    {
      id: "loafers",
      name: "클래식 로퍼",
      note: "코코아 · 가죽",
      asset: "shoes.png",
    },
  ],
  accessory: [
    { id: "none", name: "가볍게, 빈손으로", note: "소품 벗기", asset: null },
    {
      id: "satchel",
      name: "오래된 가죽 가방",
      note: "캐러멜 · 작은 버클",
      asset: "bag.png",
    },
  ],
};
export const looks = [
  {
    id: "tea",
    name: "찻잔 옆의 오후",
    subtitle: "블라우스 & 플리츠",
    top: "blouse",
    bottom: "skirt",
    dress: null,
    shoes: "loafers",
    accessory: "none",
  },
  {
    id: "rose",
    name: "장미가 피는 날",
    subtitle: "리넨 원피스",
    top: "blouse",
    bottom: "skirt",
    dress: "linen",
    shoes: "loafers",
    accessory: "none",
  },
  {
    id: "walk",
    name: "느린 골목 산책",
    subtitle: "니트 & 와이드 팬츠",
    top: "knit",
    bottom: "trousers",
    dress: null,
    shoes: "loafers",
    accessory: "satchel",
  },
];
export const defaultOutfit = {
  top: "blouse",
  bottom: "skirt",
  dress: null,
  shoes: "loafers",
  accessory: "none",
  hair: "brown",
};
export const defaultData = {
  version: 2,
  outfit: defaultOutfit,
  saved: [],
  room: { wall: "peach", rug: "sage", plant: true },
  entries: [],
  letter: false,
  visits: [],
  settings: { motion: true },
};
export function normalizeOutfit(value = {}) {
  const o = value && typeof value === "object" ? value : {};
  const legacyTop = { cream: "knit", blue: "blouse", pink: "blouse" };
  const legacyBottom = { rose: "skirt", sage: "skirt", cream: "trousers" };
  const valid = (key, id) => catalog[key].some((x) => x.id === id);
  return {
    top: valid("top", o.top) ? o.top : legacyTop[o.top] || "blouse",
    bottom: valid("bottom", o.bottom)
      ? o.bottom
      : legacyBottom[o.bottom] || "skirt",
    dress: o.dress === "linen" ? "linen" : null,
    shoes: "loafers",
    accessory: o.accessory === "satchel" ? "satchel" : "none",
    hair: "brown",
  };
}
export function migrateData(raw) {
  const v = raw && typeof raw === "object" ? raw : {};
  return {
    ...defaultData,
    version: 2,
    outfit: normalizeOutfit(v.outfit),
    saved: Array.isArray(v.saved)
      ? v.saved
          .filter((x) => x && typeof x.id === "string")
          .slice(0, 12)
          .map((x) => ({
            ...x,
            name: String(x.name || "오후의 코디"),
            outfit: normalizeOutfit(x.outfit),
          }))
      : [],
    room: {
      wall: ["peach", "lavender", "mint"].includes(v.room?.wall)
        ? v.room.wall
        : "peach",
      rug: ["sage", "rose", "cream"].includes(v.room?.rug)
        ? v.room.rug
        : "sage",
      plant: typeof v.room?.plant === "boolean" ? v.room.plant : true,
    },
    entries: Array.isArray(v.entries)
      ? v.entries
          .filter((x) => x && typeof x.id === "string")
          .map((x) => ({
            ...x,
            title: String(x.title || "이름 없는 오후"),
            text: String(x.text || ""),
            mood: String(x.mood || "차분해요"),
            outfit: normalizeOutfit(x.outfit),
          }))
      : [],
    letter: !!v.letter,
    visits: Array.isArray(v.visits)
      ? v.visits.filter((x) => typeof x === "string")
      : [],
    settings: { motion: v.settings?.motion !== false },
  };
}
export function readData() {
  try {
    return migrateData(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return migrateData(null);
  }
}
export const itemById = (type, id) => catalog[type]?.find((x) => x.id === id);
