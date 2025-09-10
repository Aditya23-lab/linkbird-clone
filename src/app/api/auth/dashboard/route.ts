// src/app/api/auth/dashboard/route.ts
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { campaignsTable, leadsTable, usersTable } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// async function getUserId() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) return null;

//   const [user] = await db
//     .select()
//     .from(usersTable)
//     .where(eq(usersTable.email, session.user.email))
//     .limit(1);

//   return user ? user.id : null;
// }

// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const campaigns = await db.select().from(campaignsTable).where(eq(campaignsTable.userId, userId));
//     const leads = await db.select().from(leadsTable).where(eq(leadsTable.userId, userId));

//     const totalCampaigns = campaigns.length;
//     const totalLeads = leads.length;
//     const successfulLeads = leads.filter((l) => l.status === "converted").length;
//     const responseRate = totalLeads > 0 ? (successfulLeads / totalLeads) * 100 : 0;

//     return NextResponse.json({
//       totalCampaigns,
//       totalLeads,
//       successfulLeads,
//       responseRate: Number(responseRate.toFixed(2)), // 2 decimal places
//     });
//   } catch (err) {
//     console.error("GET /api/auth/dashboard error:", err);
//     return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { campaignsTable, leadsTable, usersTable } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// async function getUserId() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) return null;

//   const [user] = await db
//     .select()
//     .from(usersTable)
//     .where(eq(usersTable.email, session.user.email))
//     .limit(1);

//   return user ? user.id : null;
// }

// export async function GET() {
//   const userId = await getUserId();
//   if (!userId)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     // Fetch campaigns and leads
//     const campaigns = await db
//       .select()
//       .from(campaignsTable)
//       .where(eq(campaignsTable.userId, userId));

//     const leads = await db
//       .select()
//       .from(leadsTable)
//       .where(eq(leadsTable.userId, userId));

//     // Dashboard stats
//     const totalCampaigns = campaigns.length;
//     const totalLeads = leads.length;
//     const successfulLeads = leads.filter((l) => l.status === "qualified").length;
//     const responseRate = totalLeads > 0 ? (successfulLeads / totalLeads) * 100 : 0;

//     return NextResponse.json({
//       totalCampaigns,
//       totalLeads,
//       successfulLeads,
//       responseRate: Number(responseRate.toFixed(2)),
//     });
//   } catch (err) {
//     console.error("GET /api/auth/dashboard error:", err);
//     return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { campaignsTable, leadsTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Helper: get numeric userId from logged-in email
async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, session.user.email))
    .limit(1);

  return users.length > 0 ? users[0].id : null;
}

export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch campaigns and leads for this user
    const campaigns = await db
      .select()
      .from(campaignsTable)
      .where(eq(campaignsTable.userId, userId));

    const leads = await db
      .select()
      .from(leadsTable)
      .where(eq(leadsTable.userId, userId));

    // Calculate dashboard stats
    const totalCampaigns = campaigns.length;
    const totalLeads = leads.length;
    const successfulLeads = leads.filter((l) => l.status === "qualified").length;
    const responseRate = totalLeads > 0 ? (successfulLeads / totalLeads) * 100 : 0;

    return NextResponse.json({
      totalCampaigns,
      totalLeads,
      successfulLeads,
      responseRate: Number(responseRate.toFixed(2)),
    });
  } catch (err) {
    console.error("GET /api/auth/dashboard error:", err);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}


