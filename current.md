# Workshop Creative Group — Current Status

> **Canonical operational record.** Update this file and `CHANGELOG.md` in the same pull request for every repository, configuration, content, or deployment change. `CURRENT_CONTEXT.md` remains the detailed historical and architectural record.

## Release and Branch Status

| Field | Current value |
|---|---|
| Application release | `v1.3.0` — deployed and verified |
| Application feature branch | `feature/v1.3.0-remaining-package-layouts-20260826` |
| Application feature commit | `8197b4a7b7e3e162810d10da873be9579b71044d` |
| Pull request | [#6](https://github.com/srinagubandi/workshop-creative-group/pull/6), merged |
| Application merge commit | `cfa49cb80e85e54ef34c46df1d78e437f8892790` |
| Latest verified application deployment | Railway GitHub status reported **success** for merge commit `cfa49cb80e85e54ef34c46df1d78e437f8892790` |
| Deployment-evidence record | `v1.3.1` — this branch records verified v1.3.0 production evidence |
| Source repository | [workshop-creative-group](https://github.com/srinagubandi/workshop-creative-group) |
| Railway project | [Workshop Creative Group project](https://railway.com/project/77805cde-a24c-4504-af80-ffed1863e74a) |
| Public Railway endpoint | [web-production-d7aa.up.railway.app](https://web-production-d7aa.up.railway.app/) |

## Fresh Pre-change Backup Record — August 26, 2026

| Backup | Result | Evidence |
|---|---|---|
| Source archive and Git-history bundle | Verified | Checksummed snapshot of `1703b96554b03536034b99696a8fd42aec3e3104` created before v1.3.0 implementation. |
| Railway database backup | Verified | Fresh manual backup `wscg-manual-backup-2026-08-26-20-34-56.sql` confirmed through the protected backup inventory; reported size: 248,102 bytes. |

No source, database credential, Railway token, GitHub token, or other secret is recorded in this repository.

## v1.3.0 Deployed Scope

The deployed release completes the remaining August update-package requests using supplied assets and existing published Workshop Creative Group portfolio media only. It adds a static Home-page client-logo grid using six published logo assets, adds static selected-work panels to the Large Format and Graphic Design service pages, and adds a labeled Print Procurement visual panel using the supplied August 26 procurement icon.

The Graphic Design benefit cards now use the approved service-icon set instead of emoji marks. Testimonials remain non-autoplay and user-controlled. Long quotations show shorter previews by default with an accessible **Read full perspective** disclosure that preserves the complete approved quotation rather than rewriting customer statements without approved replacement copy.

The package-completion matrix is recorded in `V130_PACKAGE_COMPLETION.md`. The local and production validation records are `V130_LOCAL_VALIDATION.md` and `V130_POSTDEPLOY_VALIDATION.md`.

## Validation and Production Evidence

| Check | Result | Scope and limitation |
|---|---|---|
| Type check | Passed | `pnpm check` completed without errors. |
| Automated tests | Passed | `pnpm test` completed with **36 tests across 10 files passing**. |
| Production build | Passed | `pnpm build` completed and emitted the Railway build artifacts. |
| Local rendered and axe-core reviews | Passed | Home, Large Format, Graphic Design, and Print Procurement rendered correctly; each WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations**. |
| Railway deployment health | Passed | Railway’s GitHub deployment status reported **success** for the v1.3.0 merge commit. |
| Live Home package checks | Passed | Six static published logo assets and user-controlled testimonial previews rendered. The Home axe-core scan reported **0 violations**, 9 color-contrast manual-review items, and 28 passed rules. |
| Live Large Format package check | Passed | Three published Large Format portfolio assets rendered in the selected-work panel. |
| Live Graphic Design package checks | Passed | Corrected service icons and three published design-work assets rendered. The axe-core scan reported **0 violations**, 5 color-contrast manual-review items, and 23 passed rules. |
| Live Print Procurement package checks | Passed | The supplied illustration rendered in the labeled static visual panel. The axe-core scan reported **0 violations**, 5 color-contrast manual-review items, and 22 passed rules. |
| Live keyboard skip link | Passed | On the Home page, the first Tab visibly focused the **Skip to main content** link. |

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
