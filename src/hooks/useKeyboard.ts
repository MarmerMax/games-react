import {KeyboardEvent, useEffect, useRef} from "react";
import {UserPlace} from "../components/Game";

const useKeyboardArrows = (key: string, callback: (state: UserPlace) => void) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        function handle(event: KeyboardEvent<HTMLInputElement>) {
            if (event.key === key) {
                // @ts-ignore
                callbackRef.current(event);
            }
        }

        // @ts-ignore
        document.addEventListener('keyup', handle);
        // @ts-ignore
        return () => document.removeEventListener('keyup', handle);
    }, [key])
};

export default useKeyboardArrows;
