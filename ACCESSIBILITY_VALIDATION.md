# Accessibility Validation Record — v1.1.0

**Release branch:** `feat/v1.1.0-accessibility-policy-20260825`  
**Validation date:** August 25, 2026  
**Scope:** Supplied home-page updates, public Accessibility Statement, Privacy Policy, Terms and Conditions, footer links, public-form remediation, and global keyboard/focus support.

> This record documents technical accessibility risk-reduction work and test results. It is not a legal certification, a guarantee of WCAG conformance, or a guarantee against accessibility claims.

## 20-pass review and remediation cycle

| Pass | Area | Result | Outcome |
|---:|---|---|---|
| 1 | Home structural semantics | Pass | Language, title, landmarks, one `h1`, skip link, alt attributes, link names, and ARIA references checked. |
| 2 | Accessibility Statement | Pass | Support email, Contact path, headings, landmarks, and link names verified. |
| 3 | Privacy Policy | Pass | Policy structure, contact path, Accessibility cross-link, and footer links verified. |
| 4 | Terms and Conditions | Pass | Policy cross-links, contact options, and footer links verified. |
| 5 | Contact form | Remediated | Added native `required` attributes to fields visibly identified as required. |
| 6 | Quote-request form | Remediated | Replaced visual-only file picker with a labeled native input; added required semantics to visible required fields. |
| 7 | Quote-request retest | Pass | Required fields, labels, and description references verified. |
| 8 | Keyboard skip navigation | Pass | First Tab reveals skip link; Enter sends focus to `#main-content`. |
| 9 | Mobile navigation | Pass with limitation | Disclosure relationship verified in source; a real small-screen device test remains recommended. |
| 10 | Footer contrast treatment | Pass | High-contrast white links and requested yellow headings verified. |
| 11 | Reduced motion | Pass | `prefers-reduced-motion` stylesheet override detected. |
| 12 | Testimonial motion | Pass | No autoplay, timer, or automatic advance introduced. |
| 13 | Target-size screen | Remediated | Footer links below the 24px screening threshold were updated with a minimum 24px height. |
| 14 | Target-size retest | Pass | All 13 visible footer links measured at least 24px high. |
| 15 | Heading sequence | Pass | One `h1`; no skipped heading-level transition on the home page. |
| 16 | Visible focus | Pass | Focused policy link showed a 3px blue outline with 3px offset. |
| 17 | ARIA reference integrity | Remediated | Kept mobile drawer target in the DOM while hidden to resolve `aria-controls`. |
| 18 | ARIA retest | Pass | No invalid `aria-controls`, `aria-describedby`, or `aria-labelledby` reference found. |
| 19 | Contact error announcement | Pass | Empty submission creates associated `role="alert"` messages and invalid input states. |
| 20 | Updated-route smoke test | Pass | Updated public routes and all supplied service icons returned HTTP 200 in local preview. |

## 10-test validation suite

| Test | Method | Result | Evidence |
|---:|---|---|---|
| 1 | TypeScript static check | Pass | `pnpm check` completed with no errors. |
| 2 | Automated regression suite | Pass | `pnpm test`: 10 test files and 36 tests passed. |
| 3 | Production build | Pass | `pnpm build` completed successfully. |
| 4 | Local route smoke test | Pass | `/`, `/accessibility`, `/privacy`, `/terms`, `/contact`, and `/request-quote` returned HTTP 200. |
| 5 | Supplied icon asset smoke test | Pass | All three new service icons returned HTTP 200. |
| 6 | Rendered DOM structural scan | Pass | Main landmarks, skip link, image `alt` attributes, named controls, and ARIA references passed on the home page. |
| 7 | Public policy route scan | Pass | Accessibility, Privacy, and Terms pages rendered with titles, headings, contact paths, and footer links. |
| 8 | Quote form accessibility test | Pass | Native labeled file input, required state, label relationships, and error references passed. |
| 9 | Contact form accessibility test | Pass | Client-side errors are associated with inputs and announced through alert regions. |
| 10 | Keyboard, focus, motion, and disclosure check | Pass with limitation | Skip navigation, visible focus, reduced motion, and disclosure ARIA integrity passed; small-screen hardware/browser testing remains recommended. |

## Railway deployment gate

The existing Railway production endpoint rendered a client-side 404 for `/accessibility` before publication of this branch, even though the transport request returned HTTP 200. After this branch is published and Railway deploys it, validate the **rendered page content**, not only HTTP status, for `/accessibility`, `/privacy`, `/terms`, `/contact`, and `/request-quote`.

## Ongoing controls

Continue to review accessibility when content, forms, navigation, third-party embeds, colors, or policy practices change. Keep the Accessibility Statement contact channel monitored and address barrier reports promptly. Have qualified counsel review policy text and any legal obligations applicable to the business before publication.
