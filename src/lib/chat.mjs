export function parseChatRequest(body) {
  const sessionId = typeof body?.sessionId === "string" ? body.sessionId.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const correlationId =
    typeof body?.correlationId === "string" && body.correlationId.trim().length > 0
      ? body.correlationId.trim()
      : undefined;
  const idempotencyKey =
    typeof body?.idempotencyKey === "string" && body.idempotencyKey.trim().length > 0
      ? body.idempotencyKey.trim()
      : undefined;

  return { sessionId, message, correlationId, idempotencyKey };
}
