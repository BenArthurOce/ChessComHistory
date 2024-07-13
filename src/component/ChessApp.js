import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Inner, Title } from "./styles";

import useIsMobile from "../hooks/useIsMobile";

import ChessAppSwitcher from "./ChessAppSwitcher";
import NavigationBarSliding from "./NavigationBarSliding";

//
// Styles
//
const Wrapper = styled.div
`
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
`
;

function ChessApp() {

    //
    // States
    //
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState(null);
    const [activeModule, setActiveModule] = useState("playerInfo");

    //
    // Hooks
    //
    const isMobile = useIsMobile();

    //
    // Handlers
    //
    const handleFormSubmit = (formData) => {
        setFormData(formData);
        performFetch(formData.username);
    };

    const handleNavigationButtonClick = (selectedModule) => {
        setActiveModule(selectedModule);
    };

    //
    // Helpers
    //
    const performFetch = (username) => {
        const url = `https://api.chess.com/pub/player/${username}`;

        setLoading(true);
        setData(null);
        setError(null);

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <Wrapper isMobile={isMobile}>
            <Inner>
                <NavigationBarSliding
                    onFormSubmit={handleFormSubmit}
                    onNavigationButtonClick={handleNavigationButtonClick}
                    userFound={data ? true : false}
                />

                {loading && (
                    <>
                        <Title>Chess Match History</Title>
                        <p>Loading...</p>
                    </>
                )}

                {error && (
                    <>
                        <Title>Chess Match History</Title>
                        <p>Error: {error}</p>
                    </>
                )}

                {!formData && !loading && !error && (
                    <>
                        <Title>Chess Match History</Title>
                        <p>Waiting on user...</p>
                    </>
                )}

                {formData && activeModule && !loading && (
                    <ChessAppSwitcher
                        username={formData.username}
                        lastNGames={formData.lastNGames}
                        activeModule={activeModule}
                        playerInformation={data}
                        website={formData.website}
                    />
                )}
            </Inner>
        </Wrapper>
    );
}

export default ChessApp;
