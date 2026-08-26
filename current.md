# Workshop Creative Group — Current Status

> **Canonical operational record.** Update this file and `CHANGELOG.md` in the same pull request for every repository, configuration, content, or deployment change. `CURRENT_CONTEXT.md` remains the detailed historical and architectural record.

## Release and Branch Status

| Field | Current value |
|---|---|
| Release candidate | `v1.3.0` — validated locally; pending publication and Railway deployment |
| Feature branch | `feature/v1.3.0-remaining-package-layouts-20260826` |
| Base commit | `1703b96554b03536034b99696a8fd42aec3e3104` |
| Source repository | [workshop-creative-group](https://github.com/srinagubandi/workshop-creative-group) |
| Railway project | [Workshop Creative Group project](https://railway.com/project/77805cde-a24c-4504-af80-ffed1863e74a) |
| Public Railway endpoint | [web-production-d7aa.up.railway.app](https://web-production-d7aa.up.railway.app/) |
| Publication and Railway deployment | Pending; no v1.3.0 production claim has been made |

## Fresh Pre-change Backup Record — August 26, 2026

| Backup | Result | Evidence |
|---|---|---|
| Source archive and Git-history bundle | Verified | Checksummed snapshot of `1703b96554b03536034b99696a8fd42aec3e3104` created before v1.3.0 implementation. |
| Railway database backup | Verified | Fresh manual backup `wscg-manual-backup-2026-08-26-20-34-56.sql` confirmed through the protected backup inventory; reported size: 248,102 bytes. |

No source, database credential, Railway token, GitHub token, or other secret is recorded in this repository.

## v1.3.0 Candidate Scope

The candidate completes the remaining August update-package requests using supplied assets and existing published portfolio media only. It adds a static Home-page client-logo section using six published logo assets, adds static selected-work visual panels to the Large Format and Graphic Design service pages, and adds a labeled Print Procurement visual panel using the supplied August 26 procurement icon.

The candidate also updates the Graphic Design benefit cards to use the approved service-icon set instead of emoji marks. Testimonials remain non-autoplay and user-controlled; long quotes now render as shorter previews by default with an accessible **Read full perspective** disclosure that preserves the complete approved quotation instead of rewriting customer statements without approved replacement copy.

The detailed package-completion matrix is recorded in `V130_PACKAGE_COMPLETION.md`. Local validation evidence is recorded in `V130_LOCAL_VALIDATION.md`.

## Candidate Validation Evidence

| Check | Result | Scope and limitation |
|---|---|---|
| Type check | Passed | `pnpm check` completed without errors. |
| Automated tests | Passed | `pnpm test` completed with **36 tests across 10 files passing**. |
| Production build | Passed | `pnpm build` completed and emitted the Railway build artifacts. |
| Home rendered review | Passed | The static published-logo grid rendered with no automatic movement. |
| Large Format rendered review | Passed | Three published large-format portfolio assets rendered in a static selected-work panel. |
| Graphic Design rendered review | Passed | Service icons replaced emoji marks, and three published design-work assets rendered in a static selected-work panel. |
| Print Procurement rendered review | Passed | The supplied procurement illustration rendered in a labeled static visual panel. |
| Local axe-core scans | Passed | Home, Large Format, Graphic Design, and Print Procurement each reported **0 WCAG 2.0/2.1/2.2 A/AA violations**. Color-contrast incomplete items remain manual-review items. |

## Required Post-deployment Checks

| Check | Purpose |
|---|---|
| Railway deployment health | Confirm Railway reports success for the merged v1.3.0 main commit. |
| Home route | Confirm the static logo section and testimonial disclosure controls render live. |
| Large Format route | Confirm the published large-format selected-work panel renders live. |
| Graphic Design route | Confirm service icons and selected design-work panel render live. |
| Print Procurement route | Confirm the supplied visual panel renders live. |
| Live axe-core scans | Run WCAG A/AA scans on the updated routes and record violations or manual-review items. |
| Keyboard check | Confirm skip-link and disclosure controls remain keyboard reachable. |
| Footer and policy links | Confirm Accessibility, Privacy Policy, and Terms links remain visible and reachable. |

## Ongoing Controls and Limitations

Accessibility is an ongoing engineering and content practice, not a one-time legal certification. Re-run the validation suite whenever navigation, forms, colors, third-party embeds, policy language, content templates, or client-side behavior change. Monitor the accessibility-support channel and respond to reported barriers promptly.

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
