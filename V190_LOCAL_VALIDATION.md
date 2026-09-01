# v1.9.0 Local Validation

## Scope

This release aligns the three Home-page service-card icon treatments with the Graphic Design page’s established benefit-card system. It retains service-specific approved glyphs while normalizing their visual container, size, border, spacing, and decorative semantics.

| Property | Home service cards after update | Graphic Design benefit cards |
|---|---:|---:|
| Icon container | 48 × 48px white rounded square | 48 × 48px white rounded square |
| Container border | Gray, 1px | Gray, 1px |
| Icon artwork | 36 × 36px approved service glyph | 36 × 36px approved benefit glyph |
| Semantics | Empty `alt` and `aria-hidden="true"` | Empty `alt` and `aria-hidden="true"` |
| Movement | No automatic motion; hover scale only | No automatic motion |

## Validation Results

| Check | Result | Evidence |
|---|---|---|
| TypeScript | Passed | `pnpm check` completed without errors. |
| Automated regressions | Passed | `pnpm test`: 10 test files and 36 tests passed. |
| Production build | Passed | `pnpm build` completed successfully. |
| Rendered Home icon dimensions | Passed | All three Home service containers render at 48 × 48px; decorative artwork renders at 36 × 36px. |
| Rendered Home icon containers | Passed | All three use a white background with the shared rounded bordered treatment. |
| Decorative semantics | Passed | Every Home service image has empty `alt` and `aria-hidden="true"`; adjacent headings provide the service labels. |
| Local Home axe-core WCAG A/AA | Passed | 0 violations and 23 passed rules. Nine color-contrast checks remain axe incomplete/manual-review items. |
