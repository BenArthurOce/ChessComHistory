import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
} from "react";

import useAPILichess from "../hooksSpecific/useAPILichess";
import useParseLichess from "../hooksSpecific/useParseLichess";



const RequestLichess = (props) => {

    //
    // Props
    //
    const { username, lastNGames, onDataRequest } = props

    // console.log(props)

    //
    // States
    //

    //
    // States
    //
    const [renderFlag, setRenderFlag] = useState(false);


    // const {games, loading, error} = useLichessAPI("BenArthurOCE", lastNGames)
    // const matches = useParseLichess(games, username)

    // console.log(username)
    // console.log("---")


    //
    // Hooks
    //

    const { games, loading, error } = useAPILichess(username, lastNGames);
    const matches = useParseLichess(games, username);




    //
    // Effects
    //
    useEffect(() => {
        if (matches) {
            onDataRequest(matches); // Send parsed data to parent
            setRenderFlag(checkIfAbleToRender(matches));
        } else {
            setRenderFlag(false);
        }
    }, [matches, onDataRequest]);


    //
    // Helpers
    //
    const checkIfAbleToRender = (array) => {
        if (array === null || array === undefined) {
            return false;
        }
        if (array <= 1) {
            return false;
        }
        return true;
    };


    return (
        <>
            {/* {data && renderFlag ? (
                <>
                
                </>
            ) : (
                <>
                    <p>MatchesRequest - Loading...</p>
                </>
            )} */}
        </>
    );
};

export default RequestLichess;