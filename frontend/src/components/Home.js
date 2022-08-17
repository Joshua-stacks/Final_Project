import styled, { keyframes } from "styled-components";
import { useContext, useState, useEffect } from "react";
import moment from "moment-timezone";
import { HomeContext } from "./HomeContext";
import { BsSearch } from "react-icons/bs";

const Home = () => {
  const { city, facts, load, status } = useContext(HomeContext);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("America/Montreal");
  const [def, setDef] = useState();
  const [toggle, setToggle] = useState(false);

  const HandleClick = () => {
    if (toggle === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  useEffect(() => {
    setInterval(() => {
      setDef(moment().format());
    }, 1000);
  }, []);

  const matched = city.filter((cities) => {
    return cities.city.toUpperCase().includes(value.toUpperCase());
  });

  return (
    <>
      <Wrapper>
        <SearchArea>
          <SearchIcon onClick={HandleClick} />
          <Test style={!toggle ? { display: "none" } : { display: "block" }}>
            <Search>
              <Input
                type="text"
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
                placeholder="Search for city"
              />
              <Digital>
                <Day>{moment(def).tz(search).format("dddd")}</Day>
                <MorNi>
                  <Time>{moment(def).tz(search).format("h:mm:ss")}</Time>
                  {moment(def).tz(search).format("A")}
                </MorNi>
                <Date>{moment(def).tz(search).format("MMMM Do YYYY")}</Date>
              </Digital>
              <Content>
                <City>{search}</City>
              </Content>
            </Search>
            <Ul
              style={
                value.length < 2 ? { display: "none" } : { display: "block" }
              }
            >
              {matched.map((sug) => {
                return (
                  <Li onClick={() => setSearch(sug.city)}>
                    {value.length >= 2 && sug.city}
                  </Li>
                );
              })}
            </Ul>
          </Test>
        </SearchArea>
        <Container>
          <Card>
            <Front>{facts.facts.title}</Front>
            <Back>{facts.facts.more}</Back>
          </Card>
        </Container>
        <div style={{ display: "flex", "justify-content": "flex-end" }}>
          <Container2>
            <Card2>
              <Front2>{facts.two.title}</Front2>
              <Back2>{facts.two.more}</Back2>
            </Card2>
          </Container2>
        </div>
        <Container>
          <Card>
            <Front>{facts.three.title}</Front>
            <Back>{facts.three.more}</Back>
          </Card>
        </Container>
      </Wrapper>
    </>
  );
};
const fadeIn = keyframes`
from {
    opacity: 0;
    transform: translatex(-10px)
}
to{
    opacity: 1;
}
`;

const SearchIcon = styled(BsSearch)`
  font-size: 50px;
  margin: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Content = styled.div`
  text-align: center;
  width: 20%;
  margin-top: 15px;
  margin-left: 15px;
`;

const Digital = styled.div`
  color: #cba64b;
  border: solid black;
  background-color: black;
  border-radius: 15px;
  width: 200px;
  height: 65px;
  margin-left: 45px;
  text-align: center;
`;
const Day = styled.div``;
const Time = styled.div`
  font-size: 25px;
`;
const MorNi = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
`;
const Date = styled.div``;
const City = styled.div`
  margin-top: 5px;
  font-size: larger;
  font-weight: bolder;
`;

const Ul = styled.ul`
  position: absolute;
  top: 6%;
  z-index: 1;
  margin-top: 20px;
  width: 380px;
  border-radius: 15px;
  overflow-y: scroll;
  height: 400px;
  background-color: white;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 15px;
  }
`;
const Li = styled.li`
  padding: 5px;
  margin: 5px;
  &:hover {
    background-color: lightblue;
    cursor: pointer;
  }
`;
const Test = styled.div`
  animation: ${fadeIn} 1000ms;
`;
const Input = styled.input``;
const Search = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  margin-left: 15px;
  height: 100%;
  width: 95%;
`;

const Container = styled.div`
  position: relative;
  margin-bottom: 75px;
  width: 395px;
  height: 215px;
  border-radius: 15px;
  background-color: lightgray;
`;

const Card = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transform-style: preserve-3d;
  transition: all 0.5s ease;
  background-color: white;
  &:hover {
    transform: rotateY(180deg);
  }
`;
const Front = styled.div`
  border-radius: 15px;
  font-size: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #cba64b;
  color: black;
`;

const Back = styled.div`
  border-radius: 15px;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: Black;
  color: #cba64b;
  transform: rotateY(180deg);
  font-size: 25px;
  padding: 5px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 15px;
  }
`;
const Container2 = styled.div`
  position: relative;
  margin-bottom: 75px;
  width: 395px;
  height: 215px;
  border-radius: 15px;
  background-color: lightgrey;
`;

const Card2 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transform-style: preserve-3d;
  transition: all 0.5s ease;
  background-color: white;
  &:hover {
    transform: rotateY(180deg);
  }
`;
const Front2 = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 15px;
  font-size: 50px;
  padding: 5px;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: black;
  color: #cba64b;
`;

const Back2 = styled.div`
  border-radius: 15px;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #cba64b;
  color: black;
  transform: rotateY(180deg);
  overflow-y: scroll;
  font-size: 25px;
  padding: 5px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 15px;
  }
`;
export default Home;
