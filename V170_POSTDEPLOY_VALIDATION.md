# v1.7.0 Railway Production Validation

## Deployment

| Check | Result | Evidence |
|---|---|---|
| Published feature branch | Passed | `feature/v1.7.0-statistic-print-icon-20260831` published at `2b0f21ba4c15c2d5610c197ef111e3aa9ea2e7b3`. |
| Pull request | Passed | [PR #14](https://github.com/srinagubandi/workshop-creative-group/pull/14) was cleanly mergeable and merged into `main`. |
| Application merge commit | Passed | `58843f11616c63c5422e3cd8c1549025daac96fe`. |
| Railway deployment | Passed | Railway GitHub deployment status reported **success** for the v1.7.0 merge commit. |

## Live Release Checks

| Check | Result | Evidence |
|---|---|---|
| Home matched-green statistic | Passed | The live `100+ Clients Served` statistic rendered as `rgb(73, 124, 22)`, equivalent to `#497C16`, matching the `20% Average Savings` statistic. |
| Supplied icon response | Passed | `service-print-procurement-blue-831.png` returned HTTP 200 as a 1024 × 1024 RGBA PNG. Its live SHA-256 matched the committed source asset. |
| Home icon decode | Passed | Once the lazy-loaded Home card was brought into view, the deployed image reported a 1024 × 1024 intrinsic size. |
| Live Home axe-core WCAG A/AA | Passed | 0 violations and 28 passed rules. Nine color-contrast items remain axe incomplete/manual-review results. |
| Accessibility safeguard | Passed | The statistic uses the established accessible dark-green treatment on its white background; the lighter client green remains limited to contrast-safe visual contexts. |

> The initial browser inspection reported `naturalWidth: 0` because the below-the-fold Home service image had not yet been lazy-loaded. A direct HTTP request returned the exact committed PNG, and after the image was brought into view it decoded at its expected 1024 × 1024 size.
