import React from 'react';
import styled from "styled-components";
import {useTypedSelector} from "../hooks/useTypeSelector";


const GameResults = () => {

    const {score, extraTimeCounter} = useTypedSelector(state => state.userScore);

    return (
        <GameWrapper>
            <Score>score: {score}</Score>
            <ExtraTime>extra time: {extraTimeCounter}</ExtraTime>
        </GameWrapper>
    )

};

export default GameResults;

const GameWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 10px;
`;

const Score = styled.div`
  text-align: center;
  font-size: 1.5em;
  padding: 10px 20px;
`;
const ExtraTime = styled.div`
  text-align: center;
  font-size: 1.2em;
  padding: 10px 20px;
`;

