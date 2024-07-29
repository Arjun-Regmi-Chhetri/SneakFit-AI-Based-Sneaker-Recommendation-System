import React, { useEffect, useState } from "react";

import { fetchAllUser, deleteuser } from "../../../../service/Service";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchAllUser();
      setUsers(response)
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async(id)=>{

    await deleteuser(id)

    fetchData()

  }

  return (
    <>
      <div className="user-list">
        <div className="relative text-left">
          <div>
            <p className="text-2xl font-bold">Users List</p>
          </div>
          <div className="py-7">
            <table className="table-auto w-full text-left whitespace-no-wrap overflow-hidden rounded-md">
              <thead className="dark:bg-white bg-gray-600 rounded-md">
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                    User Id
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                    FullName
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                    Email
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">
                  {user.fullName ? user.fullName : <p className="text-gray-400"> <span>&lt;</span> empty <span>&gt;</span> </p>}
                    
                    </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                  <button
                      onClick={() => handleDelete(user.id)}
                      className="cursor bg-red-500 p-3 rounded-md mx-2"
                    >
                      <DeleteForeverIcon />
                    </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
