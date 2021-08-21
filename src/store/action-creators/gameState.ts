import {Dispatch} from "redux";

import {
    GameCreateStartStateAction,
    GameFinishRoundAction, GameLooseRoundAction, GameRestartRoundAction, GameSetHintAction,
    GameStartRoundAction,
    GameStateActionTypes, GameUpdateObjectsAction, GameSetUserPlaceAction,
    GameWinRoundAction
} from "../reducers/game-state/game-state-reducer.types";
import {DeskCell, GameHint, UserPlace} from "../../components/Game";

export const startRound = () => {
    return (dispatch: Dispatch<GameStartRoundAction>) => {
        dispatch({type: GameStateActionTypes.START_ROUND});
    }
};

export const finishRound = () => {
    return (dispatch: Dispatch<GameFinishRoundAction>) => {
        dispatch({type: GameStateActionTypes.FINISH_ROUND});
    }
};


export const winRound = () => {
    return (dispatch: Dispatch<GameWinRoundAction>) => {
        dispatch({type: GameStateActionTypes.WIN_ROUND});
    }
};

export const looseRound = () => {
    return (dispatch: Dispatch<GameLooseRoundAction>) => {
        dispatch({type: GameStateActionTypes.LOOSE_ROUND});
    }
};

export const createStartState = (xSize: number, ySize: number) => {
    return (dispatch: Dispatch<GameCreateStartStateAction>) => {
        dispatch({
            type: GameStateActionTypes.CREATE_START_STATE,
            payload: {
                xSize,
                ySize
            }
        });
    }
};

export const setUserPlace = (newPlace: UserPlace) => {
    return (dispatch: Dispatch<GameSetUserPlaceAction>) => {
        dispatch({
            type: GameStateActionTypes.SET_USER_PLACE,
            payload: {
                place: newPlace
            }
        });
    }
};

export const restartRound = () => {
    return (dispatch: Dispatch<GameRestartRoundAction>) => {
        dispatch({type: GameStateActionTypes.RESTART_ROUND});
    }
};


export const updateObjects = (newObjects: DeskCell[]) => {
    return (dispatch: Dispatch<GameUpdateObjectsAction>) => {
        dispatch({
            type: GameStateActionTypes.UPDATE_OBJECTS,
            payload: {
                objects: newObjects
            }
        });
    }
};

export const setHint = (hint: GameHint) => {
    return (dispatch: Dispatch<GameSetHintAction>) => {
        dispatch({
            type: GameStateActionTypes.SET_HINT,
            payload: {
                hint
            }
        });
    }
};

