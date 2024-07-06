import React, { useState } from 'react';
import styled from 'styled-components';
import useIsMobile from '../hooks/useIsMobile';

//
// Styles
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

const InputContainer = styled.div
`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
;

const InputRow = styled.div
`
    display: flex;
    align-items: center;
`
;

const Label = styled.label
`
    font-weight: bold;
    margin-right: 10px;
    flex: 1;
`
;

const Input = styled.input
`
    flex: 2;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
    const [lastNGames, setLastNGames] = useState(100);
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
        // console.log(myModule);
        setActiveModule(myModule);
        onNavigationButtonClick(myModule);
        setSidebarVisible(false);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        onFormSubmit({ username, lastNGames });
        setSidebarVisible(false);
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
                    <InputContainer>

                        <InputRow>
                            <Label htmlFor="usernameInput">Username:</Label>
                            <Input
                                id="usernameInput"
                                value={username}
                                onChange={(ev) => setUsername(ev.target.value)}
                                placeholder="Player name..."
                            />
                        </InputRow>

                        <InputRow>
                            <Label htmlFor="lastngamesInput"># of Games:</Label>
                            <Input
                                id="lastngamesInput"
                                value={lastNGames}
                                onChange={(ev) => setLastNGames(ev.target.value)}
                                placeholder="No# of Games"
                            />
                        </InputRow>

                        <ButtonSubmit type="submit">Search</ButtonSubmit>
                    </InputContainer>
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

                    <NavigationButton selected={activeModule === 'heatMapOverview'} onClick={() => handleNavigationButtonClick('heatMapOverview')}>
                        Heatmap Overview
                    </NavigationButton>

                    <NavigationButton selected={activeModule === 'heatMapAnalysis'} onClick={() => handleNavigationButtonClick('heatMapAnalysis')}>
                        Heatmap Analysis
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
