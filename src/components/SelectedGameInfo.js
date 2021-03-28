import React from 'react'
import {  useSelector } from "react-redux";




function SelectedGameInfo() {
    const game = useSelector((state) => state.game);
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
