export enum GameActionTypes {
    NEXT_ROUND = 'NEXT_ROUND',
    GAME_OVER = 'GAME_OVER',
    ADD_SCORE = 'ADD_SCORE',
    SUB_SCORE = 'SUB_SCORE',
    ADD_EXTRA_TIME = 'ADD_EXTRA_TIME',
    SUB_EXTRA_TIME = 'SUB_EXTRA_TIME'
}


export interface GameNextRoundAction {
    type: GameActionTypes.NEXT_ROUND
}

export interface GameAddScoreAction {
    type: GameActionTypes.ADD_SCORE,
    payload: {
        addScore: number
    }
}

export interface GameSubScoreAction {
    type: GameActionTypes.SUB_SCORE
    payload: {
        subScore: number
    }
}

export interface GameAddExtraTimeAction {
    type: GameActionTypes.ADD_EXTRA_TIME
}


export interface GameSubExtraTimeAction {
    type: GameActionTypes.SUB_EXTRA_TIME
}


export interface GameOverAction {
    type: GameActionTypes.GAME_OVER
}


export interface GameUserScore {
    round: number;
    score: number;
    extraTimeCounter: number;
}

export type GameAction =
    GameNextRoundAction |
    GameAddScoreAction |
    GameSubScoreAction |
    GameAddExtraTimeAction |
    GameSubExtraTimeAction |
    GameOverAction;