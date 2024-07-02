import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayerInformation from './modulePlayerInformation/PlayerInformation';
import MatchesRequest from './MatchesRequest';
import HeatmapController from './moduleHeatmapAnalysis/HeatmapController';
import MatchHistoryTable from './moduleMatchHistoryTable/MatchHistoryTable';
import OpeningAnalysisController from './moduleOpeningAnalysis/OpeningAnalysisController';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import Debugging from './Debugging';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column; /* Changed to column for sidebar layout */
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 900;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SwitchButton = styled.button`
    color: white;
    padding: 10px 10px;
    margin: 0 10px;
    border: none;
    cursor: pointer;
    outline: none;
    max-width: 70px;
    font-size: 10px;
    background-color: ${(props) => (props.selected ? '#4CAF50' : '#008CBA')};

    &:hover {
        background-color: ${(props) => (props.selected ? '#45a049' : '#0077A3')};
    }
`;

const SidebarContainer = styled.div`
    position: fixed;
    top: 0;
    left: -150px; /* Initially hidden */
    bottom: 0;
    width: 150px;
    background-color: #f0f0f0;
    padding: 20px;
    z-index: 1000;
    border-right: 1px solid #ccc;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease-in-out; /* Smooth transition */
`;

const ContentContainer = styled.div`
    margin-left: 0; /* Adjust based on sidebar width */
    padding: 20px;
`;

const ToggleButton = styled.button`
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1100;
    background-color: #008CBA;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
`;

const ChessAppSwitcher = (props) => {
    const { username, lastNGames } = props;
    const [activeModule, setActiveModule] = useState('playerInfo');
    const [renderFlag, setRenderFlag] = useState(false);
    const [gotDataFlag, setGotDataFlag] = useState(false);
    const [parsedMatchObjects, setParsedMatchObjects] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility

    useEffect(() => {
        if (parsedMatchObjects && parsedMatchObjects.length > 0) {
            setRenderFlag(true);
        } else {
            setRenderFlag(false);
        }
    }, [parsedMatchObjects]);

    const handleChildData = (data) => {
        setParsedMatchObjects(data);
        setGotDataFlag(data && data.length > 0);
    };

    const handleButtonClick = (module) => {
        setActiveModule(module);
        setSidebarVisible(false); // Hide sidebar after selecting a module
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <>
            <ToggleButton onClick={toggleSidebar}>☰</ToggleButton>

            <SidebarContainer style={{ left: sidebarVisible ? '0' : '-150px' }}>
                <SwitchButton
                    selected={activeModule === 'playerInfo'}
                    onClick={() => handleButtonClick('playerInfo')}
                >
                    Player Info
                </SwitchButton>
                <SwitchButton
                    selected={activeModule === 'matchHistory'}
                    onClick={() => handleButtonClick('matchHistory')}
                >
                    Match History
                </SwitchButton>
                <SwitchButton
                    selected={activeModule === 'tableSummary'}
                    onClick={() => handleButtonClick('tableSummary')}
                >
                    Table Summary
                </SwitchButton>
                <SwitchButton
                    selected={activeModule === 'heatMapAnalysis'}
                    onClick={() => handleButtonClick('heatMapAnalysis')}
                >
                    Heatmap Analysis
                </SwitchButton>
                <SwitchButton
                    selected={activeModule === 'openingAnalysis'}
                    onClick={() => handleButtonClick('openingAnalysis')}
                >
                    Opening Analysis
                </SwitchButton>
                {/* <SwitchButton
                    selected={activeModule === 'debugging'}
                    onClick={() => handleButtonClick('debugging')}
                >
                    Debugging
                </SwitchButton> */}
            </SidebarContainer>

            <ContentContainer style={{ marginLeft: sidebarVisible ? '150px' : '0' }}>
                <MatchesRequest
                    username={username}
                    lastNGames={lastNGames}
                    onDataRequest={handleChildData}
                />

                {!gotDataFlag && <p>Component: ChessAppSwitcher: gotDataFlag is false</p>}

                {gotDataFlag && (
                    <>
                        {renderFlag && parsedMatchObjects && activeModule === 'playerInfo' && (
                            <PlayerInformation username={username}></PlayerInformation>
                        )}

                        {renderFlag && parsedMatchObjects && activeModule === 'matchHistory' && (
                            <MatchHistoryDisplay matchHistory={parsedMatchObjects} />
                        )}

                        {renderFlag && parsedMatchObjects && activeModule === 'tableSummary' && (
                            <MatchHistoryTable matchHistory={parsedMatchObjects} />
                        )}

                        {renderFlag && parsedMatchObjects && activeModule === 'heatMapAnalysis' && (
                            <HeatmapController matchHistory={parsedMatchObjects} />
                        )}

                        {renderFlag && parsedMatchObjects && activeModule === 'openingAnalysis' && (
                            <OpeningAnalysisController matchHistory={parsedMatchObjects} />
                        )}

                        {renderFlag && parsedMatchObjects && activeModule === 'debugging' && (
                            <Debugging matchHistory={parsedMatchObjects} />
                        )}
                    </>
                )}
            </ContentContainer>
        </>
    );
};

export default ChessAppSwitcher;
