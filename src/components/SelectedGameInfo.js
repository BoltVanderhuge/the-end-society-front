import React from 'react'
import {  useSelector } from "react-redux";
import styled from 'styled-components'


function SelectedGameInfo() {
    const game = useSelector((state) => state.game);

    console.log(game)
    if (game.deck){
    return (
        // < div dangerouslySetInnerHTML={{__html:game.description}}>
        // {/* {game.description} */}
        // </div>
        <div>
            <StyledImage src={game.image.small_url} alt={game.name}></StyledImage>
            {/* {game.expected_release_year} <br></br>{game.deck} */}
            <br></br>{game.expected_release_year} <br></br>{game.deck}
        </div>
        
    )} else {
        return (
        <div>{game?"We have no information on this game": null}</div>)
    }
}

export default SelectedGameInfo
const StyledImage = styled.img ` 
    width:  422px;
    height: 588px;
    object-fit: cover;
 `;
