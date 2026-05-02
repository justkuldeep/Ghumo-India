import { useEffect, useMemo, useRef, useState } from "react";
import { FaCommentDots, FaPaperPlane, FaTimes } from "react-icons/fa";

const WEBHOOK_URL =
  "https://kuldeepsoni.app.n8n.cloud/webhook/13e08acb-f8c1-4b10-a1df-1980bed6a682/chat";

const getAssistantReply = (payload) => {
  if (!payload) return "I could not read the response.";

  if (typeof payload === "string") return payload;

  if (Array.isArray(payload)) {
    const firstReadable = payload.find((item) => {
      if (typeof item === "string") return true;
      if (!item || typeof item !== "object") return false;
      return [
        item.output,
        item.reply,
        item.response,
        item.message,
        item.text,
        item.answer,
      ].some((value) => typeof value === "string" && value.trim());
    });

    if (typeof firstReadable === "string") return firstReadable;

    if (firstReadable && typeof firstReadable === "object") {
      return (
        firstReadable.output ||
        firstReadable.reply ||
        firstReadable.response ||
        firstReadable.message ||
        firstReadable.text ||
        firstReadable.answer ||
        "I received a response but could not parse it."
      );
    }
  }

  const direct =
    payload.output ||
    payload.reply ||
    payload.response ||
    payload.message ||
    payload.text ||
    payload.answer;

  if (typeof direct === "string" && direct.trim()) return direct;

  if (payload.data && typeof payload.data === "object") {
    const nested =
      payload.data.output ||
      payload.data.reply ||
      payload.data.response ||
      payload.data.message ||
      payload.data.text ||
      payload.data.answer;

    if (typeof nested === "string" && nested.trim()) return nested;
  }

  return "I received a response but could not parse it.";
};

const toBulletPointsIfNeeded = (text) => {
  if (!text || typeof text !== "string") return text;

  const normalized = text.replace(/\\n/g, "\n").trim();
  const hasListSyntax = /(^|\n)\s*([*-]|\d+\.)\s+/.test(normalized);

  if (hasListSyntax) return normalized;

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentences.length < 2) return normalized;

  return sentences.map((sentence) => `- ${sentence}`).join("\n");
};

const renderBoldText = (line) => {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, idx) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    return <span key={idx}>{part}</span>;
  });
};

const renderAssistantContent = (text) => {
  const normalized = toBulletPointsIfNeeded(text || "");
  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return null;

  const isBulleted = lines.every((line) => /^([*-]|\d+\.)\s+/.test(line));

  if (isBulleted) {
    return (
      <ul className="list-disc pl-5 space-y-1">
        {lines.map((line, idx) => {
          const cleanLine = line.replace(/^([*-]|\d+\.)\s+/, "");
          return <li key={idx}>{renderBoldText(cleanLine)}</li>;
        })}
      </ul>
    );
  }

  return (
    <div className="space-y-1">
      {lines.map((line, idx) => (
        <p key={idx}>{renderBoldText(line)}</p>
      ))}
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Namaste! Ask me anything about destinations, states, festivals, or travel plans.",
    },
  ]);

  const endRef = useRef(null);

  const sessionId = useMemo(() => {
    const randomPart = Math.random().toString(36).slice(2, 10);
    return `ghumo-${Date.now()}-${randomPart}`;
  }, []);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const sendMessage = async () => {
    const content = input.trim();
    if (!content || isSending) return;

    setMessages((prev) => [...prev, { role: "user", text: content }]);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          chatInput: content,
          input: content,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      let assistantText = "";

      if (contentType.includes("application/json")) {
        const payload = await response.json();
        assistantText = getAssistantReply(payload);
      } else {
        assistantText = await response.text();
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: toBulletPointsIfNeeded(
            assistantText || "I received an empty response."
          ),
        },
      ]);
    } catch (_error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I am having trouble reaching the assistant right now. Please try again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {isOpen ? (
        <div className="w-[22rem] max-w-[calc(100vw-2rem)] h-[32rem] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold">Ghumo Assistant</p>
              <p className="text-xs opacity-90">Travel help in real time</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/20 transition"
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 p-3 bg-orange-50/40 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant"
                    ? renderAssistantContent(msg.text)
                    : msg.text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-500 px-3 py-2 rounded-2xl rounded-bl-md text-sm">
                  Typing...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about your next India trip..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={sendMessage}
                disabled={isSending || !input.trim()}
                className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center disabled:opacity-50"
                aria-label="Send message"
              >
                <FaPaperPlane size={12} />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="ml-auto h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white shadow-xl flex items-center justify-center hover:scale-105 transition"
        aria-label="Open chatbot"
      >
        <FaCommentDots size={20} />
      </button>
    </div>
  );
};

export default Chatbot;
