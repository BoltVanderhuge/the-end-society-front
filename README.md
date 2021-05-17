# Front End
Welcome to The End Society.It started as a whim to beat the MegaMans that were on the NES 5 friends some of which were decidedly not video game players drew straws for which game they got. They practiced for a month then got together to beat them all in one day. This grew into The End Society a monthly video game appreciation/attempt at speed running, party that we did in 2014. The initial goal was to collectively beat 100 NES games in a year, meeting monthly in NYC to perform the feat in front of our friends live. We persevered, beating the 100th game on December 29th 2014 and concluded our first season. We started our second season in January 2020, aiming to beat 100 SNES or Sega Genesis games, but when the pandemic hit we put the season on hold. Now that we’ve gone remote it’s more important than ever to have a website to track our progress, self-register for games not already beaten and schedule future meetings.



# About
The End Society was completed as a phase 5 project at Flatiron School by John Wisneski. This app is designed with React/Redux, and integrates the Giant Bomb API, with  React Bootstrap, and some custom styled components. This React front end connects to a Rails API backend to persist user data. The API stores photos to Cloudinary. The repo link for the backend can be found here: https://github.com/BoltVanderhuge/the-end-society-back.

# Usage
To run locally :
run npm install to install dependencies
run npm start to start a local server for the frontend
The url for the backend server must be saved into your .env.local from with the variable name REACT_APP_BACKEND_URL
Ex: REACT_APP_BACKEND_URL="http://localhost:3001"
In order to connect to the Google Maps API, you will need a Google API key with Javascript Maps API enabled. You can get an key here: https://www.giantbomb.com/api/
store this API key in the env.local file with the variable name REACT_APP_API_KEY
