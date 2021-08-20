import React, {useState} from 'react';
import './App.css';
import Game from "./components/Game";
import styled from 'styled-components';
import GameOptions from "./components/GameOptions";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

export interface Options {
    xSize: number;
    ySize: number;
    roundTime: number;
}

const DefaultOptions: Options = {
    xSize: 5,
    ySize: 5,
    roundTime: 10
};

function App() {

    const [options, setOptions] = useState<Options>(DefaultOptions);


    return (
        <Wrapper>
            <Router>
                <Switch>
                    <Route path="/options" exact>
                        <GameOptions options={options} setOptions={setOptions}/>
                    </Route>
                    <Route path="/game" exact>
                        <Game options={options}/>
                    </Route>

                    <Route path="/">
                        <Redirect to="/options"/>
                    </Route>
                </Switch>
            </Router>
        </Wrapper>
    );
}

export default App;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    height: "calc(100vh-100px)";
    padding-top: 100px;
`;

