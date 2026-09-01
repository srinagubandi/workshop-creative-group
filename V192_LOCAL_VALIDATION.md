# v1.9.2 Local Validation

## Scope

This focused Home-page release aligns each service-card decorative icon with its adjacent **Learn More** link and arrow while retaining readable link contrast on white cards.

| Service card | Decorative icon treatment | Learn More color | Match result |
|---|---|---|---|
| Large Format Printing | Approved blue icon | `#1261AE` blue | Matched |
| Graphic Design | Approved icon rendered with scoped accessibility-safe green filter | `#497C16` dark green | Matched |
| Print Procurement | Approved blue icon | `#1261AE` blue | Matched |

## Validation Results

| Check | Result | Evidence |
|---|---|---|
| TypeScript | Passed | `pnpm check` completed without errors. |
| Automated regressions | Passed | `pnpm test`: 10 test files and 36 tests passed. |
| Production build | Passed | `pnpm build` completed successfully. |
| Rendered color mapping | Passed | Computed Large Format and Print Procurement link color is `rgb(18, 97, 174)`; Graphic Design link color is `rgb(73, 124, 22)` and its decorative image has the scoped green filter. |
| Deferred image loading | Passed | All three Home service images loaded successfully after the cards entered the viewport. |
| Decorative semantics | Passed | Each image retains empty `alt` and `aria-hidden="true"`; the visible card heading names the destination. |
| Local Home axe-core WCAG A/AA | Passed | 0 violations and 23 passed rules. Nine color-contrast checks remain axe incomplete/manual-review items. |
| Visual review | Passed | The Home service-card section shows blue icon/link pairs for Large Format and Print Procurement, plus a matching dark-green icon/link pair for Graphic Design. |
| Pre-render testimonial normalization | Passed | `normalizeTestimonialQuote` runs before quote length, preview truncation, and full-text rendering. It removes only leading and trailing straight or curly double-quote characters. |
| Testimonial regression cases | Passed | The test suite verifies repeated outer quotes are removed in short and long content, while internal quotation marks and apostrophes remain unchanged. |
