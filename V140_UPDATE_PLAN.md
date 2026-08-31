# Workshop Creative Group — August 28 Update Plan

## Review outcome

The supplied package contains a focused request for three areas: restoring the intended green and yellow brand treatment on the Home page, replacing Home-page service icons, and improving the display of the full client-logo collection. It also requests a corresponding icon refresh in the three Graphic Design benefit cards. The package includes five high-resolution PNG icons and no new copy, client-logo files, or third-party service-page imagery.

The plan below is intentionally **implementation-ready but non-destructive**. No source, database, configuration, or production changes were made during this review.

| Request in package | Current deployed baseline | Planned resolution |
|---|---|---|
| Green and yellow look shifted from the original hex codes | The original logo colors remain defined as `#7dbe31` and `#efc509`, but darker green/yellow variants are used where text must meet accessibility contrast requirements. | Restore the original hues for decorative color, icon art, tints, borders, non-text fills, and brand accents. Retain dedicated darker variants when text appears on white or white text appears on green/yellow. |
| Change Home-page icons | The Home page has three service cards using the earlier asset set. | Replace all three with the purpose-named August 28 Home icons: Large Format, Graphic Design, and Print Procurement. |
| Display all client logos | The current static section limits the approved published-logo collection to six entries. | Expand the section into an accessible, static all-logo gallery with progressive disclosure so all published logo assets are available without auto-scrolling or an excessively long initial page. |
| Change Graphic Design page icons | The three benefit cards currently use the older service icons, which do not exactly match the benefit meaning. | Replace them with the new Strategy/Design, Large Format Printing, and Branding icons, mapped to the matching benefit cards. |

## Asset mapping

The supplied graphics are transparent 1024 × 1024 PNGs. The service-card and benefit-card headings already supply their equivalent textual labels, so the images should remain decorative (`alt=""` and `aria-hidden="true"`) rather than create redundant screen-reader announcements.

| Supplied asset | Target location | Intended role |
|---|---|---|
| `Large-Format-Printing-Icon.png` | Home → **Large Format Printing** card | Primary service icon |
| `Graphic-Design-Icon-Home.png` | Home → **Graphic Design** card | Primary service icon |
| `Print-Procurement-Icon-Home.png` | Home → **Print Procurement** card | Primary service icon |
| `Strategy-Design-Icon.png` | Graphic Design → **Strategic, Not Just Aesthetic** benefit | Benefit-card icon |
| `Large-Format-Printing-Icon.png` | Graphic Design → **Print-Ready Production** benefit | Benefit-card icon |
| `Branding-Icon.png` | Graphic Design → **Consistent Brand Voice** benefit | Benefit-card icon |

## Brand color approach

The requested visual restoration must preserve the accessibility fixes already deployed. The original lime green and yellow have contrast ratios of **2.26:1** and **1.66:1**, respectively, against white. They therefore should not be used for normal-sized text on white or as a white-text button background where WCAG AA contrast is required. The existing darker green (`#497c16`, 5.03:1) and dark yellow/gold variants (`#806700` / `#7a6100`, 5.44:1 / 5.94:1) remain suitable for those text contexts.[1]

> **Implementation rule:** Restore the exact original green and yellow in appearance-focused contexts; retain accessible dark variants in text and interactive-control contexts. This restores the intended brand character without reopening the serious contrast findings fixed in v1.2.0.

| UI context | Planned color treatment |
|---|---|
| Service-icon artwork, decorative rules, icon containers, non-text borders, pale background tints, data-visual accents | Original `#7dbe31` and `#efc509` |
| Large headings on the dark hero | Original green/yellow only after verifying rendered contrast against the actual dark background |
| Body text, link text, eyebrow text, stat labels, and any normal-sized text on light surfaces | Existing accessible darker green/yellow variants |
| Buttons with white text | Existing accessible dark-green action token, not original lime green |
| Focus rings | Retain the deployed high-contrast blue focus indication |

## All-client-logo gallery design

The current implementation already reads approved published logo media through the site’s gallery source. The recommended improvement is a **static responsive grid** with a keyboard-operable “Show all client logos” disclosure control. It avoids motion, respects reduced-motion preferences by design, and prevents the Home page from downloading or visually presenting a large gallery before a visitor chooses it.

| Design element | Recommendation |
|---|---|
| Initial presentation | Show 12 published logos in a six-column desktop / three-column tablet / two-column mobile grid. |
| Remaining logos | Place further published logo items behind a native button or disclosure control labelled with the remaining count, for example, “Show 18 more client logos.” |
| Motion | No auto-scroll, carousel, marquee, or auto-advance behavior. |
| Accessibility | Preserve meaningful existing image alternatives; use clear button state, `aria-expanded`, and keyboard-visible focus. |
| Performance | Continue native lazy loading and prevent image-layout shift with a stable logo container size. |
| Empty/failure state | Omit the section if no approved published logo records are returned; do not fabricate company marks. |

## Implementation sequence

| Phase | Work | Output and completion condition |
|---|---|---|
| 1. Release control | Read `current.md`, `CHANGELOG.md`, and `CURRENT_CONTEXT.md`; create verified fresh source and database backups; create `feature/v1.4.0-aug28-brand-icons-logos-YYYYMMDD` from current `main`. | Checksummed source/Git bundle, verified database backup, and a clean feature branch. |
| 2. Asset integration | Add the five supplied images with stable semantic filenames under `client/public/images`; update Home and Graphic Design mappings according to the asset table. | New assets load without broken-image fallback; adjacent headings remain the accessible names. |
| 3. Color-token refinement | Centralize original and accessibility-safe brand tokens; audit Home green/yellow uses; restore exact visual hues only in the safe contexts above. | The original palette is visibly restored without lowering text/control contrast. |
| 4. Full-logo experience | Refactor the current static six-logo strip into the progressive all-logo gallery using existing approved published-logo records. | All approved logo items are reachable on demand, without automated movement. |
| 5. Regression and accessibility validation | Run type check, existing unit tests, production build, responsive rendered-page reviews, and axe-core WCAG A/AA scans on Home and Graphic Design. | No new automated WCAG violations; expected manual-review items documented. |
| 6. Release and Railway validation | Update `current.md` and `CHANGELOG.md`; commit v1.4.0; publish a feature branch and PR; merge only when clean; monitor Railway. | Railway reports success for the exact merged commit. |
| 7. Live evidence | Re-run live Home and Graphic Design tests, including logo disclosure keyboard behavior and asset responses; record the results in a v1.4.1 deployment-evidence branch. | Production record identifies merged commit, deployment status, results, and residual manual checks. |

## Acceptance tests

The following test set should run before release, with the marked live checks repeated after Railway deployment.

| Test | Environment | Expected result |
|---|---|---|
| Type check | Local | `pnpm check` passes. |
| Automated regression suite | Local | All existing tests pass; add coverage for new logo-gallery state logic if the component introduces it. |
| Production build | Local | `pnpm build` completes. |
| New asset response | Local and live | Each of the five icon URLs returns successfully with no visual clipping or unwanted background. |
| Home icon mapping | Local and live | Each Home service card shows the correct named August 28 icon. |
| Graphic Design icon mapping | Local and live | Strategy, Print-Ready, and Brand Voice cards use the specified new icons. |
| Color validation | Local and live | Original hues appear in safe visual contexts; all text/control contexts meet their intended contrast threshold. |
| Full-logo gallery behavior | Local and live | Every published logo can be reached; disclosure updates state; no auto-motion occurs. |
| Keyboard and focus | Local and live | Skip link, gallery disclosure, and all service links operate by keyboard with visible focus. |
| axe-core WCAG A/AA scan | Local and live | Home and Graphic Design introduce no automated WCAG A/AA violations. |

## Dependencies and decision points

No new external assets are required. The plan relies on existing approved published gallery/logo records, plus the five supplied icons. The one technical decision is the logo-gallery presentation: the recommended **progressive static grid** is the best balance of completeness, performance, and accessibility. If the approved logo collection is small enough to fit comfortably in one responsive grid, the disclosure control can be omitted after measuring the actual count.

The main implementation risk is using the original green or yellow in normal text or white-text controls. This will be controlled by keeping separate **brand-display** and **accessible-text/action** tokens rather than replacing all darker values globally.

## References

[1] [W3C, Understanding Success Criterion 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
