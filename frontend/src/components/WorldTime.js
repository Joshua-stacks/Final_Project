import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';


const WorldTime =() => {
  const [value, setValue] = useState();


useEffect(() => {
setInterval(() => {
    setValue(moment().format())
}, 1000);
 
  }, []);


  return (
    <Wrapper>
        <Content>
        <Digital>
            <Day>{moment(value).tz('America/Los_Angeles').format('dddd')}</Day>
            <MorNi><Time>{moment(value).tz('America/Los_Angeles').format("h:mm:ss")}</Time>{moment(value).tz('America/Los_Angeles').format("A")}</MorNi>
            <Date>{moment(value).tz('America/Los_Angeles').format("MMMM Do YYYY")}</Date>
        </Digital>
        <City>Los Angeles, United States</City>
        </Content>
        <Content>
        <Digital>
            <Day>{moment(value).format("dddd")}</Day>
            <MorNi><Time>{moment(value).format("h:mm:ss")}</Time>{moment(value).format("A")}</MorNi>
            <Date>{moment(value).format("MMMM Do YYYY")}</Date>
        </Digital>
        <City>Your time</City>
        </Content>
        <Content>
        <Digital>
            <Day>{moment(value).tz('Europe/Zurich').format("dddd")}</Day>
            <MorNi><Time>{moment(value).tz('Europe/Zurich').format("h:mm:ss")}</Time>{moment(value).tz('Europe/Zurich').format("A")}</MorNi>
            <Date>{moment(value).tz('Europe/Zurich').format("MMMM Do YYYY")}</Date>
        </Digital>
        <City>Zurich, Switzerland</City>
        </Content>
        <Content>
        <Digital>
            <Day>{moment(value).tz('Asia/Tokyo').format("dddd")}</Day>
            <MorNi><Time>{moment(value).tz('Asia/Tokyo').format("h:mm:ss")}</Time>{moment(value).tz('Asia/Tokyo').format("A")}</MorNi>
            <Date>{moment(value).tz('Asia/Tokyo').format("MMMM Do YYYY")}</Date>
        </Digital>
        <City>Tokyo, Japan</City>
        </Content>
    </Wrapper>
  )
}
const Content = styled.div`
text-align: center;
width: 20%;
margin-top: 15px;
margin-left: 15px;
`
const Wrapper = styled.div`
border-bottom: 1px black solid;
width: 100%;
height: 125px;
display: flex;
justify-content: space-between;
`
const Digital = styled.div`
color: #cba64b;
border: solid black;
background-color: black;
border-radius: 15px;
width: 95%;
height: 65px;

text-align: center;
`
const Day  = styled.div`

`
const Time = styled.div`
font-size: 25px;
`
const MorNi = styled.div`
display: flex;
justify-content: center;
align-items: baseline;
`
const Date = styled.div`

`
const City = styled.div`
margin-top: 5px;
font-size: larger;
font-weight: bolder;
`
export default WorldTime