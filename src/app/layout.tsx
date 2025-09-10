// import './globals.css';

// export const metadata = {
//   title: 'LinkBird Clone',
//   description: 'Next.js + Tailwind v4 Setup',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gray-100 text-gray-900 font-sans flex flex-col">
//         {/* Header */}
//         <header className="bg-white shadow-md p-4">
//           <div className="container mx-auto flex justify-between items-center">
//             <h1 className="text-xl font-bold">LinkBird Clone</h1>
//             <nav className="space-x-6">
//               <a href="/" className="hover:text-blue-600 transition-colors">
//                 Home
//               </a>
//               <a href="/about" className="hover:text-blue-600 transition-colors">
//                 About
//               </a>
//             </nav>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-grow">{children}</main>

//         {/* Footer */}
//         <footer className="bg-white text-center p-4 shadow-inner mt-8">
//           &copy; 2025 LinkBird Clone
//         </footer>
//       </body>
//     </html>
//   );
// }



// // src/app/layout.tsx
// "use client";

// import { SessionProvider } from "next-auth/react";
// import "./globals.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider>{children}</SessionProvider>
//       </body>
//     </html>
//   );
// }



// src/app/layout.tsx
// "use client";

// import { SessionProvider } from "next-auth/react";
// import Link from "next/link";
// import { useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";
// import "./globals.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isOpen, setIsOpen] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter();

//   const navItems = [
//     { name: "Dashboard", href: "/dashboard" },
//     { name: "Leads", href: "/leads" },
//     { name: "Campaigns", href: "/campaigns" },
//     { name: "Settings", href: "/settings" },
//   ];

//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider>
//           <div className="flex min-h-screen bg-gray-100">
//             {/* Sidebar */}
//             <aside
//               className={`${
//                 isOpen ? "w-64" : "w-16"
//               } bg-white shadow-md transition-all duration-300 flex flex-col`}
//             >
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-4 text-gray-500 hover:text-black"
//               >
//                 {isOpen ? "◀" : "▶"}
//               </button>

//               <nav className="flex-1">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`block px-4 py-2 text-sm ${
//                       pathname === item.href
//                         ? "bg-blue-500 text-white rounded"
//                         : "text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     {isOpen ? item.name : item.name[0]}
//                   </Link>
//                 ))}
//               </nav>

//               <button
//                 onClick={() => signOut({ callbackUrl: "/login" })}
//                 className="m-4 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
//               >
//                 Logout
//               </button>
//             </aside>

//             {/* Main content */}
//             <main className="flex-1 flex flex-col">
//               {/* Header */}
//               <header className="bg-white shadow-md p-4 flex justify-between items-center">
//                 <h1 className="text-xl font-bold">
//                   {pathname.replace("/", "").toUpperCase() || "DASHBOARD"}
//                 </h1>
//                 <p className="text-sm text-gray-500">LinkBird Clone</p>
//               </header>

//               {/* Page content */}
//               <div className="p-6">{children}</div>
//             </main>
//           </div>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }
// working



// "use client";

// import { SessionProvider } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import Sidebar from "@/components/layout/Sidebar";
// import "./globals.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   // Hide sidebar & header on login/register pages
//   const hideLayout = pathname === "/login" || pathname === "/register";

//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider>
//           <div className="flex min-h-screen bg-gray-100">
//             {!hideLayout && <Sidebar />}

//             {/* Main content */}
//             <main className="flex-1 flex flex-col">
//               {/* Header */}
//               {!hideLayout && (
//                 <header className="bg-white shadow-md p-4 flex justify-between items-center">
//                   <h1 className="text-xl font-bold">
//                     {pathname.replace("/", "").toUpperCase() || "DASHBOARD"}
//                   </h1>
//                   <p className="text-sm text-gray-500">LinkBird Clone</p>
//                 </header>
//               )}

//               {/* Page content */}
//               <div className="p-6">{children}</div>
//             </main>
//           </div>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }


"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="flex min-h-screen bg-gray-100">
            {!hideLayout && <Sidebar />}

            <main className="flex-1 flex flex-col min-h-screen">
              {!hideLayout && (
                <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
                  <h1 className="text-xl font-bold">
                    {pathname.replace("/", "").toUpperCase() || "DASHBOARD"}
                  </h1>
                  <p className="text-sm text-gray-500">LinkBird Clone</p>
                </header>
              )}

              <div className="flex-1 p-6 overflow-auto">{children}</div>
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
