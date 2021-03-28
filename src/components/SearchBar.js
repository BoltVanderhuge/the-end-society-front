import React from 'react'


function SearchBar({sortBy,setSortBy,setSearchData,searchData}) {
   
      function handleChange(event) {
        const name = event.target.name;
        let value = event.target.value;
    
        setSearchData({
            ...searchData,
            [name]: value,
        });


      }

    function handleSortChange(event){
        const key = event.target.name
        const value = event.target.value
        const newSort = {...sortBy, [key]:value}
        setSortBy(newSort)
      }
    return (
        <div>
            <input onChange={handleChange} name="query" type="text"></input><br></br>
            <input onChange={handleSortChange}  type="radio" name="system"  value="21"/>
            <label htmlFor="nes">NES</label><br></br>
            <input onChange={handleSortChange}  type="radio" name="system"  value="9"/>
            <label htmlFor="snes">SNES</label><br></br>
            <input onChange={handleSortChange}  type="radio" name="system"  value="6"/>
            <label htmlFor="Genesis">Genesis</label>
        </div>
    )
}

export default SearchBar
