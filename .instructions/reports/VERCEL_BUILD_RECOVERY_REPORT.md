# Vercel Build Recovery Report

Date: 2026-05-27

## Original Error Summary

Vercel executed `pnpm run build` for the Vite SPA and failed with `No such file or directory (os error 2)`. The provided log showed the resolved Vite configuration but did not include the missing path.

## Root Cause

The build imported `@axodus/business-runtime` from `src/modules/business/services/businessRuntimeClient.js`.

Before this sprint, Vite and TypeScript resolved that alias to `../Business/src/index.ts`, outside the AxodusAPP repository root. This works in the local WSL workspace when the sibling `Business` directory exists, but fails in an isolated Vercel-style checkout where only AxodusAPP is available.

Exact missing path in the isolated reproduction:

```text
../Business/src/index.ts
```

Exact build failure reproduced locally:

```text
[UNLOADABLE_DEPENDENCY] Could not load ../Business/src/index.ts
No such file or directory (os error 2)
```

## Audit Result

- Checked 451 local import and CSS URL references under `src/`.
- No missing or case-mismatched local references were detected.
- Static assets referenced by the active Vite entry exist under `public/` and `src/assets/`.
- Legacy standalone HTML files under `public/` still contain old `@/styles/Global.css` references, but they are copied as static assets and are not part of the active SPA build graph.

## Files Changed

- `package.json`
- `vite.config.js`
- `tsconfig.json`
- `jsconfig.json`
- `src/modules/business/runtime/**`
- `.instructions/STATUS.md`
- `.instructions/TASKS.md`
- `.instructions/ROADMAP.md`
- `.instructions/reports/VERCEL_BUILD_RECOVERY_REPORT.md`

## Build Result Before

- `pnpm run build` from the full WSL workspace: passed because `../Business/src/index.ts` exists locally.
- Isolated AxodusAPP-only reproduction: failed with `Could not load ../Business/src/index.ts`.

## Build Result After

- `pnpm run typecheck`: passed.
- `pnpm run lint`: passed with one existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`.
- `pnpm run build`: passed.
- `pnpm run verify:deploy`: passed.
- Isolated AxodusAPP-only build from `/tmp/axodusapp-vercel-repro`: passed without `../Business`.
- `pnpm dev` smoke returned HTTP 200 for `/`, `/dashboard`, `/governance`, `/governance/console`, `/defi`, `/academy`, `/marketplace`, `/mining`, `/dex`, `/lottery`, `/mcps`, `/connect`, and `/settings`.

## Deployment Safety Decision

Vercel redeploy is safe to retry. The key Vercel risk has been removed by resolving `@axodus/business-runtime` to an in-repository read-only runtime copy under `src/modules/business/runtime/index.ts`.

## Remaining Risks

- The app bundle remains large and should be code-split in a later UI stabilization sprint.
- Legacy static HTML files in `public/` are still residual design artifacts and should be audited in Sprint 00B.
- UI normalization is not complete and should not be marked complete from this sprint.
