import React from 'react'

import styled from 'styled-components';

function GameSearch({gameArray}) {

    return (
        <GameSearchContainer>
            {gameArray}
        </GameSearchContainer>
    )
}

export default GameSearch
const GameSearchContainer = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
`