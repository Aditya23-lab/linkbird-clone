// "use client";

// import Link from "next/link";
// import { useSidebarStore } from "@/lib/store/sidebar";
// import { Home, Users, FolderKanban, Settings } from "lucide-react";

// export default function Sidebar() {
//   const { isOpen, toggle } = useSidebarStore();

//   return (
//     <aside
//       className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${
//         isOpen ? "w-64" : "w-16"
//       }`}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={toggle}
//         className="p-4 hover:bg-gray-800 focus:outline-none"
//       >
//         {isOpen ? "<" : ">"}
//       </button>

//       {/* Navigation */}
//       <nav className="flex-1">
//         <ul className="space-y-2 px-2">
//           <li>
//             <Link
//               href="/dashboard"
//               className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
//             >
//               <Home size={20} />
//               {isOpen && <span>Dashboard</span>}
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/leads"
//               className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
//             >
//               <Users size={20} />
//               {isOpen && <span>Leads</span>}
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/campaigns"
//               className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
//             >
//               <FolderKanban size={20} />
//               {isOpen && <span>Campaigns</span>}
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/settings"
//               className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
//             >
//               <Settings size={20} />
//               {isOpen && <span>Settings</span>}
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }




// "use client";

// import Link from "next/link";
// import { useSidebarStore } from "@/lib/store/sidebar";
// import { Home, Users, FolderKanban, Settings, Menu, X } from "lucide-react";
// import { useState } from "react";

// export default function Sidebar() {
//   const { isOpen, toggle } = useSidebarStore();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleMobileToggle = () => setMobileOpen(!mobileOpen);

//   const navLinks = [
//     { href: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
//     { href: "/leads", icon: <Users size={20} />, label: "Leads" },
//     { href: "/campaigns", icon: <FolderKanban size={20} />, label: "Campaigns" },
//     { href: "/settings", icon: <Settings size={20} />, label: "Settings" },
//   ];

//   return (
//     <>
//       {/* Mobile Top Bar */}
//       <div className="md:hidden flex justify-between items-center bg-gray-900 text-white p-2">
//         <button onClick={handleMobileToggle}>
//           {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//         <span className="font-bold">LinkBird</span>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed md:relative z-20 h-screen bg-gray-900 text-white flex flex-col transition-all duration-300
//           ${isOpen ? "w-64" : "w-20"} 
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
//           md:translate-x-0
//         `}
//       >
//         {/* Toggle Button (Desktop Only) */}
//         <div className="hidden md:flex justify-end p-2">
//           <button
//             onClick={toggle}
//             className="p-2 hover:bg-gray-800 rounded focus:outline-none"
//           >
//             {isOpen ? "<" : ">"}
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto">
//           <ul className="space-y-2 px-2 py-4">
//             {navLinks.map((link) => (
//               <li key={link.href}>
//                 <Link
//                   href={link.href}
//                   className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 whitespace-nowrap"
//                   onClick={() => setMobileOpen(false)} // Close on mobile
//                 >
//                   {link.icon}
//                   {isOpen && <span>{link.label}</span>}
//                   {/* Mobile always show label */}
//                   {!isOpen && <span className="md:hidden">{link.label}</span>}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       {/* Overlay for Mobile */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}
//     </>
//   );
// }



// "use client";

// import Link from "next/link";
// import { useSidebarStore } from "@/lib/store/sidebar";
// import { Home, Users, FolderKanban, Settings } from "lucide-react";

// export default function Sidebar() {
//   const { isOpen, toggle } = useSidebarStore();

//   const links = [
//     { href: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
//     { href: "/leads", label: "Leads", icon: <Users size={20} /> },
//     { href: "/campaigns", label: "Campaigns", icon: <FolderKanban size={20} /> },
//     { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
//     // Add more links if needed
//   ];

//   return (
//     <aside
//       className={`bg-gray-900 text-white flex flex-col transition-all duration-300
//         ${isOpen ? "w-64" : "w-16"}
//       `}
//       style={{ minHeight: "100%", maxHeight: "100%", overflowY: "auto" }}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={toggle}
//         className="p-4 hover:bg-gray-800 focus:outline-none self-end"
//       >
//         {isOpen ? "<" : ">"}
//       </button>

//       {/* Navigation */}
//       <nav className="flex-1">
//         <ul className="space-y-2 px-2">
//           {links.map((link) => (
//             <li key={link.href}>
//               <Link
//                 href={link.href}
//                 className={`flex items-center gap-2 p-2 rounded hover:bg-gray-800 ${
//                   isOpen ? "" : "justify-center"
//                 }`}
//               >
//                 {link.icon}
//                 {isOpen && <span className="whitespace-nowrap">{link.label}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// }



"use client";

import Link from "next/link";
import { useSidebarStore } from "@/lib/store/sidebar";
import { Home, Users, FolderKanban, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <aside
      className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
      style={{ minHeight: "100vh" }} // ensures sidebar covers full viewport
    >
      {/* Toggle Button */}
      <button
        onClick={toggle}
        className="p-4 hover:bg-gray-800 focus:outline-none"
      >
        {isOpen ? "<" : ">"}
      </button>

      {/* Navigation - scrollable if content exceeds height */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 px-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
            >
              <Home size={20} />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/leads"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
            >
              <Users size={20} />
              {isOpen && <span>Leads</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/campaigns"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
            >
              <FolderKanban size={20} />
              {isOpen && <span>Campaigns</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
            >
              <Settings size={20} />
              {isOpen && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout button always at bottom */}
      <div className="p-2">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 p-2 w-full rounded hover:bg-gray-800"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
