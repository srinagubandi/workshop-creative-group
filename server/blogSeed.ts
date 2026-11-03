import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import { AIR_ZERO_ARTICLE } from "../shared/airZeroArticle";

export async function seedAirZeroArticle() {
  const db = await getDb();
  if (!db) return;
  // Unique slug + INSERT IGNORE makes repeated/parallel boots safe and retains
  // the first real publication date and any later owner edits.
  await db.insert(blogPosts).ignore().values({
    ...AIR_ZERO_ARTICLE,
    featured: 1,
    audioUrl: null,
    publishedAt: new Date(),
  });
}
