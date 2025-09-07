import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_GROQ_API_KEY });

export async function POST(req: Request) {
      try {
            const { note } = await req.json();

            if (!note || note.trim().length === 0) {
                  return new Response(JSON.stringify({ error: "Note content is required" }), { status: 400 });
            }

            const response = await groq.chat.completions.create({
                  messages: [
                        { role: "system", content: "You are an expert at summarizing text." },
                        { role: "user", content: `Summarize this note in 3 short bullet points:\n\n${note}` },
                  ],
                  model: "openai/gpt-oss-20b",
            });

            const summary = response.choices[0]?.message?.content?.trim() || "";

            return new Response(JSON.stringify({ summary }), { status: 200 });
      } catch (error) {
            console.error("Groq API error:", error);
            return new Response(JSON.stringify({ error: "Failed to generate summary", details: error }), { status: 500 });
      }
}
