import { createContext, useEffect, useState } from "react";

export const LoggedUserContext = createContext();

export const LoggedUserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      setLoad(true);
    } else {
      fetch("/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setLoad(true);
          setLoggedUser(responseData.user);
        });
    }
  }, []);
  if (load === false) {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "50%",
            height: "100px",
            width: "100px",
          }}
        >
          <img
            src="/images/profile-pics/giphyLoad.gif"
            style={{ width: "100%" }}
          />
        </div>
      </>
    );
  }

  return (
    <LoggedUserContext.Provider value={{ loggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};
