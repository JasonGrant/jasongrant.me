import { ChatNetworkError } from "./chatClient";
import type { ChatEvent } from "./wire";

// A server-sent-events reader over fetch. EventSource cannot POST or send an
// Authorization header, and the chat API needs both. The parsing follows the
// WHATWG event-stream grammar: fields are "name: value" lines, a blank line ends
// an event, several "data" lines join with a newline, lines starting with ":" are
// comments, and unknown fields are ignored.

const EVENT_NAMES = new Set(["meta", "text", "correction", "done", "error"]);

export async function* readEvents(body: ReadableStream<Uint8Array>): AsyncGenerator<ChatEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let eventName = "";
  let dataLines: string[] = [];
  let finished = false;

  function dispatch(): ChatEvent | null {
    const name = eventName || "message";
    const data = dataLines.join("\n");
    eventName = "";
    dataLines = [];
    if (!EVENT_NAMES.has(name) || data === "") return null;
    try {
      return { event: name, data: JSON.parse(data) } as ChatEvent;
    } catch {
      throw new ChatNetworkError("The event stream carried malformed data");
    }
  }

  function handleLine(line: string): ChatEvent | null {
    if (line === "") return dispatch();
    if (line.startsWith(":")) return null;
    const colon = line.indexOf(":");
    const field = colon === -1 ? line : line.slice(0, colon);
    let value = colon === -1 ? "" : line.slice(colon + 1);
    if (value.startsWith(" ")) value = value.slice(1);
    if (field === "event") eventName = value;
    else if (field === "data") dataLines.push(value);
    return null;
  }

  try {
    while (true) {
      let chunk: ReadableStreamReadResult<Uint8Array>;
      try {
        chunk = await reader.read();
      } catch (cause) {
        // An abort is the caller's decision; anything else is a dropped stream.
        if (cause instanceof DOMException && cause.name === "AbortError") throw cause;
        throw new ChatNetworkError("The event stream was interrupted");
      }
      if (chunk.done) break;
      buffer += decoder.decode(chunk.value, { stream: true });
      let newline = buffer.search(/\r\n|\n|\r/);
      while (newline !== -1) {
        const line = buffer.slice(0, newline);
        const eol = buffer.startsWith("\r\n", newline) ? 2 : 1;
        buffer = buffer.slice(newline + eol);
        const event = handleLine(line);
        if (event) {
          yield event;
          if (event.event === "done" || event.event === "error") {
            finished = true;
            return;
          }
        }
        newline = buffer.search(/\r\n|\n|\r/);
      }
    }
    // A stream that closes without `done` or `error` was cut off.
    if (!finished) throw new ChatNetworkError("The event stream ended early");
  } finally {
    reader.cancel().catch(() => {});
  }
}
