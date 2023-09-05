import { OpenAIModel } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";
import fs from "fs";
import { Configuration, OpenAIApi } from "openai";
import { loadEnvConfig } from "@next/env";

// loadEnvConfig("");

export const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const OpenAIStream = async (prompt: string, apiKey: string) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    method: "POST",
    body: JSON.stringify({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: [
        {
          role: "system",
          content: "Tôi có thể hỗ trợ gì cho bạn"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.0,
      stream: true
    })
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });

  return stream;
};

export const createContent = async (title: string, url: string, content: string) => {
  try {
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);
    // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    // const embeddingResponse = await openai.createEmbedding({
    //   model: "text-embedding-ada-002",
    //   input: content
    // });

    // const [{ embedding }] = embeddingResponse.data.data;
    // console.log(embedding);
    // return false;

    const { data, error } = await supabaseAdmin
      .from("pg")
      .insert({
        essay_title: title ?? null,
        essay_url: url ?? null,
        essay_date: new Date().toDateString(),
        essay_thanks: "",
        content: content,
        content_length: String(content).length,
        content_tokens: content.split(" ").length,
        // embedding
      })
      .select("*");

    if (error) {
      console.log("error", error);
      return false;
    } else {
      console.log("saved");
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
