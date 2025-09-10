// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { prisma } from "@/lib/prisma";
// import { authOptions } from "../auth/[...nextauth]/route";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   const links = await prisma.link.findMany({
//     where: { userId: user?.id },
//     orderBy: { createdAt: "desc" },
//   });

//   return NextResponse.json(links);
// }

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { title, url } = await req.json();

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   const newLink = await prisma.link.create({
//     data: {
//       title,
//       url,
//       userId: user!.id,
//     },
//   });

//   return NextResponse.json(newLink);
// }



// // src/app/api/link/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { db, schema } from "@/lib/db";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { eq, desc } from "drizzle-orm";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const [user] = await db.select().from(schema.usersTable).where(eq(schema.usersTable.email, session.user.email));

//   const links = await db
//     .select()
//     .from(schema.linksTable)
//     .where(eq(schema.linksTable.userId, user.id))
//     .orderBy(desc(schema.linksTable.createdAt));

//   return NextResponse.json(links);
// }

// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { title, url } = await req.json();
//   if (!title || !url) {
//     return NextResponse.json({ error: "Title and URL required" }, { status: 400 });
//   }

//   const [user] = await db.select().from(schema.usersTable).where(eq(schema.usersTable.email, session.user.email));

//   const [newLink] = await db
//     .insert(schema.linksTable)
//     .values({ title, url, userId: user.id })
//     .returning();

//   return NextResponse.json(newLink);
// }




import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { linksTable, usersTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";   // 👈 added desc
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET all links
export async function GET() {
  const links = await db
    .select()
    .from(linksTable)
    .orderBy(desc(linksTable.createdAt)); // 👈 fixed orderBy

  return NextResponse.json(links);
}

// POST a new link
export async function POST(req: NextRequest) {
    console.log("📩 POST /api/link hit");
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, url } = await req.json();
  if (!title || !url) {
    return NextResponse.json({ error: "Title and URL required" }, { status: 400 });
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, session.user.email))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const [newLink] = await db
    .insert(linksTable)
    .values({
      title,
      url,
      userId: user.id,
    })
    .returning();

  return NextResponse.json(newLink);
}
