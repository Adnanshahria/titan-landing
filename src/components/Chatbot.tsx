import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { useSiteContent } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { content } = useSiteContent();

  // Update greeting when language changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ role: "assistant", content: t("chatbot.greeting") }];
      }
      return prev;
    });
  }, [t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const buildContext = () => {
    return `
Company: Techno-Tech Engineering Ltd., est. 1995, Bangladesh.
Services: ${content.services.map((s) => s.title).join(", ")}
Clients: ${content.clients.join(", ")}
Contact: ${content.contactPhone} | ${content.contactEmail} | ${content.contactAddress}
Projects: ${content.projects.map((p) => `${p.name} (${p.client}, ${p.year})`).join("; ")}
About: ${content.aboutText}
    `.trim();
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const { groqApiKey } = content.chatbotConfig;

    if (!groqApiKey) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm currently in demo mode. The AI API key hasn't been configured yet. Please contact the admin to enable full AI capabilities.\n\nIn the meantime, here's what I can tell you:\n\n**Techno-Tech Engineering Ltd.** is a leading Bangladeshi engineering company established in 1995, specializing in power plants, refineries, cement mills, and industrial construction. Call us at **01711-003072** or email **info@technotechengineering.com**." },
      ]);
      setLoading(false);
      return;
    }

    try {
      const allMessages = [
        { role: "system", content: `${content.chatbotConfig.systemPrompt}\n\nCompany knowledge:\n${buildContext()}` },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: userMsg.content },
      ];

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: allMessages,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again later or contact us directly at 01711-003072." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-orange to-orange-glow flex items-center justify-center text-secondary-foreground shadow-lg shadow-orange/30 hover:shadow-orange/50 transition-all hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-navy rounded-2xl border border-steel/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-steel/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center">
                <Bot size={16} className="text-secondary-foreground" />
              </div>
              <div>
                <p className="font-heading text-primary-foreground font-semibold text-sm uppercase">{t("chatbot.title")}</p>
                <p className="text-steel text-xs">{t("chatbot.subtitle")}</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="w-6 h-6 rounded-lg bg-orange/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={12} className="text-orange" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground rounded-br-sm"
                        : "glass-card text-primary-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="w-6 h-6 rounded-lg bg-steel/10 flex items-center justify-center shrink-0 mt-1">
                      <User size={12} className="text-steel" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 items-start">
                  <div className="w-6 h-6 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                    <Bot size={12} className="text-orange" />
                  </div>
                  <div className="glass-card rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-orange/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-orange/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-orange/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="px-4 py-3 border-t border-steel/10 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chatbot.placeholder")}
                className="flex-1 glass-card text-primary-foreground rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange to-orange-glow flex items-center justify-center text-secondary-foreground disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-orange/20"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
