import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setRun } from '../redux/runSlice';

function RunCollectionContainer() {
    const run = useSelector((state) => state.run);
    const runs = useSelector((state) => state.runs);
    const dispatch = useDispatch();
    const completedRuns = runs.filter((run)=>{
        if (run.date_completed){
            return (run)
        }
    
    })
    function handleClick(run){
        dispatch(setRun(run))
        fetch(`http://www.giantbomb.com/api/game/${run.game_id}/?api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        .then( response => response.json() )
        .then(data => console.log(data.results));

    }
    const listedRuns = completedRuns.map((run)=>{
        return(<li onClick={()=>handleClick(run)} key={run.id}>{run.name}</li>)
    })

    return (
        <div>
        <ul>
            {listedRuns}
        </ul>
        {run ? 
        <>
        <div>
            Date Beaten:
            {run.date_completed}<br></br>
            Completed by: {run.users.map((run=>(
                run.username
            )))}
            
        </div>
        </>
        :null
    }
        </div>
    )
}

export default RunCollectionContainer

