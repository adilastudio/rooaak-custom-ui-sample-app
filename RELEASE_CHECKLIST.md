# Release Checklist

## Pre-release validation

- [ ] `npm install`
- [ ] `npm test` passes
- [ ] `node --check src/server.mjs` passes
- [ ] `.env.example` matches runtime-required env vars
- [ ] README setup steps are accurate end-to-end

## Security checks

- [ ] API key is server-side only (never exposed in browser)
- [ ] Idempotency keys are used for message writes
- [ ] Channel metadata set to `custom_ui`
- [ ] No secrets/tokens logged

## Deployment checks

- [ ] Health endpoint responds (`/healthz`)
- [ ] UI route (`/`) loads correctly
- [ ] Chat API route (`/api/chat`) returns Rooaak responses

## Release ops

- [ ] Tag release (for example `v0.1.0`)
- [ ] Publish changelog entry
- [ ] Smoke test chat flow against a real Rooaak agent
