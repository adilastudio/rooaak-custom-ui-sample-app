import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RooaakClient } from "rooaak";
import { parseChatRequest } from "./lib/chat.mjs";

const env = loadEnv(["ROOAAK_API_KEY", "ROOAAK_AGENT_ID"]);
const port = Number(process.env.PORT || "8786");

const client = new RooaakClient({
  apiKey: env.ROOAAK_API_KEY,
  baseUrl: process.env.ROOAAK_BASE_URL || "https://www.rooaak.com",
});

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/healthz", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/api/chat", async (req, res) => {
  const { sessionId, message, correlationId, idempotencyKey } = parseChatRequest(req.body);

  if (!sessionId || !message) {
    res.status(400).json({ error: "sessionId and message are required" });
    return;
  }

  try {
    const sent = await client.messages.send(
      {
        agentId: env.ROOAAK_AGENT_ID,
        sessionId,
        message,
        metadata: {
          channel: {
            type: "custom_ui",
          },
          correlationId,
        },
      },
      idempotencyKey,
    );

    if (sent.status === "responded") {
      res.status(200).json({
        messageId: sent.messageId,
        status: sent.status,
        completion: "responded",
        response: sent.response || "No response available yet.",
      });
      return;
    }

    const final = await client.messages.waitForResponse(sent.messageId, {
      timeoutMs: 60_000,
      pollIntervalMs: 1_000,
    });

    res.status(200).json({
      messageId: sent.messageId,
      status: final.status,
      completion: final.status === "failed" ? "failed" : "responded",
      response: final.response || "No response available yet.",
    });
  } catch (error) {
    console.error("[custom-ui-sample] chat failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    res.status(500).json({ error: "failed to process chat" });
  }
});

app.listen(port, () => {
  console.log(`[custom-ui-sample] listening on :${port}`);
});

function loadEnv(requiredKeys) {
  const values = {};
  const missing = [];
  for (const key of requiredKeys) {
    const value = process.env[key];
    if (!value) {
      missing.push(key);
      continue;
    }
    values[key] = value;
  }
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
  return values;
}
