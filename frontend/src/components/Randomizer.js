import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Randomizer = () => {
  const [watches, setWathes] = useState();
  const [load, setLoad] = useState(false);

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

  console.log();

  return (
    <Wrapper>
      {watches.map((e) => {
        return (
          <>
            <Link to={`/watch/${e._id}`}>
              <div>{e.watchname}</div>
              <img src={e.imageSrc} style={{ width: "20%" }} />
            </Link>
          </>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: solid;
  height: 100%;
`;

export default Randomizer;
