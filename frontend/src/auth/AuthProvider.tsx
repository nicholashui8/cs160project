import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState<string | null>(localStorage.getItem("persist"));
    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;