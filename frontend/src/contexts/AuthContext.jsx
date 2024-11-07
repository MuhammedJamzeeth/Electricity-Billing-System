import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setPageName] = useState({})

    return (
        <AuthContext.Provider value={{ setPageName }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
