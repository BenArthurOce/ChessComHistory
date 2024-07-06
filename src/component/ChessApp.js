import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const Inner = styled.div
`
    height: 100%;
    border: 1px solid #ddd;
    max-width: 800px
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

function ChessApp() {
    //
    // States
    //
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(null);
    const [activeModule, setActiveModule] = useState(false);

    //
    // Hooks
    //
    const isMobile = useIsMobile();

    //
    // Effects
    //


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

                {/* Display loading state */}
                {loading && (
                    <>
                        <Title>Chess Match History</Title>
                        <p>Loading...</p>
                    </>
                )}

                {/* Display error state */}
                {error && (
                    <>
                        <Title>Chess Match History</Title>
                        <p>Error: {error}</p>
                    </>
                )}

                {/* Display when waiting for user input */}
                {!formData && !loading && !error && (
                    <>
                        <Title>Chess Match History</Title>
                        <p>Waiting on user...</p>
                    </>
                )}

                {/* Display ChessAppSwitcher when form data is available */}
                {formData && !activeModule && !loading && (
                    <ChessAppSwitcher
                        username={formData.username}
                        lastNGames={formData.lastNGames}
                        activeModule="playerInfo"
                        playerInformation={data}
                    />
                )}

                {/* Display ChessAppSwitcher when form data and active module are available */}
                {formData && activeModule && !loading && (
                    <ChessAppSwitcher
                        username={formData.username}
                        lastNGames={formData.lastNGames}
                        activeModule={activeModule}
                        playerInformation={data}
                    />
                )}
            </Inner>
        </Wrapper>
    );
}

export default ChessApp;
