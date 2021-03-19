import {useState, useEffect} from 'react'
import styled from 'styled-components';
import Login from './Login'
import Root from './Root'
import MainContainer from './MainContainer'
import {Switch, Route} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/userSlice';

function App() {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {

    if (token) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((r) => r.json())
      .then((user) => {
        dispatch(setUser(user));
      });
    }
  }, [token,dispatch]); 
  return (
    <Container>
       <Route exact path='/login'>
          <Login />
      </Route> 
      <Route exact path = '/'>
          <Root />
      </Route>
      <Route exact path = '/centralcommand'>
          <MainContainer />
      </Route>
    </Container>
  );
}

export default App;
const Container = styled.div`

`