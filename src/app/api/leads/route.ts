// src/app/api/leads/route.ts
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable } from "@/db/schema";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/authOptions";

// // Helper to get authenticated user ID
// async function getUserId(req: Request) {
//   const session = await getServerSession(authOptions, { req });
//   if (!session?.user?.email) return null;
//   // Return user ID stored in session (adjust if your session stores differently)
//   return session.user.id;
// }

// // GET: fetch all leads for the logged-in user
// export async function GET(req: Request) {
//   const userId = await getUserId(req);
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const leads = await db.select().from(leadsTable).where(leadsTable.userId.eq(Number(userId)));
//     return NextResponse.json(leads);
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // POST: add a new lead
// export async function POST(req: Request) {
//   const userId = await getUserId(req);
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, email, status, company, campaign, lastContact } = await req.json();

//   if (!name || !email) return NextResponse.json({ error: "Name and Email are required" }, { status: 400 });

//   try {
//     const inserted = await db
//       .insert(leadsTable)
//       .values({
//         name,
//         email,
//         status: status || "new",
//         company: company || "",
//         campaign: campaign || "",
//         lastContact: lastContact || "",
//         userId: Number(userId),
//       })
//       .returning();

//     return NextResponse.json(inserted[0]);
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
//   }
// }

// // DELETE: delete a lead by ID
// export async function DELETE(req: Request) {
//   const userId = await getUserId(req);
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     await db.delete(leadsTable).where(leadsTable.id.eq(Number(id)).and(leadsTable.userId.eq(Number(userId))));
//     return NextResponse.json({ message: "Lead deleted" });
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }



// // src/app/api/leads/route.ts
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Helper to get authenticated user ID
// async function getUserId() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id) return null;
//   return session.user.id;
// }

// // GET: fetch all leads for the logged-in user
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const leads = await db.select().from(leadsTable).where(eq(leadsTable.userId, Number(userId)));
//     return NextResponse.json(leads);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // POST: add a new lead
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, email, status, company, campaign, lastContact } = await req.json();

//   if (!name || !email)
//     return NextResponse.json({ error: "Name and Email are required" }, { status: 400 });

//   try {
//     const [inserted] = await db
//       .insert(leadsTable)
//       .values({
//         name,
//         email,
//         status: status || "new",
//         company: company || "",
//         campaign: campaign || "",
//         lastContact: lastContact || "",
//         userId: Number(userId),
//       })
//       .returning();

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
//   }
// }

// // DELETE: delete a lead by ID (query param: ?id=123)
// export async function DELETE(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     await db
//       .delete(leadsTable)
//       .where(eq(leadsTable.id, Number(id)).and(eq(leadsTable.userId, Number(userId))));

//     return NextResponse.json({ message: "Lead deleted" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable, usersTable } from "@/db/schema";
// import { and,eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Helper: get numeric userId from logged-in email
// async function getUserId() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) return null;

//   const [user] = await db
//     .select()
//     .from(usersTable)
//     .where(eq(usersTable.email, session.user.email))
//     .limit(1);

//   if (!user) return null;
//   return user.id;
// }

// // GET: fetch all leads for logged-in user
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const leads = await db.select().from(leadsTable).where(eq(leadsTable.userId, userId));
//     return NextResponse.json(leads);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // POST: add a new lead
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, email, status, company, campaign, lastContact } = await req.json();

//   if (!name || !email) return NextResponse.json({ error: "Name and Email required" }, { status: 400 });

//   try {
//     const [inserted] = await db
//       .insert(leadsTable)
//       .values({
//         name,
//         email,
//         status: status || "new",
//         company: company || "",
//         campaign: campaign || "",
//         lastContact: lastContact || "",
//         userId,
//       })
//       .returning();

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
//   }
// }

// // DELETE: delete a lead by ID
// export async function DELETE(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     await db
//       .delete(leadsTable)
//       .where(
//         and(
//           eq(leadsTable.id, Number(id)),
//           eq(leadsTable.userId, Number(userId))
//         )
//       );

//     return NextResponse.json({ message: "Lead deleted" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Helper: get numeric userId from logged-in email
// async function getUserId() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) return null;

//   const [user] = await db
//     .select()
//     .from(usersTable)
//     .where(eq(usersTable.email, session.user.email))
//     .limit(1);

//   if (!user) return null;
//   return user.id;
// }

// // GET: fetch all leads for logged-in user
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const leads = await db.select().from(leadsTable).where(eq(leadsTable.userId, userId));
//     return NextResponse.json(leads);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // POST: add a new lead
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, email, status, company, campaign, lastContact } = await req.json();

//   if (!name || !email) return NextResponse.json({ error: "Name and Email required" }, { status: 400 });

//   try {
//     const [inserted] = await db
//       .insert(leadsTable)
//       .values({
//         name,
//         email,
//         status: status || "new",
//         company: company || "",
//         campaign: campaign || "",
//         lastContact: lastContact || "",
//         userId,
//       })
//       .returning();

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
//   }
// }

// // PUT: update an existing lead
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, email, status, company, campaign, lastContact } = await req.json();

//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(leadsTable)
//       .set({
//         ...(name && { name }),
//         ...(email && { email }),
//         ...(status && { status }),
//         ...(company && { company }),
//         ...(campaign && { campaign }),
//         ...(lastContact && { lastContact }),
//       })
//       .where(
//         and(
//           eq(leadsTable.id, Number(id)),
//           eq(leadsTable.userId, Number(userId))
//         )
//       )
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
//   }
// }

// // DELETE: delete a lead by ID
// export async function DELETE(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     await db
//       .delete(leadsTable)
//       .where(
//         and(
//           eq(leadsTable.id, Number(id)),
//           eq(leadsTable.userId, Number(userId))
//         )
//       );

//     return NextResponse.json({ message: "Lead deleted" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";


// // Helper: get numeric userId from logged-in email
// async function getUserId() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) return null;

//   const [user] = await db
//     .select()
//     .from(usersTable)
//     .where(eq(usersTable.email, session.user.email))
//     .limit(1);

//   if (!user) return null;
//   return user.id;
// }

// // GET: fetch all leads for logged-in user
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const leads = await db.select().from(leadsTable).where(eq(leadsTable.userId, userId));
//     return NextResponse.json(leads);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // POST: add a new lead
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, email, status, company, campaign, lastContact } = await req.json();

//   if (!name || !email) return NextResponse.json({ error: "Name and Email required" }, { status: 400 });

//   try {
//     const [inserted] = await db
//       .insert(leadsTable)
//       .values({
//         name,
//         email,
//         status: status || "new",
//         company: company || "",
//         campaign: campaign || "",
//         lastContact: lastContact || "",
//         userId,
//       })
//       .returning();

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
//   }
// }

// // PUT: update an existing lead
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, email, status, company, campaign, lastContact } = await req.json();
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(leadsTable)
//       .set({
//         ...(name && { name }),
//         ...(email && { email }),
//         ...(status && { status }),
//         ...(company && { company }),
//         ...(campaign && { campaign }),
//         ...(lastContact && { lastContact }),
//       })
//       .where(and(eq(leadsTable.id, Number(id)), eq(leadsTable.userId, Number(userId))))
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
//   }
// }

// // DELETE: delete a lead by ID
// export async function DELETE(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     await db
//       .delete(leadsTable)
//       .where(and(eq(leadsTable.id, Number(id)), eq(leadsTable.userId, Number(userId))));

//     return NextResponse.json({ message: "Lead deleted" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable, campaignsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // ===================== Helper: get numeric userId =====================
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

// // ===================== Helper: update campaign stats =====================
// async function updateCampaignStats(campaignId: number) {
//   if (!campaignId) return;

//   const leads = await db
//     .select()
//     .from(leadsTable)
//     .where(eq(leadsTable.campaign_id, campaignId));

//   const total = leads.length;
//   const successful = leads.filter(l => l.status === "qualified").length;
//   const rate = total > 0 ? Math.round((successful / total) * 100) : 0;

//   await db
//     .update(campaignsTable)
//     .set({
//       totalleads: total,
//       successfulleads: successful,
//       responserate: rate,
//     })
//     .where(eq(campaignsTable.id, campaignId));
// }

// // ===================== GET =====================
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const leads = await db
//       .select()
//       .from(leadsTable)
//       .where(eq(leadsTable.userId, userId));

//     return NextResponse.json(leads);
//   } catch (err) {
//     console.error("GET /leads error:", err);
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // // ===================== POST =====================
// // export async function POST(req: Request) {
// //   const userId = await getUserId();
// //   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// //   const { name, email, status, company, campaign, lastContact } = await req.json();
// //   if (!name || !email) return NextResponse.json({ error: "Name and Email required" }, { status: 400 });

// //   try {
// //     const [inserted] = await db
// //       .insert(leadsTable)
// //       .values({
// //         name,
// //         email,
// //         status: status || "new",
// //         company: company || "",
// //         // campaign: campaign || null,
// //         campaignId, 
// //         lastContact: lastContact || "",
// //         userId,
// //       })
// //       .returning();

// //     if (inserted.campaign_id) {
// //       await updateCampaignStats(Number(inserted.campaign_id));
// //     }

// //     return NextResponse.json(inserted);
// //   } catch (err) {
// //     console.error("POST /leads error:", err);
// //     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
// //   }
// // }

// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, email, status, company, campaignId, lastContact } = await req.json();
//   if (!name || !email) return NextResponse.json({ error: "Name and Email required" }, { status: 400 });

//   try {
//     const DEFAULT_CAMPAIGN_ID = 22; // Unknown campaign
//     const finalCampaignId = campaignId || DEFAULT_CAMPAIGN_ID;

//     const [inserted] = await db
//       .insert(leadsTable)
//       .values({
//         name,
//         email,
//         status: status || "new",
//         company: company || "",
//         campaign_id: finalCampaignId, // numeric ID column
//         lastContact: lastContact || "",
//         userId,
//       })
//       .returning();

//     if (inserted.campaign_id) {
//       await updateCampaignStats(Number(inserted.campaign_id));
//     }

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error("POST /leads error:", err);
//     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
//   }
// }

// // ===================== PUT =====================
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, email, status, company, campaign, lastContact } = await req.json();
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(leadsTable)
//       .set({
//         ...(name && { name }),
//         ...(email && { email }),
//         ...(status && { status }),
//         ...(company && { company }),
//         ...(campaign !== undefined && { campaign }),
//         ...(lastContact && { lastContact }),
//       })
//       .where(and(eq(leadsTable.id, Number(id)), eq(leadsTable.userId, Number(userId))))
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

//     if (updated.campaign_id) {
//       await updateCampaignStats(Number(updated.campaign_id));
//     }

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error("PUT /leads error:", err);
//     return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
//   }
// }

// // ===================== DELETE =====================
// export async function DELETE(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     const [deleted] = await db
//       .delete(leadsTable)
//       .where(and(eq(leadsTable.id, Number(id)), eq(leadsTable.userId, Number(userId))))
//       .returning();

//     if (deleted?.campaign_id) {
//       await updateCampaignStats(Number(deleted.campaign_id));
//     }

//     return NextResponse.json({ message: "Lead deleted", deleted });
//   } catch (err) {
//     console.error("DELETE /leads error:", err);
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable, campaignsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // ===================== Constants =====================
// const DEFAULT_CAMPAIGN_ID = 22; // "Unknown" campaign

// // ===================== Helper: get numeric userId =====================
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

// // ===================== Helper: update campaign stats =====================
// async function updateCampaignStats(campaignId: number) {
//   if (!campaignId) return;

//   const leads = await db
//     .select()
//     .from(leadsTable)
//     .where(eq(leadsTable.campaignId, campaignId));

//   const total = leads.length;
//   const successful = leads.filter(l => l.status === "qualified").length;
//   const rate = total > 0 ? Math.round((successful / total) * 100) : 0;

//   await db
//     .update(campaignsTable)
//     .set({
//       totalleads: total,
//       successfulleads: successful,
//       responserate: rate,
//     })
//     .where(eq(campaignsTable.id, campaignId));
// }

// // ===================== GET: fetch leads for logged-in user =====================
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const leads = await db
//       .select()
//       .from(leadsTable)
//       .where(eq(leadsTable.userId, userId));

//     return NextResponse.json(leads);
//   } catch (err) {
//     console.error("GET /leads error:", err);
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // ===================== POST: add a new lead =====================
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, email, status, company, campaignId: campaignIdFromBody, lastContact } = await req.json();
//   if (!name || !email) return NextResponse.json({ error: "Name and Email required" }, { status: 400 });

//   try {
//     const finalCampaignId = campaignIdFromBody ? Number(campaignIdFromBody) : DEFAULT_CAMPAIGN_ID;

//     const [inserted] = await db
//       .insert(leadsTable)
//       .values({
//         name,
//         email,
//         status: status || "new",
//         company: company || "",
//         campaignId: finalCampaignId,
//         lastContact: lastContact || "",
//         userId,
//       })
//       .returning();

//     // Update campaign stats
//     await updateCampaignStats(finalCampaignId);

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error("POST /leads error:", err);
//     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
//   }
// }

// // ===================== PUT: update an existing lead =====================
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, email, status, company, campaignId, lastContact } = await req.json();
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(leadsTable)
//       .set({
//         ...(name && { name }),
//         ...(email && { email }),
//         ...(status && { status }),
//         ...(company && { company }),
//         ...(campaignId && { campaignId: Number(campaignId) }),
//         ...(lastContact && { lastContact }),
//       })
//       .where(and(eq(leadsTable.id, Number(id)), eq(leadsTable.userId, Number(userId))))
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

//     // Update campaign stats for this lead's campaign
//     if (updated.campaignId) await updateCampaignStats(Number(updated.campaignId));

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error("PUT /leads error:", err);
//     return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
//   }
// }

// // ===================== DELETE: remove a lead =====================
// export async function DELETE(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     const [deleted] = await db
//       .delete(leadsTable)
//       .where(and(eq(leadsTable.id, Number(id)), eq(leadsTable.userId, Number(userId))))
//       .returning();

//     if (!deleted) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

//     // Update campaign stats
//     if (deleted.campaignId) await updateCampaignStats(Number(deleted.campaignId));

//     return NextResponse.json({ message: "Lead deleted", deleted });
//   } catch (err) {
//     console.error("DELETE /leads error:", err);
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable, campaignsTable } from "@/db/schema";
// import { eq } from "drizzle-orm";

// // Default campaign ID for unknown leads
// const DEFAULT_CAMPAIGN_ID = 22;

// // GET /api/leads - fetch all leads
// export async function GET() {
//   try {
//     const leads = await db.select().from(leadsTable);
//     return NextResponse.json(leads);
//   } catch (err) {
//     console.error("GET /api/leads error:", err);
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // POST /api/leads - add new lead
// export async function POST(request: Request) {
//   try {
//     const { name, email, status, company, campaignId } = await request.json();

//     const finalCampaignId = campaignId ? Number(campaignId) : DEFAULT_CAMPAIGN_ID;

//     const [inserted] = await db
//       .insert(leadsTable)
//       .values({
//         name,
//         email,
//         status,
//         company: company || "",
//         campaignId: finalCampaignId,
//         userId: 1, // Replace with logged-in user ID if using auth
//       })
//       .returning();

//     // Update campaign stats
//     await updateCampaignStats(finalCampaignId);

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error("POST /api/leads error:", err);
//     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
//   }
// }

// // PUT /api/leads - update lead
// export async function PUT(request: Request) {
//   try {
//     const { id, name, email, status, company, campaignId } = await request.json();

//     const leadToUpdate = await db.select().from(leadsTable).where(eq(leadsTable.id, id));
//     if (!leadToUpdate.length) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

//     const oldCampaignId = leadToUpdate[0].campaignId;

//     const [updated] = await db
//       .update(leadsTable)
//       .set({
//         name,
//         email,
//         status,
//         company,
//         campaignId: campaignId ? Number(campaignId) : oldCampaignId,
//       })
//       .where(eq(leadsTable.id, id))
//       .returning();

//     // Update stats for old and new campaign
//     await updateCampaignStats(oldCampaignId);
//     if (campaignId && campaignId !== oldCampaignId) {
//       await updateCampaignStats(Number(campaignId));
//     }

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error("PUT /api/leads error:", err);
//     return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
//   }
// }

// // DELETE /api/leads?id=1 - delete lead
// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = Number(searchParams.get("id"));

//     const leadToDelete = await db.select().from(leadsTable).where(eq(leadsTable.id, id));
//     if (!leadToDelete.length) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

//     const campaignId = leadToDelete[0].campaignId;

//     await db.delete(leadsTable).where(eq(leadsTable.id, id));

//     // Update campaign stats
//     await updateCampaignStats(campaignId);

//     return NextResponse.json({ message: "Lead deleted" });
//   } catch (err) {
//     console.error("DELETE /api/leads error:", err);
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }

// // Helper: update campaign stats
// async function updateCampaignStats(campaignId: number) {
//   try {
//     const allLeads = await db.select().from(leadsTable).where(eq(leadsTable.campaignId, campaignId));
//     const totalLeads = allLeads.length;
//     const successfulLeads = allLeads.filter((l) => l.status === "qualified").length;
//     const responseRate = totalLeads ? Math.round((successfulLeads / totalLeads) * 100) : 0;

//     await db
//       .update(campaignsTable)
//       .set({ totalleads: totalLeads, successfulleads: successfulLeads, responserate: responseRate })
//       .where(eq(campaignsTable.id, campaignId));
//   } catch (err) {
//     console.error("updateCampaignStats error:", err);
//   }
// }




// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable, campaignsTable, usersTable } from "@/db/schema";
// import { eq, and } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Default campaign ID for unknown leads
// const DEFAULT_CAMPAIGN_ID = 22;

// // Helper: get userId from session
// async function getUserId() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) return null;

//   const [user] = await db.select().from(usersTable).where(eq(usersTable.email, session.user.email)).limit(1);
//   return user?.id || null;
// }

// // ===================== GET =====================
// export async function GET() {
//   const userId = await getUserId();
//   console.log("DEBUG: userId from session =", userId); 
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     // Fetch leads belonging only to campaigns of this user
//     const userCampaigns = await db.select().from(campaignsTable).where(eq(campaignsTable.user_id, userId));
//     const campaignIds = userCampaigns.map((c) => c.id);

//     const leads = await db.select().from(leadsTable).where((l) => l.campaignId.in(campaignIds));
//     return NextResponse.json(leads);
//   } catch (err) {
//     console.error("GET /api/auth/leads error:", err);
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // ===================== POST =====================
// export async function POST(request: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const { name, email, status, company, campaignId } = await request.json();
//     const finalCampaignId = campaignId || DEFAULT_CAMPAIGN_ID;

//     // Verify that campaign belongs to this user
//     const campaign = await db.select().from(campaignsTable).where(and(eq(campaignsTable.id, finalCampaignId), eq(campaignsTable.user_id, userId)));
//     if (!campaign.length) return NextResponse.json({ error: "Invalid campaign" }, { status: 400 });

//     const [inserted] = await db.insert(leadsTable).values({
//       name,
//       email,
//       status,
//       company: company || "",
//       campaignId: finalCampaignId,
//       userId,
//     }).returning();

//     await updateCampaignStats(finalCampaignId);
//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error("POST /api/auth/leads error:", err);
//     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
//   }
// }

// // ===================== PUT =====================
// export async function PUT(request: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const { id, name, email, status, company, campaignId } = await request.json();

//     const leadToUpdate = await db.select().from(leadsTable).where(eq(leadsTable.id, id));
//     if (!leadToUpdate.length) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

//     // Verify campaign ownership if changing
//     const oldCampaignId = leadToUpdate[0].campaignId;
//     const newCampaignId = campaignId || oldCampaignId;
//     const campaignCheck = await db.select().from(campaignsTable).where(and(eq(campaignsTable.id, newCampaignId), eq(campaignsTable.user_id, userId)));
//     if (!campaignCheck.length) return NextResponse.json({ error: "Invalid campaign" }, { status: 400 });

//     const [updated] = await db.update(leadsTable).set({
//       name,
//       email,
//       status,
//       company,
//       campaignId: newCampaignId,
//     }).where(eq(leadsTable.id, id)).returning();

//     await updateCampaignStats(oldCampaignId);
//     if (newCampaignId !== oldCampaignId) await updateCampaignStats(newCampaignId);

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error("PUT /api/auth/leads error:", err);
//     return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
//   }
// }

// // ===================== DELETE =====================
// export async function DELETE(request: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const { searchParams } = new URL(request.url);
//     const id = Number(searchParams.get("id"));

//     const leadToDelete = await db.select().from(leadsTable).where(eq(leadsTable.id, id));
//     if (!leadToDelete.length) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

//     // Verify campaign ownership
//     const campaignId = leadToDelete[0].campaignId;
//     const campaignCheck = await db.select().from(campaignsTable).where(and(eq(campaignsTable.id, campaignId), eq(campaignsTable.user_id, userId)));
//     if (!campaignCheck.length) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     await db.delete(leadsTable).where(eq(leadsTable.id, id));
//     await updateCampaignStats(campaignId);

//     return NextResponse.json({ message: "Lead deleted" });
//   } catch (err) {
//     console.error("DELETE /api/auth/leads error:", err);
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }

// // Helper: update campaign stats
// async function updateCampaignStats(campaignId: number) {
//   try {
//     const allLeads = await db.select().from(leadsTable).where(eq(leadsTable.campaignId, campaignId));
//     const totalLeads = allLeads.length;
//     const successfulLeads = allLeads.filter((l) => l.status === "qualified").length;
//     const responseRate = totalLeads ? Math.round((successfulLeads / totalLeads) * 100) : 0;

//     await db.update(campaignsTable).set({ totalleads: totalLeads, successfulleads: successfulLeads, responserate: responseRate }).where(eq(campaignsTable.id, campaignId));
//   } catch (err) {
//     console.error("updateCampaignStats error:", err);
//   }
// }


// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Helper: get user id from session
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

// // ===================== GET (fetch all leads) =====================
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const leads = await db
//       .select()
//       .from(leadsTable)
//       .where(eq(leadsTable.user_id, userId));

//     return NextResponse.json(leads);
//   } catch (err) {
//     console.error("GET /leads error:", err);
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // ===================== POST (add lead) =====================
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, email, status, campaignId } = await req.json();

//   if (!name || !email || !campaignId)
//     return NextResponse.json({ error: "Name, email, and campaignId are required" }, { status: 400 });

//   try {
//     const [inserted] = await db
//       .insert(leadsTable)
//       .values({
//         name,
//         email,
//         status: status || "new",
//         campaign_id: campaignId,
//         user_id: userId,
//       })
//       .returning();

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error("POST /leads error:", err);
//     return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
//   }
// }

// // ===================== PUT (update lead) =====================
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, email, status, campaignId } = await req.json();
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(leadsTable)
//       .set({
//         ...(name && { name }),
//         ...(email && { email }),
//         ...(status && { status }),
//         ...(campaignId && { campaign_id: campaignId }),
//       })
//       .where(
//         and(
//           eq(leadsTable.id, Number(id)),
//           eq(leadsTable.user_id, userId)
//         )
//       )
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error("PUT /leads error:", err);
//     return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
//   }
// }

// // ===================== DELETE (delete lead) =====================
// export async function DELETE(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     const deleted = await db
//       .delete(leadsTable)
//       .where(
//         and(
//           eq(leadsTable.id, Number(id)),
//           eq(leadsTable.user_id, userId)
//         )
//       )
//       .returning();

//     if (!deleted.length) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

//     return NextResponse.json({ message: "Lead deleted", deleted: deleted[0] });
//   } catch (err) {
//     console.error("DELETE /leads error:", err);
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }




// // src/app/api/auth/leads/route.ts
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leadsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // helper: get numeric user id from session
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

// // GET: all leads for the logged-in user
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const leads = await db
//       .select()
//       .from(leadsTable)
//       .where(eq(leadsTable.userId, userId)); // uses schema property userId

//     return NextResponse.json(leads);
//   } catch (err) {
//     console.error("GET /leads error:", err);
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
//   }
// }

// // POST: create a new lead
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const body = await req.json();
//   const { name, email, status, company, lastContact, campaignId } = body;

//   // validate required fields (campaignId is required in your DB)
//   if (!name || !email || !campaignId) {
//     return NextResponse.json(
//       { error: "Name, email and campaignId are required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const [inserted] = await db
//       .insert(leadsTable)
//       .values({
//         name,
//         email,
//         status: status || "new",
//         company: company || "",
//         lastContact: lastContact || "",
//         campaignId: Number(campaignId), // map to schema property campaignId
//         userId,
//       })
//       .returning();

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error("POST /leads error:", err);
//     return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
//   }
// }

// // PUT: update an existing lead
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, email, status, company, lastContact, campaignId } = await req.json();
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(leadsTable)
//       .set({
//         ...(name && { name }),
//         ...(email && { email }),
//         ...(status && { status }),
//         ...(company !== undefined && { company }),
//         ...(lastContact !== undefined && { lastContact }),
//         ...(campaignId !== undefined && { campaignId: Number(campaignId) }), // map correctly
//       })
//       .where(and(eq(leadsTable.id, Number(id)), eq(leadsTable.userId, userId)))
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error("PUT /leads error:", err);
//     return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
//   }
// }

// // DELETE: delete a lead by id (query param ?id=)
// export async function DELETE(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

//   try {
//     const deleted = await db
//       .delete(leadsTable)
//       .where(and(eq(leadsTable.id, Number(id)), eq(leadsTable.userId, userId)))
//       .returning();

//     if (!deleted.length) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
//     return NextResponse.json({ message: "Lead deleted", deleted: deleted[0] });
//   } catch (err) {
//     console.error("DELETE /leads error:", err);
//     return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadsTable, usersTable, campaignsTable } from "@/db/schema";
import { and, eq, count } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// ----------------- Helper: get numeric user id from session -----------------
async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, session.user.email))
    .limit(1);

  return user ? user.id : null;
}

// ----------------- Helper: recalc campaign stats -----------------
async function updateCampaignStats(campaignId: number) {
  // total leads for campaign
  const [{ total }] = await db
    .select({ total: count() })
    .from(leadsTable)
    .where(eq(leadsTable.campaignId, campaignId));

  // successful leads = qualified
  const [{ successful }] = await db
    .select({ successful: count() })
    .from(leadsTable)
    .where(and(eq(leadsTable.campaignId, campaignId), eq(leadsTable.status, "qualified")));

  const responseRate = total > 0 ? Math.round((successful / total) * 100) : 0;

  await db
    .update(campaignsTable)
    .set({
      totalleads: total,
      successfulleads: successful,
      responserate: responseRate,
    })
    .where(eq(campaignsTable.id, campaignId));
}

// ----------------- GET: all leads for the logged-in user -----------------
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const leads = await db
      .select()
      .from(leadsTable)
      .where(eq(leadsTable.userId, userId));

    return NextResponse.json(leads);
  } catch (err) {
    console.error("GET /leads error:", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

// ----------------- POST: create a new lead -----------------
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, status, company, lastContact, campaignId } = body;

  if (!name || !email || !campaignId) {
    return NextResponse.json(
      { error: "Name, email and campaignId are required" },
      { status: 400 }
    );
  }

  try {
    const [inserted] = await db
      .insert(leadsTable)
      .values({
        name,
        email,
        status: status || "new",
        company: company || "",
        lastContact: lastContact || "",
        campaignId: Number(campaignId),
        userId,
      })
      .returning();

    // 🔑 update campaign stats
    await updateCampaignStats(Number(campaignId));

    return NextResponse.json(inserted);
  } catch (err) {
    console.error("POST /leads error:", err);
    return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
  }
}

// ----------------- PUT: update an existing lead -----------------
export async function PUT(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, name, email, status, company, lastContact, campaignId } = await req.json();
  if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

  try {
    const [updated] = await db
      .update(leadsTable)
      .set({
        ...(name && { name }),
        ...(email && { email }),
        ...(status && { status }),
        ...(company !== undefined && { company }),
        ...(lastContact !== undefined && { lastContact }),
        ...(campaignId !== undefined && { campaignId: Number(campaignId) }),
      })
      .where(and(eq(leadsTable.id, Number(id)), eq(leadsTable.userId, userId)))
      .returning();

    if (!updated) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    // 🔑 update campaign stats
    await updateCampaignStats(updated.campaignId);

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /leads error:", err);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

// ----------------- DELETE: delete a lead -----------------
export async function DELETE(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

  try {
    const [deleted] = await db
      .delete(leadsTable)
      .where(and(eq(leadsTable.id, Number(id)), eq(leadsTable.userId, userId)))
      .returning();

    if (!deleted) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    // 🔑 update campaign stats
    await updateCampaignStats(deleted.campaignId);

    return NextResponse.json({ message: "Lead deleted", deleted });
  } catch (err) {
    console.error("DELETE /leads error:", err);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
