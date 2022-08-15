import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const Watch = () => {
  const [watch, setWatch] = useState();
  const [status, setStatus] = useState(false);
  const [gps, setGps] = useState();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE,
  });
  const prms = useParams().id;

  useEffect(() => {
    const fetchFacts = async () => {
      const data = await fetch(`/watch/${prms}`);
      const json = await data.json();
      setStatus(true);
      setWatch(json);
      return json;
    };
    fetchFacts().catch((err) => {
      console.log(err);
    });
  }, []);

  if (!isLoaded) {
    return <>loading</>;
  }
  if (status === false) {
    return <>loading</>;
  }
  const center = { lat: 45.56951, lng: -73.75087 };
  return (
    <>
      <div>{watch.watch.watchname}</div>
      <img src={watch.watch.imageSrc} style={{ width: "20%" }} />
      <div>{watch.price}</div>
      <Div>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        />
      </Div>
    </>
  );
};
const Div = styled.div`
  border: solid;
  width: 40%;
  height: 40%;
`;
export default Watch;
