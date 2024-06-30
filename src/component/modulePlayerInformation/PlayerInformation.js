import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
} from "react";
import useFetch from "../../hooks/useFetch";

const PlayerInformation = (props) => {
    const username = props.username;
    const [renderFlag, setRenderFlag] = useState(false);
    const { data, loading, error } = useFetch(
        `https://api.chess.com/pub/player/${props.username}`
    );

    useEffect(() => {
        if (data) {
            setRenderFlag(checkIfAbleToRender(data));
        } else {
            setRenderFlag(false);
        }
    }, [data]); // Run code when the data in "ChessAppSearchForm is changed / submitted

    const checkIfAbleToRender = (data) => {
        if (data === null || data === undefined) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <>
            {renderFlag && (
                <section className="playerProfile">
                <h1>PlayerProfile</h1>
                {props && (
                    <article>
                        <p>{data.name}</p>
                        <a href={`${data.url}`} target="_blank">
                            <img src={`${data.avatar}`} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                        </a>
                        <p>{data.country}</p>
                        <p>{data.dateJoined}</p>
                        <p>{data.url}</p>
    
                    </article>
                )}
            </section>
            )}
        </>
    );
}

export default PlayerInformation;
