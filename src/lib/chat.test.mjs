import test from "node:test";
import assert from "node:assert/strict";
import { parseChatRequest } from "./chat.mjs";

test("parseChatRequest trims and normalizes optional values", () => {
  const parsed = parseChatRequest({
    sessionId: "  s-1  ",
    message: "  hello  ",
    correlationId: " corr-1 ",
    idempotencyKey: " idem-1 ",
  });

  assert.deepEqual(parsed, {
    sessionId: "s-1",
    message: "hello",
    correlationId: "corr-1",
    idempotencyKey: "idem-1",
  });
});

test("parseChatRequest drops invalid optional values", () => {
  const parsed = parseChatRequest({
    sessionId: "s-1",
    message: "hello",
    correlationId: "   ",
    idempotencyKey: 123,
  });

  assert.deepEqual(parsed, {
    sessionId: "s-1",
    message: "hello",
    correlationId: undefined,
    idempotencyKey: undefined,
  });
});
