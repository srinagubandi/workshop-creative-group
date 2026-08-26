# Workshop Creative Group — Current Status

> **Canonical operational record.** Update this file and `CHANGELOG.md` in the same pull request for every repository, configuration, content, or deployment change. `CURRENT_CONTEXT.md` remains the detailed historical and architectural record.

## Release and Branch Status

| Field | Current value |
|---|---|
| Application release | `v1.2.0` — deployed and verified |
| Application feature branch | `feature/v1.2.0-accessibility-content-20260826` |
| Application feature commit | `1b71259fb57f20c8f4f204b8fa2800f4eeea8d30` |
| Pull request | [#4](https://github.com/srinagubandi/workshop-creative-group/pull/4), merged |
| Application merge commit | `a7e3ee7e5a3c79999d2c3928a72178c1048c93c2` |
| Latest verified application deployment | Railway GitHub status reported **success** for merge commit `a7e3ee7e5a3c79999d2c3928a72178c1048c93c2` |
| Deployment-evidence record | `v1.2.1` — this branch records the verified v1.2.0 production evidence |
| Source repository | [workshop-creative-group](https://github.com/srinagubandi/workshop-creative-group) |
| Railway project | [Workshop Creative Group project](https://railway.com/project/77805cde-a24c-4504-af80-ffed1863e74a) |
| Public Railway endpoint | [web-production-d7aa.up.railway.app](https://web-production-d7aa.up.railway.app/) |

## Fresh Pre-change Backup Record — August 26, 2026

| Backup | Result | Evidence |
|---|---|---|
| Source archive and Git-history bundle | Verified | Checksummed snapshot of `a386325d74a5f31462747736ca41975a072a0c72` created before v1.2.0 implementation. |
| Railway database backup | Verified | Fresh manual backup `wscg-manual-backup-2026-08-26-20-03-53.sql` confirmed through the protected backup inventory; reported size: 247,656 bytes. |

No source, database credential, Railway token, GitHub token, or other secret is recorded in this repository.

## v1.2.0 Deployed Scope

The deployed release replaces the Home-page **Print Procurement** service-card icon with the asset supplied in the August 26 package. It improves footer emphasis while preserving explicit high-contrast footer copy colors and updates the public Accessibility Statement to describe the WCAG 2.2 AA target, ongoing review practices, and the accessibility-support path without claiming guaranteed conformance or legal certification.

It remediates the serious color-contrast violations found during the earlier live audit. Primary actions now use an accessible dark-green action treatment; pale helper text, promotional supporting text, value-card descriptions, yellow statistics, and Print Procurement links were adjusted for their rendered backgrounds. The Contact and Request Quote optional/helper text follows the same readable treatment. The quote invoice field also uses a separate programmatic name and hint to avoid the prior multiple-label manual-review item.

The detailed supplied-package assessment and non-implemented requests are in `V120_UPDATE_ASSESSMENT.md`. The 10-test production record is in `V120_POSTDEPLOY_VALIDATION.md`.

## Validation and Production Evidence

| Check | Result | Scope and limitation |
|---|---|---|
| Type check | Passed | `pnpm check` completed without errors. |
| Automated tests | Passed | `pnpm test` completed with **36 tests across 10 files passing**. |
| Production build | Passed | `pnpm build` completed and emitted the Railway build artifacts. |
| Local axe-core — Home, Accessibility, Request Quote | Passed | Each WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations** after remediation. |
| Railway deployment health | Passed | Railway’s GitHub deployment status progressed from pending to **success** for the v1.2.0 merge commit. |
| Live axe-core — Home | Passed | **0 violations**, 1 color-contrast manual-review item, 28 passed rule results. |
| Live axe-core — Accessibility Statement | Passed | **0 violations**, 1 color-contrast manual-review item, 22 passed rule results. |
| Live axe-core — Request Quote | Passed | **0 violations**, 1 color-contrast manual-review item, 26 passed rule results; no file was uploaded or form submitted. |
| Live axe-core — Contact | Passed | **0 violations**, 1 color-contrast manual-review item, 25 passed rule results; the form was not submitted. |
| Live keyboard navigation | Passed | On `/contact`, the first Tab revealed the skip link and Enter moved to `#main-content`. |
| Live footer policy links | Passed | Accessibility, Privacy Policy, and Terms links were visible and reachable. |
| Live route smoke test | Passed with transfer note | Updated public routes returned HTTP 200. The supplied icon endpoint returned HTTP 200, but the sandbox’s capped 10-second full-file transfer did not finish; monitor asset-transfer speed separately. |

## Ongoing Controls and Limitations

Accessibility is an ongoing engineering and content practice, not a one-time legal certification. Re-run the 10-test suite whenever navigation, forms, colors, third-party embeds, policy language, content templates, or client-side behavior change. Monitor the accessibility-support channel and respond to reported barriers promptly.

Automated testing cannot identify every barrier. The reported axe-core color-contrast `incomplete` items require visual/manual review and are not axe violations. A real small-screen device/browser pass, assistive-technology testing with intended user groups, and a Dockerfile build in a Docker-capable environment remain recommended.

Before relying on the Privacy Policy or Terms and Conditions as final legal documents, have qualified counsel review their applicability to the business. Do not represent the site as legally guaranteed compliant or immune from claims.

## Required Update Sequence for Future Work

1. Read `current.md`, `CHANGELOG.md`, and the relevant section of `CURRENT_CONTEXT.md`.
2. Create a new branch from the approved base using `type/vX.Y.Z-short-description`.
3. Create and verify fresh source and database backups before material production changes.
4. Record the proposed version, scope, risk, and validation plan in `current.md` before material changes.
5. Implement the change without committing secrets or Railway configuration values.
6. Update `CHANGELOG.md`, run the required local validation, and record exact results in `current.md`.
7. Review the diff, commit on the feature branch, publish the branch, and open a pull request.
8. After approval, deploy the identified commit to Railway and verify the service health, affected workflows, and rollback reference.
9. Finalize `current.md` with production evidence and mark the release in `CHANGELOG.md`.

## References

[1] [W3C, Understanding SC 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

[2] [Repository Railway configuration](https://github.com/srinagubandi/workshop-creative-group/blob/main/railway.json)
