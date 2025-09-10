

// export default function Home() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <button className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600">
//         Tailwind Works 🎉
//       </button>
//     </div>
//   )
// }



// export default function Home() {
//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
//         <div className="container mx-auto text-center px-6">
//           <h1 className="text-5xl font-extrabold mb-6">
//             Welcome to LinkBird 🚀
//           </h1>
//           <p className="text-lg max-w-2xl mx-auto mb-8">
//             A modern platform where you can manage and share links, notes, and
//             resources with ease. Built with Next.js 15 + Tailwind v4.
//           </p>
//           <a
//             href="/about"
//             className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
//           >
//             Learn More
//           </a>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-gray-100">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Why use LinkBird?
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Card 1 */}
//             <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold mb-4">📂 Organized</h3>
//               <p className="text-gray-600">
//                 Keep your links and resources neatly categorized for quick
//                 access anytime.
//               </p>
//             </div>

//             {/* Card 2 */}
//             <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold mb-4">⚡ Fast & Modern</h3>
//               <p className="text-gray-600">
//                 Powered by Next.js 15 and Tailwind v4, enjoy blazing fast
//                 performance and smooth UI.
//               </p>
//             </div>

//             {/* Card 3 */}
//             <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold mb-4">🤝 Collaborative</h3>
//               <p className="text-gray-600">
//                 Share notes, papers, and resources with classmates and friends
//                 effortlessly.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
//working

// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       email,
//       password,
//       callbackUrl: "/dashboard", // ✅ NextAuth handles redirect
//     });

//     if (res?.error) {
//       setMessage("❌ " + res.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4">
//         <h1 className="text-2xl font-bold">Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//           Login
//         </button>

//         {/* Google login */}
//         <button
//           type="button"
//           onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
//           className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
//         >
//           Sign in with Google
//         </button>

//         {message && <p className="text-sm mt-2">{message}</p>}
//       </form>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       redirect: true,
//       callbackUrl: "/dashboard",
//       email,
//       password,
//     });

//     if (res?.error) {
//       setMessage("❌ " + res.error);
//     } else {
//       setMessage("✅ Login successful!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4">
//         <h1 className="text-2xl font-bold">Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//           Login
//         </button>

//         {/* Google login button */}
//         <button
//           type="button"
//           onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
//           className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
//         >
//           Sign in with Google
//         </button>

//         {message && <p className="text-sm mt-2">{message}</p>}
//       </form>
//     </div>
//   );
// }



// "use client";

// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//       <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">
//         Welcome to LinkBird Clone
//       </h1>

//       <p className="text-center mb-8 text-gray-600 max-w-md">
//         Manage your campaigns, leads, and links all in one place. Sign up or log in to get started.
//       </p>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <Link
//           href="/login"
//           className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
//         >
//           Login
//         </Link>
//         <Link
//           href="/register"
//           className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
//         >
//           Register
//         </Link>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // wait for session check

    if (session) {
      // If logged in, redirect to dashboard
      router.replace("/dashboard");
    } else {
      // If not logged in, redirect to register
      router.replace("/register");
    }
  }, [session, status, router]);

  return null; // nothing to render
}
