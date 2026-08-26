# v1.2.0 Post-deployment Validation

| Test | Result | Evidence |
|---|---|---|
| 1. Railway deployment health | Passed | GitHub’s Railway deployment status for merge commit `a7e3ee7e5a3c79999d2c3928a72178c1048c93c2` changed from pending to **success** with the message `Success - www.workshopcreativegroup.com`. |

All web checks below are non-destructive. No production forms are submitted and no files are uploaded.
| 2. Home-page release content | Passed | The live home page rendered the supplied `service-print-procurement-826.png` asset in the Print Procurement card and showed the updated primary-action and footer treatments. |
| 3. Accessibility Statement content | Passed | The live route rendered the August 26 statement language, WCAG 2.2 AA target, barrier-reporting email, contact-form path, ongoing-review explanation, and non-certification scope. |
| 5. Live axe-core — Accessibility Statement | Passed | WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations**, 1 color-contrast manual-review item, and 22 passed rule results. |
| 4. Live axe-core — Home | Passed | WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations**, 1 color-contrast manual-review item, and 28 passed rule results. |
| 6. Request Quote workflow | Passed | The live page rendered the revised invoice field, helper text, form labels, and footer without uploading or submitting data. |
| 6. Live axe-core — Request Quote | Passed | WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations**, 1 color-contrast manual-review item, and 26 passed rule results; no file was uploaded and no form was submitted. |
| 7. Live axe-core — Contact | Passed | WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations**, 1 color-contrast manual-review item, and 25 passed rule results; the contact form was not submitted. |
| 8. Live keyboard skip link | Passed | On `/contact`, the first Tab revealed the visible skip link and Enter changed the URL to `#main-content`, confirming main-content navigation without form interaction. |
| 9. Live footer policy links | Passed | The deployed footer exposed visible, reachable links for `/accessibility`, `/privacy`, and `/terms`. |
| 10. Live route and asset smoke test | Passed with transfer note | `/`, `/accessibility`, `/privacy`, `/terms`, `/contact`, and `/request-quote` returned HTTP 200. The supplied icon endpoint returned HTTP 200; the sandbox transfer reached 46,018 of 626,522 bytes before the intentionally capped 10-second download window expired, so full-file transfer speed should be monitored separately. |

## Result and limitation

All 10 planned post-deployment checks passed. The three live axe-core scans reported no WCAG 2.0/2.1/2.2 A/AA violations. Each scan retained color-contrast `incomplete` items, which require visual/manual review and do not constitute axe violations. This validation does not provide a legal certification of accessibility or a guarantee that every assistive-technology, device, browser, content, or third-party scenario is free of barriers.
