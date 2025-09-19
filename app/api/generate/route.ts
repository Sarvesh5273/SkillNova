import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Define the expected structure of a message in the request
interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Gemini API key not configured" },
      { status: 500 }
    );
  }

  // --- THE CHANGE IS HERE ---
  // We now expect an array of messages, not just a single prompt.
  const { messages } = await req.json();
  // --------------------------

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Messages are required in the request body" },
      { status: 400 }
    );
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // --- ANOTHER CHANGE ---
    // We format the history for the Gemini API
    // The Gemini API uses 'model' for the assistant's role.
    const history = messages.slice(0, -1).map((message: Message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    // ----------------------

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const result = await chat.sendMessageStream(lastMessage.content);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          try {
            const text = chunk.text();
            controller.enqueue(new TextEncoder().encode(text));
          } catch (error) {
            console.error("Error processing stream chunk:", error);
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content from Gemini API" },
      { status: 500 }
    );
  }
}