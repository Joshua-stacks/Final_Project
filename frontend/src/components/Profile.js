import styled from "styled-components";
import { useContext, useState } from "react";
import { LoggedUserContext } from "../LoggedUserContext";
import { BsPencil } from "react-icons/bs";

const Profile = () => {
  const { loggedUser } = useContext(LoggedUserContext);
  const [show, setShow] = useState(false);

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
    return (
      <>
        <Wrapper>
          <Info>
            <div>
              <ProfilePic src={user.avatarUrl} />
            </div>
            <div>{user.username}</div>
            <div>{user.name}</div>
            <div>{user.last}</div>
            <BsPencil onClick={handleClick} />
            {show && (
              <Modal>
                this is a modal<button onClick={handleClose}>close</button>
              </Modal>
            )}
          </Info>
        </Wrapper>
      </>
    );
  }
};
const Modal = styled.div`
  position: absolute;
  width: 500px;
  height: 600px;
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
