// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { getSession } from "next-auth/react";


// interface Lead {
//   id: string;
//   name: string;
//   email: string;
//   status: string;
//   createdAt: string;
// }

// export default function LeadsPage() {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState("new");

//   const fetchLeads = async () => {
//     try {
//     //   const res = await axios.get("/api/leads");
//     const res = await axios.get("/api/leads", { withCredentials: true });
//       setLeads(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/leads", { name, email, status });
//       setName("");
//       setEmail("");
//       setStatus("new");
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`/api/leads?id=${id}`);
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Leads</h1>

//       {/* Add Lead Form */}
//       <form onSubmit={handleAdd} className="mb-6 flex gap-2">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="new">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="qualified">Qualified</option>
//         </select>
//         <button type="submit" className="bg-blue-500 text-white px-4 rounded">
//           Add Lead
//         </button>
//       </form>

//       {/* Leads Table */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Email</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leads.map((lead) => (
//             <tr key={lead.id}>
//               <td className="border px-2 py-1">{lead.name}</td>
//               <td className="border px-2 py-1">{lead.email}</td>
//               <td className="border px-2 py-1">{lead.status}</td>
//               <td className="border px-2 py-1">
//                 <button
//                   onClick={() => handleDelete(lead.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {leads.length === 0 && (
//             <tr>
//               <td colSpan={4} className="text-center py-4">
//                 No leads yet
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { getSession } from "next-auth/react";

// interface Lead {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
//   company?: string;
//   campaign?: string;
//   lastContact?: string;
// }

// export default function LeadsPage() {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState("new");

//   const fetchLeads = async () => {
//     const session = await getSession();
//     if (!session) return;

//     try {
//       const res = await axios.get("/api/leads", {
//         headers: { Authorization: `Bearer ${session.user.id}` },
//       });
//       setLeads(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const session = await getSession();
//     if (!session) return;

//     try {
//       await axios.post(
//         "/api/leads",
//         { name, email, status },
//         { headers: { Authorization: `Bearer ${session.user.id}` } }
//       );
//       setName("");
//       setEmail("");
//       setStatus("new");
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     const session = await getSession();
//     if (!session) return;

//     try {
//       await axios.delete(`/api/leads?id=${id}`, {
//         headers: { Authorization: `Bearer ${session.user.id}` },
//       });
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Leads</h1>

//       {/* Add Lead Form */}
//       <form onSubmit={handleAdd} className="mb-6 flex gap-2">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="new">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="qualified">Qualified</option>
//         </select>
//         <button type="submit" className="bg-blue-500 text-white px-4 rounded">
//           Add Lead
//         </button>
//       </form>

//       {/* Leads Table */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Email</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leads.map((lead) => (
//             <tr key={lead.id}>
//               <td className="border px-2 py-1">{lead.name}</td>
//               <td className="border px-2 py-1">{lead.email}</td>
//               <td className="border px-2 py-1">{lead.status}</td>
//               <td className="border px-2 py-1">
//                 <button
//                   onClick={() => handleDelete(lead.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {leads.length === 0 && (
//             <tr>
//               <td colSpan={4} className="text-center py-4">
//                 No leads yet
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { getSession } from "next-auth/react";

// interface Lead {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
//   company?: string;
//   campaign?: string;
//   lastContact?: string;
// }

// export default function LeadsPage() {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [newLead, setNewLead] = useState({ name: "", email: "", status: "new" });

//   // Fetch all leads
//   const fetchLeads = async () => {
//     try {
//       const res = await axios.get("/api/leads");
//       setLeads(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   // Add a new lead
//   const handleAddLead = async () => {
//     try {
//       await axios.post("/api/leads", newLead);
//       setNewLead({ name: "", email: "", status: "new" });
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete a lead
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/leads?id=${id}`);
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Update a lead
//   const handleUpdate = async (id: number, updates: Partial<Lead>) => {
//     try {
//       await axios.put("/api/leads", { id, ...updates });
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Leads</h1>

//       {/* Add Lead Form */}
//       <div className="mb-4 flex gap-2">
//         <input
//           type="text"
//           placeholder="Name"
//           value={newLead.name}
//           onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
//           className="border px-2 py-1 rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newLead.email}
//           onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
//           className="border px-2 py-1 rounded"
//         />
//         <select
//           value={newLead.status}
//           onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="new">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="qualified">Qualified</option>
//         </select>
//         <button
//           onClick={handleAddLead}
//           className="bg-blue-500 text-white px-4 py-1 rounded"
//         >
//           Add Lead
//         </button>
//       </div>

//       {/* Leads Table */}
//       <table className="border-collapse border w-full">
//         <thead>
//           <tr>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Email</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         {/* <tbody>
//           {leads.map((lead) => (
//             <tr key={lead.id}>
//               <td className="border px-2 py-1">{lead.name}</td>
//               <td className="border px-2 py-1">{lead.email}</td>
//               <td className="border px-2 py-1">
//                 <select
//                   value={lead.status}
//                   onChange={(e) =>
//                     handleUpdate(lead.id, { status: e.target.value })
//                   }
//                   className="border rounded px-1"
//                 >
//                   <option value="new">New</option>
//                   <option value="contacted">Contacted</option>
//                   <option value="qualified">Qualified</option>
//                 </select>
//               </td>
//               <td className="border px-2 py-1">
//                 <button
//                   onClick={() => handleDelete(lead.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody> */}
//         <tbody>
//   {leads.map((lead) => (
//     <tr key={lead.id}>
//       {/* Inline editable Name */}
//       <td className="border px-2 py-1">
//         <input
//           type="text"
//           value={lead.name}
//           onChange={(e) =>
//             handleUpdate(lead.id, { name: e.target.value })
//           }
//           className="border rounded px-1 w-full"
//         />
//       </td>

//       {/* Inline editable Email */}
//       <td className="border px-2 py-1">
//         <input
//           type="email"
//           value={lead.email}
//           onChange={(e) =>
//             handleUpdate(lead.id, { email: e.target.value })
//           }
//           className="border rounded px-1 w-full"
//         />
//       </td>

//       {/* Status dropdown */}
//       <td className="border px-2 py-1">
//         <select
//           value={lead.status}
//           onChange={(e) =>
//             handleUpdate(lead.id, { status: e.target.value })
//           }
//           className="border rounded px-1"
//         >
//           <option value="new">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="qualified">Qualified</option>
//         </select>
//       </td>

//       {/* Delete button */}
//       <td className="border px-2 py-1">
//         <button
//           onClick={() => handleDelete(lead.id)}
//           className="bg-red-500 text-white px-2 py-1 rounded"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   ))}
// </tbody>

//       </table>
//     </div>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// interface Lead {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
//   company?: string;
//   campaign?: string;
//   lastContact?: string;
// }

// export default function LeadsPage() {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [newLead, setNewLead] = useState({ name: "", email: "", status: "new" });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const leadsPerPage = 5;

//   // Fetch all leads
//   const fetchLeads = async () => {
//     try {
//       const res = await axios.get("/api/leads");
//       setLeads(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   // Add a new lead
//   const handleAddLead = async () => {
//     try {
//       await axios.post("/api/leads", newLead);
//       setNewLead({ name: "", email: "", status: "new" });
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete a lead
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/leads?id=${id}`);
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Update a lead
//   const handleUpdate = async (id: number, updates: Partial<Lead>) => {
//     try {
//       await axios.put("/api/leads", { id, ...updates });
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Filter leads by search term
//   const filteredLeads = leads.filter(
//     (lead) =>
//       lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       lead.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination calculations
//   const indexOfLastLead = currentPage * leadsPerPage;
//   const indexOfFirstLead = indexOfLastLead - leadsPerPage;
//   const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
//   const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Leads</h1>

//       {/* Add Lead Form */}
//       <div className="mb-4 flex gap-2 flex-wrap">
//         <input
//           type="text"
//           placeholder="Name"
//           value={newLead.name}
//           onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
//           className="border px-2 py-1 rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newLead.email}
//           onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
//           className="border px-2 py-1 rounded"
//         />
//         <select
//           value={newLead.status}
//           onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="new">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="qualified">Qualified</option>
//         </select>
//         <button
//           onClick={handleAddLead}
//           className="bg-blue-500 text-white px-4 py-1 rounded"
//         >
//           Add Lead
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name, email, or status..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1); // reset to first page when searching
//           }}
//           className="border px-2 py-1 rounded w-full"
//         />
//       </div>

//       {/* Leads Table */}
//       <table className="border-collapse border w-full">
//         <thead>
//           <tr>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Email</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentLeads.map((lead) => (
//             <tr key={lead.id}>
//               {/* Inline editable Name */}
//               <td className="border px-2 py-1">
//                 <input
//                   type="text"
//                   value={lead.name}
//                   onChange={(e) => handleUpdate(lead.id, { name: e.target.value })}
//                   className="border rounded px-1 w-full"
//                 />
//               </td>

//               {/* Inline editable Email */}
//               <td className="border px-2 py-1">
//                 <input
//                   type="email"
//                   value={lead.email}
//                   onChange={(e) => handleUpdate(lead.id, { email: e.target.value })}
//                   className="border rounded px-1 w-full"
//                 />
//               </td>

//               {/* Status dropdown */}
//               <td className="border px-2 py-1">
//                 <select
//                   value={lead.status}
//                   onChange={(e) => handleUpdate(lead.id, { status: e.target.value })}
//                   className="border rounded px-1"
//                 >
//                   <option value="new">New</option>
//                   <option value="contacted">Contacted</option>
//                   <option value="qualified">Qualified</option>
//                 </select>
//               </td>

//               {/* Delete button */}
//               <td className="border px-2 py-1">
//                 <button
//                   onClick={() => handleDelete(lead.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex gap-2 mt-4 flex-wrap">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           className="px-2 py-1 border rounded"
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-2 py-1 border rounded ${
//               currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           className="px-2 py-1 border rounded"
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// interface Lead {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
//   company?: string;
//   campaign?: string;
//   lastContact?: string;
// }

// export default function LeadsPage() {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [newLead, setNewLead] = useState({ name: "", email: "", status: "new" });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const leadsPerPage = 5;

//   // Fetch all leads
//   const fetchLeads = async () => {
//     try {
//       const res = await axios.get("/api/leads");
//       setLeads(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   // Add a new lead
//   const handleAddLead = async () => {
//     try {
//       await axios.post("/api/leads", newLead);
//       setNewLead({ name: "", email: "", status: "new" });
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete a lead
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/leads?id=${id}`);
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Update a lead
//   const handleUpdate = async (id: number, updates: Partial<Lead>) => {
//     try {
//       await axios.put("/api/leads", { id, ...updates });
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Filter leads by search term
//   const filteredLeads = leads.filter(
//     (lead) =>
//       lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       lead.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination
//   const indexOfLastLead = currentPage * leadsPerPage;
//   const indexOfFirstLead = indexOfLastLead - leadsPerPage;
//   const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
//   const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Leads</h1>

//       {/* Add Lead Form */}
//       <div className="mb-4 flex gap-2 flex-wrap">
//         <input
//           type="text"
//           placeholder="Name"
//           value={newLead.name}
//           onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
//           className="border px-2 py-1 rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newLead.email}
//           onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
//           className="border px-2 py-1 rounded"
//         />
//         <select
//           value={newLead.status}
//           onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="new">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="qualified">Qualified</option>
//         </select>
//         <button
//           onClick={handleAddLead}
//           className="bg-blue-500 text-white px-4 py-1 rounded"
//         >
//           Add Lead
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name, email, or status..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="border px-2 py-1 rounded w-full"
//         />
//       </div>

//       {/* Leads Table */}
//       <table className="border-collapse border w-full">
//         <thead>
//           <tr>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Email</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentLeads.map((lead) => (
//             <tr key={lead.id}>
//               <td className="border px-2 py-1">
//                 <input
//                   type="text"
//                   value={lead.name}
//                   onChange={(e) => handleUpdate(lead.id, { name: e.target.value })}
//                   className="border rounded px-1 w-full"
//                 />
//               </td>
//               <td className="border px-2 py-1">
//                 <input
//                   type="email"
//                   value={lead.email}
//                   onChange={(e) => handleUpdate(lead.id, { email: e.target.value })}
//                   className="border rounded px-1 w-full"
//                 />
//               </td>
//               <td className="border px-2 py-1">
//                 <select
//                   value={lead.status}
//                   onChange={(e) => handleUpdate(lead.id, { status: e.target.value })}
//                   className="border rounded px-1"
//                 >
//                   <option value="new">New</option>
//                   <option value="contacted">Contacted</option>
//                   <option value="qualified">Qualified</option>
//                 </select>
//               </td>
//               <td className="border px-2 py-1">
//                 <button
//                   onClick={() => handleDelete(lead.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex gap-2 mt-4 flex-wrap">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           className="px-2 py-1 border rounded"
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-2 py-1 border rounded ${
//               currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           className="px-2 py-1 border rounded"
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// interface Lead {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
//   company?: string;
//   campaignId: number;
//   campaignName?: string;
//   lastContact?: string;
// }

// interface Campaign {
//   id: number;
//   name: string;
//   totalleads: number;
//   successfulleads: number;
//   responserate: number;
// }

// export default function LeadsPage() {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);
//   const [newLead, setNewLead] = useState({ name: "", email: "", status: "new", campaignId: 22 });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const leadsPerPage = 5;

//   // Fetch all leads
//   const fetchLeads = async () => {
//     try {
//       const res = await axios.get("/api/auth/leads");
//       setLeads(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch campaigns for dropdown
//   const fetchCampaigns = async () => {
//     try {
//       const res = await axios.get("/api/auth/campaigns");
//       setCampaigns(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//     fetchCampaigns();
//   }, []);

//   // Add a new lead
//   const handleAddLead = async () => {
//     try {
//       await axios.post("/api/auth/leads", newLead);
//       setNewLead({ name: "", email: "", status: "new", campaignId: 22 });
//       fetchLeads();
//       fetchCampaigns(); // refresh campaign stats immediately
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete a lead
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/auth/leads?id=${id}`);
//       fetchLeads();
//       fetchCampaigns();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Update a lead
//   const handleUpdate = async (id: number, updates: Partial<Lead>) => {
//     try {
//       await axios.put("/api/auth/leads", { id, ...updates });
//       fetchLeads();
//       fetchCampaigns();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Filter leads by search term
//   const filteredLeads = leads.filter(
//     (lead) =>
//       lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       lead.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination
//   const indexOfLastLead = currentPage * leadsPerPage;
//   const indexOfFirstLead = indexOfLastLead - leadsPerPage;
//   const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
//   const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Leads</h1>

//       {/* Add Lead Form */}
//       <div className="mb-4 flex gap-2 flex-wrap">
//         <input
//           type="text"
//           placeholder="Name"
//           value={newLead.name}
//           onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
//           className="border px-2 py-1 rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newLead.email}
//           onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
//           className="border px-2 py-1 rounded"
//         />
//         <select
//           value={newLead.status}
//           onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="new">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="qualified">Qualified</option>
//         </select>
//         <select
//           value={newLead.campaignId}
//           onChange={(e) => setNewLead({ ...newLead, campaignId: Number(e.target.value) })}
//           className="border px-2 py-1 rounded"
//         >
//           {campaigns.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleAddLead} className="bg-blue-500 text-white px-4 py-1 rounded">
//           Add Lead
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name, email, or status..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="border px-2 py-1 rounded w-full"
//         />
//       </div>

//       {/* Leads Table */}
//       <table className="border-collapse border w-full">
//         <thead>
//           <tr>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Email</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Campaign</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentLeads.map((lead) => (
//             <tr key={lead.id}>
//               <td className="border px-2 py-1">
//                 <input
//                   type="text"
//                   value={lead.name}
//                   onChange={(e) => handleUpdate(lead.id, { name: e.target.value })}
//                   className="border rounded px-1 w-full"
//                 />
//               </td>
//               <td className="border px-2 py-1">
//                 <input
//                   type="email"
//                   value={lead.email}
//                   onChange={(e) => handleUpdate(lead.id, { email: e.target.value })}
//                   className="border rounded px-1 w-full"
//                 />
//               </td>
//               <td className="border px-2 py-1">
//                 <select
//                   value={lead.status}
//                   onChange={(e) => handleUpdate(lead.id, { status: e.target.value })}
//                   className="border rounded px-1"
//                 >
//                   <option value="new">New</option>
//                   <option value="contacted">Contacted</option>
//                   <option value="qualified">Qualified</option>
//                 </select>
//               </td>
//               <td className="border px-2 py-1">{campaigns.find((c) => c.id === lead.campaignId)?.name || "Unknown"}</td>
//               <td className="border px-2 py-1">
//                 <button onClick={() => handleDelete(lead.id)} className="bg-red-500 text-white px-2 py-1 rounded">
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex gap-2 mt-4 flex-wrap">
//         <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-2 py-1 border rounded" disabled={currentPage === 1}>
//           Prev
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-2 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-2 py-1 border rounded" disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// interface Lead {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
//   campaign_id: number;
// }

// interface Campaign {
//   id: number;
//   name: string;
// }

// export default function LeadsPage() {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);
//   const [newLead, setNewLead] = useState({
//     name: "",
//     email: "",
//     status: "new",
//     campaignId: 0,
//   });

//   // Fetch leads
//   const fetchLeads = async () => {
//     try {
//       const res = await axios.get("/api/leads", { withCredentials: true }); // ✅ fixed
//       setLeads(res.data);
//     } catch (err) {
//       console.error("fetchLeads error:", err);
//     }
//   };

//   // Fetch campaigns
//   const fetchCampaigns = async () => {
//     try {
//       const res = await axios.get("/api/auth/campaigns", { withCredentials: true }); // ✅ fixed
//       setCampaigns(res.data);
//       if (res.data.length) {
//         setNewLead((prev) => ({ ...prev, campaignId: res.data[0].id }));
//       }
//     } catch (err) {
//       console.error("fetchCampaigns error:", err);
//     }
//   };

//   // Add lead
//   const handleAddLead = async () => {
//     if (!newLead.name || !newLead.email || !newLead.campaignId) {
//       console.error("Name, email, and campaign must be selected");
//       return;
//     }

//     try {
//       await axios.post(
//         "/api/leads", // ✅ fixed
//         {
//           name: newLead.name,
//           email: newLead.email,
//           status: newLead.status,
//           campaignId: newLead.campaignId, // ✅ matches backend
//         },
//         { withCredentials: true }
//       );

//       setNewLead({
//         name: "",
//         email: "",
//         status: "new",
//         campaignId: campaigns[0]?.id || 0,
//       });

//       fetchLeads();
//     } catch (err) {
//       console.error("Add lead failed:", err);
//     }
//   };

//   // Update lead
//   const handleUpdateLead = async (id: number, updates: Partial<Lead>) => {
//     try {
//       await axios.put(
//         "/api/leads", // ✅ fixed
//         { id, ...updates },
//         { withCredentials: true }
//       );
//       fetchLeads();
//     } catch (err) {
//       console.error("Update lead failed:", err);
//     }
//   };

//   // Delete lead
//   const handleDeleteLead = async (id: number) => {
//     try {
//       await axios.delete(`/api/leads?id=${id}`, { withCredentials: true }); // ✅ fixed
//       fetchLeads();
//     } catch (err) {
//       console.error("Delete lead failed:", err);
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//     fetchCampaigns();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Leads</h1>

//       {/* Add Lead */}
//       <div className="mb-4 flex gap-2 flex-wrap">
//         <input
//           type="text"
//           placeholder="Name"
//           value={newLead.name}
//           onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
//           className="border px-2 py-1 rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newLead.email}
//           onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
//           className="border px-2 py-1 rounded"
//         />
//         <select
//           value={newLead.status}
//           onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="new">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="qualified">Qualified</option>
//         </select>
//         <select
//           value={newLead.campaignId}
//           onChange={(e) =>
//             setNewLead({ ...newLead, campaignId: Number(e.target.value) })
//           }
//           className="border px-2 py-1 rounded"
//         >
//           {campaigns.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={handleAddLead}
//           className="bg-blue-500 text-white px-4 py-1 rounded"
//         >
//           Add Lead
//         </button>
//       </div>

//       {/* Leads Table */}
//       <table className="border-collapse border w-full">
//         <thead>
//           <tr>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Email</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Campaign</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leads.map((lead) => (
//             <tr key={lead.id}>
//               <td className="border px-2 py-1">
//                 <input
//                   type="text"
//                   value={lead.name}
//                   onChange={(e) =>
//                     handleUpdateLead(lead.id, { name: e.target.value })
//                   }
//                   className="border rounded px-1 w-full"
//                 />
//               </td>
//               <td className="border px-2 py-1">
//                 <input
//                   type="email"
//                   value={lead.email}
//                   onChange={(e) =>
//                     handleUpdateLead(lead.id, { email: e.target.value })
//                   }
//                   className="border rounded px-1 w-full"
//                 />
//               </td>
//               <td className="border px-2 py-1">
//                 <select
//                   value={lead.status}
//                   onChange={(e) =>
//                     handleUpdateLead(lead.id, { status: e.target.value })
//                   }
//                   className="border rounded px-1"
//                 >
//                   <option value="new">New</option>
//                   <option value="contacted">Contacted</option>
//                   <option value="qualified">Qualified</option>
//                 </select>
//               </td>
//               <td className="border px-2 py-1">
//                 {campaigns.find((c) => c.id === lead.campaign_id)?.name ||
//                   "Unknown"}
//               </td>
//               <td className="border px-2 py-1">
//                 <button
//                   onClick={() => handleDeleteLead(lead.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
  campaign_id: number;
}

interface Campaign {
  id: number;
  name: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    status: "new",
    campaignId: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const axiosConfig = { withCredentials: true };

  useEffect(() => {
    fetchLeads();
    fetchCampaigns();
  }, []);

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      const res = await axios.get("/api/leads", axiosConfig);
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Campaigns
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("/api/auth/campaigns", axiosConfig);
      setCampaigns(res.data);
      if (res.data.length && newLead.campaignId === 0) {
        setNewLead((prev) => ({ ...prev, campaignId: res.data[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Lead
  const handleAddLead = async () => {
    if (!newLead.name || !newLead.email || !newLead.campaignId) return;
    try {
      await axios.post(
        "/api/leads",
        {
          name: newLead.name,
          email: newLead.email,
          status: newLead.status,
          campaignId: newLead.campaignId,
        },
        axiosConfig
      );
      setNewLead({
        name: "",
        email: "",
        status: "new",
        campaignId: campaigns[0]?.id || 0,
      });
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  // Update Lead
  const handleUpdateLead = async (id: number, updates: Partial<Lead>) => {
    try {
      await axios.put("/api/leads", { id, ...updates }, axiosConfig);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id: number) => {
    try {
      await axios.delete(`/api/leads?id=${id}`, axiosConfig);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    new: "bg-blue-200 text-blue-800",
    contacted: "bg-yellow-200 text-yellow-800",
    qualified: "bg-green-200 text-green-800",
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Leads</h1>

      {/* Add Lead Form */}
      <div className="flex flex-wrap gap-2 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Name"
          value={newLead.name}
          onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
          className="border px-2 py-1 rounded flex-1 min-w-[150px]"
        />
        <input
          type="email"
          placeholder="Email"
          value={newLead.email}
          onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
          className="border px-2 py-1 rounded flex-1 min-w-[150px]"
        />
        <select
          value={newLead.status}
          onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
        </select>
        <select
          value={newLead.campaignId}
          onChange={(e) =>
            setNewLead({ ...newLead, campaignId: Number(e.target.value) })
          }
          className="border px-2 py-1 rounded"
        >
          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddLead}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Add Lead
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search leads..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-2 py-1 rounded w-full md:w-1/2"
      />

      {/* Leads Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white p-4 rounded shadow flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold">{lead.name}</h2>
              <span
                className={`px-2 py-0.5 rounded text-sm ${
                  statusColors[lead.status] || "bg-gray-200 text-gray-800"
                }`}
              >
                {lead.status}
              </span>
            </div>
            <p>{lead.email}</p>
            <p className="text-gray-500 text-sm">
              Campaign:{" "}
              {campaigns.find((c) => c.id === lead.campaign_id)?.name ||
                "Unknown"}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() =>
                  handleUpdateLead(lead.id, {
                    status:
                      lead.status === "new"
                        ? "contacted"
                        : lead.status === "contacted"
                        ? "qualified"
                        : "qualified",
                  })
                }
                className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteLead(lead.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
