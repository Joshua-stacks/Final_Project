import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [conPass, setConPass] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  console.log(pass);
  console.log(user);
  return (
    <>
      <Wrapper>
        <Div>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <b>Sign Up</b>
            <input
              placeholder="Username"
              onChange={(event) => {
                setUser(event.target.value);
              }}
            />
            <input
              placeholder="Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              placeholder="Last name"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            <input
              placeholder="Password"
              type={"password"}
              onChange={(event) => {
                setPass(event.target.value);
              }}
            />
            <input placeholder="Confirm Password" type={"password"} 
                          onChange={(event) => {
                            setConPass(event.target.value);
                          }}/>
            <Button type={"submit"}>Sign Up</Button>
          </Form>
          <SignUpDiv>
            <B>Sign In</B>
            <DivSign>To have access to the randomizer feature</DivSign>
            <Link to={"/login"}>
              <ButSign>Sign In</ButSign>
            </Link>
          </SignUpDiv>
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
const SignUpDiv = styled.div`
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
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  border-right: solid;
  padding: 5px;
`;
export default SignUp;
