# v1.3.0 Post-deployment Validation

| Check | Result | Evidence |
|---|---|---|
| Railway deployment health | Passed | GitHub’s Railway deployment status for merge commit `cfa49cb80e85e54ef34c46df1d78e437f8892790` reported **success** with the message `Success - www.workshopcreativegroup.com`. |

All browser checks below are non-destructive. No production forms are submitted and no files are uploaded.
| Home package updates | Passed | The live site displayed six published logo assets in a static grid. Long testimonials rendered shorter previews with visible, keyboard-reachable “Read full perspective” controls; the testimonial rail does not auto-advance. |
| Live Home axe-core scan | Passed | WCAG 2.0/2.1/2.2 A/AA scan reported 0 violations, 9 color-contrast manual-review items, and 28 passed rules. |
| Large Format package update | Passed | The live selected-work panel rendered three published Large Format portfolio assets with descriptive labels. |
| Graphic Design package update | Passed | The live page displayed the corrected service icons in the benefit cards and three static published design-work assets. |
| Live Graphic Design axe-core scan | Passed | WCAG 2.0/2.1/2.2 A/AA scan reported 0 violations, 5 color-contrast manual-review items, and 23 passed rules. |
| Print Procurement package update | Passed | The live page rendered the supplied Print Procurement illustration in the labeled static visual panel. |
| Live Print Procurement axe-core scan | Passed | WCAG 2.0/2.1/2.2 A/AA scan reported 0 violations, 5 color-contrast manual-review items, and 22 passed rules. |
| Live keyboard skip link | Passed | On the Home page, the first Tab visibly focused the Skip to main content link. |
