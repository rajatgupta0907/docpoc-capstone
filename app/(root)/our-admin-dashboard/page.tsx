"use client";
import React, { useState, useEffect } from "react";
import { findDoctor } from "@/lib/actions/docpocadmin.actions";

interface User {
  id: string;
  username: string;
  image: string;
}
export default function Page() {

  const [users, setUsers] = useState<User[]>([]); // Explicitly type users as an array of User objects

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await findDoctor();
        if (response){
        setUsers(response); // Set the users in state
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
           
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              View
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={user.image} alt={user.username} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href={`/our-admin-doctor-view/${user.id}`} className="text-indigo-600 hover:text-indigo-900">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
