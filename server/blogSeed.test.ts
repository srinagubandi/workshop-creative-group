import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ getDb: vi.fn(), insert: vi.fn(), ignore: vi.fn(), values: vi.fn(), execute: vi.fn() }));
vi.mock("./db", () => ({ getDb: mocks.getDb }));
import { seedAirZeroArticle } from "./blogSeed";
import { runStartupMigrations } from "./migrations";

beforeEach(() => {
  vi.resetAllMocks();
  mocks.insert.mockReturnValue({ ignore: mocks.ignore });
  mocks.ignore.mockReturnValue({ values: mocks.values });
  mocks.values.mockResolvedValue({ affectedRows: 1 });
  mocks.execute.mockResolvedValue([]);
  mocks.getDb.mockResolvedValue({ insert: mocks.insert, execute: mocks.execute });
});

describe("Air Zero first publication", () => {
  it("uses INSERT IGNORE to preserve existing owner edits and first publication time", async () => {
    await seedAirZeroArticle();
    expect(mocks.ignore).toHaveBeenCalledOnce();
    expect(mocks.values).toHaveBeenCalledWith(expect.objectContaining({ authorName: "Brent", featured: 1, audioUrl: null, publishedAt: expect.any(Date) }));
  });
  it("does not insert without a database", async () => {
    mocks.getDb.mockResolvedValue(null); await seedAirZeroArticle(); expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("does not hide publication failure", async () => {
    mocks.values.mockRejectedValue(new Error("DB write failed")); await expect(seedAirZeroArticle()).rejects.toThrow("DB write failed");
  });
});

describe("Additive Blog field migrations", () => {
  it("adds only three nullable fields without data drops or updates", async () => {
    await runStartupMigrations();
    const queries = mocks.execute.mock.calls.map(call => call[0] as string);
    expect(queries.filter(sql => sql.startsWith("ALTER TABLE `blog_posts`"))).toEqual([
      "ALTER TABLE `blog_posts` ADD COLUMN `authorName` varchar(255) NULL",
      "ALTER TABLE `blog_posts` ADD COLUMN `coverImageUrl` varchar(512) NULL",
      "ALTER TABLE `blog_posts` ADD COLUMN `coverImageAlt` varchar(512) NULL",
    ]);
    expect(queries.every(sql => !/^\s*(?:DROP|DELETE|UPDATE)\s/i.test(sql))).toBe(true);
  });
  it("accepts already-present Blog fields on repeated startup", async () => {
    mocks.execute.mockImplementation(async (sql: string) => { if (sql.startsWith("ALTER TABLE")) throw { cause: { code: "ER_DUP_FIELDNAME" } }; return []; });
    await expect(runStartupMigrations()).resolves.toBeUndefined();
  });
  it("fails the startup gate for unexpected Blog schema failures", async () => {
    mocks.execute.mockImplementation(async (sql: string) => { if (sql.startsWith("ALTER TABLE `blog_posts`")) throw new Error("Permission denied"); return []; });
    await expect(runStartupMigrations()).rejects.toThrow("Permission denied");
  });
});
