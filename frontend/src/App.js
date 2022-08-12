import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyles";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import WorldTime from "./components/WorldTime";
import Home from "./components/Home";
import { HomeProvider } from "./components/HomeContext";
import Randomizer from "./components/Randomizer";
import Watch from "./components/Watch";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Div>
          <Header />
          <Wrapper>
            <WorldTime />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <HomeProvider>
                    <Home />
                  </HomeProvider>
                }
              />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/random" element={<Randomizer />} />
              <Route exact path="/login" element={<LogIn />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/watch/:id" element={<Watch />} />
            </Routes>
          </Wrapper>
        </Div>
      </BrowserRouter>
    </>
  );
};
const Div = styled.div`
  display: flex;
  min-width: fit-content;
  background-color: lightgrey;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export default App;
