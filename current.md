# Workshop Creative Group — Current Status

> **Canonical operational record.** Update this file and `CHANGELOG.md` in the same pull request for every repository, configuration, content, or deployment change. `CURRENT_CONTEXT.md` remains the detailed historical and architectural record.

## Release and Branch Status

| Field | Current value |
|---|---|
| Change-set version | `v1.1.0` |
| Status | Local release candidate validated; **not yet published or deployed** |
| Working branch | `feature/v1.1.0-accessibility-policy-20260825` |
| Base branch and commit | `main` at `8885b5c` |
| Current pre-commit HEAD | `5267f13` (`v1.0.1` governance baseline) |
| Source repository | [workshop-creative-group](https://github.com/srinagubandi/workshop-creative-group) |
| Railway project | [Workshop Creative Group project](https://railway.com/project/77805cde-a24c-4504-af80-ffed1863e74a) |
| Public Railway endpoint | [web-production-d7aa.up.railway.app](https://web-production-d7aa.up.railway.app/) |

## Pre-change Backup Record

| Backup | Result | Notes |
|---|---|---|
| Source archive and Git-history bundle | Verified | Created before implementation and checksummed in the local pre-change backup manifest. |
| Railway database backup | Verified | A fresh manual backup was created and then confirmed through the existing protected backup workflow before website modifications began. |

No source, database credential, Railway token, or other secret is recorded in this repository.

## v1.1.0 Scope

This release applies the supplied August 22 web changes and accessibility risk-reduction work. It changes the primary browser title to **Commercial Printing & Graphic Design**, uses the supplied service icons on the home page, presents testimonials in a non-autoplay horizontal layout with more restrained text sizing, and improves footer readability with high-contrast links and brand-yellow section headings.

The release adds public **Accessibility Statement**, **Privacy Policy**, and **Terms and Conditions** pages; links all three from the global footer; and adds a monitored accessibility-support email and contact path. The policy pages are site-specific working drafts and require qualified legal review before production reliance.

The release also adds a keyboard skip link, stronger visible focus treatment, reduced-motion handling, browser-zoom-safe viewport metadata, corrected mobile-navigation disclosure semantics, and accessibility remediation for the Contact and Request Quote forms. The supplied service icons are included in the public asset directory.

## Validation Evidence — 2026-08-25 EDT

| Check | Result | Scope and limitation |
|---|---|---|
| Type check | Passed | Final `pnpm check` completed without errors. |
| Automated tests | Passed | Final `pnpm test` completed with **36 tests across 10 files passing**. |
| Production build | Passed | Final `pnpm build` completed and emitted `dist/index.js`. |
| 20-pass accessibility review | Passed with remediation | Three issues found and fixed: native required semantics, footer target size, and hidden mobile-drawer ARIA reference. See `ACCESSIBILITY_VALIDATION.md`. |
| 10-test validation suite | Passed with documented limitation | Application, rendered DOM, form errors, keyboard skip navigation, focus, reduced motion, ARIA references, and route/asset checks passed. Small-screen hardware/browser testing remains recommended. |
| Local updated-route smoke test | Passed | `/`, `/accessibility`, `/privacy`, `/terms`, `/contact`, and `/request-quote` and all three supplied icon assets returned HTTP 200 from the production build preview. |
| Exact Docker build | Pending | Docker CLI is unavailable locally, so the Railway Dockerfile cannot be exercised in this environment. The locked dependency install, type check, automated tests, and production build passed. |
| GitHub publication | Pending | The versioned branch has not yet been published because authenticated GitHub write access is not available in this session. |
| Railway deployment | Pending | Local code cannot reach production until the versioned branch is published and Railway deploys that commit. |
| Railway rendered-route baseline | Recorded | The existing production endpoint returned a client-side 404 view for `/accessibility`; a post-deployment **rendered-content** check is required, not merely an HTTP-status check. |

## Deployment Contract

The repository declares a Dockerfile-based Railway build. Railway runs `node dist/index.js` and checks the root path (`/`) with a 60-second timeout. The application requires the standard production environment and database values as well as the private Railway Bucket mappings used by storage operations. The required bucket-facing application variables are `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`, `AWS_ENDPOINT_URL`, and `AWS_S3_BUCKET_NAME`. Values must be configured in Railway only and must never be committed.[1] [2]

| Deployment gate | Required evidence |
|---|---|
| Git publication | Publish this exact versioned branch and record the new commit SHA. |
| Build | Railway build completes from the versioned commit. |
| Health | Railway reports the web deployment healthy. |
| Rendered routes | `/`, `/accessibility`, `/privacy`, `/terms`, `/contact`, and `/request-quote` render their intended content, not an application 404 view. |
| Functional paths | Keyboard skip navigation, the Contact form, and the Request Quote form are checked without transmitting test data. |
| Rollback readiness | Identify the preceding deployment and preserve the confirmed pre-change source and database backups. |

## Ongoing Controls and Limitations

Accessibility is an ongoing engineering and content practice, not a one-time legal certification. Re-run the 20-pass review and 10-test suite whenever navigation, forms, colors, third-party embeds, policy language, content templates, or client-side behavior change. Monitor the accessibility-support channel and respond to reported barriers promptly.

Before publishing, have qualified counsel review the Privacy Policy, Terms and Conditions, and any obligations applicable to the business. Do not represent the site as legally guaranteed compliant or immune from claims.

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
