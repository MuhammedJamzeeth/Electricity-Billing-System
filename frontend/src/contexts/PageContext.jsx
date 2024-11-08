import {createContext, useState, useContext, useEffect} from 'react';
import {useLocation} from "react-router-dom";

const PageContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const PageProvider = ({ children }) => {
    const [pageName, setPageName] = useState("")
    const location = useLocation();

    useEffect(() => {
        setPageName(location.pathname)
    }, [location]);

    return (
        <PageContext.Provider value={{ pageName, setPageName }}>
            {children}
        </PageContext.Provider>
    )
}

export const usePage = () => {
    return useContext(PageContext)
}