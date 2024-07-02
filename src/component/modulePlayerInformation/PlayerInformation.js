import React, {
    useState,
    useEffect,
} from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";


//
// Styles
//
const Title = styled.h1
`
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
`
;


const PlayerInformation = (props) => {

    //
    // Props
    //
    const {username} = props;

    //
    // States
    //
    const [renderFlag, setRenderFlag] = useState(false);

    //
    // Hooks
    //
    const { data, loading, error } = useFetch(
        `https://api.chess.com/pub/player/${username}`
    );

    //
    // Effects
    //
    useEffect(() => {
        if (!loading && !error && data) {
            setRenderFlag(true);
        } else {
            setRenderFlag(false);
        }
    }, [data, loading, error]);

    return (
        <>
            <Title>Player Information</Title>

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
