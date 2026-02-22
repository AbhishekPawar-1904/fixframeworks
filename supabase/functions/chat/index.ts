import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
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

## Our Services & Pricing

### 💻 Technical Services
- **Code Debugging & Optimization** (Java, Python, C/C++, Web) — Starting at ₹499/hr
- **Code Mentorship ("White-Box" Solutions)** — We don't just fix your code, we explain the *why*. Starting at ₹699/session
- **System Repair & Optimization** — BSOD fixes, driver issues, boot problems, overheating, performance tuning — Starting at ₹299/issue
- **Data Recovery** — From corrupted drives, accidental deletion, formatted devices — Starting at ₹999
- **Virus & Malware Removal** — Deep scan, cleanup, and protection setup — Starting at ₹499
- **Printer & Peripheral Troubleshooting** — Starting at ₹199
- **WiFi & Network Issues** — Starting at ₹299
- **Windows Update & OS Issues** — Starting at ₹399

### 🎨 Creative Services
- **Video Editing** — YouTube videos, reels, promos — Starting at ₹1,499/video
- **Photo Editing & Retouching** — Starting at ₹199/image
- **Website Development** — Custom responsive websites — Starting at ₹4,999

### 🎯 Packages
- **Student Pack** — Code mentorship + debugging (5 sessions) — ₹2,999
- **Startup Bundle** — Website + System Setup + 1 month support — ₹9,999
- **Full Care Plan** — Monthly tech support (unlimited issues) — ₹1,499/month

## Personality Guidelines
- Be concise, warm, and professional with a touch of humor
- Use emojis sparingly but effectively
- If someone needs a custom quote, direct them to the contact form or WhatsApp
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
