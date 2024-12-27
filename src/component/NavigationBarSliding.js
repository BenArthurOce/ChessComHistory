import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FlexRow, FlexLabel, FlexInput, FlexDropDown } from './styles3';

// Custom Hooks
import useIsMobile from '../hooks/useIsMobile';

//
// Component Styles
//
const Container = styled.div
`
    position: relative;
`
;

const ToggleButton = styled.button
`
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    background-color: #008cba;
    color: white;
    font-size: 20px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    z-index: 9999;
`
;

const Inner = styled.div
`
    position: fixed;
    top: 0;
    left: ${(props) => (props.sidebarVisible ? '0' : '-100%')};
    bottom: 0;
    width: 100%;
    max-width: 800px;
    background-color: #f0f0f0;
    padding: 20px;
    z-index: 1000;
    border-right: 1px solid #ccc;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease-in-out;
    height: 100vh;
`
;

const Form = styled.form
`
    margin-bottom: 20px;
`
;

const ContainerUserInput = styled.div
`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
;


const ButtonSubmit = styled.button
`
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
`
;

const NavigationButton = styled.button
`
    display: block;
    width: 100%;
    padding: 20px 20px;
    margin-bottom: 10px;
    border: none;
    background-color: ${(props) => (props.selected ? '#0c967f' : 'transparent')};
    color: ${(props) => (props.selected ? '#fff' : '#666')};
    text-align: left;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 20px;
`
;


const NavigationBarSliding = (props) => {
    //
    // Props
    //
    const { onFormSubmit, onNavigationButtonClick, userFound } = props;

    //
    // States
    //
    const [username, setUsername] = useState("BenArthurOCE");
    const [lastNGames, setLastNGames] = useState(208);
    const [website, setWebsite] = useState('chesscom');
    const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility
    const [activeModule, setActiveModule] = useState('playerInfo');

    //
    // Hooks
    //
    const hookIsMobile = useIsMobile();

    //
    // Handlers
    //
    const handleNavigationButtonClick = (myModule) => {
        setActiveModule(myModule);
        onNavigationButtonClick(myModule);
        setSidebarVisible(false);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        onFormSubmit({ username, lastNGames, website });
        setSidebarVisible(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleLastNGamesChange = (event) => {
        setLastNGames(event.target.value);
    };

    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };

    //
    // Helpers
    //
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <Container>

            <ToggleButton onClick={toggleSidebar}>☰</ToggleButton>

            <Inner sidebarVisible={sidebarVisible} isMobile={hookIsMobile}>

                <Form onSubmit={handleSubmit}>
                    <ContainerUserInput>
                            <FlexRow>
                                <FlexLabel htmlFor="websiteSelect">Website:</FlexLabel>
                                <FlexDropDown
                                    id="websiteSelect"
                                    value={website}
                                    onChange={handleWebsiteChange}
                                >
                                    <option value="chesscom">Chess.com</option>
                                    <option value="lichess">Lichess</option>
                                </FlexDropDown>
                            </FlexRow>

                            <FlexRow>
                                <FlexLabel htmlFor="usernameInput">Username:</FlexLabel>
                                    <FlexInput
                                        id="usernameInput"
                                        value={username}
                                        onChange={(ev) => handleUsernameChange(ev)}
                                        placeholder="Player name..."
                                    />
                            </FlexRow>

                            <FlexRow>
                            <FlexLabel htmlFor="lastngamesInput"># of Games:</FlexLabel>
                                    <FlexInput
                                        id="lastngamesInput"
                                        value={lastNGames}
                                        onChange={(ev) => handleLastNGamesChange(ev)}
                                        placeholder="No# of Games"
                                    />
                            </FlexRow>
                            <ButtonSubmit type="submit">Search</ButtonSubmit>
                    </ContainerUserInput>
                </Form>

                {userFound && (
                <>
                    <NavigationButton selected={activeModule === 'playerInfo'} onClick={() => handleNavigationButtonClick('playerInfo')}>
                        Player Info
                    </NavigationButton>

                    <NavigationButton selected={activeModule === 'matchHistory'} onClick={() => handleNavigationButtonClick('matchHistory')}>
                        Match History
                    </NavigationButton>

                    <NavigationButton selected={activeModule === 'tableSummary'} onClick={() => handleNavigationButtonClick('tableSummary')}>
                        Table Summary
                    </NavigationButton>

                    <NavigationButton selected={activeModule === 'heatMapMaster'} onClick={() => handleNavigationButtonClick('heatMapMaster')}>
                        Heatmap Master
                    </NavigationButton>

                    <NavigationButton selected={activeModule === 'openingAnalysis'} onClick={() => handleNavigationButtonClick('openingAnalysis')}>
                        Opening Analysis
                    </NavigationButton>

                    <NavigationButton selected={activeModule === 'debugging'} onClick={() => handleNavigationButtonClick('debugging')}>
                        Debugging
                    </NavigationButton>
                </>
            )}
            </Inner>
        </Container>
    );

};

export default NavigationBarSliding;
