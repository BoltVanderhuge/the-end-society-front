import React, {useEffect, useState} from 'react'
import { Switch } from 'react-router'
import styled from 'styled-components'
import Header from './Header'
import SearchBar from './SearchBar'
import GameSearch from './GameSearch'
import SelectedGameInfo from './SelectedGameInfo'
import RunInfo from './RunInfo'
import { setRuns } from '../redux/runsSlice';
import { setGame } from '../redux/gameSlice';
import { useDispatch, useSelector } from "react-redux";

function MainContainer() {
    const runs = useSelector((state) => state.runs);
    const dispatch = useDispatch();
    const [sortBy, setSortBy] = useState({
        system:"9|6|21"
      })
      const [searchData, setSearchData] = useState({
        query: false
      });
    
    useEffect( () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/runs`)
        .then( response => response.json() )
        .then(data => dispatch(setRuns(data)));
        
        fetch(`http://www.giantbomb.com/api/games/?api_key=${process.env.REACT_APP_API_KEY}&format=json&filter=platforms:${sortBy.system},name:${searchData.query}&field_list=name,id,image,description&limit=20`)
          .then( response => response.json() )
          .then(data => setGames(data.results));
        // .then(data=>console.log(data))
        
    }, [sortBy,searchData])
    console.log("runs",runs)
    const [games, setGames] = useState([])

    console.log(searchData)
        
        function handleClick(game){
            dispatch(setGame(game))

        }
        const gameArray = games.map((game) => (
                
            <li onClick={()=>handleClick(game)} key={game.id} >
                <img src={game.image.icon_url}>
                </img>
                {game.name}
            </li>
          ));

    return (
        <Container>
            <HeaderContainer>
                <Header />
            </HeaderContainer>
            <SearchBarContainer>
                <SearchBar sortBy={sortBy} setSortBy={setSortBy} setSearchData={setSearchData} searchData={searchData} />
            </SearchBarContainer>
            <GameSearchContainer>
                <GameSearch gameArray = {gameArray} />
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
