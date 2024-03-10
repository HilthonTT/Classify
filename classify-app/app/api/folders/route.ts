import { auth } from "@clerk/nextjs";

import { getFolders } from "@/lib/folder-service";

export async function GET(req: Request) {
  try {
    const { userId, orgId } = auth();

    if (!orgId || !userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");

    const folders = await getFolders(search ? search : undefined);

    return Response.json(folders);
  } catch (error) {
    console.log("[FOLDERS_GET]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
