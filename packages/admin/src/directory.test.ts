import { afterEach, describe, expect, it, vi } from "vitest";

const grouped = vi.hoisted(() => ({
  rows: [] as { day: string; n: number }[],
}));

vi.mock("server-only", () => ({}));
vi.mock("./gate", () => ({ assertPlatformAdmin: async () => {} }));
vi.mock("@intelligo-dev/core/db", () => {
  // select().from().where().groupBy() → the rows the test set.
  const chain = {
    from: () => chain,
    where: () => chain,
    groupBy: async () => grouped.rows,
  };
  return { db: { select: () => chain } };
});

const { getSignupsByDay, likeLiteral, pageBounds } =
  await import("./directory");

afterEach(() => {
  vi.useRealTimers();
});

describe("likeLiteral", () => {
  it("makes %, _ and the escape character match only themselves", () => {
    expect(likeLiteral("50%_off\\")).toBe("50\\%\\_off\\\\");
  });

  it("leaves ordinary text alone", () => {
    expect(likeLiteral("ada@example.test")).toBe("ada@example.test");
  });
});

describe("pageBounds", () => {
  it("caps a page at 200 rows and starts at zero", () => {
    expect(pageBounds({ limit: 5000, offset: -3 })).toEqual({
      limit: 200,
      offset: 0,
    });
  });

  it("asks for at least one row", () => {
    expect(pageBounds({ limit: 0 })).toEqual({ limit: 1, offset: 0 });
  });
});

describe("getSignupsByDay", () => {
  it("returns one entry per day, oldest first, ending today in the zone", async () => {
    // 20:00 UTC on 3 March is already 4 March in Ulaanbaatar (+08:00).
    vi.useFakeTimers({ now: new Date("2026-03-03T20:00:00Z") });
    grouped.rows = [
      { day: "2026-03-04", n: 2 },
      { day: "2026-03-02", n: 5 },
    ];

    const days = await getSignupsByDay({
      days: 3,
      timeZone: "Asia/Ulaanbaatar",
    });

    expect(days).toEqual([
      { day: "2026-03-02", count: 5 },
      { day: "2026-03-03", count: 0 },
      { day: "2026-03-04", count: 2 },
    ]);
  });

  it("refuses a zone it does not know rather than guessing UTC", async () => {
    await expect(
      getSignupsByDay({ days: 3, timeZone: "Mars/Olympus" })
    ).rejects.toThrow(RangeError);
  });
});
