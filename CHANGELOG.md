# Changelog

All notable changes to this project are recorded in this file. The project follows a versioned, branch-first workflow. A release is not considered deployed until its Git branch is published, the change is approved, and the corresponding Railway deployment has been verified.

## [1.0.1] — 2026-08-25

### Added

- Added `current.md` as the canonical concise operational-status record for every future change.
- Established a documented branch convention: `type/vX.Y.Z-short-description`.
- Established mandatory local validation, Git review, Railway verification, and rollback-recording gates for production work.

### Changed

- Designated `CURRENT_CONTEXT.md` as the detailed historical and architectural record, with `current.md` serving as the current-state summary.
- Recorded the required Railway application-variable names and the current verification boundaries without disclosing configuration values.

### Verified

- `pnpm run check` completed successfully.
- `pnpm run test` completed successfully with **36 tests across 10 files passing**.
- `pnpm run build` completed successfully.
- Public Railway smoke testing returned HTTP 200 for Home, About, Large Format Printing, Graphic Design, Print Procurement, Request a Quote, Contact, and Blog. Gallery redirected from `/gallery` to `/gallery/`, which returned HTTP 200.

### Pending

- Publish `chore/v1.0.1-change-control-20260825` to GitHub and open the reviewable pull request.
- Inspect the private Railway project dashboard, environment, deployment history, logs, and variable mappings using an authenticated session.
- Run the Dockerfile build in an environment with Docker available; the local environment lacks a Docker CLI, though the equivalent locked dependency install and production build passed.
- Create an explicit deployment record only after the branch is approved and deployed to Railway.

[1.0.1]: https://github.com/srinagubandi/workshop-creative-group/compare/8885b5c...HEAD
