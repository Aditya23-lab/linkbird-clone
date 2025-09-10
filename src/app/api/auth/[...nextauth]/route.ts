

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) return null;

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) return null;

//         return { id: user.id, name: user.name, email: user.email };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       // Always send user to dashboard after login
//       return `${baseUrl}/dashboard`;
//     },
//     async session({ session, token }) {
//       if (token) {
//         (session.user as any).id = token.sub; // store user id in session
//       }
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };




// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) return null;

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isValid) return null;

//         return { id: user.id, name: user.name, email: user.email };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       // when user first logs in, attach their id
//       if (user) {
//         token.id = (user as any).id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // always make sure session.user has the id
//       if (token && session.user) {
//         (session.user as any).id = token.id;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // always go to dashboard
//       return `${baseUrl}/dashboard`;
//     },
//   },
// });

// export { handler as GET, handler as POST };




// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });
//         if (!user) return null;

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) return null;

//         return { id: user.id, name: user.name, email: user.email };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async redirect({ baseUrl }) {
//       return `${baseUrl}/dashboard`; // always go to dashboard
//     },
//     async session({ session, token }) {
//       if (token) {
//         (session.user as any).id = token.sub;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };



import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";               // Drizzle DB
import { usersTable } from "@/db/schema";   // Users table
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  providers: [
    // Google login (unchanged)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials login (using Drizzle)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
         console.log("Attempt login with:", credentials);

        if (!credentials?.email || !credentials.password) return null;

        // Fetch user from Drizzle
        const users = await db
          .select()
          .from(usersTable)
          // .where(usersTable.email.eq(credentials.email))
           .where(eq(usersTable.email, credentials.email))
          .limit(1);
           console.log("Fetched users:", users);

        if (!users || users.length === 0) return null;

        const user = users[0];

        // Check password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        console.log("Password valid?", isValid);
        if (!isValid) return null;

        // Return user object
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    // Redirect after login
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },

    // Add user ID to session
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
