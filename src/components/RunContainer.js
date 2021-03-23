import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '../redux/userSlice';
import { editRuns } from '../redux/runsSlice';

function RunContainer() {
    const runs = useSelector((state) => state.runs);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);
    const [users,setUsers] = useState([])
    const [run,setRun] = useState([])


    function handleClick(run){
        setRun(run)
    }
    const [formData, setFormData] = useState({
        date_completed: "",
        run_time: "00:00:00:00",
        achievements: "",
        user: "",
      });

      useEffect( () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
          .then( response => response.json() )
          .then(data => setUsers(data));

            
        }, [])
        
        const userOptions = users.map((user)=>{
            return(
                <option key={user.id} value={user.id}>{user.username}</option>
            )
        })

    function handleChange(event) {
        const name = event.target.name;
        let value = event.target.value;
    
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    function handleCheck(e){
        const checkedArr = [];
        const name = e.target.name;
        let value = e.target.value
        if (e.target.checked){
            const checkeds = document.getElementsByTagName('input');
      for (let i = 0; i < checkeds.length; i++) {
        if (checkeds[i].checked) {
          checkedArr.push(checkeds[i].value);
        }
      }
      value = checkedArr;
        }
        setFormData({
            ...formData,
            [name]: checkedArr,
        });
    }
    const userRuns = runs.filter((run)=>(
        run.users.find(user => user.id === currentUser.id )
    ))

    function handleSubmit(e){
        const token = localStorage.getItem("token");
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/runs/${run.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify( formData )
        })
            .then(response => response.json())
            .then(updatedRun => {
            dispatch(editRuns(updatedRun))
              
            })
    }

    const runArray = userRuns.map((run)=>{
        return(
            <li onClick={()=>handleClick(run)} key={run.id}>{run.name}</li>
        )
    })
    const achievements = ["No Deaths","Boozin USA","Real Hardware / Cart","Glitch","Bronze","Movie Themed Game","It's So Bad","Commentator","Opening Salvo","Pete's Revenge","Bimmy and Jimmy"]
    const achievementsForm = achievements.map((achievement, i)=>{
        return(
            <label key={i}>
            {achievement}
            <input
            type="checkbox"
            name="achievements"
            onChange={handleCheck}
            value={achievement}
            />
            </label>
        )
    })
    console.log(run)
    if (run){
    return (
    <div>
        {runArray}
        <div>
            <br></br>
            Run Info:
            <br></br>
            Date Completed: {run.date_completed}
            <br></br>
            Run Time: {run.run_time}
            <br></br>
            Achievements: {run.achievements}
            <br></br>
            {run.users ?
                <>
            Players: {run.users.map((user)=> { return(
                <li>{user.username}</li>)})}
                </>
                : null
                }
        </div>
        <form onSubmit={handleSubmit}>
            <h1>Edit your Run</h1>
            <h2></h2>
            <label>
                Run Time:
                <br></br> Write a duration in the format hh:mm:ss:ms:
            <input 
            name="run_time" 
            type="text" 
            required pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}" 
            value={formData.run_time} 
            placeholder={run.run_time}
            onChange={handleChange}></input>
        </label>
        <br></br>
        <label>
        Date Completed:
        <input
          type="date"
          step="1"
          name="date_completed"
          value={formData.date_completed}
          onChange={handleChange}
        />
        </label>
        <br></br>
        <label>
            Co-Op?:
        <select
          name="users"
          value={formData.users}
          onChange={handleChange}
        >
        {userOptions}
        <option value="0">None</option>
        </select>
        </label>
        <br></br>Achievements:<br></br>
        {achievementsForm}
        </form>
        <div>
        <br></br>
        <br></br>
            Achivements:<br></br>
Dress Up:   Dress as one of the characters in the game.<br></br>
Harder Difficulty:  Change the options so the game is more difficult - this includes reducing the amount of lives/continues or choosing a harder difficulty if it's available.<br></br>
No Deaths:  Complete a run without dying / losing.<br></br>
Boozin USA:	Start and finish a drink during your run.<br></br>
Real Hardware / Cart:	Complete the game using all original hardware (no powerpak).<br></br>
Glitch:	Use a glitch during your game, superficial or useful.<br></br>
Bronze:	Complete five games at our meetings.<br></br>
Movie Themed Game:	There's never been a good video game movie but there's been good movie video games.<br></br>
It's So Bad:	Beat any game using the powerglove.<br></br>
Commentator:	Described your run / the technical details of your game.<br></br>
Opening Salvo:	Start this party off right.<br></br>
Pete's Revenge:	Come back and destroy a previously lost game.<br></br>
Bimmy & Jimmy:	Finish a game, co-op style.<br></br>
        </div>
    </div>
    
    )
            } else {
                return null
            }
}

export default RunContainer
const RunInfoContainer=styled.form`
`