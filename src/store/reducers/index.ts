import {combineReducers} from "redux";
import {gameUserScoreReducer} from "./user-score/gameUserScoreReducer";
import {gameStateReducer} from "./game-state/gameStateReducer";


export const rootReducer = combineReducers({
    userScore: gameUserScoreReducer,
    gameState: gameStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;