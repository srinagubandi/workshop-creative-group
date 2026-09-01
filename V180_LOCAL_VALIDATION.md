# v1.8.0 Local Validation

## Scope

This focused release replaces the yellow decorative icon for the Graphic Design page’s **Consistent Brand Voice** benefit with an accessible green treatment.

| Change | Result |
|---|---|
| Brand Voice artwork | Retains the approved `branding-828.png` silhouette through an alpha mask rather than substituting unrelated imagery. |
| Icon color | The scoped mask renders at `#7EBF31` / `rgb(126, 191, 49)`. |
| Semantics | The icon remains decorative with `aria-hidden="true"`; the adjacent visible heading and description continue to provide the information. |
| Layout | The existing 36px benefit-card icon footprint and card hierarchy are preserved. |

## Validation Results

| Check | Result | Evidence |
|---|---|---|
| TypeScript | Passed | `pnpm check` completed without errors. |
| Automated regressions | Passed | `pnpm test`: 10 test files and 36 tests passed. |
| Production build | Passed | `pnpm build` completed successfully. |
| Rendered visual inspection | Passed | Local Graphic Design page shows the Brand Voice glyph in green with the original benefit-card layout retained. |
| Local Graphic Design axe-core WCAG A/AA | Passed | 0 violations; 23 passed rules. Five color-contrast checks remain axe incomplete/manual-review items. |
| Accessibility semantics | Passed | The decorative mask element has `aria-hidden="true"`; it does not alter the benefit’s heading, description, tab order, or accessible name. |
