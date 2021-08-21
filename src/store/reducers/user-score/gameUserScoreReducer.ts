import {GameAction, GameActionTypes, GameUserScore} from "./game-user-score-reducer.types";

const initialState: GameUserScore = {
    round: 1,
    score: 0,
    extraTimeCounter: 0
};

export const gameUserScoreReducer = (state = initialState, action: GameAction): GameUserScore => {
    switch (action.type) {
        case GameActionTypes.NEXT_ROUND:
            return {
                ...state, round: state.round + 1
            };

        case GameActionTypes.ADD_SCORE:
            return {
                ...state, score: state.score + action.payload.addScore
            };
        case GameActionTypes.SUB_SCORE:
            return {
                ...state, score: state.score - action.payload.subScore
            };
        case GameActionTypes.ADD_EXTRA_TIME:
            return {
                ...state, extraTimeCounter: state.extraTimeCounter + 1
            };
        case GameActionTypes.SUB_EXTRA_TIME:
            return {
                ...state, extraTimeCounter: state.extraTimeCounter - 1
            };
        case GameActionTypes.GAME_OVER:
            return initialState;

        default:
            return state;
    }
};