import React, {useEffect, useState} from 'react';
import useKeyboardArrows from "../hooks/useKeyboard";
import styled from 'styled-components';
import {Options} from "../App";

import {Redirect, useHistory} from "react-router-dom";
import Hint, {HintType} from "./Hint";
import MenuButton from "./MenuButton";
import Desk from "./Desk";
import Timer from "./Timer";
import {CellVariant} from "./Cell";
import {createObjects, getRandomInt, Moves} from "../utils/utils";
import {useSelector} from "react-redux";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";
import GameActions from "./GameActions";
import GameResults from "./GameResults";


export interface UserPlace {
    x: number;
    y: number;
}

export interface DeskCell {
    id: number;
    type: CellVariant;
}


interface Props {
    options: Options;
}

export interface GameHint {
    type: HintType;
    description: string;
}

const eatVariants = [CellVariant.Target, CellVariant.Fruit, CellVariant.Time];


const Game = ({options}: Props) => {

    const {round, extraTimeCounter} = useTypedSelector(state => state.userScore);
    const {
        isWin,
        isLoose,
        hint,
        objects,
        userPlace,
        isFinished,
        isStarted
    } = useTypedSelector(state => state.gameState);

    const {
        addExtraTime,
        nextRound,
        addScore,
        gameOver,
        subExtraTime,
        subScore,
        winRound,
        createStartState,
        finishRound,
        looseRound,
        restartRound,
        startRound,
        setUserPlace,
        updateObjects,
        setHint
    } = useActions();


    useEffect(() => {
        createStartState(options.xSize, options.ySize);

        return () => {
            gameOver();
            createStartState(options.xSize, options.ySize);
        }

    }, []);

    let history = useHistory();
    const HOUSE_PLACE = options.xSize * options.ySize - 1;

    useEffect(() => {
        if (!isStarted) {
            return;
        }

        const userCurrentPlace = userPlace.x + (userPlace.y * options.xSize);

        if (eatVariants.includes(objects[userCurrentPlace]?.type)) {
            let newObjects = [...objects];

            // if user catch target
            if (objects[userCurrentPlace].type === CellVariant.Target) {
                addScore(5);


                const fruits = newObjects.filter(item => item.type === CellVariant.Fruit);
                if (fruits.length > 0) {
                    const index: number = getRandomInt(fruits.length - 1);

                    const fruitIndex = newObjects.indexOf(fruits[index]);
                    if (newObjects[fruitIndex]) {
                        newObjects[fruitIndex].type = CellVariant.Default;
                    }

                }

            } else if (objects[userCurrentPlace].type === CellVariant.Time) {
                addScore(2);
                addExtraTime();
            } else {
                addScore(1);
            }

            newObjects[userCurrentPlace].type = CellVariant.Default;
            updateObjects(newObjects);
        }

        if (!objects.some(item => item.type === CellVariant.Fruit) && userCurrentPlace === HOUSE_PLACE) {
            winRound();
            setHint({type: "success", description: "Congratulation you Win!"});
            addScore(10);
        }


    }, [userPlace]);

    const handleMove = (
        userPlace: UserPlace,
        options: Options,
        move: (x: number, y: number, options: Options, setPlace: (place: UserPlace) => void) => void,
        setPlace: (place: UserPlace) => void) => {
        if (isWin || isLoose || !isStarted) {
            return;
        }

        move(userPlace.x, userPlace.y, options, setPlace);
    };

    useKeyboardArrows("ArrowUp", () => handleMove(userPlace, options, Moves.keyDown, setUserPlace));
    useKeyboardArrows("ArrowDown", () => handleMove(userPlace, options, Moves.keyUp, setUserPlace));
    useKeyboardArrows("ArrowLeft", () => handleMove(userPlace, options, Moves.keyLeft, setUserPlace));
    useKeyboardArrows("ArrowRight", () => handleMove(userPlace, options, Moves.keyRight, setUserPlace));

    if (!options || options.roundTime <= 0 || options.xSize <= 0 || options.ySize <= 0) {
        return <Redirect to="/"/>
    }

    const handleOptionsButton = () => {
        history.push('/options');
    };

    const handleNextRound = () => {
        nextRound();
        createStartState(options.xSize, options.ySize);
    };

    const handleLoose = () => {
        looseRound();
    };

    const handleStart = () => {
        startRound();
    };

    const handleTryAgain = () => {
        gameOver();
        createStartState(options.xSize, options.ySize);
    };

    const handleUseExtraTime = () => {
        subScore(5);
        subExtraTime();
        restartRound();
    };

    const handleIsFinished = () => {
        if (extraTimeCounter > 0) {
            finishRound();
            setHint({type: "success", description: "You have extra time!"});
            return;
        }

        handleLoose();

    };


    return (
        <Wrapper>
            <h2>Round {round}</h2>
            <Desk xSize={options.xSize} ySize={options.ySize} objects={objects} housePlace={HOUSE_PLACE}
                  currentUserPlace={userPlace.x + (userPlace.y * options.xSize)}/>


            {!isLoose && !isWin && !isFinished &&
            <Timer
                seconds={options.roundTime}
                size={90}
                strokeBgColor="white"
                strokeColor="lightgreen"
                // strokeColor="lightcoral"
                strokeWidth={12}
                // onFinish={extraTime ? handleIsFinished : handleLoose}
                onFinish={extraTimeCounter > 0 ? handleIsFinished : handleLoose}
                // onFinish={ handleLoose}
                onStart={handleStart}
            />
            }

            <GameActions extraTimeCounter={extraTimeCounter} hint={hint} isLoose={isLoose} isWin={isWin}
                         onNextRound={handleNextRound} onTryAgain={handleTryAgain} onUseExtraTime={handleUseExtraTime}/>

            <GameResults/>

            <Wrapper>
                <MenuButton onClick={handleOptionsButton}>Options</MenuButton>
            </Wrapper>
        </Wrapper>
    )
};

export default Game;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 20px;
`;

const GameWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 10px;
`;

