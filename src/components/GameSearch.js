import React, {useState, useEffect} from 'react'

import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { setGame } from '../redux/gameSlice';

function GameSearch() {
    const [games, setGames] = useState([])
    const dispatch = useDispatch();
    
    useEffect( () => {
        fetch(`http://www.giantbomb.com/api/games/?api_key=${process.env.REACT_APP_API_KEY}&format=json&filter=platforms:9|6|21&field_list=name,id,image,description`)
          .then( response => response.json() )
          .then(data => setGames(data.results));
          
        }, [])
        function handleClick(game){
            dispatch(setGame(game))

            console.log(game)
        }
        const gameArray = games.map((game) => (
                
            <li onClick={()=>handleClick(game)} key={game.id} >
                {game.name}
                <img src={game.image.icon_url}>
                </img>
            </li>
          ));

    //   if (games) {
    return (
        <GameSearchContainer>
            {gameArray}
        </GameSearchContainer>
    )
    // } else {
        return null
    // }
}

export default GameSearch
const GameSearchContainer = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
`