import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/userSlice';
import {useHistory} from 'react-router-dom'
import { setGame } from '../redux/gameSlice';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setRun } from '../redux/runSlice';
import styled from 'styled-components'

function Header() {
    const history = useHistory()
    const dispatch = useDispatch();
    
    function logout() {
        localStorage.removeItem("token");
        dispatch(setUser(false));
        history.push("/login")
        dispatch(setGame(false))
        dispatch(setRun(false))
      }
      function goToLogin(){
        history.push("/login")
      }
      function goToCollection(){
          history.push("/collection")
          dispatch(setGame(false))
          dispatch(setRun(false))
      }

      function goToGameSearch(){
        history.push("/centralcommand")
        dispatch(setGame(false))
        dispatch(setRun(false))
    }
    function goToProfile(){
      history.push("/profile")
      dispatch(setGame(false))
      dispatch(setRun(false))
  }

    function goToRuns(){
      history.push("/runs")
      dispatch(setGame(false))
      dispatch(setRun(false))
  }
  function goToCalender(){
    history.push("/calender")
    dispatch(setGame(false))
    dispatch(setRun(false))
}
    const user = useSelector((state) => state.user);
    return (
        <Container fluid>
          <Row className="pb-3 pt-3" >
            <Col xs={6}>
              <StyledImage src="https://res.cloudinary.com/dngxsavth/image/upload/v1617135533/Torch_Gif_ggvnru.gif" alt="Torch"></StyledImage>
              <Button variant="dark" onClick={goToCollection} value="run" >Run Collection</Button> {' '}
              <Button variant="dark" onClick={goToGameSearch} value="run" >Game Search</Button> {' '}
              { user && 
              <Button variant="dark" onClick={goToRuns} value="myruns">My Runs</Button> 
            } {' '}
                      { user && 
              <Button variant="dark" onClick={goToCalender} value="calender">Next Meeting</Button> 
            } {' '}
            { user && 
            <Button variant="dark" onClick={goToProfile} value="profile">Profile</Button> 
            } {' '}
              <Button variant="dark" onClick={user ? logout : goToLogin}>
                {user ? "Logout" : "Login" }
              </Button>
              <StyledImage src="https://res.cloudinary.com/dngxsavth/image/upload/v1617135533/Torch_Gif_ggvnru.gif" alt="Torch"></StyledImage>
            </Col>
          </Row>
        </Container>

    )
}

export default Header
const StyledImage = styled.img ` 
    width:  32px;
    height: 32px;
`;
