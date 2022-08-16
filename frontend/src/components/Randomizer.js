import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Randomizer = () => {
  const [watches, setWathes] = useState();
  const [load, setLoad] = useState(false);
  const [random, setRandom] = useState();

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
    return <>loading</>;
  }
  let ran = null;

  const handleClick = () => {
    setRandom(watches[Math.floor(Math.random() * watches.length)]);
  };

  return (
    <Wrapper>
      <button onClick={handleClick}>Random</button>
      {random !== undefined && (
        <>
          <Link to={`/watch/${random._id}`}>
            <div>{random.watchname}</div>
            <img src={random.imageSrc} style={{ width: "20%" }} />
          </Link>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: solid;
  height: 100%;
`;

export default Randomizer;
