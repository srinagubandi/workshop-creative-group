# v1.11.0 Editorial and Source Record

The owner approved the title **How Air Zero Turns Yard Signs into Neighborhood Marketing**, neutral **Blog** branding everywhere, **By Brent**, and the current publication date. The article comes from `AirZero_Post_Yardsigns_2.23.26.docx` in the supplied `Brent_Article_-_For_site.zip`. Its text and five listed benefits are retained; only paragraph/list formatting is normalized. No factual claims, voice, or substantive wording have been rewritten. The accompanying `AirZero_YardSign_Post.png` is retained full-frame as a 1024 × 1024 WebP for web delivery, with descriptive alternative text.

The publication seed inserts the unique slug once into `blog_posts` and never overwrites an existing post. The real first insertion time is the publication timestamp; repeated deployments do not change it. Author and cover-image metadata are nullable database fields so future articles are not automatically credited to Brent.

## Sources reviewed November 3, 2026

[Railway variables API](https://docs.railway.com/integrations/api/manage-variables) documents scoped variable reads used for authenticated backup access. [Railway SSH](https://docs.railway.com/cli/ssh) documents private-network command execution and temporary key management used for the full 11-table snapshot without a public database port. [GitHub REST](https://docs.github.com/en/rest) documents authorized repository and release operations.

[Google Article structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/article), updated September 8, 2026, supports accurate BlogPosting headline, visible author, representative image, and timezone-qualified publication/modification dates. Those values are derived from the same database record as the visible article. This is not a promise of indexing, search ranking, or a rich-result display.

## Backup coverage note

The existing protected admin backup exports nine named tables. Before this release a supplementary full consistent private-network snapshot captured all eleven actual tables, including `testimonials` and `site_text_overrides`. Both snapshots, the source archive, and complete Git bundle were checksummed. Future full backups must not rely solely on the nine-table admin export until that separate backup-coverage issue is remediated.
