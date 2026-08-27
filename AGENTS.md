# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next/Vite-based institutional site. Main application code lives in `app/`, with route folders such as `app/page.tsx`, `app/concept/page.tsx`, and shared UI in files like `app/ui.tsx` and `app/theme-toggle.tsx`. Static assets and social/image files live in `public/`. Tests currently live in `tests/`, and build or validation helpers are in `scripts/`.

## Build, Test, and Development Commands

- `npm run dev` — start the local Vite/Vinext development server.
- `npm run build` — build and validate the deployable site artifact.
- `npm start` — run the built application locally.
- `npm test` — run the build, then execute the rendered HTML test suite.
- `npm run lint` — run ESLint across the repo.
- `npm run validate:artifact` — recheck an existing build artifact.

Use `npm run dev:vercel` or `npm run build:vercel` only when you need Next’s Vercel-oriented runtime path.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow the existing code style: 2-space indentation, semicolons, and small, route-focused modules. Prefer lowercase route folder names (`app/publications/page.tsx`) and descriptive component names (`ThemeToggle`, `ChatGPTAuth`). Keep presentational strings concise and institutionally neutral.

## Testing Guidelines

The current automated coverage is centered on Node’s built-in test runner with `tests/rendered-html.test.mjs`. Add tests alongside that file when you change rendered output, metadata, redirects, or static content. Favor deterministic assertions over snapshot-heavy checks.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commits and conventional prefixes such as `chore(deps): ...` and brief worktree notes. Keep commits scoped to one coherent change. For pull requests, include a short summary, validation performed (`npm test`, `npm run lint`), and screenshots or preview links when UI output changes.

## Security & Configuration Tips

Do not commit secrets, generated runtime output, or deployment artifacts unless they are intentionally tracked. Treat files in `public/` as user-visible content: review them carefully before publishing changes.
