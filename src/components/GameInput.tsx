import React, {ChangeEvent} from 'react';
import styled from "styled-components";

interface Props {
    type: string;
    name: string;
    id: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const GameInput = ({type, name, id, value, onChange}: Props) => {
    return <InputWrapper>
        <label htmlFor={id}>{name}</label>
        <Input type={type} id={id} value={value} name={id} onChange={onChange}></Input>
    </InputWrapper>
};


export default GameInput;

const InputWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 20px 10px;
`;

const Input = styled.input`
border-radius: 8px;
border: 2px solid mediumpurple;
padding: 10px;
outline: none;
width: 80px;
height: 20px;
margin: 10px;
`;