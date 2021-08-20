import React from 'react';
import styled from "styled-components";

export interface HintProps {
    type: HintType;
    description: string;
}

const Hint = ({type, description}: HintProps) => {
    return <Wrapper type={type}>{description}</Wrapper>
};

export default Hint;

const Wrapper = styled.h4<HintStyledProps>`
  text-align: center;
  color: ${props => props.type === 'error' ? 'indianred' : 'green'}
`;

interface HintStyledProps {
    type: HintType;
}


export type HintType = "error" | "success";


