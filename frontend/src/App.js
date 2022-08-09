import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyles";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import WorldTime from "./components/WorldTime";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Div>
          <Header />
          <Wrapper>
          <WorldTime/>
          <Routes>
            <Route exact path="/" element={"home"} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/random" element={"randomizer"} />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
          </Wrapper>
        </Div>
      </BrowserRouter>
    </>
  );
};
const Div = styled.div`
  display: flex;
  background-color: gray;
`;
const Wrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`
export default App;
