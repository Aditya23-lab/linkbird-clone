// import { db } from "@/lib/db";
// import { usersTable, linksTable } from "@/db/schema";

// export default async function UserPage({ params }: { params: { username: string } }) {
//   const { username } = params; // ✅ params is already an object, no need to await

//   // Fetch user by username
//   const users = await db
//     .select({
//       id: usersTable.id,
//       username: usersTable.name, // Assuming 'username' is stored in 'name' field
//     })
//     .from(usersTable)
//     .where(usersTable.name.eq(username))
//     .limit(1);

//   if (!users || users.length === 0) {
//     return <p className="p-6">User not found</p>;
//   }

//   const user = users[0];

//   // Fetch links for this user
//   const links = await db
//     .select()
//     .from(linksTable)
//     .where(linksTable.userId.eq(user.id));

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//       <h1 className="text-2xl font-bold">{user.username}’s Links</h1>
//       <ul className="mt-4 space-y-2">
//         {links.map((link) => (
//           <li key={link.id}>
//             <a
//               href={link.url}
//               target="_blank"
//               className="text-blue-500 underline"
//               rel="noopener noreferrer"
//             >
//               {link.description || link.url} {/* Show description if available */}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import { db } from "@/lib/db";
import { usersTable, linksTable } from "@/db/schema";

interface User {
  id: number;
  username: string;
}

interface Link {
  id: number;
  url: string;
  description?: string;
}

export default async function UserPage({ params }: { params: { username: string } }) {
  const { username } = params;

  const users = await db
    .select({
      id: usersTable.id,
      username: usersTable.name, // or usersTable.username if you have it
    })
    .from(usersTable)
    .where(usersTable.name.eq(username))
    .limit(1);

  if (!users || users.length === 0) {
    return <p className="p-6">User not found</p>;
  }

  const user: User = users[0];

  const links: Link[] = await db
    .select()
    .from(linksTable)
    .where(linksTable.userId.eq(user.id));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold">{user.username}’s Links</h1>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              className="text-blue-500 underline"
              rel="noopener noreferrer"
            >
              {link.description || link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
