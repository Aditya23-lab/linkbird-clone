// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: NextRequest) {
//   try {
//     const body = (await req.json()) as {
//       name?: string;
//       email?: string;
//       password?: string;
//     };
//     const { name, email, password } = body;

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRe.test(email)) {
//       return NextResponse.json({ error: "Invalid email" }, { status: 400 });
//     }

//     const existing = await prisma.user.findUnique({ where: { email } });
//     if (existing) {
//       return NextResponse.json({ error: "User already exists" }, { status: 400 });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: { name, email, password: hashed },
//       select: { id: true, email: true, name: true,  },
//     });

//     return NextResponse.json({ message: "User created", user }, { status: 201 });
//   } catch (error) {
//     console.error("register error:", error);
//     console.error("Error details:", error instanceof Error ? error.message : error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
// working
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, password } = await req.json();

//     if (!email || !password || !name) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRe.test(email)) {
//       return NextResponse.json({ error: "Invalid email" }, { status: 400 });
//     }

//     const existing = await prisma.user.findUnique({ where: { email } });
//     if (existing) {
//       return NextResponse.json({ error: "User already exists" }, { status: 400 });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: { name, email, password: hashed, username: email.split("@")[0] },
//       select: { id: true, name: true, email: true },
//     });

//     return NextResponse.json({ message: "User created", user }, { status: 201 });
//   } catch (error) {
//     console.error("register error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const username = email.split("@")[0];

    // Check if user exists
    const existing = await db
      .select()
      .from(usersTable)
      // .where(usersTable.email.eq(email));
      .where(eq(usersTable.email, email))


    if (existing.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [insertedUser] = await db
      .insert(usersTable)
      .values({
        name,
        username,
        email,
        password: hashedPassword,
        emailVerified: null,
        image: null,
      })
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        username: usersTable.username,
      });

    return NextResponse.json({ message: "User created", user: insertedUser }, { status: 201 });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    // Extra logging to see DB error
    if (err?.cause) console.error("DB Cause:", err.cause);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
