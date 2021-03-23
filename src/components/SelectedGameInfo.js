import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setGame } from '../redux/gameSlice';
import styled from 'styled-components';



function SelectedGameInfo() {
    const game = useSelector((state) => state.game);
    console.log(game)
    if (game.description){
    return (
        < div dangerouslySetInnerHTML={{__html:game.description}}>
        {/* {game.description} */}
        </div>
    )} else {
        return (
        <div>{game?"We have no information on this game": null}</div>)
    }
}

export default SelectedGameInfo
