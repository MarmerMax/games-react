import React from 'react';
import styled from "styled-components";
import MenuButton from "./MenuButton";
import {GameHint} from "./Game";
import Hint from "./Hint";

interface Props {
    isWin: boolean;
    isLoose: boolean;
    hint?: GameHint;
    extraTimeCounter: number;

    onTryAgain: () => void;
    onNextRound: () => void;
    onUseExtraTime: () => void;
}

const GameActions = ({isWin, isLoose, extraTimeCounter, hint, onNextRound, onTryAgain, onUseExtraTime}: Props) => {
    return (<>
        {isLoose && hint &&
        <GameWrapper>
            <Hint description={hint.description} type={hint.type}/>
            <MenuButton buttonType="game" onClick={onTryAgain}>Let's try Again!</MenuButton>
        </GameWrapper>
        }

        {isWin && hint &&
        <GameWrapper>
            <Hint description={hint.description} type={hint.type}/>
            <MenuButton buttonType="game" onClick={onNextRound}>Next Round!</MenuButton>
        </GameWrapper>
        }

        {!isWin && !isLoose && extraTimeCounter > 0 && hint &&
        <GameWrapper>
            <Hint description={hint.description} type={hint.type}/>
            <MenuButton buttonType="game" onClick={onUseExtraTime}>Use extra time!</MenuButton>
        </GameWrapper>
        }</>)
};

export default GameActions;

const GameWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 10px;
`;

