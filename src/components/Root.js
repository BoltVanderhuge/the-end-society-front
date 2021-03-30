import React from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import useSound from 'use-sound';
import door from './sounds/door.wav'
import { useSelector } from "react-redux";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Root() {
  const user = useSelector((state) => state.user);
  const [playActive] = useSound(
    door,
    { volume: 0.25 }
  )
    const history = useHistory();
    function handleClick(){
        playActive()
        if (user){
          history.push("/centralcommand")
        } else {
        history.push("/login")}
    }
    return (
        <>
        <StyledContainer>
          <Row>
              <Col className="mx-auto text-center vh-100">
                <StyledImage onClick={handleClick} 
                  src="https://res.cloudinary.com/dngxsavth/image/upload/v1616100330/door_gd9j9g.png"
                  alt="Door"
                />
              </Col>
            </Row>
        </StyledContainer>
        
        </>
    )
}

export default Root
const StyledContainer = styled(Container)`
background-color: black;
`
const StyledImage = styled.img`
  position: fixed;
  left: 50%;
  bottom: -185px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
`
// const ImageContainer = styled.div`
//     margin: 0; padding: 0;
//   width: 100%;
//   max-height: calc(100vh - 230px);
//   overflow:hidden;
//   .main{
//     width: 100%;
//     background-position: center center;
//   background-repeat: no-repeat;
//   background-size: contain;
//   width: 100vw;
//   height: 100vh;
//   z-index: 1;
//   position:absolute;
//   } 
//     background-color: black;
//     .door {
//     z-index: 2;
//     height: 13%;
//     position: absolute;
//     left: 50%;
//     bottom: -9%;
//     transform: translate(-50%, -50%);
//     margin: 0 auto;
//     background-color: black;
//   }
// `
