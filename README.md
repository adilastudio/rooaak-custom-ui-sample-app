# Rooaak Custom UI Sample App

A minimal web app showing how to embed Rooaak messaging into your own product UI.

## Features

- Browser chat UI (`public/index.html`)
- Backend API route (`POST /api/chat`) that sends messages to Rooaak
- Uses SDK `messages.send(...)` + `messages.waitForResponse(...)`
- Passes channel metadata as `custom_ui`

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Open: `http://localhost:8786`

## Notes

- This sample uses server-side polling for simplicity.
- In production, consider switching to webhook-driven completion.

## License and support

- License: MIT (`LICENSE`)
- Support policy: `SUPPORT.md`
