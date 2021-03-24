import {useEffect} from 'react'
import styled from 'styled-components';
import Login from './Login'
import Root from './Root'
import MainContainer from './MainContainer'
import Header from './Header'
import RunContainer from './RunContainer'
import ProfileContainer from './ProfileContainer'
import RunCollectionContainer from './RunCollectionContainer'
import {Route} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setUser} from '../redux/userSlice';
import { setRuns } from '../redux/runsSlice';
import PollContainer from './PollContainer';
import Poll from './Poll';

function App() {
  const runs = useSelector((state) => state.runs);
  // const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/runs`)
    .then( response => response.json() )
    .then(data => dispatch(setRuns(data)));
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
        <Header />
          <MainContainer />
      </Route>
      <Route exact path = '/runs'>
        <Header />
          <RunContainer />
      </Route>
      <Route exact path = '/collection'>
        <Header />
          <RunCollectionContainer />
      </Route>
      <Route exact path = '/profile'>
        <Header />
          <ProfileContainer />
      </Route>
      <Route exact path = '/calander'>
        <Header />
          {/* <PollContainer /> */}
          <Poll />
      </Route>

    </Container>
  );
}

export default App;
const Container = styled.div`

`