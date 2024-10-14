import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [isLogin, setIsLogin] = useState(false);
const [LogedInUsername, setLogedInUsername] = useState(null);

const toggleLogin = () => {
setIsLogin((prev) => !prev);
};
const setLoginUser = (name) => {
    setLogedInUsername(name)
}


return (
<AuthContext.Provider value={{ isLogin, toggleLogin ,LogedInUsername,setLoginUser  }}>
{children}
</AuthContext.Provider>
);
};

export default AuthContext;