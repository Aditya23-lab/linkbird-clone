// "use client";

// import { useSession, signOut } from "next-auth/react";

// export default function SettingsPage() {
//   const { data: session } = useSession();

//   if (!session?.user) return <p className="p-6">Not logged in</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Settings</h1>
//       <p>
//         <strong>Name:</strong> {session.user.name}
//       </p>
//       <p>
//         <strong>Email:</strong> {session.user.email}
//       </p>

//       <button
//         onClick={() => signOut()}
//         className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }



"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally call your API to update profile
    alert("Profile updated successfully!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    // Call API to change password
    alert("Password changed successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Profile Section */}
      <form
        onSubmit={handleProfileUpdate}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="border p-2 rounded flex-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      {/* Password Section */}
      <form
        onSubmit={handleChangePassword}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <h2 className="text-xl font-semibold">Change Password</h2>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
