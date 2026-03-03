import { useState, createContext, useEffect } from "react";
import axios from "axios";


export const authContext = createContext()

export default function AuthContextProvider({ children }) {

    // handle refresh

    const [isLogin, setLogin] = useState(null)
    const [userData, setUserData] = useState(null)

    async function getUserData() {
        const {data} = await axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setUserData(data?.data?.user)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLogin(localStorage.getItem('token'))
            getUserData()
        }
    }, [])


    return <authContext.Provider value={{ isLogin, setLogin, userData }}>
        {children}
    </authContext.Provider>
}


