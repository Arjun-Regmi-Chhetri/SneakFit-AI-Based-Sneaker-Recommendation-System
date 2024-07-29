import React, { useEffect, useState } from "react";
import { getAllAdmin, deleteAdmin, updateAdmin } from "../../../../service/Service";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const AdminList = () => {
  const [admins, setAdmin] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getAllAdmin();
      setAdmin(response);
      setError(null);
    } catch (error) {
      setError("Failed to load admins");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    if(success){
      const timer = setTimeout(()=>{
        setSuccess(null)
      }, 2000)

      return() => clearInterval(timer)
    }
  },[success])

  const handleDelete = async (id) => {
    try {
      await deleteAdmin(id);
      setSuccess("Admin deleted successfully");
      fetchData();
    } catch (error) {
      setError("Failed to delete admin");
    }
  };

  const capitalizeField = (field) => {
    if (!field) return '';
    return field.charAt(0).toUpperCase() + field.slice(1).toLowerCase();
  };

  const handleUpdate = async(id, field, value) =>{

    try{

      const adminToUpdate = admins.find(admin => admin.id === id)

      const admin = {...adminToUpdate, [field]: value}

      if(admin){
        await updateAdmin(admin)
        const capitalizedField = capitalizeField(field);
        const capitalizedValue = capitalizeField(value);
        setSuccess(`Updated ${capitalizedField} to ${capitalizedValue} successfully`)
        fetchData()
      }

    }catch(error){
      throw error
    }

  }

  return (
    <>
      <div className="user-list">
        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className={`absolute right-3 top-3 px-4 py-2  bg-green-600 text-white text-sm transition-opacity duration-1000 ${success ? 'success-message' : 'opacity-0'} ${success ? 'success-message-border' : 'w-0'}`}>
            {success}
          </p>

      )}
      
        <div className="relative text-left">
          <div>
            <p className="text-2xl font-bold">Users List</p>
          </div>
          <div className="py-7">
            <table className="table-auto w-full text-left whitespace-no-wrap overflow-hidden rounded-md">
              <thead className="dark:bg-white bg-gray-600 rounded-md">
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                    SN
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                    Full Name
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                    Email
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                    Role
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                    Status
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr key={admin.id}>
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{admin.fullName}</td>
                    <td className="px-4 py-3">{admin.email}</td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.role}
                        onChange={(e) => handleUpdate(admin.id, 'role', e.target.value)}
                        className="form-select bg-gray-600 p-2 rounded-sm"
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="STAFF">STAFF</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.status}
                        onChange={(e) => handleUpdate(admin.id, 'status', e.target.value)}
                        className="form-select bg-gray-600 p-2 rounded-sm"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="cursor bg-red-500 p-3 rounded-md mx-2"
                      >
                        <DeleteForeverIcon />
                      </button>
                      <Link
                        to={`/edit/${admin.id}`}
                        className="cursor bg-green-500 p-3 rounded-md mx-2"
                      >
                        <EditIcon />
                      </Link>
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

export default AdminList;
