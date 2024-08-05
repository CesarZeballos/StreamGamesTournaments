// "use client";
// import UsersArea from "@/components/Areas/UsersArea";
// import TournamentsArea from "@/components/Areas/TournamentsArea";
// import { useState } from "react";

// const AdminPage: React.FC = () => {
//   const [view, setView] = useState("users");

//   const handleViewChange = (newView: string) => {
//     setView(newView);
//   };
//   return (
//     <div className="bodyContainer mb-small">
//       <div className="flex justify-center gap-8 mb-8">
//         <button className={`buttonFilter ${view === "users" && "buttonFilterActive"}`} onClick={() => handleViewChange("users")}>Users</button>
//         <button className={`buttonFilter ${view === "tournaments" && "buttonFilterActive"}`} onClick={() => handleViewChange("tournaments")}>Tournaments</button>
//       </div>
//       { view === "users" && (
//       <div>
//         <UsersArea />
//       </div>
//       )}
//       { view === "tournaments" && (
//       <div>
//         <TournamentsArea />
//       </div>

//       )}
//     </div>
//   );
// };

// export default AdminPage;
