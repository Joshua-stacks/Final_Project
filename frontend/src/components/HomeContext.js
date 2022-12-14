import { createContext, useEffect, useState } from "react";
import styled from "styled-components";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [facts, setFacts] = useState();
  const [status, setStatus] = useState(false);
  const [city, setCity] = useState(null);
  const [load, setLoad] = useState(false);
  const Loading = styled.div`
    position: absolute;
    top: 50%;
    right: 40%;
    height: 100px;
    width: 100px;
  `;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/cities");
      const json = await data.json();
      setLoad(true);
      setCity(json.cities);
      return json;
    };
    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);
  useEffect(() => {
    const fetchFacts = async () => {
      const data = await fetch("/facts");
      const json = await data.json();
      setStatus(true);
      setFacts(json);
      return json;
    };
    fetchFacts().catch((err) => {
      console.log(err);
    });
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
  if (status === false) {
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
    <HomeContext.Provider value={{ city, facts, load, status }}>
      {children}
    </HomeContext.Provider>
  );
};
