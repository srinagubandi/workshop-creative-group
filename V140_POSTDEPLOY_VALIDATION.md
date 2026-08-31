# v1.4.0 Railway Post-deployment CSS and ADA Validation

| Check | Result | Evidence |
|---|---|---|
| Railway deployment | Passed | GitHub deployment status reported Railway **success** for merged commit `5f459e446e584fd685f275d4a6e733d9364e5ebf`. |
| Live Home service icons | Passed | The deployed Home page served `service-large-format-828.png`, `service-graphic-design-home-828.png`, and `service-print-procurement-home-828.png`. |
| Live full client-logo disclosure | Passed | The control changed from `aria-expanded="false"` with 6 logo figures to `aria-expanded="true"` with 30 live published-logo figures. Its label changed from “Show 24 more client logos” to “Show fewer client logos.” |
| Live Home axe-core WCAG A/AA scan | Passed | Scan returned 0 violations, 9 color-contrast manual-review items, and 28 passed rules. |

> The live managed gallery contains 30 published logo records, while the local fallback gallery used in the preview contained 23. The disclosure accommodates either count and therefore renders all currently approved published logos in production.
| Live Graphic Design icon mapping | Passed | The deployed page loaded `/images/strategy-design-828.png`, `/images/service-large-format-828.png`, and `/images/branding-828.png` for the three benefit cards. |
| Live Graphic Design axe-core WCAG A/AA scan | Passed | Scan returned 0 violations, 5 color-contrast manual-review items, and 23 passed rules. |
| Live Home route and keyboard focus | Passed | The live Home page rendered the v1.4.0 Home assets, and the first Tab visibly focused the Skip to main content link. |
| Live keyboard skip-link activation | Passed | Activating the focused live Skip to main content link updated the URL to `#main-content`. |
