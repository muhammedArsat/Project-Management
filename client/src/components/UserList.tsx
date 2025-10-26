// import React from 'react'
import { Edit, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import type { SortDirection, SortField, User } from "../types/Collaborators.types";
const UserList = ({ users }: { users: User[] }) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
      );
      if (sortDirection === "desc") {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  return (
    <div className="w-full overflow-auto ">
      <table className="w-full">
        <thead>
          <tr>
            <th>S.No</th>
            <th>
              <span
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
               
              </span>
            </th>
            <th className="">
              <span
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email
                
              </span>
            </th>
            <th>
              <span
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("role")}
              >
                Role
               
              </span>
            </th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>
                  <span className="flex items-center gap-3">
                    <img
                      src={user.profile}
                      alt="profile"
                      className="w-7 h-7 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                    {user.name}
                  </span>
                </td>
                <td>{user.email}</td>
                <td className="text-[14px]">
                  <span
                    className={`p-1 px-3 inline-block rounded-sm text-white min-w-[90px] text-center ${
                      user.role === "OWNER"
                        ? "bg-sky-500"
                        : user.role === "MEMBER"
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td >
                  <Edit strokeWidth={1.2} className="cursor-pointer" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
