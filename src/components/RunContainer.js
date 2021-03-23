import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/userSlice';

function RunContainer() {
    const runs = useSelector((state) => state.runs);
    const currentUser = useSelector((state) => state.user);
    const [users,setUsers] = useState([])


    const [formData, setFormData] = useState({
        date_completed: "",
        run_time: "",
        achievements: "",
        users: [],
      });

      useEffect( () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
          .then( response => response.json() )
          .then(data => setUsers(data));
          console.log(users)
          
        }, [])

        const userOptions = users.map((user)=>{
            return(
                <option key={user.id} value={formData.users}>{user.username}</option>
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
        const name = e.target.name;
        let value = e.target.name
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    console.log(formData)
    const userRuns = runs.filter((run)=>(
        run.users.find(user => user.id === currentUser.id )
    ))

    function handleClick(run){

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
            name="achi"
            onChange={handleCheck}
            value={formData.achievements}
            />
            </label>
        )
    })
    return (
    <div>
        {runArray}
        <form>
            <h1>Edit your Run</h1>
        <input
          type="time"
          step="1"
          name="run_time"
          value={formData.run_time}
          placeholder="Time"
          onChange={handleChange}
        />
        <input
          type="date"
          step="1"
          name="date_completed"
          value={formData.run_time}
          placeholder="Time"
          onChange={handleChange}
        />
        <br></br>Achievements:<br></br>
        {achievementsForm}
        <select
          name="user"
          value={formData.run_time}
          onChange={handleChange}
        >
        {userOptions}
        </select>
        </form>
    </div>
    
    )
}

export default RunContainer
const RunInfoContainer=styled.form`
`