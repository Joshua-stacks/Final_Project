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
          <Img src="/images/profile-pics/backfround.jpg" />
          <All>
            <Info>
              <div>
                <ProfilePic src={user.avatarUrl} />
              </div>
              <div>
                <div
                  style={{
                    "font-weight": "bold",
                    "font-size": "25px",
                    "margin-bottom": "15px",
                    "margin-right": "15px",
                  }}
                >
                  @{user.username}
                </div>
                <div style={{ "font-size": "20px", "margin-left": "15px" }}>
                  {user.name} {user.last}
                </div>
              </div>
              <Pencil onClick={handleClick} />
              {show && (
                <Modal>
                  <Cont>
                    <ButDel onClick={handleDelete}>delete account</ButDel>
                    <Inputname>
                      Name:
                      <input
                        placeholder={user.name}
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                        required
                      />
                    </Inputname>
                    <Inputlast>
                      Last name:
                      <input
                        placeholder={user.last}
                        onChange={(event) => {
                          setLastName(event.target.value);
                        }}
                        required
                      />
                    </Inputlast>
                    <DivBut>
                      <ButUpt onClick={handleUpdate}>Update</ButUpt>
                      <ButClose onClick={handleClose}>Close</ButClose>
                    </DivBut>
                  </Cont>
                </Modal>
              )}
            </Info>
            <Fav>
              <div
                style={{
                  "border-bottom": "solid 1px grey",
                  "margin-bottom": "10px",
                }}
              >
                Your favorite watches:
              </div>

              <div>
                {filter.map((index) => (
                  <Link to={`/watch/${index._id}`}>
                    <img src={index.imageSrc} style={{ width: "20%" }} />
                  </Link>
                ))}
              </div>
            </Fav>
          </All>
        </Wrapper>
      </>
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

const ButUpt = styled.button`
  font-size: 20px;
  background-color: #cba64b;
  padding: 10px;
  border: none;
  border-radius: 15px;
  margin-right: 25px;
  &:hover {
    cursor: pointer;
  }
`;

const ButClose = styled.button`
  font-size: 20px;
  background-color: black;
  color: #cba64b;
  padding: 10px 15px;

  border: none;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const DivBut = styled.div`
  margin-top: 15px;
`;

const ButDel = styled.button`
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const Pencil = styled(BsPencil)`
  &:hover {
    cursor: pointer;
  }
`;

const All = styled.div`
  position: absolute;
  margin-top: 105px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Fav = styled.div`
  margin-top: 25px;
  margin-left: 5px;
  max-width: fit-content;
  min-width: 595px;
  font-size: 25px;
`;
const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Inputlast = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;
const Inputname = styled.div`
  display: flex;
  flex-direction: column;
`;
const Modal = styled.div`
  position: absolute;
  width: 550px;
  height: 450px;
  border: solid;
  background-color: white;
  z-index: 2;
  background-color: whitesmoke;
  border: whitesmoke solid;
  border-radius: 15px;
  box-shadow: 5px 5px grey;
`;
const Info = styled.div`
  width: 600px;
  display: flex;
  margin-top: 50px;
  border: none;
  border-radius: 15px;
  border-top: solid gray;
  padding: 20px;
  background-color: lightgray;
`;

const ProfilePic = styled.img`
  border: solid;
  height: 150px;
  border-radius: 50%;
`;

const Wrapper = styled.div`
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
  width: 350px;
  height: 350px;
  font-size: 100px;
`;

export default Profile;
