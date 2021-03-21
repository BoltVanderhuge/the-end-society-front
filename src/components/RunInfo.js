import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setGame } from '../redux/gameSlice';
import { setRuns } from '../redux/runsSlice';
import { setRun } from '../redux/runSlice';
import { setUser } from '../redux/userSlice';
import { useHistory } from "react-router-dom";

function RunInfo() {

    const user = useSelector((state) => state.user);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    const history = useHistory();
    function handleClick() {
        console.log(game.id)
        console.log(user.id)
        const runobj = {
            game_id:game.id,
            users: [user.id]}
        fetch(`${process.env.REACT_APP_BACKEND_URL}/runs`, {
            method: "POST",
            headers: {
            //   Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
            body: JSON.stringify(runobj),
          })
          .then(r => r.json() )
          .then(newRun => {
            dispatch(setRun(newRun));
            // dispatch(setUser(user => {
            //   return {...user, runs: [...user.runs, newRun]} 
            // }))
            // history.push(`/run`);
          })
    }
    
    const game = useSelector((state) => state.game);
    const runs = useSelector((state) => state.runs);
    const existingrun = runs.find(run=> run.game_id === game.id)
    if (existingrun) {
    return (
        
        <div>
            This game has been taken by {existingrun.users[0].username}
        </div>
    )
    } else {
        return (
            <button onClick={handleClick}>Claim this game</button>
        )
    }
}

export default RunInfo

