import { test, expect } from "@playwright/test";
const read = (page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem("afternoon-closet-v1")));
const dock = (page, name) =>
  page
    .getByRole("navigation", { name: "게임 도구 모음" })
    .getByRole("button", { name, exact: true });
const openCloset = async (page) => {
  await dock(page, "옷장").click();
  await expect(page.getByRole("heading", { name: "나의 옷장" })).toBeVisible();
};
test("legacy saves migrate without losing diary, room, visits or original backup", async ({
  page,
}) => {
  const old = {
    outfit: { top: "blue", bottom: "rose", hair: "gold", accessory: "pink" },
    saved: [
      {
        id: "old-look",
        name: "지난 오후",
        outfit: { top: "cream", bottom: "cream" },
      },
    ],
    room: { wall: "lavender", rug: "rose", plant: false },
    entries: [
      {
        id: "old-entry",
        date: "2026-10-14T12:00:00Z",
        title: "지난 기록",
        text: "기억할 하루",
        mood: "포근해요",
        outfit: { top: "pink", bottom: "sage" },
      },
    ],
    letter: true,
    visits: ["소담"],
  };
  await page.addInitScript((value) => {
    if (!localStorage.getItem("test-seeded")) {
      localStorage.setItem("afternoon-closet-v1", JSON.stringify(value));
      localStorage.setItem("test-seeded", "1");
    }
  }, old);
  await page.goto("/");
  await expect.poll(async () => (await read(page))?.version).toBe(2);
  const data = await read(page);
  expect(data.saved[0].outfit.top).toBe("knit");
  expect(data.saved[0].outfit.bottom).toBe("trousers");
  expect(data.entries[0].text).toBe(old.entries[0].text);
  expect(data.room).toEqual(old.room);
  expect(data.visits).toEqual(["소담"]);
  expect(
    JSON.parse(
      await page.evaluate(() =>
        localStorage.getItem("afternoon-closet-v1-backup"),
      ),
    ),
  ).toEqual(old);
  await openCloset(page);
  await page.getByRole("button", { name: "보관함", exact: true }).click();
  await page.getByRole("button", { name: "지난 오후 불러오기" }).click();
  expect((await read(page)).outfit.top).toBe("knit");
  await dock(page, "다이어리").click();
  await expect(page.getByRole("heading", { name: "지난 기록" })).toBeVisible();
  await page.reload();
  expect((await read(page)).entries).toHaveLength(1);
});
test("dressing layers, separate/dress exclusivity, mixing, saving and deleting", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await openCloset(page);
  const originalHeight = (await page.locator(".avatar").boundingBox()).height;
  await page.getByRole("button", { name: "인형 확대 보기" }).click();
  expect((await page.locator(".avatar").boundingBox()).height).toBeGreaterThan(
    originalHeight * 1.4,
  );
  await page.getByRole("button", { name: "인형 확대 보기" }).click();
  await page.getByRole("button", { name: "장미가 피는 날 코디 입기" }).click();
  await expect(page.locator('.avatar [data-layer="linen"]')).toHaveCount(1);
  await expect(page.locator('.avatar [data-layer="blouse"]')).toHaveCount(0);
  await expect(page.locator('.avatar [data-layer="skirt"]')).toHaveCount(0);
  await page.getByRole("button", { name: "상의", exact: true }).click();
  await page.getByRole("button", { name: /오후의 케이블 니트/ }).click();
  await expect(page.locator('.avatar [data-layer="linen"]')).toHaveCount(0);
  await expect(page.locator('.avatar [data-layer="knit"]')).toHaveCount(1);
  expect((await read(page)).outfit.bottom).toBe("skirt");
  await page.getByRole("button", { name: "하의", exact: true }).click();
  await page.getByRole("button", { name: /산책길 와이드 팬츠/ }).click();
  await page.getByRole("button", { name: "소품", exact: true }).click();
  await page.getByRole("button", { name: /오래된 가죽 가방/ }).click();
  await page.getByLabel("코디 이름").fill("새로운 산책");
  await page.getByRole("button", { name: "저장", exact: true }).click();
  expect((await read(page)).saved).toHaveLength(1);
  await page.getByRole("button", { name: "코디 세트", exact: true }).click();
  await page.getByRole("button", { name: "찻잔 옆의 오후 코디 입기" }).click();
  await page.getByRole("button", { name: "보관함", exact: true }).click();
  await page.getByRole("button", { name: "새로운 산책 불러오기" }).click();
  expect((await read(page)).outfit).toMatchObject({
    top: "knit",
    bottom: "trousers",
    accessory: "satchel",
    dress: null,
  });
  await page.reload();
  expect((await read(page)).saved).toHaveLength(1);
  await openCloset(page);
  await page.getByRole("button", { name: "보관함", exact: true }).click();
  await page.getByRole("button", { name: "새로운 산책 삭제" }).click();
  expect((await read(page)).saved).toHaveLength(0);
  expect(errors).toEqual([]);
});
test("decoration, letter, diary, neighbors and motion setting persist", async ({
  page,
}) => {
  await page.goto("/");
  await dock(page, "방 꾸미기").click();
  await page.getByRole("button", { name: "초록 쉼표" }).click();
  await page.getByRole("button", { name: "로즈", exact: true }).click();
  await page.getByRole("button", { name: "화분 치우기" }).click();
  await dock(page, "편지").click();
  await page
    .getByRole("button", { name: "마음에 간직하기", exact: true })
    .click();
  await dock(page, "다이어리").click();
  await page.getByLabel("다이어리 제목").fill("햇살과 코디");
  await page
    .getByLabel("다이어리 내용")
    .fill("좋아하는 옷을 입고 창가에 앉았다.");
  await page.getByRole("button", { name: "지금의 코디와 함께 기록" }).click();
  await expect(
    page.getByRole("heading", { name: "햇살과 코디" }),
  ).toBeVisible();
  await dock(page, "이웃").click();
  await page
    .getByRole("button", { name: "다정한 인사", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "패널 닫기" }).click();
  await page.getByRole("button", { name: "설정 열기" }).click();
  await page.getByRole("checkbox").uncheck();
  await page.reload();
  const d = await read(page);
  expect(d.room).toEqual({ wall: "mint", rug: "rose", plant: false });
  expect(d.letter).toBe(true);
  expect(d.entries[0].title).toBe("햇살과 코디");
  expect(d.visits).toEqual(["소담"]);
  expect(d.settings.motion).toBe(false);
  await dock(page, "다이어리").click();
  await page.getByRole("button", { name: "햇살과 코디 기록 삭제" }).click();
  expect((await read(page)).entries).toHaveLength(0);
});
for (const [width, height] of [
  [1440, 1000],
  [768, 1024],
  [390, 844],
  [360, 640],
  [844, 390],
]) {
  test(`game and every panel fit ${width}x${height}, avatar remains unobscured`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    for (const name of ["옷장", "방 꾸미기", "편지", "다이어리", "이웃"]) {
      await dock(page, name).click();
      await expect(
        page.getByRole("button", { name: "패널 닫기" }),
      ).toBeVisible();
      const bounds = await page.evaluate(() => ({
        w: innerWidth,
        h: innerHeight,
        docW: document.documentElement.scrollWidth,
        docH: document.documentElement.scrollHeight,
        dock: document.querySelector("nav").getBoundingClientRect().toJSON(),
      }));
      expect(bounds.docW).toBeLessThanOrEqual(width);
      expect(bounds.docH).toBeLessThanOrEqual(height);
      expect(bounds.dock.bottom).toBeLessThanOrEqual(height);
      if (name === "옷장") {
        const actor = await page.locator(".avatar").boundingBox(),
          panel = await page
            .getByRole("region", { name: "나의 옷장" })
            .boundingBox();
        expect(actor.height).toBeGreaterThan(150);
        await page.getByRole("button", { name: "상의", exact: true }).click();
        await page
          .getByRole("button", { name: "오후의 케이블 니트", exact: true })
          .click();
        expect((await read(page)).outfit.top).toBe("knit");
        expect(
          actor.y + actor.height <= panel.y + 1 ||
            actor.x + actor.width <= panel.x + 1,
        ).toBeTruthy();
      }
      await page.getByRole("button", { name: "패널 닫기" }).click();
    }
  });
}
test("corrupt storage and unknown asset ids recover safely; keyboard interaction opens closet", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("test-corrupt-seeded")) {
      localStorage.setItem("afternoon-closet-v1", "{invalid json");
      localStorage.setItem("test-corrupt-seeded", "1");
    }
  });
  await page.goto("/");
  await expect.poll(async () => (await read(page))?.version).toBe(2);
  await page.getByRole("button", { name: "옷장 열기", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "나의 옷장" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("heading", { name: "나의 옷장" })).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "옷장 열기", exact: true }),
  ).toBeFocused();
  await page.evaluate(() =>
    localStorage.setItem(
      "afternoon-closet-v1",
      JSON.stringify({
        version: 2,
        outfit: { top: "missing", bottom: "unknown", dress: "missing" },
        saved: [null, { id: "broken", outfit: null }],
      }),
    ),
  );
  await page.goto("/");
  expect((await read(page)).outfit).toMatchObject({
    top: "blouse",
    bottom: "skirt",
    dress: null,
  });
  expect((await read(page)).saved[0].id).toBe("broken");
});

test.describe("touch controls", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  test("touch selects an outfit, zooms details and opens the visible plant", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "인형 크게 보고 옷 입히기", exact: true })
      .tap();
    await expect(
      page.getByRole("heading", { name: "나의 옷장" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "상의", exact: true }).tap();
    await page
      .getByRole("button", { name: "오후의 케이블 니트", exact: true })
      .tap();
    expect((await read(page)).outfit.top).toBe("knit");
    await page.getByRole("button", { name: "인형 확대 보기" }).tap();
    await expect(
      page.getByRole("button", { name: "인형 확대 보기" }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "패널 닫기" }).tap();
    await page.getByRole("button", { name: "화분 꾸미기", exact: true }).tap();
    await expect(
      page.getByRole("heading", { name: "방에 취향을 담아" }),
    ).toBeVisible();
  });
});
