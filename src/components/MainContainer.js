import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import GameSearch from './GameSearch'
import SelectedGameInfo from './SelectedGameInfo'
import RunInfo from './RunInfo'
import { setGame } from '../redux/gameSlice';
import { useDispatch } from "react-redux";

import Media from 'react-bootstrap/Media';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function MainContainer() {

    const dispatch = useDispatch();
    const [sortBy, setSortBy] = useState({
        system:"9|6|21"
      })
      const [searchData, setSearchData] = useState({
        query: ""
      });
    console.log(process.env.REACT_APP_API_KEY)
    useEffect( () => {
        // fetch(`${process.env.REACT_APP_BACKEND_URL}/runs`)
        // .then( response => response.json() )
        // .then(data => dispatch(setRuns(data)));
        
        fetch(`http://www.giantbomb.com/api/games/?api_key=${process.env.REACT_APP_API_KEY}&format=json&filter=platforms:${sortBy.system},name:${searchData.query}&field_list=name,id,deck,image,description,expected_release_year&limit=20`)
          .then( response => response.json() )
          .then(data => setGames(data.results));
        // .then(data=>console.log(data))
        
    }, [sortBy,searchData])
    const [games, setGames] = useState([])

        // console.log(game)
    function handleClick(game){
            dispatch(setGame(game))

    }
    const gameArray = games.map((game) => (
        <Media onClick={()=>handleClick(game)} key={game.id} as="li">
            <img
                width={64}
                height={64}
                className="align-self-center mr-3"
                src={game.image.icon_url}
                alt={game.name}
            />
            
            <Media.Body>
                <h5>{game.name}</h5>
            </Media.Body>
        </Media>
                    
            // <li onClick={()=>handleClick(game)} key={game.id} >
            //     <img src={game.image.icon_url} alt={game.name}>
            //     </img>
            //     {game.name}
            // </li>
    ));

    return (
        <Container fluid>
            <Row>
                <Col xs={3}>
                    <SearchBarContainer>
                        <SearchBar sortBy={sortBy} setSortBy={setSortBy} setSearchData={setSearchData} searchData={searchData} />
                    </SearchBarContainer>
                    <GameSearchContainer>
                        <GameSearch gameArray = {gameArray} />
                    </GameSearchContainer>
                </Col>
                <Col>
                    <RunInfoContainer>
                        <RunInfo />
                    </RunInfoContainer>
                    <SelectedGameInfoContainer>
                        <SelectedGameInfo />
                    </SelectedGameInfoContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default MainContainer;

// const Container = styled.div`

// `
const SearchBarContainer = styled.div ` 
 `;


const GameSearchContainer = styled.div ` 

`;

const SelectedGameInfoContainer = styled.div ` 
`;

const RunInfoContainer = styled.div ` 
 `;
