// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { campaignsTable, usersTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// // helper: get user id from session
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

// // ===================== PUT (Update campaign) =====================
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const userId = await getUserId();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { name, status, totalleads, successfulleads, responserate } =
//     await req.json();

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
//           eq(campaignsTable.id, Number(params.id)),
//           eq(campaignsTable.user_id, userId)
//         )
//       )
//       .returning();

//     if (!updated) {
//       return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
//     }

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error("PUT /campaigns/:id error:", err);
//     return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
//   }
// }

// // ===================== DELETE (Delete campaign) =====================
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const userId = await getUserId();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const deleted = await db
//       .delete(campaignsTable)
//       .where(
//         and(
//           eq(campaignsTable.id, Number(params.id)),
//           eq(campaignsTable.user_id, userId)
//         )
//       )
//       .returning();

//     if (!deleted.length) {
//       return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       message: "Campaign deleted",
//       deleted: deleted[0],
//     });
//   } catch (err) {
//     console.error("DELETE /campaigns/:id error:", err);
//     return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { campaignsTable, usersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// helper: get user id from session
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

// ===================== PUT (Update campaign) =====================
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, status, totalleads, successfulleads, responserate } =
    await req.json();

  try {
    const [updated] = await db
      .update(campaignsTable)
      .set({
        ...(name && { name }),
        ...(status && { status }),
        ...(totalleads !== undefined && { totalleads }),
        ...(successfulleads !== undefined && { successfulleads }),
        ...(responserate && { responserate }),
      })
      .where(
        and(
          eq(campaignsTable.id, Number(params.id)),
          eq(campaignsTable.user_id, userId)   // ✅ fixed
        )
      )
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /campaigns/:id error:", err);
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
}

// ===================== DELETE (Delete campaign) =====================
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await db
      .delete(campaignsTable)
      .where(
        and(
          eq(campaignsTable.id, Number(params.id)),
          eq(campaignsTable.user_id, userId)   // ✅ fixed
        )
      )
      .returning();

    if (!deleted.length) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Campaign deleted",
      deleted: deleted[0],
    });
  } catch (err) {
    console.error("DELETE /campaigns/:id error:", err);
    return NextResponse.json(
      { error: "Failed to delete campaign" },
      { status: 500 }
    );
  }
}
