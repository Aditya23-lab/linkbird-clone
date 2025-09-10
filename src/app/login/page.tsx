


// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // const res = await signIn("credentials", {
//     //   redirect: false,
//     //   email,
//     //   password,
//     // });
//     const res = await signIn("credentials", {
//   redirect: true,        // let NextAuth handle redirect
//   callbackUrl: "/dashboard",
//   email,
//   password,
// });


//     if (res?.error) {
//       setMessage("❌ " + res.error);
//     } else {
//       setMessage("✅ Login successful!");
//       setTimeout(() => router.push("/dashboard"), 1000);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
//       >
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

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
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
//       callbackUrl: "/dashboard", // NextAuth will handle redirect
//       email,
//       password,
//     });

//     if (res?.error) {
//       setMessage("❌ " + res.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
//       >
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

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
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


"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: true,
      callbackUrl: "/dashboard",
      email,
      password,
    });

    if (res?.error) {
      setMessage("❌ " + res.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section: Branding / Image */}
      <div className="hidden md:flex flex-1 bg-blue-500 justify-center items-center">
        <h1 className="text-white text-4xl font-bold">LinkBird</h1>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {message && (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
