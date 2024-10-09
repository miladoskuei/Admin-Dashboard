import React, { createContext, useState, useEffect } from "react";
import { fetchDatas } from "../helpers/fetch";
import ErrorModal from "../components/Topbar/errorModal/ErrorModal";

const AdminsContext = createContext();

export const AdminsProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdminsWithTimeout = () => {
    return Promise.race([
      fetchAdmins(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 5000)
      ),
    ]);
  };

  const fetchAdmins = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDatas(
        "https://myproject-4e193-default-rtdb.firebaseio.com/admins.json"
      );
      if (data) {
        const transformedArray = Object.values(data);
        const finalArray = transformedArray.filter((item) => item !== null);
        setAdmins(finalArray);
      } else {
        setAdmins([]);
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminsWithTimeout().catch(() => {
      setError("Error fetching admins");
      setIsLoading(false);
    });
  }, []);

  return (
    <AdminsContext.Provider
      value={{
        admins,
        fetchAdmins,
        isLoading,
        error,
        fetchAdminsWithTimeout,
      }}
    >
      {children}{" "}
    </AdminsContext.Provider>
  );
};

export default AdminsContext;
