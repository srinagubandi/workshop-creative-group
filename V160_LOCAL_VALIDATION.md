# v1.6.0 Local Brand Color and Section Spacing Validation

## Scope

This record covers the client-requested brand-color correction and tighter vertical section rhythm. The release uses the exact visual brand values `#EEC509` yellow, `#7EBF31` green, and `#1261AE` blue. It keeps the accessible dark-green action treatment for white text rather than using the lighter display green for buttons.

| Validation check | Result | Evidence |
|---|---|---|
| Fresh source backup | Passed | Checksummed archive and full Git-history bundle created from `e387bdd7784864acaf081ad1cfd1bff5df61d149`. |
| Fresh Railway database backup | Passed | Manual backup created at `2026-08-31T18:11:46.000Z`; reported size 249,442 bytes. |
| Retired literal audit | Passed | No `#1260ae`, `#7dbe31`, or `#efc509` literal remains in client source. |
| Exact client values | Passed | Shared design-system values use `#1261ae`, `#7ebf31`, and `#eec509`. |
| Shared section rhythm | Passed | `.section-py` changed from 5rem/7rem to 4rem/5.5rem on mobile/desktop. Remaining fixed public-section padding was tightened from `pb-16` to `pb-12`; banner and footer padding were reduced proportionally. |
| TypeScript | Passed | `pnpm check` completed with no errors. |
| Regression suite | Passed | `pnpm test` completed with 36 tests across 10 files passing. |
| Production build | Passed | `pnpm build` completed successfully. |
| Local axe-core WCAG A/AA scan | Passed | 0 violations, 9 color-contrast manual-review items, and 23 passed rules on the rendered Home page. |
| Rendered desktop spacing | Passed | Six shared sections on the rendered Home page use 88px top/bottom desktop padding, down from 112px. |
| Keyboard and focus safety | Passed | Existing skip-link, visible focus indicator, and reduced-motion overrides remained present in the rendered build. |

## Contrast Controls

| Treatment | Contrast ratio | Result |
|---|---:|---|
| `#1261AE` blue on white | 6.27:1 | Suitable for normal text. |
| `#EEC509` yellow on dark navy | 10.67:1 | Suitable for normal text. |
| `#7EBF31` green on dark navy | 7.93:1 | Suitable for normal display text. |
| `#497C16` action green with white text | 5.03:1 | Suitable for normal action text. |

> The lighter client green is retained for visual and dark-background display treatments. The dedicated darker action green remains necessary for white button text.
