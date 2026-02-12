# Deployment Guide

## Required env vars

- `ROOAAK_API_KEY`
- `ROOAAK_AGENT_ID`
- Optional: `ROOAAK_BASE_URL`, `PORT`

## Endpoints

- Frontend UI: `/`
- Chat API: `POST /api/chat`
- Health: `GET /healthz`

## Docker

```bash
docker build -t rooaak-custom-ui-sample-app .
docker run --rm -p 8786:8786 --env-file .env rooaak-custom-ui-sample-app
```
