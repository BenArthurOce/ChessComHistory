import React, {
    useState,
    useEffect,
} from "react";
import styled from "styled-components";


import { Container, Title } from "../styles3";
import { Inner } from "../styles";



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
            <Inner>
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
            </Inner>
        </Container>
    );
};
export default PlayerInformation;
