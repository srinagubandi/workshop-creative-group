# v1.10.0 Local Validation — Railway Media Recovery and Footer Social Links

**Candidate branch:** `fix/v1.10.0-media-recovery-social-links-20261026`
**Base commit:** `41dc0b0cdfa8b45af7e2373140be2358810d74b7`
**Package version:** `1.10.0`
**Validation date:** 2026-10-26
**Accessibility engineering target:** WCAG 2.2 AA for the defined Home/footer scope. This is an engineering evaluation, not a legal certification or guarantee.

## Scope

This candidate records and documents the completed production Railway Bucket recovery that restored the Work gallery and Home client-logo media routes. It adds a visible **Follow Workshop Creative Group** navigation to the footer brand column with the supplied Instagram profile and verified public LinkedIn company page.

The application change is intentionally limited to `client/src/components/Footer.tsx`. The Railway Bucket recovery retains managed database publication status, placement ordering, descriptive alternative text, and controlled `/media/:id` delivery; it does not replace the approved managed catalogue with an unreviewed static catalogue.

## Fresh Pre-change Recovery Evidence

- A checksummed source archive and complete Git-history bundle were created from `41dc0b0cdfa8b45af7e2373140be2358810d74b7` before application edits.
- A protected production database backup was created and verified before application edits: `wscg-manual-backup-2026-10-27-02-32-08.sql`, created at `2026-10-27T02:32:08.000Z`, reported size `255,508` bytes, status `success`.
- After the Railway Bucket-variable refresh and service redeploy, all 130 published managed media routes returned HTTP 200 with expected `image/*` or `video/*` content: 45 Large Format, 25 Graphic Design, 15 Branding, 30 Logos, and 15 Print Procurement items.

## Automated Application Checks

| Check | Result | Evidence |
|---|---|---|
| Locked dependency install | Passed | `pnpm install --frozen-lockfile` completed with the existing lockfile. |
| TypeScript | Passed | `pnpm check` completed with no errors. |
| Regression suite | Passed | `pnpm test`: 38 tests across 10 files passed. |
| Production build | Passed | `pnpm build` completed Vite and server bundles successfully. |
| Diff / secret screening | Passed | `git diff --check` passed; targeted scan found no supplied Railway token or GitHub token pattern in tracked candidate files. |
| Footer source contract | Passed | Confirmed Instagram and LinkedIn destinations, external-link safety attributes, 24px minimum target class, focus class, and new-tab announcement text. |

## Rendered Home Footer Review

A local production preview was served from the built candidate at the Home route.

- The rendered footer includes one `nav` with accessible name **Follow Workshop Creative Group**.
- It exposes visible text links for **Instagram** and **LinkedIn**.
- Both rendered anchors use the intended external URL, `target="_blank"`, and `rel="noopener noreferrer"`.
- Each link’s accessible text includes **opens in a new tab**.
- The rendered DOM assertion for both external links passed.
- Programmatic keyboard focus reached the Instagram link; it matched `:focus-visible`, computed a solid outline, and reported a `24px` minimum height.

## Automated Accessibility Scan

The local built Home route was scanned with axe-core using the WCAG 2.0/2.1/2.2 A and AA tags.

| Result | Count |
|---|---:|
| Violations | 0 |
| Passed rules | 38 |
| Incomplete/manual-review rules | 1 |

The only incomplete result was `color-contrast`, which axe-core marks for manual review rather than an automated violation. This result is consistent with the project’s existing color-contrast review limitation. The new social links are white/off-white text on the existing dark footer and include explicit visible focus styling; their final rendered contrast remains included in post-deployment visual verification.

## Release Gate Decision

**Conditional approval for publication** of the `v1.10.0` candidate in the defined Home/footer scope, subject to the required pull-request merge, Railway deployment success, and live verification. No automated WCAG A/AA violation was found in the local candidate scan. This decision does not make a legal accessibility, ADA, or Section 508 certification claim.
