import { createContext, useEffect, useState } from "react";
import styled from "styled-components";

export const LoggedUserContext = createContext();

export const LoggedUserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [load, setLoad] = useState(false);
  const Loading = styled.div`
    position: absolute;
    top: 50%;
    right: 40%;
    height: 100px;
    width: 100px;
  `;

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
        <Loading>
          <img
            src="/images/profile-pics/giphyLoad.gif"
            style={{ width: "100%" }}
          />
        </Loading>
      </>
    );
  }

  return (
    <LoggedUserContext.Provider value={{ loggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};
