import React from 'react';
import Cell, {CellVariant} from "./Cell";
import styled from "styled-components";
import {DeskCell, UserPlace} from "./Game";

interface Props {
    xSize: number;
    ySize: number;
    objects: DeskCell[];
    // userPlace: UserPlace;
    currentUserPlace: number;
    housePlace: number;
}

const Desk = ({xSize, ySize, objects, currentUserPlace, housePlace}: Props) => {
    return (<Wrapper xSize={xSize} ySize={ySize}>
        {objects.map(item => {

            let variant = CellVariant.Default;


            if (item.id === housePlace) {
                variant = CellVariant.House;
            } else if (item.id === currentUserPlace && item.id !== housePlace) {
                variant = CellVariant.User;
            } else if (objects[item.id].type === CellVariant.Fruit && item.id !== housePlace) {
                variant = CellVariant.Fruit;
            } else if (objects[item.id].type === CellVariant.Time && item.id !== housePlace) {
                variant = CellVariant.Time;
            } else if (objects[item.id].type === CellVariant.Target && item.id !== housePlace) {
                variant = CellVariant.Target;
            }


            return <Cell variant={variant} key={item.id}/>
        })}
    </Wrapper>);
};

export default Desk;

interface WrapperStyledProps {
    xSize: number;
    ySize: number;
}

const Wrapper = styled.div<WrapperStyledProps>`
    display: grid;
    grid-template-columns: repeat(${props => props.xSize}, minmax(50px, 100px));
    grid-template-rows: repeat(${props => props.ySize}, minmax(50px, 100px));
    grid-gap: 5px;
`;

