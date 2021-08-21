import {GameState, GameStateAction, GameStateActionTypes} from "./game-state-reducer.types";
import {createObjects} from "../../../utils/utils";

const initialState: GameState = {
        isStarted: false,
        isFinished: false,
        isWin: false,
        isLoose: false,
        userPlace: {
            x: -1,
            y: -1
        },
        objects: [],
        hint: undefined
    }
;

export const gameStateReducer = (state = initialState, action: GameStateAction): GameState => {
    switch (action.type) {
        case GameStateActionTypes.WIN_ROUND:
            return {
                ...state, isWin: true
            };
        case GameStateActionTypes.LOOSE_ROUND:
            return {
                ...state,
                isLoose: true,
                hint: {
                    type: "error",
                    description: "Oops!!! Time is out!"
                }
            };
        case GameStateActionTypes.START_ROUND:
            return {
                ...state, isStarted: true, isFinished: false
            };
        case GameStateActionTypes.FINISH_ROUND:
            return {
                ...state, isFinished: true, isStarted: false
            };
        case GameStateActionTypes.SET_USER_PLACE:
            return {
                ...state, userPlace: action.payload.place
            };
        case GameStateActionTypes.RESTART_ROUND:
            return {
                ...state,
                isFinished: false,
                hint: undefined
            };
        case GameStateActionTypes.SET_HINT:
            return {
                ...state,
                hint: action.payload.hint
            };
        case GameStateActionTypes.UPDATE_OBJECTS:
            return {
                ...state,
                objects: action.payload.objects
            };
        case GameStateActionTypes.CREATE_START_STATE:
            return {
                ...state,
                isFinished: false,
                isStarted: false,
                isWin: false,
                isLoose: false,
                userPlace: {
                    x: action.payload.xSize - 1,
                    y: action.payload.ySize - 1
                },
                objects: createObjects(action.payload.xSize, action.payload.ySize),
                hint: undefined
            };

        default:
            return state;
    }
};