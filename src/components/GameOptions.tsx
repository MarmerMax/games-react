import React, {ChangeEvent, FormEvent, useState} from 'react';
import GameInput from "./GameInput";
import styled from "styled-components";
import MenuButton from "./MenuButton";
import {useHistory} from 'react-router-dom';
import Hint from "./Hint";
import {Options} from '../App';

interface Props {
    options: Options,
    setOptions: (options: Options) => void;
}

const GameOptions = ({options, setOptions}: Props) => {
    let history = useHistory();

    const [xSize, setXSize] = useState<number>(options.xSize);
    const [ySize, setYSize] = useState<number>(options.ySize);
    const [roundTime, setRoundTime] = useState<number>(options.roundTime);

    const [error, setError] = useState<string>("");

    const setterResolver = (name: string) => {
        switch (name) {
            case "xSize":
                return setXSize;
            case "ySize":
                return setYSize;
            case "roundTime":
                return setRoundTime;
            default:
                return () => {
                };

        }
    };

    const maxValueResolver = (name: string) => {
        switch (name) {
            case "xSize":
            case "ySize":
                return 10;
            case "roundTime":
                return 20;
            default:
                return 10

        }
    };

    const commonHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const setter = setterResolver(name);
        const maxValue = maxValueResolver(name);

        if (!parseInt(value)) {
            setter(0);
            return;
        }

        if (!value) {
            setter(0);
            return;
        }

        if (parseInt(value) > maxValue && name === 'roundTime') {
            setter(maxValue);
            setError("Max round time is 20 seconds");

            return;
        } else if (parseInt(value) > maxValue && name !== 'roundTime') {
            setter(maxValue);
            setError("Max value for sizes is 10");
            return;
        }

        setter(parseInt(value));
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        e.stopPropagation();

        if (xSize <= 0 || ySize <= 0 || roundTime <= 0) {
            setError("All parameters of the game must be positive numbers");
            return;
        }

        setError("");
        setOptions({xSize, ySize, roundTime});


        history.push('/game');
    };

    return <Wrapper>

        <Title>Welcome to the Game!</Title>
        <SecondTitle>Please select game options:</SecondTitle>

        <Form onSubmit={submitHandler}>
            <InputWrapper>
                <GameInput id="xSize" type="text" name="Column Count" value={xSize.toString()}
                           onChange={commonHandler}/>
                <GameInput id="ySize" type="text" name="Row Count" value={ySize.toString()}
                           onChange={commonHandler}/>
                <GameInput id="roundTime" type="text" name="Round Time" value={roundTime.toString()}
                           onChange={commonHandler}/>
            </InputWrapper>
            <MenuButton buttonType="menu" type="submit">Let's Start</MenuButton>
        </Form>

        {error && <Hint type="error" description={error}/>}
    </Wrapper>
};

export default GameOptions;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Form = styled.form`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
`;

const InputWrapper = styled.div`
    display: flex;
`;

const Title = styled.h1`
    color: mediumpurple;
`;

const SecondTitle = styled.h5`
color: dimgrey;
`;


