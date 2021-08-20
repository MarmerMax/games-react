import React from 'react';
import styled, {css} from "styled-components";

interface StyledProps {
    buttonType?: "menu" | "game";
    disabled?: boolean;
}


const disabledButton = css`
    background-color: lightgrey;
    color: whitesmoke;
    border: none;
    opacity: 0.9;
      
    
    :hover {
      cursor: default;
    }
`;

const defaultButton = css`
   font-size: 20px;
   padding: 10px 20px;
   border-radius: 8px;
   margin: 10px;
`;

const enabledButton = (buttonType?: "menu" | "game") => css`
   background-color: ${buttonType === "game" ? "whitesmoke" : "mediumpurple"};
   color: ${buttonType === "game" ? "mediumpurple" : "whitesmoke"};
   border: ${buttonType === "game" ? "2px solid mediumpurple" : "none"};


    :hover {
       cursor: pointer;
       opacity: 0.8;
    }
`;

const MenuButton = styled.button<StyledProps>`
  ${defaultButton};
  ${props => props.disabled ? disabledButton : enabledButton(props.buttonType)};
`;


export default MenuButton;
