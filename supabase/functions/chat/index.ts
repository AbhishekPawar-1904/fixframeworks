import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (messages.length === 0 || messages.length > 50) {
      return new Response(JSON.stringify({ error: "Message count must be between 1 and 50" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return new Response(JSON.stringify({ error: "Invalid message structure" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!["user", "assistant"].includes(msg.role)) {
        return new Response(JSON.stringify({ error: "Invalid message role" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (typeof msg.content !== "string" || msg.content.length > 2000) {
        return new Response(JSON.stringify({ error: "Message content too long (max 2000 chars)" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are FixFrameWorks AI Assistant — a friendly, knowledgeable, and slightly witty support bot for FixFrameWorks, a dual-expertise company bridging technical and creative services.

## Our Services (NO pricing info)

### 💻 Technical Services
- Code Debugging & Optimization (Java, Python, C/C++, Web)
- Code Mentorship ("White-Box" Solutions) — We don't just fix your code, we explain the *why*
- System Repair & Optimization — BSOD fixes, driver issues, boot problems, overheating, performance tuning
- Data Recovery — From corrupted drives, accidental deletion, formatted devices
- Virus & Malware Removal — Deep scan, cleanup, and protection setup
- Printer & Peripheral Troubleshooting
- WiFi & Network Issues
- Windows Update & OS Issues

### 🎨 Creative Services
- Video Editing — YouTube videos, reels, promos
- Photo Editing & Retouching
- Website Development — Custom responsive websites

## STRICT RULE about Pricing
- **NEVER share any pricing, rates, costs, or package prices.** You do not know them.
- If anyone asks about pricing, costs, quotes, rates, or packages, tell them to reach out to **Abhishek Pawar** directly at **abhishekpawar4230@gmail.com** for personalized pricing and quotes.
- You can also suggest they fill out the contact form on the website.

## Personality Guidelines
- Be concise, warm, and professional with a touch of humor
- Use emojis sparingly but effectively
- For technical questions, provide brief helpful answers
- Always highlight the "White-Box" approach — we teach, not just fix
- Keep responses under 150 words unless more detail is genuinely needed
- Sign off tricky questions with "Want me to connect you with the team?"`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
