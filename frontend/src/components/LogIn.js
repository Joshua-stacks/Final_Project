import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const LogIn = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err,setErr] = useState("")


  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username:user,
        password:pass
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.message)
        if(response.status !== 400){
          localStorage.setItem("Token",response.token)
          window.location.href = "/profile";
        }else{
          setErr(response.message)
        }

      });
  
  };
  console.log(err)

  return (
    <>
      <Wrapper>
        <Div>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <b>Log in</b>
            <input
              placeholder="Username"
              onChange={(event) => {
                setUser(event.target.value);
              }}
            />
            <input
              placeholder="Password"
              type={"password"}
              onChange={(event) => {
                setPass(event.target.value);
              }}
            />
            {err !== "" && <div>{err}</div>}
            <Button type={"submit"}>Log In</Button>
          </Form>
          <SignUp>
            <B>Sign up</B>
            <DivSign>To have access to the randomizer feature</DivSign>
            <Link to={"/signup"}>
              <ButSign>Sign Up</ButSign>
            </Link>
          </SignUp>
        </Div>
      </Wrapper>
    </>
  );
};
const ButSign = styled.button`
  margin-top: 10px;
  background-color: black;
  color: #cba64b;
  font-size: 22px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const B = styled.div`
  margin-bottom: 15px;
  font-weight: bold;
`;
const DivSign = styled.div`
  font-size: 22px;
`;
const Button = styled.button`
  margin-top: 10px;
  background-color: black;
  color: #cba64b;
  font-size: 22px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;
const SignUp = styled.div`
  padding: 20px;
  max-width: 160px;
  text-align: center;
`;
const Div = styled.div`
  display: flex;
  border-radius: 15px;
  padding: 20px;
  background-color: #cba64b;
  font-size: 25px;
  width: 450px;
  height: 250px;
`;
const Wrapper = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  border-right: solid;
  padding: 5px;
`;

export default LogIn;
