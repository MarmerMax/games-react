import {DeskCell, GameHint, UserPlace} from "../../../components/Game";

export enum GameStateActionTypes {
    WIN_ROUND = 'WIN_ROUND',
    LOOSE_ROUND = 'LOOSE_ROUND',
    START_ROUND = 'START_ROUND',
    FINISH_ROUND = 'FINISH_ROUND',
    SET_USER_PLACE = 'SET_USER_PLACE',
    RESTART_ROUND = 'RESTART_ROUND',
    CREATE_START_STATE = 'CREATE_START_STATE',
    SET_HINT = 'SET_HINT',
    UPDATE_OBJECTS = 'UPDATE_OBJECTS',
}


export interface GameWinRoundAction {
    type: GameStateActionTypes.WIN_ROUND
}

export interface GameLooseRoundAction {
    type: GameStateActionTypes.LOOSE_ROUND,
}

export interface GameStartRoundAction {
    type: GameStateActionTypes.START_ROUND
}

export interface GameFinishRoundAction {
    type: GameStateActionTypes.FINISH_ROUND
}

export interface GameRestartRoundAction {
    type: GameStateActionTypes.RESTART_ROUND
}

export interface GameSetHintAction {
    type: GameStateActionTypes.SET_HINT,
    payload: {
        hint: GameHint
    }
}

export interface GameUpdateObjectsAction {
    type: GameStateActionTypes.UPDATE_OBJECTS,
    payload: {
        objects: DeskCell[]
    }
}


export interface GameSetUserPlaceAction {
    type: GameStateActionTypes.SET_USER_PLACE,
    payload: {
        place: UserPlace
    }
}

export interface GameCreateStartStateAction {
    type: GameStateActionTypes.CREATE_START_STATE,
    payload: {
        xSize: number,
        ySize: number
    }
}


export interface GameState {
    isStarted: boolean;
    isFinished: boolean;
    isWin: boolean;
    isLoose: boolean;
    userPlace: UserPlace;
    objects: DeskCell[],
    hint?: GameHint
}


export type GameStateAction =
    GameWinRoundAction |
    GameLooseRoundAction |
    GameStartRoundAction |
    GameFinishRoundAction |
    GameRestartRoundAction |
    GameCreateStartStateAction |
    GameSetHintAction |
    GameUpdateObjectsAction |
    GameSetUserPlaceAction;
