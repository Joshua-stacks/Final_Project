import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyles";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Div>
          <Header />
          <Routes>
            <Route exact path="/" element={"Home"} />
            <Route exact path="/profile" element={"My profile"} />
            <Route exact path="/random" element={"randomizer"} />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </Div>
      </BrowserRouter>
    </>
  );
};
const Div = styled.div`
  display: flex;
  background-color: gray;
`;

export default App;
