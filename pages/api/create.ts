import { PGEssay, PGJSON } from "@/types";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { Configuration, OpenAIApi } from "openai";
import { title } from "process";

loadEnvConfig("");

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    console.log(req.body)
    const payload = req.body as unknown as {
      title: string;
      url: string;
      content: string;
    };
    console.log(payload);
    if (payload.content) {
      // const embeddingResponse = await openai.createEmbedding({
      //   model: "text-embedding-ada-002",
      //   input: payload.content
      // });

      // const [{ embedding }] = embeddingResponse.data.data;

      // const { data, error } = await supabase
      //   .from("pg")
      //   .insert({
      //     essay_title: payload.title ?? null,
      //     essay_url: payload.url ?? null,
      //     essay_date: new Date().toDateString(),
      //     essay_thanks: "",
      //     content: payload.content,
      //     content_length: String(payload.content).length,
      //     content_tokens: payload.content.split(" ").length,
      //     embedding
      //   })
      //   .select("*");

      // if (error) {
      //   console.log("error", error);
      // return new Response("Error", { status: 500 });
      // } else {
      //   console.log("saved");
      // }
    } else throw new Error("Content not found");

    return new Response("Created successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
