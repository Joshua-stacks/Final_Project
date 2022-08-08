import { createContext, useEffect,useState } from "react";

export const LoggedUserContext = createContext()

export const LoggedUserProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(()=>{
        fetch("/user" , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("Token")
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData.user);
          setLoggedUser(responseData.user)
        })
    },[])

return (
    <LoggedUserContext.Provider value={{loggedUser}}>
        {children}
    </LoggedUserContext.Provider>
)

}