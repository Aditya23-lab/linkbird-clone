// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // Find link
//     const link = await prisma.link.update({
//       where: { id: params.id },
//       data: { clicks: { increment: 1 } }, // increment clicks
//     });

//     // Redirect to actual URL
//     return NextResponse.redirect(link.url);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Link not found" }, { status: 404 });
//   }
// }


import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { linksTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    // Find link
    const [link] = await db
      .select()
      .from(linksTable)
      .where(eq(linksTable.id, id))
      .limit(1);

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Increment clicks
    await db
      .update(linksTable)
      .set({ clicks: link.clicks + 1 })
      .where(eq(linksTable.id, id));

    // Redirect to actual URL
    return NextResponse.redirect(link.url);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

