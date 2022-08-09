import styled, { keyframes } from "styled-components";
import { BsFillArrowRightCircleFill,BsFillArrowLeftCircleFill } from "react-icons/bs";
import { GiPocketWatch } from "react-icons/gi";
import { FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Header = () => {
  const [toggle, setToggle] = useState(false);

  const HandleClick = () => {
    if(toggle=== false){
        setToggle(true)
    }else{
        setToggle(false)
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/login";
    
  }
  return (
    <>
      <Div style={!toggle ? {"border-right": "solid 2px grey"} : {"border":"none"}}>
        <LinkIcon to={"/"}><GiPocketWatch /></LinkIcon>
        <But >
            {!toggle ? <Arrow onClick={HandleClick} />:<ArrowClose onClick={HandleClick} />}
          
        </But>
        <A href="https://www.instagram.com/watchgang/"><FaInstagram /></A>
      </Div>
      <PopDiv style={!toggle ? {"display":"none"} : {"display":"flex"}}>
        <Logs>
          {localStorage.getItem("Token") === null 
          ? <>
            <Link to={"/login"}><LogIn>Log In</LogIn></Link>
            <Link to={"/signup"}><SignUp>Sign Up</SignUp></Link>
            </>
            :
            <>
            <Link to={"/login"}><SignOut onClick={handleSignOut}>Sign out</SignOut></Link>
            </>
  }
        </Logs>

        <Menu to={"/"}>Home</Menu>
        <Menu to={"/profile"}>Profile</Menu>
        <Menu to={"/random"}>Randomiser</Menu>

      </PopDiv>
    </>
  );
};
const SignOut = styled.button`
position: absolute;
background-color: #CBA64B ;
padding: 20px;
margin-left: 40px;
border-radius: 50px;
color: black;
font-weight: bold;
font-size:20px;
border: none;
&:hover{
    cursor: pointer;
}
`
const SignUp = styled.button`
background-color: #CBA64B ;
padding: 20px;
border-radius: 50px;
color: black;
font-weight: bold;
font-size:19.8px;
border: none;
&:hover{
    cursor: pointer;
}
`
const LogIn = styled.button`
padding-right: 5px;
font-style: italic;
font-size:19.8px;
border-radius: 50px;
padding:20px;
border: none;
background-color: grey;
color: white;
&:hover{
    cursor: pointer;
}
`
const Logs = styled.div`
display: flex;
align-items: center;
background-color: grey;
padding: 0;
padding-left: 7px;
border-radius: 50px;
margin: 0;
font-size: 30px;
`

const fadeIn = keyframes`
from {
    opacity: 0;
    transform: translatex(-70px)
}
to{
    opacity: 1;
}
`
const LinkIcon = styled(Link)`
color:#CBA64B ;
`
const A = styled.a`
color:#CBA64B ; 
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 50px;
  border-right: solid 2px grey;
  height: 100vh;
  padding: 15px;
  color: #CBA64B;
  background-color: black;
`;
const Arrow = styled(BsFillArrowRightCircleFill)`
  &:hover {
    cursor: pointer;
  }
`;
const ArrowClose = styled(BsFillArrowLeftCircleFill)`
  &:hover {
    cursor: pointer;
  }
`
const But = styled.button`
  border: none;
  background-color: black;
  color: #CBA64B;
  font-size: 50px;
`;
const PopDiv = styled.div`
  display: flex;
  background-color: black;
  flex-direction: column;
  font-size: 45px;
  padding: 15px;
  text-align: center;
  color: white;
  justify-content: space-around;
  border-right: solid grey;
animation: ${fadeIn} 1000ms;
`;
const Menu = styled(Link)`
color: white;
text-decoration: none;
`;
export default Header;
