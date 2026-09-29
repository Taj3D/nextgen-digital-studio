/**
 * Gemini AI client helper.
 * Calls Google's Gemini API directly via fetch.
 * Used as the primary provider for the AI chat agent, with z-ai-web-dev-sdk as fallback.
 */

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

/**
 * Check if Gemini API key is configured.
 */
export function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY;
  return !!key && key.length > 10;
}

/**
 * Call Gemini to generate a chat completion.
 * Returns the text reply or throws on error.
 *
 * Gemini's API uses "contents" with roles "user" and "model" (not "assistant").
 * System instructions are passed separately via systemInstruction.
 */
export async function geminiChat(
  messages: ChatMessage[],
  systemPrompt: string,
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  // Separate system messages from the conversation
  const conversationMessages = messages.filter((m) => m.role !== "system");

  // Convert to Gemini format: user → "user", assistant → "model"
  const contents = conversationMessages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const body = {
    contents,
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 500,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
  };

  const url = `${GEMINI_ENDPOINT}/${GEMINI_MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    let errMsg = `Gemini API error (${res.status})`;
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson?.error?.message || errMsg;
    } catch {
      errMsg = errText.slice(0, 200) || errMsg;
    }
    throw new Error(errMsg);
  }

  const data = await res.json();

  // Extract text from the response
  const candidate = data?.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;

  if (!text) {
    // Check if content was blocked
    const finishReason = candidate?.finishReason;
    if (finishReason === "SAFETY") {
      throw new Error("Response blocked by safety filters");
    }
    throw new Error("Gemini returned an empty response");
  }

  return text.trim();
}

/**
 * Test the Gemini connection. Returns { ok, provider, detail }.
 */
export async function testGemini(): Promise<{
  ok: boolean;
  detail: string;
}> {
  if (!isGeminiConfigured()) {
    return { ok: false, detail: "GEMINI_API_KEY not configured" };
  }
  try {
    const reply = await geminiChat(
      [{ role: "user", content: "Reply with exactly: OK" }],
      "You are a test bot. Reply briefly.",
    );
    return { ok: true, detail: reply.slice(0, 100) };
  } catch (err) {
    return {
      ok: false,
      detail: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
