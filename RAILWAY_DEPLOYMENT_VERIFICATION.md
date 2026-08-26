# Railway Deployment Verification — v1.1.0

| Field | Verified value |
|---|---|
| Feature branch | `feature/v1.1.0-accessibility-policy-20260825` |
| Feature commit | `4b26c2b29a382c3d8213ecd975fae00b828f78dc` |
| Pull request | [#1](https://github.com/srinagubandi/workshop-creative-group/pull/1) |
| Merged main commit | `04f38e4d80a62d4aa5ea54958cc6dd07eacaa025` |
| Railway web deployment | `6b3adfb2-173a-48f7-aba8-f63042d94829` |
| Railway deployment status | `SUCCESS` |
| Deployment created | `2026-08-26T01:30:35.138Z` |
| Public endpoint | [web-production-d7aa.up.railway.app](https://web-production-d7aa.up.railway.app/) |

## Rendered production checks

| Route or workflow | Result | Evidence |
|---|---|---|
| `/accessibility` | Pass | Renders the Accessibility Statement, WCAG 2.2 AA target language, barrier-reporting email, Contact link, global skip link, and footer Accessibility/Privacy/Terms links. |
| `/privacy` | Pass | Renders the Privacy Policy, form/upload disclosure, privacy contact path, Accessibility cross-link, global skip link, and footer policy links. |
| `/terms` | Pass | Renders the Terms and Conditions, Privacy and Accessibility cross-links, accessibility-support email/contact path, global skip link, and footer policy links. |
| `/contact` | Pass | Renders the accessibility-assistance route, native labeled required Name/Email/Message fields, Request Quote path, global skip link, and footer policy links. No data was submitted. |
| `/request-quote` | Pass | Renders the labeled native invoice picker, visible required Company/Contact/Email fields, and footer policy links. No file was uploaded and no data was submitted. |
| `/request-quote` keyboard navigation | Pass | The first Tab revealed the skip link; activation set `#main-content`, focused `main-content`, and retained a 96px fixed-header-safe scroll margin. |

> The production route for `/accessibility` had rendered a client-side 404 view before the branch was deployed. This verification confirms the merged v1.1.0 release now renders the intended content in production.

## Remaining operational follow-up

The live release validation does not replace legal review of the Privacy Policy or Terms and Conditions, nor does it establish a legal accessibility certification. Continue the documented accessibility review cycle when content, navigation, forms, colors, third-party integrations, or policy practices change. A real small-screen device/browser pass remains recommended, and the Dockerfile should be run in a Docker-capable validation environment when available.
