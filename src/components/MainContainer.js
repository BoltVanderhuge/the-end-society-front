import React, {useEffect} from 'react'
import { Switch } from 'react-router'
import styled from 'styled-components'
import Header from './Header'
import SearchBar from './SearchBar'
import GameSearch from './GameSearch'
import SelectedGameInfo from './SelectedGameInfo'
import RunInfo from './RunInfo'
import { setRuns } from '../redux/runsSlice';
import { useDispatch, useSelector } from "react-redux";

function MainContainer() {
    const runs = useSelector((state) => state.runs);
    const dispatch = useDispatch();
    useEffect( () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/runs`)
        .then( response => response.json() )
        .then(data => dispatch(setRuns(data)));
        // .then(data=>console.log(data))
        
    }, [])
    console.log(runs)
    return (
        <Container>
            <HeaderContainer>
                <Header />
            </HeaderContainer>
            <SearchBarContainer>
                <SearchBar />
            </SearchBarContainer>
            <GameSearchContainer>
                <GameSearch />
            </GameSearchContainer>
            <SelectedGameInfoContainer>
                <SelectedGameInfo />
            </SelectedGameInfoContainer>
            <RunInfoContainer>
                <RunInfo />
            </RunInfoContainer>
        </Container>
    )
}

export default MainContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.4fr 1.6fr 1fr;
  gap: 5px 5px;
  grid-template-areas:
    "header header header header"
    "searchBar gameSearch gameSearch gameSearch"
    "searchBar selectedGameInfo selectedGameInfo runInfo";

`
const SearchBarContainer = styled.aside ` 
grid-area: searchBar; `;

const HeaderContainer = styled.section ` 
grid-area: header; `;

const GameSearchContainer = styled.section ` 
grid-area: gameSearch; `;

const SelectedGameInfoContainer = styled.section ` 
grid-area: selectedGameInfo; `;

const RunInfoContainer = styled.section ` 
grid-area: runInfo; `;
