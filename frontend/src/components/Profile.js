import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { LoggedUserContext } from "../LoggedUserContext";
import { BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loggedUser } = useContext(LoggedUserContext);
  const [show, setShow] = useState(false);
  const [newUser, setUser] = useState();
  const [lastName, setLastName] = useState();
  const [name, setName] = useState();
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

  const handleClick = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  if (localStorage.getItem("Token") === null) {
    return (
      <WrapperNot>
        <NotSign>Please Sign In!!!</NotSign>
      </WrapperNot>
    );
  } else {
    const user = loggedUser[0];
    const handleUpdate = () => {
      fetch("/update", {
        method: "PATCH",
        body: JSON.stringify({
          username: loggedUser[0].username,
          name: name,
          last: lastName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          window.location.href = "/profile";
          setShow(false);
        });
    };

    const handleDelete = () => {
      fetch("/profile", {
        method: "DELETE",
        body: JSON.stringify({
          username: loggedUser[0].username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          localStorage.clear();
          window.location.href = "/login";
          setShow(false);
        });
    };

    const filter = watches.filter((obj) => user.fav.includes(obj._id));
    console.log(filter);
    return (
      <>
        <Wrapper>
          <Info>
            <div>
              <ProfilePic src={user.avatarUrl} />
            </div>
            <div>@{user.username}</div>
            <div>{user.name}</div>
            <div>{user.last}</div>
            <BsPencil onClick={handleClick} />
            {show && (
              <Modal>
                <Cont>
                  <button onClick={handleDelete}>delete account</button>
                  <Inputname>
                    name
                    <input
                      placeholder={user.name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      required
                    />
                  </Inputname>
                  <Inputlast>
                    Last name
                    <input
                      placeholder={user.last}
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                      required
                    />
                  </Inputlast>
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={handleClose}>close</button>
                </Cont>
              </Modal>
            )}
          </Info>
          <Fav>
            your Fav watches
            <div>
              {filter.map((index) => (
                <Link to={`/watch/${index._id}`}>
                  <img src={index.imageSrc} style={{ width: "20%" }} />
                </Link>
              ))}
            </div>
          </Fav>
        </Wrapper>
      </>
    );
  }
};

const Fav = styled.div`
  margin-top: 25px;
  border: solid;
`;
const Cont = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const Inputuser = styled.div`
  display: flex;
  flex-direction: column;
`;
const Inputlast = styled.div`
  display: flex;
  flex-direction: column;
`;
const Inputname = styled.div`
  display: flex;
  flex-direction: column;
`;
const Modal = styled.div`
  position: absolute;
  width: 60%;
  height: 65%;
  border: solid;
  background-color: white;
  z-index: 2;
`;
const Info = styled.div`
  border: solid;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const ProfilePic = styled.img`
  border: solid;
  height: 150px;
  border-radius: 50%;
`;

const Wrapper = styled.div`
  border: solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;
const WrapperNot = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NotSign = styled.div`
  border: solid;
  width: 250px;
  height: 250px;
  font-size: 75px;
`;

export default Profile;
