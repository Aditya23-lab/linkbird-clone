// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { campaignsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Helper: get userId from session
// async function getUserId() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) return null;

//   const [user] = await db
//     .select()
//     .from(usersTable)
//     .where(eq(usersTable.email, session.user.email))
//     .limit(1);

//   return user ? user.id : null;
// // }

// // // ===================== GET =====================
// // export async function GET() {
// //   const userId = await getUserId();
// //   if (!userId)
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// //   try {
// //     const campaigns = await db
// //       .select()
// //       .from(campaignsTable)
// //     //   .where(eq(campaignsTable.userId, userId));

// //     return NextResponse.json(campaigns);
// //   } catch (err) {
// //     console.error(err);
// //     return NextResponse.json(
// //       { error: "Failed to fetch campaigns" },
// //       { status: 500 }
// //     );
// //   }
// // }


// // ===================== POST =====================
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, status } = await req.json();

//   if (!name)
//     return NextResponse.json({ error: "Campaign name required" }, { status: 400 });

//   try {
//     const [inserted] = await db
//       .insert(campaignsTable)
//       .values({
//         name,
//         status: status || "draft",
//         userId,
//       })
//       .returning();

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to create campaign" },
//       { status: 500 }
//     );
//   }
// }

// // ===================== PUT =====================
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, status, totalLeads, successfulLeads, responseRate } =
//     await req.json();

//   if (!id)
//     return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(campaignsTable)
//       .set({
//         ...(name && { name }),
//         ...(status && { status }),
//         ...(totalLeads !== undefined && { totalLeads }),
//         ...(successfulLeads !== undefined && { successfulLeads }),
//         ...(responseRate && { responseRate }),
//       })
//       // only filter by id (no user_id column in DB)
//       .where(eq(campaignsTable.id, Number(id)))
//       .returning();

//     if (!updated)
//       return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to update campaign" },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { campaignsTable, usersTable } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Helper: get userId from session (optional for auth)
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

// // ===================== GET =====================
// export async function GET() {
//   try {
//     const campaigns = await db.select().from(campaignsTable);
//     return NextResponse.json(campaigns);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
//   }
// }

// // ===================== POST =====================
// export async function POST(req: Request) {
//   const { name, status } = await req.json();

//   if (!name) return NextResponse.json({ error: "Campaign name required" }, { status: 400 });

//   try {
//     const [inserted] = await db
//       .insert(campaignsTable)
//       .values({
//         name,
//         status: status || "draft",
//       })
//       .returning();

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
//   }
// }

// // ===================== PUT =====================
// export async function PUT(req: Request) {
//   const { id, name, status, totalleads, successfulleads, responserate } = await req.json();

//   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(campaignsTable)
//       .set({
//         ...(name && { name }),
//         ...(status && { status }),
//         ...(totalleads !== undefined && { totalleads }),
//         ...(successfulleads !== undefined && { successfulleads }),
//         ...(responserate && { responserate }),
//       })
//       .where(eq(campaignsTable.id, Number(id)))
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
//   }
// }

// // ===================== DELETE =====================
// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     await db.delete(campaignsTable).where(eq(campaignsTable.id, Number(id)));
//     return NextResponse.json({ message: "Campaign deleted" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { campaignsTable, usersTable } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Get userId from session
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

// // ===================== GET =====================
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const campaigns = await db
//       .select()
//       .from(campaignsTable)
//       .where(eq(campaignsTable.user_id, userId)); // user-specific
//     return NextResponse.json(campaigns);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
//   }
// }

// // ===================== POST =====================
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, status } = await req.json();
//   if (!name) return NextResponse.json({ error: "Campaign name required" }, { status: 400 });

//   try {
//     const [inserted] = await db
//       .insert(campaignsTable)
//       .values({
//         name,
//         status: status || "draft",
//         user_id: userId, // save user-specific
//       })
//       .returning();

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
//   }
// }

// // ===================== PUT =====================
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, status, totalleads, successfulleads, responserate } = await req.json();
//   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(campaignsTable)
//       .set({
//         ...(name && { name }),
//         ...(status && { status }),
//         ...(totalleads !== undefined && { totalleads }),
//         ...(successfulleads !== undefined && { successfulleads }),
//         ...(responserate && { responserate }),
//       })
//       .where(
//         eq(campaignsTable.id, Number(id))
//       )
//       .where(
//         eq(campaignsTable.user_id, userId) // only allow user's campaigns
//       )
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
//   }
// }

// // ===================== DELETE =====================
// export async function DELETE(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     await db
//       .delete(campaignsTable)
//       .where(eq(campaignsTable.id, Number(id)))
//       .where(eq(campaignsTable.user_id, userId)); // only allow user's campaigns

//     return NextResponse.json({ message: "Campaign deleted" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { campaignsTable } from "@/db/schema";
// import { eq } from "drizzle-orm";

// // ===================== GET =====================
// export async function GET() {
//   try {
//     const campaigns = await db
//       .select()
//       .from(campaignsTable);

//     return NextResponse.json(campaigns);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to fetch campaigns" },
//       { status: 500 }
//     );
//   }
// }

// // ===================== POST =====================
// export async function POST(req: Request) {
//   const { name, status } = await req.json();

//   if (!name)
//     return NextResponse.json({ error: "Campaign name required" }, { status: 400 });

//   try {
//     const [inserted] = await db
//       .insert(campaignsTable)
//       .values({
//         name,
//         status: status || "draft",
//       })
//       .returning();

//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to create campaign" },
//       { status: 500 }
//     );
//   }
// }

// // ===================== PUT =====================
// export async function PUT(req: Request) {
//   const { id, name, status, totalleads, successfulleads, responserate } =
//     await req.json();

//   if (!id)
//     return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(campaignsTable)
//       .set({
//         ...(name && { name }),
//         ...(status && { status }),
//         ...(totalleads !== undefined && { totalleads }),
//         ...(successfulleads !== undefined && { successfulleads }),
//         ...(responserate !== undefined && { responserate }),
//       })
//       .where(eq(campaignsTable.id, Number(id)))
//       .returning();

//     if (!updated)
//       return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to update campaign" },
//       { status: 500 }
//     );
//   }
// }

// // ===================== DELETE =====================
// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (!id)
//     return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     await db
//       .delete(campaignsTable)
//       .where(eq(campaignsTable.id, Number(id)));

//     return NextResponse.json({ message: "Campaign deleted" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to delete campaign" },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { campaignsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Helper: get userId from session
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

// // ===================== GET =====================
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const campaigns = await db
//       .select()
//       .from(campaignsTable)
//       .where(eq(campaignsTable.user_id, userId)); // user-specific
//     return NextResponse.json(campaigns);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
//   }
// }

// // ===================== POST =====================
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, status } = await req.json();
//   if (!name) return NextResponse.json({ error: "Campaign name required" }, { status: 400 });

//   try {
//     // const [inserted] = await db
//     //   .insert(campaignsTable)
//     //   .values({
//     //     name,
//     //     status: status || "draft",
//     //     user_id: userId,
//     //   })
//     //   .returning();
//     const [inserted] = await db
//   .insert(campaignsTable)
//   .values({
//     name,
//     status: status || "draft",
//     user_id: userId,
//     createddate: new Date().toISOString(), // ✅ auto-set
//     totalleads: "0",
//     successfulleads: "0",
//     responserate: "0%",
//   })
//   .returning();


//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
//   }
// }

// // ===================== PUT =====================
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, status, totalleads, successfulleads, responserate } = await req.json();
//   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(campaignsTable)
//       .set({
//         ...(name && { name }),
//         ...(status && { status }),
//         ...(totalleads !== undefined && { totalleads }),
//         ...(successfulleads !== undefined && { successfulleads }),
//         ...(responserate && { responserate }),
//       })
//       .where(
//         and(
//           eq(campaignsTable.id, Number(id)),
//           eq(campaignsTable.user_id, userId) // user-specific update
//         )
//       )
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
//   }
// }

// // ===================== DELETE =====================
// // export async function DELETE(req: Request) {
// //   const userId = await getUserId();
// //   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// //   const { searchParams } = new URL(req.url);
// //   const id = searchParams.get("id");
// //   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

// //   try {
// //     await db
// //       .delete(campaignsTable)
// //       .where(
// //         and(
// //           eq(campaignsTable.id, Number(id)),
// //           eq(campaignsTable.user_id, userId) // user-specific delete
// //         )
// //       );

// //     return NextResponse.json({ message: "Campaign deleted" });
// //   } catch (err) {
// //     console.error(err);
// //     return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
// //   }
// // }





// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { campaignsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Helper: get userId from session
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

// // ===================== GET =====================
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const campaigns = await db
//       .select()
//       .from(campaignsTable)
//       .where(eq(campaignsTable.user_id, userId)); // user-specific
//     return NextResponse.json(campaigns);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
//   }
// }

// // ===================== POST =====================
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, status } = await req.json();
//   if (!name) return NextResponse.json({ error: "Campaign name required" }, { status: 400 });

//   try {
//     // const [inserted] = await db
//     //   .insert(campaignsTable)
//     //   .values({
//     //     name,
//     //     status: status || "draft",
//     //     user_id: userId,
//     //   })
//     //   .returning();
//     const [inserted] = await db
//   .insert(campaignsTable)
//   .values({
//     name,
//     status: status || "draft",
//     user_id: userId,
//     createddate: new Date().toISOString(), // ✅ auto-set
//     totalleads: "0",
//     successfulleads: "0",
//     responserate: "0%",
//   })
//   .returning();


//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
//   }
// }

// // ===================== PUT =====================
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, status, totalleads, successfulleads, responserate } = await req.json();
//   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(campaignsTable)
//       .set({
//         ...(name && { name }),
//         ...(status && { status }),
//         ...(totalleads !== undefined && { totalleads }),
//         ...(successfulleads !== undefined && { successfulleads }),
//         ...(responserate && { responserate }),
//       })
//       .where(
//         and(
//           eq(campaignsTable.id, Number(id)),
//           eq(campaignsTable.user_id, userId) // user-specific update
//         )
//       )
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
//   }
// }

// // ===================== DELETE =====================
// // export async function DELETE(req: Request) {
// //   const userId = await getUserId();
// //   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// //   const { searchParams } = new URL(req.url);
// //   const id = searchParams.get("id");
// //   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

// //   try {
// //     await db
// //       .delete(campaignsTable)
// //       .where(
// //         and(
// //           eq(campaignsTable.id, Number(id)),
// //           eq(campaignsTable.user_id, userId) // user-specific delete
// //         )
// //       );

// //     return NextResponse.json({ message: "Campaign deleted" });
// //   } catch (err) {
// //     console.error(err);
// //     return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
// //   }
// // }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const id = params.id;
//   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     const deleted = await db
//       .delete(campaignsTable)
//       .where(
//         and(
//           eq(campaignsTable.id, Number(id)),
//           eq(campaignsTable.user_id, userId) // delete only your own campaign
//         )
//       )
//       .returning();

//     if (!deleted.length) {
//       return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Campaign deleted", deleted: deleted[0] });
//   } catch (err) {
//     console.error("DELETE /campaigns error", err);
//     return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { campaignsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // Helper: get userId from session
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

// // ===================== GET =====================
// export async function GET() {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const campaigns = await db
//       .select()
//       .from(campaignsTable)
//       .where(eq(campaignsTable.userId, userId)); // user-specific
      
//     return NextResponse.json(campaigns);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
//   }
// }

// // ===================== POST =====================
// export async function POST(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name, status } = await req.json();
//   if (!name) return NextResponse.json({ error: "Campaign name required" }, { status: 400 });

//   try {
//     // const [inserted] = await db
//     //   .insert(campaignsTable)
//     //   .values({
//     //     name,
//     //     status: status || "draft",
//     //     user_id: userId,
//     //   })
//     //   .returning();
//     const [inserted] = await db
//   .insert(campaignsTable)
//   .values({
//     name,
//     status: status || "draft",
//     user_id: userId,
//     createddate: new Date().toISOString(), // ✅ auto-set
//     totalleads: "0",
//     successfulleads: "0",
//     responserate: "0%",
//   })
//   .returning();


//     return NextResponse.json(inserted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
//   }
// }

// // ===================== PUT =====================
// export async function PUT(req: Request) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id, name, status, totalleads, successfulleads, responserate } = await req.json();
//   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     const [updated] = await db
//       .update(campaignsTable)
//       .set({
//         ...(name && { name }),
//         ...(status && { status }),
//         ...(totalleads !== undefined && { totalleads }),
//         ...(successfulleads !== undefined && { successfulleads }),
//         ...(responserate && { responserate }),
//       })
//       .where(
//         and(
//           eq(campaignsTable.id, Number(id)),
//           eq(campaignsTable.userId, userId) // user-specific update
//         )
//       )
//       .returning();

//     if (!updated) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
//   }
// }

// // ===================== DELETE =====================
// // export async function DELETE(req: Request) {
// //   const userId = await getUserId();
// //   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// //   const { searchParams } = new URL(req.url);
// //   const id = searchParams.get("id");
// //   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

// //   try {
// //     await db
// //       .delete(campaignsTable)
// //       .where(
// //         and(
// //           eq(campaignsTable.id, Number(id)),
// //           eq(campaignsTable.user_id, userId) // user-specific delete
// //         )
// //       );

// //     return NextResponse.json({ message: "Campaign deleted" });
// //   } catch (err) {
// //     console.error(err);
// //     return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
// //   }
// // }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const userId = await getUserId();
//   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const id = params.id;
//   if (!id) return NextResponse.json({ error: "Campaign ID required" }, { status: 400 });

//   try {
//     const deleted = await db
//       .delete(campaignsTable)
//       .where(
//         and(
//           eq(campaignsTable.id, Number(id)),
//           eq(campaignsTable.userId, userId) // delete only your own campaign
//         )
//       )
//       .returning();

//     if (!deleted.length) {
//       return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Campaign deleted", deleted: deleted[0] });
//   } catch (err) {
//     console.error("DELETE /campaigns error", err);
//     return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { campaignsTable, usersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Helper: get userId from session
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

// ===================== GET =====================
export async function GET() {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const campaigns = await db
      .select()
      .from(campaignsTable)
      .where(eq(campaignsTable.user_id, userId));

    return NextResponse.json(campaigns);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

// ===================== POST =====================
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, status } = await req.json();
  if (!name)
    return NextResponse.json(
      { error: "Campaign name required" },
      { status: 400 }
    );

  try {
    // const [inserted] = await db
    //   .insert(campaignsTable)
    //   .values({
    //     name,
    //     status: status || "draft",
    //     userId, // ✅ correct
    //     createdDate: new Date(), // ✅ timestamp
    //     totalLeads: 0,
    //     successfulLeads: 0,
    //     responseRate: 0,
    //   })
    //   .returning();
    const [inserted] = await db
  .insert(campaignsTable)
  .values({
    name,
    status: status || "draft",
    user_id:userId,              // ✅ correct field
    // don’t pass createdDate, totalLeads, successfulLeads, responseRate → defaults kick in
  })
  .returning();


    return NextResponse.json(inserted);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}

// ===================== PUT =====================
export async function PUT(req: Request) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const {
    id,
    name,
    status,
    totalLeads,
    successfulLeads,
    responseRate,
  } = await req.json();
  if (!id)
    return NextResponse.json(
      { error: "Campaign ID required" },
      { status: 400 }
    );

  try {
    const [updated] = await db
      .update(campaignsTable)
      .set({
        ...(name && { name }),
        ...(status && { status }),
        ...(totalLeads !== undefined && { totalLeads }),
        ...(successfulLeads !== undefined && { successfulLeads }),
        ...(responseRate !== undefined && { responseRate }),
      })
      .where(
        and(
          eq(campaignsTable.id, Number(id)),
          eq(campaignsTable.user_id, userId)
        )
      )
      .returning();

    if (!updated)
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
}
