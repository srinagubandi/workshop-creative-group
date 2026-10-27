# v1.10.0 Post-deployment Validation — Railway Media Recovery and Footer Social Links

**Application feature branch:** `fix/v1.10.0-media-recovery-social-links-20261026`
**Application feature commit:** `099c7835a45a9ef27499e18e989140cdbf8de6e1`
**Pull request:** [#23](https://github.com/srinagubandi/workshop-creative-group/pull/23), merged
**Main merge commit:** `e97a76c9d94ed78c30509b85184582a884856c74`
**Railway deployment:** `19f1f685-0634-4b76-b610-5cbb23fff327`
**Production endpoint:** https://web-production-d7aa.up.railway.app/
**Deployment result:** `SUCCESS` at 2026-10-27T02:39:06Z

## Deployment and Recovery Result

The release deployed successfully from the exact v1.10.0 merge commit. The production Home route returned HTTP 200. The Railway Bucket recovery remains healthy after this application deployment: a complete production census found all 130 published managed media routes returned HTTP 200 with expected image or video content.

| Published category | Verified HTTP 200 routes |
|---|---:|
| Large Format | 45 |
| Graphic Design | 25 |
| Branding | 15 |
| Home client logos | 30 |
| Print Procurement | 15 |
| **Total** | **130** |

The visible live Home route loaded managed brand imagery and client-logo assets, including American Heart Association, STIHL, Radford, BUICK GMC, James Hardie, and Pellon. The original database-managed publication state, placement order, and alternative text continue to drive public delivery.

## Footer Social Navigation

The production footer exposes one navigation landmark named **Follow Workshop Creative Group**. It contains visible text links for the supplied Instagram profile and verified LinkedIn company page. Each deployed anchor uses the intended destination, `target="_blank"`, `rel="noopener noreferrer"`, and an accessible notice that it opens in a new tab.

A live keyboard-focus check reached the Instagram link successfully. It became the active element, matched `:focus-visible`, reported a solid outline, and reported a 24px minimum height.

## Live Accessibility Scan

The deployed Home route was scanned with axe-core using WCAG 2.0/2.1/2.2 A and AA tags.

| Result | Count |
|---|---:|
| Violations | 0 |
| Passed rules | 43 |
| Incomplete/manual-review rules | 1 |

The remaining incomplete rule is `color-contrast`, which axe-core identifies for manual review rather than an automated violation. This scope-specific technical evaluation is not a legal accessibility, ADA, or Section 508 certification or guarantee.

## Evidence and Release Decision

- `V110_LOCAL_VALIDATION.md` records the pre-merge type check, 38-test regression suite, production build, source/Dom checks, keyboard check, and local axe-core result.
- `V110_SOURCES.md` records the official Railway and social-link source ledger used for this release.
- Fresh source/Git-history backup and protected database backup `wscg-manual-backup-2026-10-27-02-32-08.sql` (255,508 bytes) were verified before application changes.

**Release decision: approved for the defined production scope.** The media delivery and footer social-navigation requirements are verified on the public Railway endpoint. Continue to treat accessibility as an ongoing engineering practice and retest after future changes to shared navigation, media delivery, footer layout, or color treatments.
