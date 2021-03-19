import React, {useState, useEffect} from 'react'

function GameSearch() {
    const [games, setGames] = useState({})
    
    useEffect( () => {
        fetch(`http://www.giantbomb.com/api/games/?api_key=${process.env.REACT_APP_API_KEY}&format=json&filter=platforms:9|6|21&field_list=name,platforms`)
          .then( response => response.json() )
          .then(data => console.log(data));
      }, [])
      

    return (
        <div>
            Game search
        </div>
    )
}

export default GameSearch
