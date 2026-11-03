# v1.11.1 — Production Validation Corrections

November 3, 2026. Branch: `fix/v1.11.1-production-blog-validation-20261103`; baseline main `24497270b277d50dfdde087cc9deed014314774b`.

## Findings and corrections

The initial v1.11.0 deployment succeeded and published the approved article, but live validation correctly blocked completion. Production Express wildcard middleware consumed `req.path` into `/`, causing initial HTML to use Home metadata for Blog/article requests. The fix uses the original URL's pathname. Actual production middleware regression tests now verify Blog with a query string, article-specific canonical/schema, and missing article HTTP 404/noindex.

Axe-core 4.14.0 found `label-content-name-mismatch` on three existing Home testimonial expansion controls: visible “Read full perspective” did not match their author-specific aria-label. Controls now use their exact visible state text plus a screen-reader author suffix as the native name. Quote normalization still runs before preview/expansion; stored source and decorative blue quotation marks are unchanged.

## Fresh backup and local gates

Source archive/full Git bundle plus complete consistent 11-table SQL snapshot (266,883 bytes, including the published article) were verified before changes. Manifest: `/home/ubuntu/backups/workshop-creative-group-prechange-v1111-20261103T172205Z/MANIFEST.md`. Temporary corrective SSH key removed and local key files erased; no public database port created.

TypeScript, 58 tests in 13 files, production build and whitespace checks pass. Full local fixture-based browser audit repeats the v1.11.0 desktop/mobile, keyboard, reflow, enlarged spacing and missing-record checks. The four desktop sampled routes and enlarged-spacing mobile article scan have 0 axe violations. Contrast incomplete items remain manual-review limitations. Raw local audit: `docs/evidence/v1.11.1/local-audit.json`.

Production must retest exact-commit deployment, initial HTML/canonical/schema, actual publication-date persistence, missing-route status, all published gallery/Home-logo media, responsive/keyboard controls, and live Home/Blog/article/Large Format accessibility. This record does not assert a full WCAG/ADA conformance guarantee. Full native screen-reader testing, Google provider testing/indexing and a restore drill remain unevaluated.
