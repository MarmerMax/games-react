import {CellVariant} from "../components/Cell";
import {DeskCell, UserPlace} from "../components/Game";
import {Options} from "../App";

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

// export function createObjects(width: number, height: number, houseIndex: number) {
export function createObjects(width: number, height: number) {

    const houseIndex = width * height - 1;

    const gameObjects: DeskCell[] = [];
    let time = 1;
    let target = 0;

    for (let i = 0; i < (height * width); i++) {

        if (i === houseIndex) {
            gameObjects.push({id: i, type: CellVariant.House});
            continue;
        }

        const random = Math.random();

        if (random > 0.8) {
            if (random > 0.95 && time > 0) {
                time -= 1;
                gameObjects.push({id: i, type: CellVariant.Time});
            } else if (random > 0.9 && gameObjects.filter(item => item.type === CellVariant.Fruit).length > target) {
                gameObjects.push({id: i, type: CellVariant.Target});
                target += 1;
            } else {
                gameObjects.push({id: i, type: CellVariant.Fruit});
            }

        } else {
            gameObjects.push({id: i, type: CellVariant.Default});
        }

    }

    return gameObjects;
}



const keyUp = (x: number, y: number, options: Options, callback: (place: UserPlace) => void) => {
    if (y + 1 < options.ySize) {
        callback({x, y: y + 1});
    }
};

const keyDown = (x: number, y: number, options: Options, callback: (place: UserPlace) => void) => {
    if (y - 1 >= 0) {
        callback({x, y: y - 1});
    }
};

const keyLeft = (x: number, y: number, options: Options, callback: (place: UserPlace) => void) => {
    if (x - 1 >= 0) {
        callback({x: x - 1, y});
    }
};

const keyRight = (x: number, y: number, options: Options, callback: (place: UserPlace) => void) => {
    if (x + 1 < options.xSize) {
        callback({x: x + 1, y});
    }
};

export const Moves = {
    keyUp,
    keyDown,
    keyLeft,
    keyRight
};
