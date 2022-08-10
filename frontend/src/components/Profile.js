import styled from "styled-components";
import { useContext } from "react";
import { LoggedUserContext } from "../LoggedUserContext";



const Profile = () => {
const {loggedUser} = useContext(LoggedUserContext)
console.log(loggedUser)
if(localStorage.getItem("Token")=== null){
    return (
        <WrapperNot>
            <NotSign>
            Please Sign In!!!
            </NotSign>
        </WrapperNot>
    )
}else{
    const user = loggedUser[0]
    return (
        <>
        <Wrapper>
        <ProfilePic src={user.avatarUrl}/>
        <div>{user.username}</div>
        <div>{user.name}</div>
        <div>{user.last}</div>
        </Wrapper>

        </>
    )
}
}

const ProfilePic = styled.img`
height: 100px;
border-radius: 50%;
`

const Wrapper = styled.div`
border: solid;
height: 100%;
`
const WrapperNot = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`
const NotSign = styled.div`
border: solid;
width: 250px;
height: 250px;
font-size:75px;
`

export default Profile