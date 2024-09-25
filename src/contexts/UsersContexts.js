import React, { createContext, useState, useEffect } from "react";
import { fetchDatas } from "../helpers/fetch";
import ErrorModal from "../components/Topbar/errorModal/ErrorModal";
const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsersWithTimeout = () => {
    return Promise.race([
      fetchUsers(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 5000)
      ),
    ]);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {


      const data = await fetchDatas(
        "https://myproject-4e193-default-rtdb.firebaseio.com/users.json"
      );
      if (data) {
        const transformedArray = data.map((subArray) => subArray[1]);
        const finalArray = transformedArray.filter((item) => item !== null);
        setUsers(finalArray);
      } else {
        setUsers([]);
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersWithTimeout().catch(() => {
        setError("Error fetching users")
        setIsLoading(false)
    });
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        fetchUsers,
        isLoading,
        error,
        fetchUsersWithTimeout,
      }}
    >
      {children}{" "}
    </UsersContext.Provider>
  );
};

export default UsersContext;
