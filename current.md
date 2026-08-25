# Workshop Creative Group — Current Status

> **Canonical operational record.** Update this file and `CHANGELOG.md` in the same pull request for every repository, configuration, content, or deployment change. `CURRENT_CONTEXT.md` remains the detailed historical and architectural record.

## Release and Branch Status

| Field | Current value |
|---|---|
| Change-set version | `v1.0.1` |
| Status | Local change-control baseline created; not yet published or deployed |
| Working branch | `chore/v1.0.1-change-control-20260825` |
| Base branch and commit | `main` at `8885b5c` |
| Source repository | [workshop-creative-group](https://github.com/srinagubandi/workshop-creative-group) |
| Railway project | [Workshop Creative Group project](https://railway.com/project/77805cde-a24c-4504-af80-ffed1863e74a) |
| Public Railway endpoint | [web-production-d7aa.up.railway.app](https://web-production-d7aa.up.railway.app/) |

## Standing Change-Control Policy

Every proposed change must begin on a new, purpose-specific branch. Use the naming convention `type/vX.Y.Z-short-description`, where `type` is appropriate to the work, such as `feature`, `fix`, `chore`, `docs`, or `release`. The version must be incremented in `package.json` for release-bearing application changes and recorded in `CHANGELOG.md`; documentation-only work may use a documented release-candidate version when no published package release is intended.

Before opening a pull request, update this file with the current branch, base commit, deployment impact, validation results, and any known limitations. Update `CHANGELOG.md` with a concise, user-visible description of what changed. Never record secrets, private keys, Railway variable values, customer data, or administrative credentials in either file.

The branch must remain isolated until the local checks pass, the diff has been reviewed, and the intended Railway deployment has been validated. Merging and production deployment require explicit approval. After deployment, replace any pending statements in this file with the Railway deployment ID, deployment time, verified URLs, smoke-test outcome, and rollback reference.

## Deployment Contract

The repository declares a Dockerfile-based Railway build. Railway runs `node dist/index.js` and checks the root path (`/`) with a 60-second timeout. The application requires the standard production environment and database values as well as the private Railway Bucket mappings used by storage operations. The required bucket-facing application variables are `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`, `AWS_ENDPOINT_URL`, and `AWS_S3_BUCKET_NAME`. Values must be configured in Railway only and must never be committed.[1] [2]

| Deployment gate | Required evidence |
|---|---|
| Build | `pnpm install --frozen-lockfile` and `pnpm run build` complete successfully. |
| Code quality | `pnpm run check` completes successfully. |
| Automated testing | `pnpm run test` completes successfully. |
| Git integrity | `git diff --check` is clean and the change is committed on the versioned branch. |
| Railway readiness | Correct service, environment, Git commit, variables, and health-check settings are confirmed in Railway. |
| Live verification | Deployment reaches a healthy state; `/` and affected public/protected flows are tested without exposing credentials. |
| Rollback readiness | The preceding deployable commit and Railway deployment are identified before release. |

## Latest Verification — 2026-08-25 EDT

| Check | Result | Scope and limitation |
|---|---|---|
| Repository baseline | Passed | Local clone was clean on `main` at `8885b5c` before this governance branch was created. |
| Type check | Passed | `pnpm run check` completed without reported errors. |
| Automated tests | Passed | `pnpm run test` completed with **36 tests across 10 files passing**. |
| Production build | Passed | `pnpm run build` produced the application bundle and `dist/index.js`. |
| Exact Docker build | Pending | The local environment does not have a Docker CLI, so the Railway Dockerfile could not be exercised directly here. The equivalent locked pnpm install and production build passed. |
| Public Railway public-route smoke test | Passed | Home, About, Large Format Printing, Graphic Design, Print Procurement, Request a Quote, Contact, and Blog returned HTTP 200. Gallery redirected from `/gallery` to `/gallery/`, which then returned HTTP 200. |
| Railway dashboard inspection | Pending | The supplied Railway project URL did not expose project details in the available session. Deployment history, service variables, logs, and environment selection remain unverified. |
| GitHub publication | Pending | This branch is local because authenticated GitHub write access was not granted in the available session. |

## Current Operational Risks and Follow-up

The primary public routes are reachable, and the local build/test contract is satisfied; however, these facts alone do not prove that the currently selected Railway environment has the required database and Railway Bucket variables or that the latest branch has been deployed. Before any production change is approved, inspect the Railway web service and verify its selected environment, source commit, deployment status, deployment logs, health check, `DATABASE_URL`, `JWT_SECRET`, `ADMIN_PASSWORD`, and the five bucket-variable mappings by name only. Do not reveal any values.

The server currently selects an alternative port if the configured `PORT` is occupied. Railway normally expects the process to bind to its injected port, so this fallback should be reviewed during the next deployment-hardening change; it is not a confirmed production failure.

## Required Update Sequence for Future Work

1. Read `current.md`, `CHANGELOG.md`, and any relevant section of `CURRENT_CONTEXT.md`.
2. Create a new branch from the approved base using `type/vX.Y.Z-short-description`.
3. Record the proposed version, scope, risk, and validation plan in `current.md` before making material changes.
4. Implement the change without committing secrets or Railway configuration values.
5. Update `CHANGELOG.md`, run the required local validation, and record exact results in `current.md`.
6. Review the diff, commit on the feature branch, publish the branch, and open a pull request.
7. After explicit approval, deploy the identified commit to Railway and verify the service health, affected workflows, and rollback reference.
8. Finalize `current.md` with production evidence and mark the release in `CHANGELOG.md`.

## References

[1] [Repository Railway configuration](https://github.com/srinagubandi/workshop-creative-group/blob/main/railway.json)

[2] [Repository storage adapter](https://github.com/srinagubandi/workshop-creative-group/blob/main/server/storage.ts)
