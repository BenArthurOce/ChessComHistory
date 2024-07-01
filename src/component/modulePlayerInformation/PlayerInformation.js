import React, {
    useState,
    useEffect,
} from "react";
import useFetch from "../../hooks/useFetch";

const PlayerInformation = (props) => {
    const [renderFlag, setRenderFlag] = useState(false);
    const { data, loading, error } = useFetch(
        `https://api.chess.com/pub/player/${props.username}`
    );

    useEffect(() => {
        if (!loading && !error && data) {
            setRenderFlag(true);
        } else {
            setRenderFlag(false);
        }
    }, [data, loading, error]);


    return (
        <>
            <h1 style={{ textAlign: "center" }}>Player Information</h1>

            {loading && <p>Loading...</p>} {/* Show loading message while fetching data */}
            {!loading && error && <p>Error fetching data</p>} {/* Show error message if there's an error */}
            {!loading && !error && renderFlag && (
                <> {/* Render data if renderFlag is true */}
                    <p>{data.name}</p>
                    <a href={`${data.url}`} target="_blank" rel="noopener noreferrer">
                        <img
                            src={`${data.avatar}`}
                            alt="Avatar"
                            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                        />
                    </a>
                    <p>{data.country}</p>
                    <p>{data.dateJoined}</p>
                    <p>{data.url}</p>
                </>
            )}
        </>
    );
};
export default PlayerInformation;
