import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [isLogin, setIsLogin] = useState(false);

const toggleLogin = () => {
setIsLogin((prev) => !prev);
};

return (
<AuthContext.Provider value={{ isLogin, toggleLogin }}>
{children}
</AuthContext.Provider>
);
};

export default AuthContext;