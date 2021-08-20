import React from 'react';
import styled from "styled-components";

import {ReactComponent as UserIcon} from "../icons/dog.svg";
import {ReactComponent as FruitIcon} from "../icons/meat.svg";
import {ReactComponent as HouseIcon} from "../icons/house.svg";
import {ReactComponent as TimeIcon} from "../icons/time.svg";
import {ReactComponent as TargetIcon} from "../icons/target.svg";

interface Props {
    variant: CellVariant;
}

const Cell = ({variant}: Props) => {
    const renderIcon = (variant: CellVariant) => {
        return cellIcons[variant];
    };

    return <Wrapper>{renderIcon(variant)}</Wrapper>;
};

export default Cell;

const Wrapper = styled.div`
  padding: 10px;
  background-color: darkseagreen;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export enum CellVariant {
    User = "user",
    House = "house",
    Fruit = "fruit",
    Target = "target",
    Time = "time",
    Default = "default"
}

const cellIcons = {
    [CellVariant.User]: <UserIcon/>,
    [CellVariant.Fruit]: <FruitIcon/>,
    [CellVariant.House]: <HouseIcon/>,
    [CellVariant.Target]: <TargetIcon/>,
    [CellVariant.Time]: <TimeIcon/>,
    [CellVariant.Default]: null,
};
