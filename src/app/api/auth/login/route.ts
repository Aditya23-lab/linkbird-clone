// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const prisma = new PrismaClient();
// const JWT_SECRET = process.env.NEXTAUTH_SECRET || "secret"; // fallback for dev

// export async function POST(req:Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password required" }, { status: 400 });
//     }

//     // Find user
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // Check password
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // Create JWT
//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

//     return NextResponse.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { prisma } from "@/lib/prisma";

// const JWT_SECRET = process.env.NEXTAUTH_SECRET || "secret";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();

//     console.log("Login request:", { email, password });

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password required" }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({ where: { email } });
//     console.log("User found:", user);

//     if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     const isValid = await bcrypt.compare(password, user.password);
//     console.log("Password valid:", isValid);

//     if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

//     console.log("JWT token:", token);

//     return NextResponse.json({ message: "Login successful", token });
//   } catch (err) {
//     console.error("Login error:", err);
//     return NextResponse.json({ error: err instanceof Error ? err.message : "Internal Server Error" }, { status: 500 });
//   }
// }




// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { db } from "@/lib/db";            // Drizzle DB
// import { usersTable } from "@/db/schema"; // Drizzle schema
// import { eq } from "drizzle-orm";
// import jwt from "jsonwebtoken";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password required" }, { status: 400 });
//     }

//     // Find user by email
//     const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

//     if (!user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // Compare password
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // Create JWT token (or you can integrate with NextAuth if you want)
//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.NEXTAUTH_SECRET!,
//       { expiresIn: "7d" }
//     );

//     return NextResponse.json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email } });
//   } catch (error) {
//     console.error("login error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";            // Drizzle DB
import { usersTable } from "@/db/schema"; // Drizzle schema
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Fetch user by email
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
    const user = users[0];

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        image: user.image,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
