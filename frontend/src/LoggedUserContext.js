import { createContext, useEffect,useState } from "react";

export const LoggedUserContext = createContext()

export const LoggedUserProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [load, setLoad] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("Token")=== null){
            setLoad(true)
        }else{
        fetch("/user" , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("Token")
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
        setLoad(true)
          setLoggedUser(responseData.user)
        })
    }
    },[])
    if (load === false) {
        return <>loading</>;
      }
    
return (
    <LoggedUserContext.Provider value={{loggedUser}}>
        {children}
    </LoggedUserContext.Provider>
)

}