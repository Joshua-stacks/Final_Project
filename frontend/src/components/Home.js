import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import moment from "moment-timezone";
import { HomeContext } from "./HomeContext";

const Home = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("America/Montreal");
  const [def, setDef] = useState();
  const { city, facts, load, status } = useContext(HomeContext);

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
        <Test>
          <Search>
            <Input
              type="text"
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
            />
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
        <Content>
          <Digital>
            <Day>{moment(def).tz(search).format("dddd")}</Day>
            <MorNi>
              <Time>{moment(def).tz(search).format("h:mm:ss")}</Time>
              {moment(def).tz(search).format("A")}
            </MorNi>
            <Date>{moment(def).tz(search).format("MMMM Do YYYY")}</Date>
          </Digital>
          <City>{search}</City>
        </Content>
        <Container>
          <Card>
            <Front>{facts.facts.title}</Front>
            <Back>{facts.facts.more}</Back>
          </Card>
        </Container>

        <Container2>
          <Card2>
            <Front2>{facts.two.title}</Front2>
            <Back2>{facts.two.more}</Back2>
          </Card2>
        </Container2>

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
  width: 95%;
  height: 65px;

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
  border: solid lightgrey;
  box-shadow: 2px 2px lightgrey;
  overflow-y: scroll;
  height: 400px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input``;
const Search = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  position: relative;

  margin-left: 15px;
 
  height: 100%;
  width: 95%;
`;

const Container = styled.div`
  position: relative;
  width: 30%;
  height: 20%;
  border-radius: 15px;
  background-color: grey;
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
`;
const Container2 = styled.div`
  left: 70%;
  position: relative;
  width: 30%;
  height: 20%;
  border-radius: 15px;
  background-color: grey;
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
`;
export default Home;
