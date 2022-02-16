import {useState} from "react";

const useDebounce = (progressiveFunc, duration) => {
    const [timer, setTimer] = useState(null);

    const setTimeoutFunc = (...args) => {
        clearTimeoutFunc()
        setTimer(setTimeout(() =>
            progressiveFunc(...args), duration)
        );
    }

    const clearTimeoutFunc = () => {
        if(timer) {
            clearTimeout(timer);
        }
    }
    return [setTimeoutFunc, clearTimeoutFunc]
}

export default useDebounce;