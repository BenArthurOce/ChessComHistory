import React, {
    useState,
    useEffect,
} from "react";
import styled from "styled-components";


//
// Styles
//

const Container = styled.div
`
    height: 100%;
    overflow-y: scroll;
`
;

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
    const {playerInformation} = props;

    //
    // States
    //

    //
    // Hooks
    //

    //
    // Effects
    //

    return (
        <Container>
            {playerInformation && (
                <>
                    <Title>Player Information</Title>
                        <p>{playerInformation.name}</p>
                        <a href={`${playerInformation.url}`} target="_blank" rel="noopener noreferrer">
                            <img
                                src={`${playerInformation.avatar}`}
                                alt="Avatar"
                                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                            />
                        </a>
                        <p>{playerInformation.country}</p>
                        <p>{playerInformation.dateJoined}</p>
                        <p>{playerInformation.url}</p>
                </>
            )}
        </Container>
    );
};
export default PlayerInformation;
