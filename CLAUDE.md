# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Strava Year-To-Date Stats — a web app that displays running statistics for one or more Strava athletes. It uses Strava webhooks for real-time updates, stores historical data as JSON in Git, and deploys via Netlify.

It's a personal run-tracking web app for me and a small group of friends. We log our runs over time and can see each other's activity. The focus is on tracking progress, friendly competition, and motivation — not a commercial product, just a tool for our group.

Live site: https://stravaytd.curtiscode.dev
Technical article: https://www.curtiscode.dev/post/displaying-strava-stats-using-webhooks

## Repository Structure

This is a two-package repo (not a monorepo with shared tooling):

- **`app/`** — Next.js 12 frontend + Netlify serverless functions
- **`github-actions/`** — TypeScript scripts run by GitHub Actions to update data

Data lives at the repo root:
- `data/ytdHistory.json` — cumulative weekly historical YTD stats per athlete
- `data/current-ytd/` — per-athlete current YTD snapshots

## Commands

All commands are run from within each package directory.

### App (`cd app`)

```bash
npm run dev          # Start Next.js dev server
npm run build        # Build & export static site
npm run lint         # ESLint (Airbnb + TypeScript + Next.js rules)
npm test             # Jest in watch mode
npm run test:ci      # Jest with coverage (used in CI)
```

### GitHub Actions (`cd github-actions`)

```bash
npm run build            # Compile TypeScript to build/
npm run lint             # ESLint
npm test                 # Jest in watch mode
npm run test:ci          # Jest with coverage
npm run update-ytd-history   # Run historical data update locally
npm run update-current-ytd   # Run current YTD update locally
```

### Running a single test

```bash
# From app/ or github-actions/
npx jest path/to/file.test.ts
npx jest --testNamePattern "test name"
```

## Architecture

### Data Flow

1. **Strava webhook** → Netlify function (`app/functions/webhook/webhook.ts`) receives activity events → calls GitHub API to dispatch a `repository_dispatch` event
2. **GitHub Action** (`update-current-ytd.yml`) triggers on dispatch → runs `github-actions/src/updateCurrentYtd.ts` → calls Strava API for latest stats → commits updated JSON to `data/current-ytd/`
3. **Scheduled GitHub Action** (`update-ytd-history.yml`, weekly) → runs `github-actions/src/updateYtdHistory.ts` → appends a new Ytd entry per athlete to `data/ytdHistory.json`
4. **Next.js `getStaticProps`** reads both data files at build time → renders static HTML with Chart.js visualizations

### App (`app/`)

- **`pages/index.tsx`** — main page; reads `ytdHistory.json` and `current-ytd/` via `getStaticProps` to produce static HTML
- **`pages/year/`** — dynamic year-specific routes
- **`components/`** — React components; `YtdChart.tsx` wraps Chart.js
- **`util/`** — pure functions for data transformation (heavily tested)
- **`functions/webhook/`** — Netlify function that verifies Strava webhook calls, then dispatches GitHub Actions
- **`functions/oauthcallback/`** — Netlify function handling Strava OAuth; stores encrypted refresh tokens in Firestore
- **`firebase/admin.ts`** — Firebase Admin SDK initialization

### GitHub Actions (`github-actions/`)

- **`src/updateYtdHistory.ts`** — entry point; appends a new weekly snapshot to `ytdHistory.json`
- **`src/updateCurrentYtd.ts`** — entry point; fetches and writes per-athlete current YTD files
- **`src/util/`** — all logic in pure, tested utilities; entry points are thin orchestrators

### Key Types

| Type | Location | Purpose |
|------|----------|---------|
| `Ytd` | both packages | Single timestamped YTD snapshot (distance, movingTime, elevationGain, count) |
| `YtdHistory` | both packages | `{ meta, athletes[{ athleteId, ytd[] }] }` — the main data file shape |
| `AthleteYtd` | both packages | Current stats for one athlete from Strava API |

### Athlete Access Control

Configured via `ALLOWED_ATHLETES` env var (`"123:name,456:name"`). The `isAthleteAllowed` utility gates all data access.

### Encryption

Strava refresh tokens are AES-encrypted before storage in Firestore. `CIPHERKEY` must be exactly 32 alphanumeric characters.

## Environment Variables

| Variable | Used By | Purpose |
|----------|---------|---------|
| `ALLOWED_ATHLETES` | app, actions | Comma-separated athlete IDs (optionally with display names) |
| `CIPHERKEY` | app (functions) | 32-char key for encrypting refresh tokens |
| `firebaseServiceAccount` | app (functions) | Firebase service account JSON |
| `STRAVA_CLIENTID` | app, actions | Strava OAuth client ID |
| `STRAVA_CLIENTSECRET` | app, actions | Strava OAuth client secret |
| `STRAVA_VERIFY_TOKEN` | app (webhook) | Token for Strava webhook verification |
| `GITHUB_PAT` | app (webhook) | PAT for dispatching GitHub Actions |
| `GITHUB_REPO` | app (webhook) | Repository path (e.g. `user/repo`) |
| `GITHUB_REF` | app (webhook) | Default branch (e.g. `main`) |

## Testing Notes

- Tests are colocated with source files (`*.test.ts` / `*.test.tsx`)
- Page snapshot tests live in `app/__tests__/pages/`
- Utilities are the primary test target; Netlify function handlers have integration-style tests
- CI runs `test:ci` which generates coverage; coverage is reported to Codecov

## Last Reviewed
March 2026