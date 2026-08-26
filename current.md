# Workshop Creative Group — Current Status

> **Canonical operational record.** Update this file and `CHANGELOG.md` in the same pull request for every repository, configuration, content, or deployment change. `CURRENT_CONTEXT.md` remains the detailed historical and architectural record.

## Release and Branch Status

| Field | Current value |
|---|---|
| Application release | `v1.1.0` — deployed and verified |
| Documentation record | `v1.1.1` — deployment evidence update in progress |
| Application feature branch | `feature/v1.1.0-accessibility-policy-20260825` |
| Application feature commit | `4b26c2b29a382c3d8213ecd975fae00b828f78dc` |
| Pull request | [#1](https://github.com/srinagubandi/workshop-creative-group/pull/1), merged |
| Merged main commit | `04f38e4d80a62d4aa5ea54958cc6dd07eacaa025` |
| Current documentation branch | `docs/v1.1.1-deployment-evidence-20260826` |
| Railway web deployment | `6b3adfb2-173a-48f7-aba8-f63042d94829` — `SUCCESS` |
| Source repository | [workshop-creative-group](https://github.com/srinagubandi/workshop-creative-group) |
| Railway project | [Workshop Creative Group project](https://railway.com/project/77805cde-a24c-4504-af80-ffed1863e74a) |
| Public Railway endpoint | [web-production-d7aa.up.railway.app](https://web-production-d7aa.up.railway.app/) |

## Pre-change Backup Record

| Backup | Result | Notes |
|---|---|---|
| Source archive and Git-history bundle | Verified | Created before implementation and checksummed in the local pre-change backup manifest. |
| Railway database backup | Verified | A fresh manual backup was created and confirmed through the existing protected backup workflow before website modifications began. |

No source, database credential, Railway token, GitHub token, or other secret is recorded in this repository.

## v1.1.0 Scope

The deployed release applies the supplied August 22 web changes and accessibility risk-reduction work. It changes the primary browser title to **Commercial Printing & Graphic Design**, uses the supplied service icons on the home page, presents testimonials in a non-autoplay horizontal layout with more restrained text sizing, and improves footer readability with high-contrast links and brand-yellow section headings.

The release adds public **Accessibility Statement**, **Privacy Policy**, and **Terms and Conditions** pages; links all three from the global footer; and adds an accessibility-support email and Contact-form path. The policy pages are site-specific working drafts and require qualified legal review before production reliance.

The release also adds a keyboard skip link, stronger visible focus treatment, reduced-motion handling, browser-zoom-safe viewport metadata, corrected mobile-navigation disclosure semantics, and accessibility remediation for the Contact and Request Quote forms. The supplied service icons are included in the public asset directory.

## Validation and Deployment Evidence — 2026-08-26 EDT

| Check | Result | Scope and limitation |
|---|---|---|
| Type check | Passed | Final `pnpm check` completed without errors. |
| Automated tests | Passed | Final `pnpm test` completed with **36 tests across 10 files passing**. |
| Production build | Passed | Final `pnpm build` completed and emitted `dist/index.js`. |
| 20-pass accessibility review | Passed with remediation | Three issues found and fixed: native required semantics, footer target size, and hidden mobile-drawer ARIA reference. See `ACCESSIBILITY_VALIDATION.md`. |
| 10-test validation suite | Passed with documented limitation | Application, rendered DOM, form errors, keyboard skip navigation, focus, reduced motion, ARIA references, and route/asset checks passed. Small-screen hardware/browser testing remains recommended. |
| GitHub publication and review | Passed | Feature branch published and [pull request #1](https://github.com/srinagubandi/workshop-creative-group/pull/1) merged cleanly. |
| Railway build and health | Passed | Railway web deployment `6b3adfb2-173a-48f7-aba8-f63042d94829` reported `SUCCESS` for merged main commit `04f38e4d80a62d4aa5ea54958cc6dd07eacaa025`. |
| Live rendered routes | Passed | `/accessibility`, `/privacy`, `/terms`, `/contact`, and `/request-quote` each rendered the intended production content and footer policy links. See `RAILWAY_DEPLOYMENT_VERIFICATION.md`. |
| Live keyboard check | Passed | On `/request-quote`, the first Tab revealed the skip link; activation focused `#main-content` with a 96px fixed-header-safe scroll margin. No data was submitted. |
| Exact Docker build | Pending | Docker CLI is unavailable locally, so the Railway Dockerfile has not been exercised in this environment. The locked dependency install, type check, automated tests, production build, and live Railway rollout passed. |

## Ongoing Controls and Limitations

Accessibility is an ongoing engineering and content practice, not a one-time legal certification. Re-run the 20-pass review and 10-test suite whenever navigation, forms, colors, third-party embeds, policy language, content templates, or client-side behavior change. Monitor the accessibility-support channel and respond to reported barriers promptly.

Before relying on the Privacy Policy or Terms and Conditions as final legal documents, have qualified counsel review their applicability to the business. Do not represent the site as legally guaranteed compliant or immune from claims. A real small-screen device/browser pass remains recommended, and the Dockerfile should be tested in a Docker-capable environment when practical.

## Required Update Sequence for Future Work

1. Read `current.md`, `CHANGELOG.md`, and the relevant section of `CURRENT_CONTEXT.md`.
2. Create a new branch from the approved base using `type/vX.Y.Z-short-description`.
3. Record the proposed version, scope, risk, and validation plan in `current.md` before material changes.
4. Implement the change without committing secrets or Railway configuration values.
5. Update `CHANGELOG.md`, run the required local validation, and record exact results in `current.md`.
6. Review the diff, commit on the feature branch, publish the branch, and open a pull request.
7. After explicit approval, deploy the identified commit to Railway and verify the service health, affected workflows, and rollback reference.
8. Finalize `current.md` with production evidence and mark the release in `CHANGELOG.md`.

## References

[1] [Repository Railway configuration](https://github.com/srinagubandi/workshop-creative-group/blob/main/railway.json)

[2] [Repository storage adapter](https://github.com/srinagubandi/workshop-creative-group/blob/main/server/storage.ts)
