# v1.7.0 Local Validation

## Scope

This focused release implements the requested Home-page color match and supplied blue Print Procurement icon.

| Change | Result |
|---|---|
| `100+ Clients Served` statistic | Updated from dark yellow `#7A6100` to `#497C16`, exactly matching the existing `20% Average Savings` green treatment. |
| Home Print Procurement service icon | Updated to the supplied `service-print-procurement-blue-831.png` asset. |
| Print Procurement service-page visual | Updated to the same supplied blue icon for a consistent service treatment. |
| Supplied asset integrity | PNG copied under a stable public path; source is 1024 × 1024 RGBA PNG. |

## Validation Results

| Check | Result | Evidence |
|---|---|---|
| TypeScript | Passed | `pnpm check` completed without errors. |
| Automated regressions | Passed | `pnpm test`: 10 test files, 36 tests passed. |
| Production build | Passed | `pnpm build` completed successfully. |
| Local Home axe-core WCAG A/AA | Passed | 0 violations; 23 passed rules. Nine color-contrast results are axe incomplete/manual-review items. |
| Home statistic rendered color | Passed | Computed color is `rgb(73, 124, 22)`, equivalent to `#497C16`. |
| Local Print Procurement visual | Passed | Service page rendered the supplied icon with a loaded 1024px intrinsic image. |
| Local Print Procurement axe-core WCAG A/AA | Passed | 0 violations; 22 passed rules. Five color-contrast results are axe incomplete/manual-review items. |

> The matched green is retained as the established accessible dark-green statistic/text treatment on white. The exact light client green continues to be used only in visual contexts where it does not create a normal-text contrast regression.
