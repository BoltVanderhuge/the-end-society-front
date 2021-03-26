import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setRun } from '../redux/runSlice';
import {Route,useHistory} from 'react-router-dom'
import { Image } from "cloudinary-react";

function RunCollectionContainer() {
    const [extraInfo,setExtraInfo] = useState([])
    const run = useSelector((state) => state.run);
    const runs = useSelector((state) => state.runs);
    const dispatch = useDispatch();
    const history = useHistory();
    const completedRuns = runs.filter((run)=>{
        if (run.date_completed){
            return (run)
        }
    })

    useEffect( () => {
        fetch(`http://www.giantbomb.com/api/game/${run.game_id}/?api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        .then( response => response.json() )
        .then(data => setExtraInfo(data.results));
        
    }, [])

    function handleClick(run){
        dispatch(setRun(run))
        fetch(`http://www.giantbomb.com/api/game/${run.game_id}/?api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        .then( response => response.json() )
        .then(data => setExtraInfo(data.results));
            // history.push(`/collection/${run.id}`)

    }
    const listedRuns = completedRuns.map((run)=>{
        return(<li onClick={()=>handleClick(run)} key={run.id}>{run.name}</li>)
    })

    return (
        <div>
        <ul>
            {listedRuns}
        </ul>
        {/* <Route path='/collection/:id'> */}
        {run ? 
        <>
        <div>
            Game: <br></br> 
            {run.name}<br></br>
            Date Beaten:<br></br> 
            {run.date_completed}<br></br>
            Completed by: {run.users.map((run=>(
                <li key={run.id}> {run.username}</li>
            )))}
            Duration:<br></br> 
            {run.run_time}
        </div>
        { extraInfo.image ?
        <img alt="Game Box Art" src={extraInfo.image.medium_url}></img>
        : null }
        { run.photos ? run.photos.map((aPhoto) => {return (<Image key={aPhoto.id}
              cloudName={process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
              publicId={aPhoto.photo}
              width="100"
              crop="scale"
            />)} )
        
        : null }
        </>
        :null
    }
    {/* </Route> */}
        </div>
    )
}

export default RunCollectionContainer

