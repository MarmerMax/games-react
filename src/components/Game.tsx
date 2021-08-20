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

interface GameHint {
    type: HintType;
    description: string;
}

const eatVariants = [CellVariant.Target, CellVariant.Fruit, CellVariant.Time];


const Game = ({options}: Props) => {
    let history = useHistory();
    const HOUSE_PLACE = options.xSize * options.ySize - 1;
    const [userPlace, setUserPlace] = useState<UserPlace>({x: options.xSize - 1, y: options.ySize - 1});
    const [objects, setObjects] = useState<DeskCell[]>(createObjects(options.xSize, options.ySize, HOUSE_PLACE));

    const [hint, setHint] = useState<GameHint | undefined>();

    const [round, setRound] = useState<number>(1);
    const [score, setScore] = useState<number>(0);
    // const [extraTime, setExtraTime] = useState<boolean>(false);
    const [extraTimeCounter, setExtraTimeCounter] = useState<number>(0);

    const [isWin, setIsWin] = useState<boolean>(false);
    const [isLoose, setIsLoose] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    useEffect(() => {
        const userCurrentPlace = userPlace.x + (userPlace.y * options.xSize);

        if (eatVariants.includes(objects[userCurrentPlace]?.type)) {
            let newObjects = [...objects];

            // if user catch target
            if (objects[userCurrentPlace].type === CellVariant.Target) {
                setScore(state => state + 5);


                const fruits = newObjects.filter(item => item.type === CellVariant.Fruit);
                if (fruits.length > 0) {
                    const index: number = getRandomInt(fruits.length - 1);

                    const fruitIndex = newObjects.indexOf(fruits[index]);
                    if (newObjects[fruitIndex]) {
                        newObjects[fruitIndex].type = CellVariant.Default;
                    }

                }

            } else if (objects[userCurrentPlace].type === CellVariant.Time) {
                setScore(state => state + 2);
                setExtraTimeCounter(state => state + 1);


                // setExtraTime(true);
            } else {
                setScore(state => state + 1);
            }

            newObjects[userCurrentPlace].type = CellVariant.Default;
            setObjects(newObjects);
        }

        if (!objects.some(item => item.type === CellVariant.Fruit) && userCurrentPlace === HOUSE_PLACE) {
            setIsWin(true);
            setHint({type: "success", description: "Congratulation you Win!"});
            setScore(state => state + 10);
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
        setHint(undefined);
        setRound(state => state + 1);

        setIsWin(false);
        setIsLoose(false);
        setIsStarted(false);
        setIsFinished(false);

        // setExtraTime(false);
        setObjects(createObjects(options.xSize, options.ySize, HOUSE_PLACE));
    };

    const handleLoose = () => {
        setIsLoose(true);
        setHint({type: "error", description: "Oops!!! Time is out!"});
    };

    const handleStart = () => {
        setIsStarted(true);
        setIsFinished(false);
    };

    const handleTryAgain = () => {
        setHint(undefined);
        setRound(1);
        setScore(0);
        setExtraTimeCounter(0);

        setIsWin(false);
        setIsLoose(false);
        setIsStarted(false);
        setIsFinished(false);

        setUserPlace({x: options.xSize - 1, y: options.ySize - 1});
        setObjects(createObjects(options.xSize, options.ySize, HOUSE_PLACE));
    };

    const handleUseExtraTime = () => {
        setHint(undefined);
        setScore(state => state - 5);
        setExtraTimeCounter(state => state - 1);

        setIsFinished(false);
    };

    const handleIsFinished = () => {
        // if (extraTime) {
        if (extraTimeCounter > 0) {
            setHint({type: "success", description: "You have extra time!"});

            setIsStarted(false);
            setIsFinished(true);
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

            {isLoose && hint &&
            <GameWrapper>
                <Hint description={hint.description} type={hint.type}/>
                <MenuButton buttonType="game" onClick={handleTryAgain}>Let's try Again!</MenuButton>
            </GameWrapper>
            }

            {isWin && hint &&
            <GameWrapper>
                <Hint description={hint.description} type={hint.type}/>
                <MenuButton buttonType="game" onClick={handleNextRound}>Next Round!</MenuButton>
            </GameWrapper>
            }

            {/*{!isWin && !isLoose && extraTime && hint &&*/}
            {!isWin && !isLoose && extraTimeCounter > 0 && hint &&
            <GameWrapper>
                <Hint description={hint.description} type={hint.type}/>
                <MenuButton buttonType="game" onClick={handleUseExtraTime}>Use extra time!</MenuButton>
            </GameWrapper>
            }

            <GameWrapper>
                <span>score: {score}</span>
                <span>extra time: {extraTimeCounter}</span>
            </GameWrapper>

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

