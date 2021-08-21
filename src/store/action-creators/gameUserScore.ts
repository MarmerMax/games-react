import {Dispatch} from "redux";
import {
    GameActionTypes, GameAddExtraTimeAction,
    GameAddScoreAction,
    GameNextRoundAction,
    GameOverAction, GameSubExtraTimeAction,
    GameSubScoreAction
} from "../reducers/user-score/game-user-score-reducer.types";

export const nextRound = () => {
    return (dispatch: Dispatch<GameNextRoundAction>) => {
        dispatch({type: GameActionTypes.NEXT_ROUND});
    }
};

export const gameOver = () => {
    return (dispatch: Dispatch<GameOverAction>) => {
        dispatch({type: GameActionTypes.GAME_OVER});
    }
};


export const addScore = (points: number) => {
    return (dispatch: Dispatch<GameAddScoreAction>) => {
        dispatch({
            type: GameActionTypes.ADD_SCORE,
            payload: {
                addScore: points
            }
        });
    }
};

export const subScore = (points: number) => {
    return (dispatch: Dispatch<GameSubScoreAction>) => {
        dispatch({
            type: GameActionTypes.SUB_SCORE,
            payload: {
                subScore: points
            }
        });
    }
};

export const addExtraTime = () => {
    return (dispatch: Dispatch<GameAddExtraTimeAction>) => {
        dispatch({type: GameActionTypes.ADD_EXTRA_TIME});
    }
};

export const subExtraTime = () => {
    return (dispatch: Dispatch<GameSubExtraTimeAction>) => {
        dispatch({type: GameActionTypes.SUB_EXTRA_TIME});
    }
};