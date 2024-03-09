import { auth } from "@clerk/nextjs";

import { getTags } from "@/lib/tag-service";

export async function GET(req: Request) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const tags = await getTags();

    return Response.json(tags, { status: 200 });
  } catch (error) {
    console.log("[TAGS_GET]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
