


// "use client";

// import { useState, useEffect } from "react";

// export default function DashboardPage() {
//   const [links, setLinks] = useState<any[]>([]);
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null); // track which link is being edited
//   const [editTitle, setEditTitle] = useState("");
//   const [editUrl, setEditUrl] = useState("");

//   useEffect(() => {
//     fetch("/api/link")
//       .then((res) => res.json())
//       .then((data) => setLinks(data));
//   }, []);

//   // Add new link
//   const handleAdd = async () => {
//     const res = await fetch("/api/link", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, url }),
//     });

//     if (res.ok) {
//       const newLink = await res.json();
//       setLinks([...links, newLink]);
//       setTitle("");
//       setUrl("");
//     }
//   };

//   // Delete link
//   const handleDelete = async (id: string) => {
//     await fetch(`/api/link/${id}`, { method: "DELETE" });
//     setLinks(links.filter((link) => link.id !== id));
//   };

//   // Save edited link
//   const handleEditSave = async (id: string) => {
//     const res = await fetch(`/api/link/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: editTitle, url: editUrl }),
//     });

//     if (res.ok) {
//       const updated = await res.json();
//       setLinks(links.map((link) => (link.id === id ? updated : link)));
//       setEditingId(null); // exit edit mode
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Your Links</h1>

//       {/* Add new link */}
//       <div className="flex gap-2 mb-6">
//         <input
//           className="border p-2 rounded flex-1"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           className="border p-2 rounded flex-1"
//           placeholder="https://example.com"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />
//         <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add
//         </button>
//       </div>

//       {/* List links */}
//       <ul className="space-y-2">
//         {links.map((link) => (
//           <li key={link.id} className="flex items-center justify-between border p-2 rounded">
//             {editingId === link.id ? (
//               <>
//                 <input
//                   className="border p-1 rounded flex-1 mr-2"
//                   value={editTitle}
//                   onChange={(e) => setEditTitle(e.target.value)}
//                 />
//                 <input
//                   className="border p-1 rounded flex-1 mr-2"
//                   value={editUrl}
//                   onChange={(e) => setEditUrl(e.target.value)}
//                 />
//                 <button
//                   onClick={() => handleEditSave(link.id)}
//                   className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditingId(null)}
//                   className="bg-gray-400 text-white px-2 py-1 rounded"
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <span>{link.title}</span>
//                 {/* <a href={link.url} className="text-blue-500 underline ml-2" target="_blank">
//                   {link.url}
//                 </a> */}
//                 <a
//   href={`/api/r/${link.id}`}   // 👈 goes through redirect
//   className="text-blue-500 underline ml-2"
//   target="_blank"
// >
//   {link.url}
// </a>
// <span className="ml-2 text-sm text-gray-600">({link.clicks} clicks)</span>

//                 <div className="flex gap-2 ml-auto">
//                   <button
//                     onClick={() => {
//                       setEditingId(link.id);
//                       setEditTitle(link.title);
//                       setEditUrl(link.url);
//                     }}
//                     className="bg-yellow-500 text-white px-2 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(link.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";

// interface Link {
//   id: number;
//   title: string;
//   url: string;
//   clicks?: number;
// }

// export default function DashboardPage() {
//   const [links, setLinks] = useState<Link[]>([]);
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editUrl, setEditUrl] = useState("");

//   // Fetch links on mount
//   useEffect(() => {
//     fetch("/api/link")
//       .then((res) => res.json())
//       .then((data: Link[]) => setLinks(data));
//   }, []);

//   // Add new link
//   const handleAdd = async () => {
//     if (!title || !url) return;

//     const res = await fetch("/api/link", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, url }),
//     });

//     if (res.ok) {
//       const newLink: Link = await res.json();
//       setLinks([...links, newLink]);
//       setTitle("");
//       setUrl("");
//     }
//   };

//   // Delete link
//   const handleDelete = async (id: number) => {
//     await fetch(`/api/link/${id}`, { method: "DELETE" });
//     setLinks(links.filter((link) => link.id !== id));
//   };

//   // Save edited link
//   const handleEditSave = async (id: number) => {
//     const res = await fetch(`/api/link/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: editTitle, url: editUrl }),
//     });

//     if (res.ok) {
//       const updated: Link = await res.json();
//       setLinks(links.map((link) => (link.id === id ? updated : link)));
//       setEditingId(null);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Your Links</h1>

//       {/* Add new link */}
//       <div className="flex gap-2 mb-6">
//         <input
//           className="border p-2 rounded flex-1"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           className="border p-2 rounded flex-1"
//           placeholder="https://example.com"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />
//         <button
//           onClick={handleAdd}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add
//         </button>
//       </div>

//       {/* List links */}
//       <ul className="space-y-2">
//         {links.map((link) => (
//           <li
//             key={link.id}
//             className="flex items-center justify-between border p-2 rounded"
//           >
//             {editingId === link.id ? (
//               <>
//                 <input
//                   className="border p-1 rounded flex-1 mr-2"
//                   value={editTitle}
//                   onChange={(e) => setEditTitle(e.target.value)}
//                 />
//                 <input
//                   className="border p-1 rounded flex-1 mr-2"
//                   value={editUrl}
//                   onChange={(e) => setEditUrl(e.target.value)}
//                 />
//                 <button
//                   onClick={() => handleEditSave(link.id)}
//                   className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditingId(null)}
//                   className="bg-gray-400 text-white px-2 py-1 rounded"
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <span>{link.title}</span>
//                 <a
//                   href={`/api/r/${link.id}`} // redirect link
//                   className="text-blue-500 underline ml-2"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {link.url}
//                 </a>
//                 <span className="ml-2 text-sm text-gray-600">
//                   ({link.clicks ?? 0} clicks)
//                 </span>

//                 <div className="flex gap-2 ml-auto">
//                   <button
//                     onClick={() => {
//                       setEditingId(link.id);
//                       setEditTitle(link.title);
//                       setEditUrl(link.url);
//                     }}
//                     className="bg-yellow-500 text-white px-2 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(link.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";

// interface Link {
//   id: number;
//   title: string;
//   url: string;
//   clicks?: number;
// }

// export default function DashboardPage() {
//   const [links, setLinks] = useState<Link[]>([]);
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editUrl, setEditUrl] = useState("");

//   // Stats state
//   const [totalCampaigns, setTotalCampaigns] = useState(0);
//   const [totalLeads, setTotalLeads] = useState(0);
//   const [successfulLeads, setSuccessfulLeads] = useState(0);
//   const [responseRate, setResponseRate] = useState("0%");

//   // Fetch links
//   useEffect(() => {
//     fetch("/api/auth/link")
//       .then((res) => res.json())
//       .then((data: Link[]) => setLinks(data))
//       .catch((err) => console.error("Error fetching links:", err));
//   }, []);

//   // Fetch stats
//   useEffect(() => {
//     fetch("/api/auth/dashboard")
//       .then((res) => res.json())
//       .then((data) => {
//         setTotalCampaigns(data.totalCampaigns);
//         setTotalLeads(data.totalLeads);
//         setSuccessfulLeads(data.successfulLeads);
//         setResponseRate(`${data.responseRate}%`);
//       })
//       .catch((err) => console.error("Error fetching stats:", err));
//   }, []);

//   // Add new link
//   const handleAdd = async () => {
//     if (!title || !url) return;

//     const res = await fetch("/api/auth/link", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, url }),
//     });

//     if (res.ok) {
//       const newLink: Link = await res.json();
//       setLinks([...links, newLink]);
//       setTitle("");
//       setUrl("");
//     }
//   };

//   // Delete link
//   const handleDelete = async (id: number) => {
//     await fetch(`/api/auth/link/${id}`, { method: "DELETE" });
//     setLinks(links.filter((link) => link.id !== id));
//   };

//   // Save edited link
//   const handleEditSave = async (id: number) => {
//     const res = await fetch(`/api/auth/link/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: editTitle, url: editUrl }),
//     });

//     if (res.ok) {
//       const updated: Link = await res.json();
//       setLinks(links.map((link) => (link.id === id ? updated : link)));
//       setEditingId(null);
//     }
//   };

//   return (
//     <div className="p-6 space-y-8">
//       {/* Stats Section */}
//       <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard title="Total Campaigns" value={totalCampaigns} />
//         <StatCard title="Total Leads" value={totalLeads} />
//         <StatCard title="Successful Leads" value={successfulLeads} />
//         <StatCard title="Response Rate" value={responseRate} />
//       </div>

//       {/* Links CRUD Section */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Your Links</h2>

//         {/* Add new link */}
//         <div className="flex gap-2 mb-6">
//           <input
//             className="border p-2 rounded flex-1"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             className="border p-2 rounded flex-1"
//             placeholder="https://example.com"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </div>

//         {/* List links */}
//         <ul className="space-y-2">
//           {links.map((link) => (
//             <li
//               key={link.id}
//               className="flex items-center justify-between border p-2 rounded"
//             >
//               {editingId === link.id ? (
//                 <>
//                   <input
//                     className="border p-1 rounded flex-1 mr-2"
//                     value={editTitle}
//                     onChange={(e) => setEditTitle(e.target.value)}
//                   />
//                   <input
//                     className="border p-1 rounded flex-1 mr-2"
//                     value={editUrl}
//                     onChange={(e) => setEditUrl(e.target.value)}
//                   />
//                   <button
//                     onClick={() => handleEditSave(link.id)}
//                     className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingId(null)}
//                     className="bg-gray-400 text-white px-2 py-1 rounded"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <span>{link.title}</span>
//                   <a
//                     href={`/api/r/${link.id}`} // redirect link
//                     className="text-blue-500 underline ml-2"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {link.url}
//                   </a>
//                   <span className="ml-2 text-sm text-gray-600">
//                     ({link.clicks ?? 0} clicks)
//                   </span>

//                   <div className="flex gap-2 ml-auto">
//                     <button
//                       onClick={() => {
//                         setEditingId(link.id);
//                         setEditTitle(link.title);
//                         setEditUrl(link.url);
//                       }}
//                       className="bg-yellow-500 text-white px-2 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(link.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// // Simple stat card
// function StatCard({ title, value }: { title: string; value: string | number }) {
//   return (
//     <div className="bg-white p-4 rounded shadow text-center">
//       <h2 className="text-lg font-semibold">{title}</h2>
//       <p className="text-2xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";

// interface Link {
//   id: number;
//   title: string;
//   url: string;
//   clicks?: number;
// }

// export default function DashboardPage() {
//   const [links, setLinks] = useState<Link[]>([]);
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editUrl, setEditUrl] = useState("");

//   // Stats state
//   const [totalCampaigns, setTotalCampaigns] = useState(0);
//   const [totalLeads, setTotalLeads] = useState(0);
//   const [successfulLeads, setSuccessfulLeads] = useState(0);
//   const [responseRate, setResponseRate] = useState("0%");

//   // Fetch links
//   useEffect(() => {
//     fetch("/api/link")
//       .then((res) => res.json())
//       .then((data: Link[]) => setLinks(data))
//       .catch((err) => console.error("Error fetching links:", err));
//   }, []);

//   // Fetch stats
//   useEffect(() => {
//     fetch("/api/auth/dashboard")
//       .then((res) => res.json())
//       .then((data) => {
//         setTotalCampaigns(data.totalCampaigns);
//         setTotalLeads(data.totalLeads);
//         setSuccessfulLeads(data.successfulLeads);
//         setResponseRate(`${data.responseRate}%`);
//       })
//       .catch((err) => console.error("Error fetching stats:", err));
//   }, []);

//   // Add new link
//   const handleAdd = async () => {
//     if (!title || !url) return;

//     const res = await fetch("/api/link", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, url }),
//     });

//     if (res.ok) {
//       const newLink: Link = await res.json();
//       setLinks([...links, newLink]);
//       setTitle("");
//       setUrl("");
//     }
//   };

//   // Delete link
//   const handleDelete = async (id: number) => {
//     await fetch(`/api/link/${id}`, { method: "DELETE" });
//     setLinks(links.filter((link) => link.id !== id));
//   };

//   // Save edited link
//   const handleEditSave = async (id: number) => {
//     const res = await fetch(`/api/link/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: editTitle, url: editUrl }),
//     });

//     if (res.ok) {
//       const updated: Link = await res.json();
//       setLinks(links.map((link) => (link.id === id ? updated : link)));
//       setEditingId(null);
//     }
//   };

//   return (
//     <div className="p-6 space-y-8">
//       {/* Stats Section */}
//       <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard title="Total Campaigns" value={totalCampaigns} />
//         <StatCard title="Total Leads" value={totalLeads} />
//         <StatCard title="Successful Leads" value={successfulLeads} />
//         <StatCard title="Response Rate" value={responseRate} />
//       </div>

//       {/* Links CRUD Section */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Your Links</h2>

//         {/* Add new link */}
//         <div className="flex gap-2 mb-6">
//           <input
//             className="border p-2 rounded flex-1"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             className="border p-2 rounded flex-1"
//             placeholder="https://example.com"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </div>

//         {/* List links */}
//         <ul className="space-y-2">
//           {links.map((link) => (
//             <li
//               key={link.id}
//               className="flex items-center justify-between border p-2 rounded"
//             >
//               {editingId === link.id ? (
//                 <>
//                   <input
//                     className="border p-1 rounded flex-1 mr-2"
//                     value={editTitle}
//                     onChange={(e) => setEditTitle(e.target.value)}
//                   />
//                   <input
//                     className="border p-1 rounded flex-1 mr-2"
//                     value={editUrl}
//                     onChange={(e) => setEditUrl(e.target.value)}
//                   />
//                   <button
//                     onClick={() => handleEditSave(link.id)}
//                     className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingId(null)}
//                     className="bg-gray-400 text-white px-2 py-1 rounded"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <span>{link.title}</span>
//                   <a
//                     href={`/api/r/${link.id}`} // redirect link
//                     className="text-blue-500 underline ml-2"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {link.url}
//                   </a>
//                   <span className="ml-2 text-sm text-gray-600">
//                     ({link.clicks ?? 0} clicks)
//                   </span>

//                   <div className="flex gap-2 ml-auto">
//                     <button
//                       onClick={() => {
//                         setEditingId(link.id);
//                         setEditTitle(link.title);
//                         setEditUrl(link.url);
//                       }}
//                       className="bg-yellow-500 text-white px-2 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(link.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// // Simple stat card
// function StatCard({ title, value }: { title: string; value: string | number }) {
//   return (
//     <div className="bg-white p-4 rounded shadow text-center">
//       <h2 className="text-lg font-semibold">{title}</h2>
//       <p className="text-2xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";

// interface Link {
//   id: number;
//   title: string;
//   url: string;
//   clicks?: number;
// }

// export default function DashboardPage() {
//   const [links, setLinks] = useState<Link[]>([]);
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editUrl, setEditUrl] = useState("");

//   // Stats
//   const [totalCampaigns, setTotalCampaigns] = useState(0);
//   const [totalLeads, setTotalLeads] = useState(0);
//   const [successfulLeads, setSuccessfulLeads] = useState(0);
//   const [responseRate, setResponseRate] = useState("0%");

//   useEffect(() => {
//     fetchLinks();
//     fetchStats();
//   }, []);

//   const fetchLinks = async () => {
//     try {
//       const res = await fetch("/api/link");
//       const data = await res.json();
//       setLinks(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const res = await fetch("/api/auth/dashboard");
//       const data = await res.json();
//       setTotalCampaigns(data.totalCampaigns);
//       setTotalLeads(data.totalLeads);
//       setSuccessfulLeads(data.successfulLeads);
//       setResponseRate(`${data.responseRate}%`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAdd = async () => {
//     if (!title || !url) return;
//     try {
//       const res = await fetch("/api/link", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, url }),
//       });
//       if (res.ok) {
//         const newLink: Link = await res.json();
//         setLinks([...links, newLink]);
//         setTitle("");
//         setUrl("");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     await fetch(`/api/link/${id}`, { method: "DELETE" });
//     setLinks(links.filter((l) => l.id !== id));
//   };

//   const handleEditSave = async (id: number) => {
//     try {
//       const res = await fetch(`/api/link/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title: editTitle, url: editUrl }),
//       });
//       if (res.ok) {
//         const updated: Link = await res.json();
//         setLinks(links.map((l) => (l.id === id ? updated : l)));
//         setEditingId(null);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 space-y-8">
//       {/* Stats Cards */}
//       <h1 className="text-2xl font-bold">Dashboard Overview</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard title="Total Campaigns" value={totalCampaigns} />
//         <StatCard title="Total Leads" value={totalLeads} />
//         <StatCard title="Successful Leads" value={successfulLeads} />
//         <StatCard title="Response Rate" value={responseRate} />
//       </div>

//       {/* Links Section */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Your Links</h2>

//         {/* Add Link */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           <input
//             className="border p-2 rounded flex-1 min-w-[150px]"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             className="border p-2 rounded flex-1 min-w-[150px]"
//             placeholder="https://example.com"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Add
//           </button>
//         </div>

//         {/* Links List */}
//         <ul className="space-y-2">
//           {links.map((link) => (
//             <li
//               key={link.id}
//               className="flex flex-col sm:flex-row sm:items-center border p-2 rounded justify-between gap-2"
//             >
//               {editingId === link.id ? (
//                 <>
//                   <input
//                     className="border p-1 rounded flex-1 min-w-[100px]"
//                     value={editTitle}
//                     onChange={(e) => setEditTitle(e.target.value)}
//                   />
//                   <input
//                     className="border p-1 rounded flex-1 min-w-[100px]"
//                     value={editUrl}
//                     onChange={(e) => setEditUrl(e.target.value)}
//                   />
//                   <div className="flex gap-2 mt-2 sm:mt-0">
//                     <button
//                       onClick={() => handleEditSave(link.id)}
//                       className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditingId(null)}
//                       className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="flex-1 min-w-[100px]">
//                     <span className="font-medium">{link.title}</span>{" "}
//                     <a
//                       href={`/api/r/${link.id}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline ml-2 break-all"
//                     >
//                       {link.url}
//                     </a>
//                     <span className="ml-2 text-sm text-gray-600">
//                       ({link.clicks ?? 0} clicks)
//                     </span>
//                   </div>
//                   <div className="flex gap-2 mt-2 sm:mt-0">
//                     <button
//                       onClick={() => {
//                         setEditingId(link.id);
//                         setEditTitle(link.title);
//                         setEditUrl(link.url);
//                       }}
//                       className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(link.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value }: { title: string; value: string | number }) {
//   return (
//     <div className="bg-white p-4 rounded shadow text-center">
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <p className="text-2xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";

// interface Link {
//   id: number;
//   title: string;
//   url: string;
//   clicks?: number;
// }

// export default function DashboardPage() {
//   const [links, setLinks] = useState<Link[]>([]);
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editUrl, setEditUrl] = useState("");

//   // Stats state
//   const [totalCampaigns, setTotalCampaigns] = useState(0);
//   const [totalLeads, setTotalLeads] = useState(0);
//   const [successfulLeads, setSuccessfulLeads] = useState(0);
//   const [responseRate, setResponseRate] = useState("0%");

//   // Fetch links
//   useEffect(() => {
//     fetch("/api/link")
//       .then((res) => res.json())
//       .then((data: Link[]) => setLinks(data))
//       .catch((err) => console.error("Error fetching links:", err));
//   }, []);

//   // Fetch stats
//   useEffect(() => {
//     fetch("/api/auth/dashboard")
//       .then((res) => res.json())
//       .then((data) => {
//         setTotalCampaigns(data.totalCampaigns);
//         setTotalLeads(data.totalLeads);
//         setSuccessfulLeads(data.successfulLeads);
//         setResponseRate(`${data.responseRate}%`);
//       })
//       .catch((err) => console.error("Error fetching stats:", err));
//   }, []);

//   // Add new link
//   const handleAdd = async () => {
//     if (!title || !url) return;

//     const res = await fetch("/api/link", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, url }),
//     });

//     if (res.ok) {
//       const newLink: Link = await res.json();
//       setLinks([...links, newLink]);
//       setTitle("");
//       setUrl("");
//     }
//   };

//   // Delete link
//   const handleDelete = async (id: number) => {
//     await fetch(`/api/link/${id}`, { method: "DELETE" });
//     setLinks(links.filter((link) => link.id !== id));
//   };

//   // Save edited link
//   const handleEditSave = async (id: number) => {
//     const res = await fetch(`/api/link/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: editTitle, url: editUrl }),
//     });

//     if (res.ok) {
//       const updated: Link = await res.json();
//       setLinks(links.map((link) => (link.id === id ? updated : link)));
//       setEditingId(null);
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 lg:p-8 space-y-8">
//       {/* Stats Section */}
//       <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
//         Dashboard Overview
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard title="Total Campaigns" value={totalCampaigns} />
//         <StatCard title="Total Leads" value={totalLeads} />
//         <StatCard title="Successful Leads" value={successfulLeads} />
//         <StatCard title="Response Rate" value={responseRate} />
//       </div>

//       {/* Links CRUD Section */}
//       <div className="space-y-4">
//         <h2 className="text-xl md:text-2xl font-bold mb-2">Your Links</h2>

//         {/* Add new link */}
//         <div className="flex flex-col sm:flex-row gap-2">
//           <input
//             className="border p-2 rounded flex-1 w-full"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             className="border p-2 rounded flex-1 w-full"
//             placeholder="https://example.com"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
//           >
//             Add
//           </button>
//         </div>

//         {/* List links */}
//         <ul className="space-y-2">
//           {links.map((link) => (
//             <li
//               key={link.id}
//               className="flex flex-col sm:flex-row sm:items-center justify-between border p-2 rounded gap-2"
//             >
//               {editingId === link.id ? (
//                 <>
//                   <input
//                     className="border p-1 rounded flex-1"
//                     value={editTitle}
//                     onChange={(e) => setEditTitle(e.target.value)}
//                   />
//                   <input
//                     className="border p-1 rounded flex-1"
//                     value={editUrl}
//                     onChange={(e) => setEditUrl(e.target.value)}
//                   />
//                   <div className="flex gap-2 mt-2 sm:mt-0">
//                     <button
//                       onClick={() => handleEditSave(link.id)}
//                       className="bg-green-500 text-white px-2 py-1 rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditingId(null)}
//                       className="bg-gray-400 text-white px-2 py-1 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-2">
//                     <span className="font-medium">{link.title}</span>
//                     <a
//                       href={`/api/r/${link.id}`}
//                       className="text-blue-500 underline break-all"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {link.url}
//                     </a>
//                     <span className="text-sm text-gray-600">
//                       ({link.clicks ?? 0} clicks)
//                     </span>
//                   </div>
//                   <div className="flex gap-2 mt-2 sm:mt-0">
//                     <button
//                       onClick={() => {
//                         setEditingId(link.id);
//                         setEditTitle(link.title);
//                         setEditUrl(link.url);
//                       }}
//                       className="bg-yellow-500 text-white px-2 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(link.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// // Simple stat card
// function StatCard({ title, value }: { title: string; value: string | number }) {
//   return (
//     <div className="bg-white p-4 rounded shadow text-center">
//       <h2 className="text-lg font-semibold">{title}</h2>
//       <p className="text-2xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }




// "use client";

// import { useState, useEffect, useCallback } from "react";

// interface Link {
//   id: number;
//   title: string;
//   url: string;
//   clicks?: number;
// }

// export default function DashboardPage() {
//   // Links state
//   const [links, setLinks] = useState<Link[]>([]);
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editUrl, setEditUrl] = useState("");

//   // Stats state
//   const [totalCampaigns, setTotalCampaigns] = useState(0);
//   const [totalLeads, setTotalLeads] = useState(0);
//   const [successfulLeads, setSuccessfulLeads] = useState(0);
//   const [responseRate, setResponseRate] = useState("0%");

//   // Fetch all dashboard data
//   const fetchStats = useCallback(async () => {
//     try {
//       // Links
//       const linksRes = await fetch("/api/link");
//       const linksData: Link[] = await linksRes.json();
//       setLinks(linksData);

//       // Stats
//       const statsRes = await fetch("/api/auth/dashboard");
//       const data = await statsRes.json();
//       setTotalCampaigns(data.totalCampaigns);
//       setTotalLeads(data.totalLeads);
//       setSuccessfulLeads(data.successfulLeads);
//       setResponseRate(`${data.responseRate}%`);
//     } catch (err) {
//       console.error("Error fetching dashboard stats:", err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchStats();
//   }, [fetchStats]);

//   // Add new link
//   const handleAddLink = async () => {
//     if (!title || !url) return;
//     const res = await fetch("/api/link", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, url }),
//     });

//     if (res.ok) {
//       setTitle("");
//       setUrl("");
//       fetchStats(); // refresh stats & links
//     }
//   };

//   // Delete link
//   const handleDeleteLink = async (id: number) => {
//     await fetch(`/api/link/${id}`, { method: "DELETE" });
//     fetchStats();
//   };

//   // Save edited link
//   const handleEditSave = async (id: number) => {
//     await fetch(`/api/link/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: editTitle, url: editUrl }),
//     });
//     setEditingId(null);
//     fetchStats();
//   };

//   return (
//     <div className="p-4 md:p-6 lg:p-8 space-y-8">
//       {/* Stats Section */}
//       <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
//         Dashboard Overview
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard title="Total Campaigns" value={totalCampaigns} />
//         <StatCard title="Total Leads" value={totalLeads} />
//         <StatCard title="Successful Leads" value={successfulLeads} />
//         <StatCard title="Response Rate" value={responseRate} />
//       </div>

//       {/* Links CRUD Section */}
//       <div className="space-y-4">
//         <h2 className="text-xl md:text-2xl font-bold mb-2">Your Links</h2>

//         {/* Add new link */}
//         <div className="flex flex-col sm:flex-row gap-2">
//           <input
//             className="border p-2 rounded flex-1 w-full"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             className="border p-2 rounded flex-1 w-full"
//             placeholder="https://example.com"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//           <button
//             onClick={handleAddLink}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
//           >
//             Add
//           </button>
//         </div>

//         {/* List links */}
//         <ul className="space-y-2">
//           {links.map((link) => (
//             <li
//               key={link.id}
//               className="flex flex-col sm:flex-row sm:items-center justify-between border p-2 rounded gap-2"
//             >
//               {editingId === link.id ? (
//                 <>
//                   <input
//                     className="border p-1 rounded flex-1"
//                     value={editTitle}
//                     onChange={(e) => setEditTitle(e.target.value)}
//                   />
//                   <input
//                     className="border p-1 rounded flex-1"
//                     value={editUrl}
//                     onChange={(e) => setEditUrl(e.target.value)}
//                   />
//                   <div className="flex gap-2 mt-2 sm:mt-0">
//                     <button
//                       onClick={() => handleEditSave(link.id)}
//                       className="bg-green-500 text-white px-2 py-1 rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditingId(null)}
//                       className="bg-gray-400 text-white px-2 py-1 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-2">
//                     <span className="font-medium">{link.title}</span>
//                     <a
//                       href={`/api/r/${link.id}`}
//                       className="text-blue-500 underline break-all"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {link.url}
//                     </a>
//                     <span className="text-sm text-gray-600">
//                       ({link.clicks ?? 0} clicks)
//                     </span>
//                   </div>
//                   <div className="flex gap-2 mt-2 sm:mt-0">
//                     <button
//                       onClick={() => {
//                         setEditingId(link.id);
//                         setEditTitle(link.title);
//                         setEditUrl(link.url);
//                       }}
//                       className="bg-yellow-500 text-white px-2 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteLink(link.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// // Simple stat card
// function StatCard({ title, value }: { title: string; value: string | number }) {
//   return (
//     <div className="bg-white p-4 rounded shadow text-center">
//       <h2 className="text-lg font-semibold">{title}</h2>
//       <p className="text-2xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }




"use client";

import { useState, useEffect, useCallback } from "react";

interface Link {
  id: number;
  title: string;
  url: string;
  clicks?: number;
}

export default function DashboardPage() {
  // Links state
  const [links, setLinks] = useState<Link[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");

  // Stats state
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [successfulLeads, setSuccessfulLeads] = useState(0);
  const [responseRate, setResponseRate] = useState("0%");

  // Fetch all dashboard data
  const fetchStats = useCallback(async () => {
    try {
      // Links
      const linksRes = await fetch("/api/link");
      const linksData: Link[] = await linksRes.json();
      setLinks(linksData);

      // Stats
      const statsRes = await fetch("/api/auth/dashboard");
      const data = await statsRes.json();
      setTotalCampaigns(data.totalCampaigns);
      setTotalLeads(data.totalLeads);
      setSuccessfulLeads(data.successfulLeads);
      setResponseRate(`${data.responseRate}%`);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Add new link
  const handleAddLink = async () => {
    if (!title || !url) return;
    const res = await fetch("/api/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url }),
    });

    if (res.ok) {
      setTitle("");
      setUrl("");
      fetchStats(); // refresh stats & links
    }
  };

  // Delete link
  const handleDeleteLink = async (id: number) => {
    const res = await fetch(`/api/link/${id}`, { method: "DELETE" });
    if (res.ok) fetchStats(); // refresh after deletion
  };

  // Save edited link
  const handleEditSave = async (id: number) => {
    const res = await fetch(`/api/link/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, url: editUrl }),
    });
    if (res.ok) {
      setEditingId(null);
      fetchStats(); // refresh after edit
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Stats Section */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Campaigns" value={totalCampaigns} />
        <StatCard title="Total Leads" value={totalLeads} />
        <StatCard title="Successful Leads" value={successfulLeads} />
        <StatCard title="Response Rate" value={responseRate} />
      </div>

      {/* Links CRUD Section */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Your Links</h2>

        {/* Add new link */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="border p-2 rounded flex-1 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border p-2 rounded flex-1 w-full"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleAddLink}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            Add
          </button>
        </div>

        {/* List links */}
        <ul className="space-y-2">
          {links.map((link) => (
            <li
              key={link.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between border p-2 rounded gap-2"
            >
              {editingId === link.id ? (
                <>
                  <input
                    className="border p-1 rounded flex-1"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    className="border p-1 rounded flex-1"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleEditSave(link.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-2">
                    <span className="font-medium">{link.title}</span>
                    <a
                      href={`/api/r/${link.id}`}
                      className="text-blue-500 underline break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.url}
                    </a>
                    <span className="text-sm text-gray-600">
                      ({link.clicks ?? 0} clicks)
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => {
                        setEditingId(link.id);
                        setEditTitle(link.title);
                        setEditUrl(link.url);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Simple stat card
function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
