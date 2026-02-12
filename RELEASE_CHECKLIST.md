# Release Checklist

## Pre-release validation

- [x] `npm install`
- [x] `npm test` passes
- [x] `node --check src/server.mjs` passes
- [x] `.env.example` matches runtime-required env vars
- [x] README setup steps are accurate end-to-end

## Security checks

- [x] API key is server-side only (never exposed in browser)
- [x] Idempotency keys are used for message writes
- [x] Channel metadata set to `custom_ui`
- [x] No secrets/tokens logged

## Deployment checks

- [x] Health endpoint responds (`/healthz`)
- [x] UI route (`/`) loads correctly
- [x] Chat API route (`/api/chat`) returns Rooaak responses

## Release ops

- [x] Tag release (`v0.1.0`)
- [x] Publish changelog entry
- [x] Smoke test chat flow against a real Rooaak agent

## Verification notes (2026-02-12)

- Local checks passed: install, tests, syntax, `/healthz`, and `/` route.
- Live deployed smoke test passed via `POST /api/chat` with response `custom-ui-smoke-ok` (message id: `57937fb1-59b9-42c7-925e-7d4616e15454`).
