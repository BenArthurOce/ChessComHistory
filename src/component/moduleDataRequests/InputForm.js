import React from "react";
import { useState, useRef, useCallback } from 'react';

import { Container, ContainerUserInput, Inner, Form, FlexRow, FlexLabel, FlexInput, FlexDropDown } from "../styles3";


const InputForm = ({ onFormSubmit }) => {

    // State variables
    const [username, setUsername] = useState("BenArthurOCE");
    // const [lastNGames, setLastNGames] = useState("415");
    const [lastNGames, setLastNGames] = useState("2");
    const [website, setWebsite] = useState("chesscom");

    // Handlers for controlled inputs
    const handleUsernameChange = (ev) => setUsername(ev.target.value);
    const handleLastNGamesChange = (ev) => setLastNGames(ev.target.value);
    const handleWebsiteChange = (ev) => setWebsite(ev.target.value);

    // When form is submitted
    const submitTriggered = (event) => {
        event.preventDefault();

        const thisFormData = {
            website,
            username,
            numgames: lastNGames
        };

        onFormSubmit(thisFormData)
    };


    return (
        <>

        <Form onSubmit={submitTriggered}>
            <ContainerUserInput>
                <FlexRow>
                    <FlexLabel htmlFor="usernameInput">Username:</FlexLabel>
                    <FlexInput
                        id="usernameInput"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Player name..."
                    />
                </FlexRow>

                <FlexRow>
                    <FlexLabel htmlFor="lastngamesInput"># of Games:</FlexLabel>
                    <FlexInput
                        id="lastngamesInput"
                        type="number"
                        value={lastNGames}
                        onChange={handleLastNGamesChange}
                        placeholder="No# of Games"
                    />
                </FlexRow>


                <FlexRow>
                    <FlexLabel htmlFor="lastngamesInput"># of Games:</FlexLabel>
                    <FlexInput
                        id="websiteInput"
                        // type="number"
                        value={website}
                        onChange={handleWebsiteChange}
                        placeholder="Website"
                    />
                </FlexRow>

                <button type="submit">Search</button>
            </ContainerUserInput>
        </Form>

        </>
    );
};

export default InputForm;