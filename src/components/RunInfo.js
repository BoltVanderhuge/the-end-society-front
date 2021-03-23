import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToRuns } from '../redux/runsSlice';
import { useHistory } from "react-router-dom";

function RunInfo() {

    const user = useSelector((state) => state.user);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    const history = useHistory();
    function handleClick() {
        console.log(game)
        console.log(user.id)
        const runobj = {
            game_id:game.id,
            name: game.name,
            users: [user.id]}
        fetch(`${process.env.REACT_APP_BACKEND_URL}/runs`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify(runobj),
          })
          .then(r => r.json() )
          .then(newRun => {
            // dispatch(setRun(newRun));
            console.log(newRun)
            dispatch(addToRuns(newRun));
            // dispatch(setUser(user => {
            //   return {...user, runs: [...user.runs, newRun]} 
            // }))
            // history.push(`/run`);
          })
    }
    const game = useSelector((state) => state.game);
    const runs = useSelector((state) => state.runs);

    const existingrun = runs.find(run=> run.game_id === game.id)

    if (existingrun?.date_completed) {
        return (
            <button>
                This game was conquered by {user.username === existingrun.users[0].username? "You!" : existingrun.users[0].username} on {existingrun.date_completed}
            </button>
        )
        } else if (user.username === existingrun?.users[0].username) {
            return (
                <div>"You've already claimed this game"</div>
                )
            }
            else if (existingrun?.users[0].username && user.username !== existingrun?.users[0].username) {
                return (
                    <div>"This game has been claimed"</div>
                    )
                }
        else if (game) {
        return (
            <button onClick={handleClick}>Claim this game</button>
            )
        } 
        else {
            return (null)
        }
    }

export default RunInfo

// if (existingrun?.date_completed) {
//     return (
//         <button>
//             This game was conquered by {user.username === existingrun.users[0].username? "You !" : existingrun.users[0].username} on {existingrun.date_completed}
//         </button>
//     )
//     } 
//     // else if(existingrun){
//     //     return (
//     //     <div>{user.username === existingrun.users[0].username? "You've already claimed this game" : "This game has been claimed"}</div> )}
//     else {
//         return (
//             <button onClick={handleClick}>Claim this game</button>
//         )
//     }
