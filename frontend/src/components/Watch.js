import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { LoggedUserContext } from "../LoggedUserContext";

const Watch = () => {
  const { loggedUser } = useContext(LoggedUserContext);

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

  const handleFav = () => {
    fetch(`/addFav/${loggedUser[0].username}`, {
      method: "PATCH",
      body: JSON.stringify({
        fav: [...loggedUser[0].fav, watch.watch._id],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        window.location.href = `/watch/${prms}`;
      });
  };
  const handleRemFav = () => {
    fetch(`/removeFav/${loggedUser[0].username}`, {
      method: "PATCH",
      body: JSON.stringify({
        fav: watch.watch._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        window.location.href = `/watch/${prms}`;
      });
  };

  if (!isLoaded) {
    return <>loading</>;
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
  const center = watch.watch.location[0];
  console.log(loggedUser[0].fav.includes(watch.watch._id));

  const checkFav = loggedUser[0].fav.includes(watch.watch._id);

  return (
    <>
      <div>{watch.watch.watchname}</div>
      <img src={watch.watch.imageSrc} style={{ width: "275px" }} />
      <div>Suggested retail price {watch.price}</div>
      <Div>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </Div>
      {!checkFav ? (
        <button onClick={handleFav}>Add to favorites</button>
      ) : (
        <button onClick={handleRemFav}> remove from favorites</button>
      )}
    </>
  );
};
const Loading = styled.div`
  position: absolute;
  top: 50%;
  right: 40%;
  height: 100px;
  width: 100px;
`;
const Div = styled.div`
  border: solid;
  width: 400px;
  height: 400px;
`;
export default Watch;
