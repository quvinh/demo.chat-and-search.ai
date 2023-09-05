import { createContent } from "@/utils";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { title, url, content } = (await req.json()) as {
      title: string;
      url: string;
      content: string;
    };
    
    if (content) {
      const res = await createContent(title, url, content);
      return new Response("Handle create content", { status: res ? 200 : 500 })
    } else throw new Error("Content not found");
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
};

export default handler;
