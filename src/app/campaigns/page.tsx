// "use client";
// export default function CampaignsPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
//       <p className="text-gray-500">Coming soon...</p>

//       <table className="w-full border-collapse border mt-4">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td colSpan={2} className="text-center py-4">
//               No campaigns yet
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
  


// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// interface Campaign {
//   id: number;
//   name: string;
//   status: string;
//   totalLeads?: string;
//   successfulLeads?: string;
//   responseRate?: string;
// }

// export default function CampaignsPage() {
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);
//   const [name, setName] = useState("");
//   const [status, setStatus] = useState("draft");

//   // Fetch all campaigns
//   const fetchCampaigns = async () => {
//     try {
//       const res = await axios.get("/api/auth/campaigns");
//       setCampaigns(res.data);
//     } catch (err) {
//       console.error("Error fetching campaigns", err);
//     }
//   };

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   // Add new campaign
//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/auth/campaigns", { name, status });
//       setName("");
//       setStatus("draft");
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error adding campaign", err);
//     }
//   };

//   // Update campaign (inline editing)
//   const handleUpdate = async (id: number, updates: Partial<Campaign>) => {
//     try {
//       await axios.put("/api/auth/campaigns", { id, ...updates });
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error updating campaign", err);
//     }
//   };

//   // Delete campaign
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/auth/campaigns?id=${id}`);
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error deleting campaign", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Campaigns</h1>

//       {/* Add Campaign Form */}
//       <form onSubmit={handleAdd} className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Campaign name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border rounded px-2 py-1"
//           required
//         />
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border rounded px-2 py-1"
//         >
//           <option value="draft">Draft</option>
//           <option value="active">Active</option>
//           <option value="completed">Completed</option>
//         </select>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           Add
//         </button>
//       </form>

//       {/* Campaigns Table */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {campaigns.length > 0 ? (
//             campaigns.map((campaign) => (
//               <tr key={campaign.id}>
//                 <td className="border px-2 py-1">{campaign.name}</td>
//                 <td className="border px-2 py-1">
//                   <select
//                     value={campaign.status}
//                     onChange={(e) =>
//                       handleUpdate(campaign.id, { status: e.target.value })
//                     }
//                     className="border rounded px-1"
//                   >
//                     <option value="draft">Draft</option>
//                     <option value="active">Active</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </td>
//                 <td className="border px-2 py-1">
//                   <button
//                     onClick={() => handleDelete(campaign.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={3} className="text-center py-4">
//                 No campaigns yet
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

// interface Campaign {
//   id: number;
//   name: string;
//   status: string;
//   totalleads?: string;
//   successfulleads?: string;
//   responserate?: string;
// }

// export default function CampaignsPage() {
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);
//   const [name, setName] = useState("");
//   const [status, setStatus] = useState("draft");

//   // Fetch all campaigns
//   const fetchCampaigns = async () => {
//     try {
//       const res = await axios.get("/api/auth/campaigns");
//       setCampaigns(res.data);
//     } catch (err) {
//       console.error("Error fetching campaigns", err);
//     }
//   };

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   // Add new campaign
//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/auth/campaigns", { name, status });
//       setName("");
//       setStatus("draft");
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error adding campaign", err);
//     }
//   };

//   // Update campaign
//   const handleUpdate = async (id: number, updates: Partial<Campaign>) => {
//     try {
//       await axios.put("/api/auth/campaigns", { id, ...updates });
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error updating campaign", err);
//     }
//   };

//   // Delete campaign
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/auth/campaigns?id=${id}`);
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error deleting campaign", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Campaigns</h1>

//       {/* Add Campaign Form */}
//       <form onSubmit={handleAdd} className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Campaign name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border rounded px-2 py-1"
//           required
//         />
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border rounded px-2 py-1"
//         >
//           <option value="draft">Draft</option>
//           <option value="active">Active</option>
//           <option value="completed">Completed</option>
//         </select>
//         <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
//           Add
//         </button>
//       </form>

//       {/* Campaigns Table */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {campaigns.length > 0 ? (
//             campaigns.map((c) => (
//               <tr key={c.id}>
//                 <td className="border px-2 py-1">{c.name}</td>
//                 <td className="border px-2 py-1">
//                   <select
//                     value={c.status}
//                     onChange={(e) => handleUpdate(c.id, { status: e.target.value })}
//                     className="border rounded px-1"
//                   >
//                     <option value="draft">Draft</option>
//                     <option value="active">Active</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </td>
//                 <td className="border px-2 py-1">
//                   <button
//                     onClick={() => handleDelete(c.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={3} className="text-center py-4">
//                 No campaigns yet
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

// interface Campaign {
//   id: number;
//   name: string;
//   status: string;
//   totalleads?: string;
//   successfulleads?: string;
//   responserate?: string;
// }

// export default function CampaignsPage() {
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);
//   const [name, setName] = useState("");
//   const [status, setStatus] = useState("draft");

//   // Fetch all campaigns
//   const fetchCampaigns = async () => {
//     try {
//       const res = await axios.get("/api/auth/campaigns");
//       setCampaigns(res.data);
//     } catch (err) {
//       console.error("Error fetching campaigns", err);
//     }
//   };

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   // Add new campaign
//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/auth/campaigns", { name, status });
//       setName("");
//       setStatus("draft");
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error adding campaign", err);
//     }
//   };

//   // Update campaign (inline editing)
//   const handleUpdate = async (id: number, updates: Partial<Campaign>) => {
//     try {
//       await axios.put("/api/auth/campaigns", { id, ...updates });
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error updating campaign", err);
//     }
//   };

//   // Delete campaign
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/auth/campaigns?id=${id}`);
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error deleting campaign", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Campaigns</h1>

//       {/* Add Campaign Form */}
//       <form onSubmit={handleAdd} className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Campaign name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border rounded px-2 py-1"
//           required
//         />
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border rounded px-2 py-1"
//         >
//           <option value="draft">Draft</option>
//           <option value="active">Active</option>
//           <option value="completed">Completed</option>
//         </select>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           Add
//         </button>
//       </form>

//       {/* Campaigns Table */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {campaigns.length > 0 ? (
//             campaigns.map((campaign) => (
//               <tr key={campaign.id}>
//                 <td className="border px-2 py-1">{campaign.name}</td>
//                 <td className="border px-2 py-1">
//                   <select
//                     value={campaign.status}
//                     onChange={(e) =>
//                       handleUpdate(campaign.id, { status: e.target.value })
//                     }
//                     className="border rounded px-1"
//                   >
//                     <option value="draft">Draft</option>
//                     <option value="active">Active</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </td>
//                 <td className="border px-2 py-1 flex gap-2">
//                   <button
//                     onClick={() => handleDelete(campaign.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={3} className="text-center py-4">
//                 No campaigns yet
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

// export default function CampaignsPage() {
//   const [campaigns, setCampaigns] = useState([]);
//   const [newCampaign, setNewCampaign] = useState({ name: "", status: "draft" });

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   const fetchCampaigns = async () => {
//     try {
//       const res = await axios.get("/api/auth/campaigns");
//       setCampaigns(res.data);
//     } catch (err) {
//       console.error("Error fetching campaigns", err);
//     }
//   };

//   const handleAdd = async () => {
//     if (!newCampaign.name) return;
//     try {
//       await axios.post("/api/auth/campaigns", newCampaign);
//       setNewCampaign({ name: "", status: "draft" });
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error adding campaign", err);
//     }
//   };

//   const handleUpdate = async (id: number, updates: any) => {
//     try {
//       await axios.put(`/api/auth/campaigns/${id}`, updates);
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error updating campaign", err);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/api/auth/campaigns/${id}`);
//       fetchCampaigns();
//     } catch (err) {
//       console.error("Error deleting campaign", err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Campaigns</h1>

//       {/* Add new campaign */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Campaign name"
//           value={newCampaign.name}
//           onChange={(e) =>
//             setNewCampaign({ ...newCampaign, name: e.target.value })
//           }
//           className="border rounded px-2 py-1 flex-1"
//         />
//         <select
//           value={newCampaign.status}
//           onChange={(e) =>
//             setNewCampaign({ ...newCampaign, status: e.target.value })
//           }
//           className="border rounded px-2 py-1"
//         >
//           <option value="draft">Draft</option>
//           <option value="active">Active</option>
//           <option value="completed">Completed</option>
//         </select>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-500 text-white px-4 py-1 rounded"
//         >
//           Add
//         </button>
//       </div>

//       {/* Campaigns Table */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Status</th>
//             <th className="border px-2 py-1">Total Leads</th>
//             <th className="border px-2 py-1">Successful Leads</th>
//             <th className="border px-2 py-1">Response Rate</th>
//             <th className="border px-2 py-1">Created Date</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {campaigns.length > 0 ? (
//             campaigns.map((c: any) => (
//               <tr key={c.id}>
//                 <td className="border px-2 py-1">{c.name}</td>
//                 <td className="border px-2 py-1">
//                   <select
//                     value={c.status}
//                     onChange={(e) =>
//                       handleUpdate(c.id, { status: e.target.value })
//                     }
//                     className="border rounded px-1"
//                   >
//                     <option value="draft">Draft</option>
//                     <option value="active">Active</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </td>
//                 <td className="border px-2 py-1">{c.totalleads}</td>
//                 <td className="border px-2 py-1">{c.successfulleads}</td>
//                 <td className="border px-2 py-1">{c.responserate}</td>
//                 <td className="border px-2 py-1">
//                   {c.createddate
//                     ? new Date(c.createddate).toLocaleDateString()
//                     : "-"}
//                 </td>
//                 <td className="border px-2 py-1">
//                   <button
//                     onClick={() => handleDelete(c.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={7} className="text-center py-4">
//                 No campaigns yet
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }





"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Campaign {
  id: number;
  name: string;
  status: string;
  totalleads: number;
  successfulleads: number;
  responserate: number;
  createddate: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newCampaign, setNewCampaign] = useState({ name: "", status: "draft" });

  // Fetch campaigns
  const fetchCampaigns = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth/campaigns");
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error fetching campaigns", err);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Add new campaign
  const handleAdd = async () => {
    if (!newCampaign.name) return;
    try {
      await axios.post("/api/auth/campaigns", newCampaign);
      setNewCampaign({ name: "", status: "draft" });
      fetchCampaigns(); // refresh campaigns
      // Optional: also trigger dashboard stats refresh if you have a global context
    } catch (err) {
      console.error("Error adding campaign", err);
    }
  };

  // Update campaign
  const handleUpdate = async (id: number, updates: any) => {
    try {
      await axios.put(`/api/auth/campaigns/${id}`, updates);
      fetchCampaigns();
    } catch (err) {
      console.error("Error updating campaign", err);
    }
  };

  // Delete campaign
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/auth/campaigns/${id}`);
      fetchCampaigns();
    } catch (err) {
      console.error("Error deleting campaign", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Campaigns</h1>

      {/* Add new campaign */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Campaign name"
          value={newCampaign.name}
          onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
          className="border rounded px-2 py-1 flex-1 w-full"
        />
        <select
          value={newCampaign.status}
          onChange={(e) => setNewCampaign({ ...newCampaign, status: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Total Leads</th>
              <th className="border px-2 py-1">Successful Leads</th>
              <th className="border px-2 py-1">Response Rate</th>
              <th className="border px-2 py-1">Created Date</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length > 0 ? (
              campaigns.map((c) => (
                <tr key={c.id}>
                  <td className="border px-2 py-1">{c.name}</td>
                  <td className="border px-2 py-1">
                    <select
                      value={c.status}
                      onChange={(e) => handleUpdate(c.id, { status: e.target.value })}
                      className="border rounded px-1"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="border px-2 py-1">{c.totalleads}</td>
                  <td className="border px-2 py-1">{c.successfulleads}</td>
                  <td className="border px-2 py-1">{c.responserate}%</td>
                  <td className="border px-2 py-1">
                    {c.createddate ? new Date(c.createddate).toLocaleDateString() : "-"}
                  </td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No campaigns yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
