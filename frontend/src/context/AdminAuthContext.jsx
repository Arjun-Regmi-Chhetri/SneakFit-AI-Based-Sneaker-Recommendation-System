import { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, setAuthHeader } from "../service/Service";


const AdminAuthContext = createContext()

export const AdminAuthProvider = ({children}) =>{


    const[isAuthenticated, setIsAuthenticated] = useState(()=>{
        return getAuthToken !== null
    })

    const [admin, setAdmin] = useState(null)

    useEffect(()=>{

        if(isAuthenticated){

            setAuthHeader(getAuthToken)
            

        }else{
            setAuthHeader(null)
            setAdmin(null)
        }

    },[isAuthenticated])


    const login = (token) =>{
        setAuthHeader(token)
        setIsAuthenticated(true)
    }


    const logout = ()=>{
        setAuthHeader(null)
        setIsAuthenticated(false)
    }

    return(

        <AdminAuthContext.Provider value={{isAuthenticated, admin, login, login}}>
            {children}
        </AdminAuthContext.Provider>

    )


}


export const useAuth = () =>{
    return useContext(AdminAuthContext)
}


