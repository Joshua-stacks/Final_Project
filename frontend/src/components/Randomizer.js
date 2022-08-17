import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Randomizer = () => {
  const [watches, setWathes] = useState();
  const [load, setLoad] = useState(false);
  const [random, setRandom] = useState();
  const [sta, setSta] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/watches");
      const json = await data.json();
      setLoad(true);
      setWathes(json.product);
      return json;
    };
    fetchData().catch((err) => {
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

  const handleClick = () => {
    setSta(false);
    setRandom("l");
    setTimeout(() => {
      setSta(true);
      setRandom(watches[Math.floor(Math.random() * watches.length)]);
    }, 5000);
  };
  console.log(sta);

  if (localStorage.getItem("Token") === null) {
    return (
      <WrapperNot>
        <NotSign>Please Sign In!!!</NotSign>
      </WrapperNot>
    );
  } else {
    return (
      <Wrapper>
        <ButRan onClick={handleClick}>Random</ButRan>
        {/* {random !== undefined && ( */}
        <RanDiv>
          {!sta ? (
            <>
              {random !== undefined ? (
                <img src="/images/profile-pics/giphy.gif" />
              ) : (
                <></>
              )}
            </>
          ) : (
            <Watchdiv>
              <LinkW to={`/watch/${random._id}`}>
                <div>{random.watchname}</div>
                <img src={random.imageSrc} style={{ width: "100%" }} />
              </LinkW>
            </Watchdiv>
          )}
        </RanDiv>
        {/* )} */}
      </Wrapper>
    );
  }
};
const Loading = styled.div`
  position: absolute;
  top: 50%;
  right: 40%;
  height: 100px;
  width: 100px;
`;
const LinkW = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Watchdiv = styled.div`
  width: 300px;
  height: 300px;
`;

const RanDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 300px;
`;
const ButRan = styled.button`
  font-size: 50px;
  padding: 15px;
  background-color: black;
  color: #cba64b;
  border-radius: 15px;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const WrapperNot = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NotSign = styled.div`
  border: solid;
  width: 350px;
  height: 350px;
  font-size: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Randomizer;
