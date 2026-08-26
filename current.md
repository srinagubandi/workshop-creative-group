# Workshop Creative Group — Current Status

> **Canonical operational record.** Update this file and `CHANGELOG.md` in the same pull request for every repository, configuration, content, or deployment change. `CURRENT_CONTEXT.md` remains the detailed historical and architectural record.

## Release and Branch Status

| Field | Current value |
|---|---|
| Release candidate | `v1.2.0` — validated locally; pending publication and Railway deployment |
| Feature branch | `feature/v1.2.0-accessibility-content-20260826` |
| Base commit | `a386325d74a5f31462747736ca41975a072a0c72` |
| Source repository | [workshop-creative-group](https://github.com/srinagubandi/workshop-creative-group) |
| Railway project | [Workshop Creative Group project](https://railway.com/project/77805cde-a24c-4504-af80-ffed1863e74a) |
| Public Railway endpoint | [web-production-d7aa.up.railway.app](https://web-production-d7aa.up.railway.app/) |
| Publication and Railway deployment | Pending; no v1.2.0 production claim has been made |

## Fresh Pre-change Backup Record — August 26, 2026

| Backup | Result | Evidence |
|---|---|---|
| Source archive and Git-history bundle | Verified | Checksummed snapshot of `a386325d74a5f31462747736ca41975a072a0c72` created before v1.2.0 implementation. |
| Railway database backup | Verified | Fresh manual backup `wscg-manual-backup-2026-08-26-20-03-53.sql` confirmed through the protected backup inventory; reported size: 247,656 bytes. |

No source, database credential, Railway token, GitHub token, or other secret is recorded in this repository.

## v1.2.0 Candidate Scope

The candidate replaces the Home-page **Print Procurement** service-card icon with the asset supplied in the August 26 package. It improves footer emphasis while preserving explicit high-contrast footer copy colors, and it updates the public Accessibility Statement to describe the WCAG 2.2 AA target, ongoing review practices, and the accessibility-support path without claiming guaranteed conformance or legal certification.

It remediates the serious color-contrast violations found during the live post-deployment audit. Primary actions now use an accessible dark-green action treatment; pale helper text, promotional supporting text, value-card descriptions, yellow statistics, and print-procurement links were adjusted for the relevant backgrounds. The Contact and Request Quote optional/helper text follows the same readable treatment. The quote invoice field also uses a separate programmatic name and hint to avoid the prior multiple-label manual-review item.

The detailed supplied-package assessment and non-implemented requests are recorded in `V120_UPDATE_ASSESSMENT.md`.

## Candidate Validation Evidence

| Check | Result | Scope and limitation |
|---|---|---|
| Type check | Passed | `pnpm check` completed without errors. |
| Automated tests | Passed | `pnpm test` completed with **36 tests across 10 files passing**. |
| Production build | Passed | `pnpm build` completed and emitted the Railway build artifacts. |
| Local axe-core — Home | Passed | WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations** after residual contrast remediation. |
| Local axe-core — Accessibility Statement | Passed | Revised statement rendered with **0 violations**. |
| Local axe-core — Request Quote | Passed | Form rendered with **0 violations** after the invoice-field naming change. |
| Automated-review limitation | Documented | Axe reported color-contrast `incomplete` results that require visual/manual review; automated testing cannot establish complete accessibility or legal compliance. |

## Required Post-deployment 10-test Suite

1. Confirm Railway marks the v1.2.0 web deployment healthy for the merged main commit.
2. Verify the Home page renders the supplied Print Procurement icon and updated action styles.
3. Confirm the Accessibility Statement renders the August 26 language and support controls.
4. Scan the Home page with axe-core using WCAG 2.0/2.1/2.2 A and AA tags.
5. Scan the Accessibility Statement with the same axe-core ruleset.
6. Scan the Request Quote workflow with the same axe-core ruleset without uploading or submitting data.
7. Scan the Contact form with the same axe-core ruleset without submitting data.
8. Verify keyboard skip-link operation and visible focus on a live public page.
9. Confirm public footer Accessibility, Privacy Policy, and Terms links render and remain reachable.
10. Check the live production endpoint and affected routes for successful rendered responses; record manual-review limits and unresolved findings.

## Ongoing Controls and Limitations

Accessibility is an ongoing engineering and content practice, not a one-time legal certification. Re-run the 10-test suite whenever navigation, forms, colors, third-party embeds, policy language, content templates, or client-side behavior change. Monitor the accessibility-support channel and respond to reported barriers promptly.

Before relying on the Privacy Policy or Terms and Conditions as final legal documents, have qualified counsel review their applicability to the business. Do not represent the site as legally guaranteed compliant or immune from claims. A real small-screen device/browser pass and a Dockerfile build in a Docker-capable environment remain recommended.

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
