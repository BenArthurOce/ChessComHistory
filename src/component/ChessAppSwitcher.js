import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayerInformation from './modulePlayerInformation/PlayerInformation';
import MatchesRequest from './MatchesRequest';
import HeatmapOverview from './moduleHeatmapOverview/HeatmapOverview';
import HeatmapController from './moduleHeatmapAnalysis/HeatmapController';
import MatchHistoryTable from './moduleMatchHistoryTable/MatchHistoryTable';
import OpeningAnalysisController from './moduleOpeningAnalysis/OpeningAnalysisController';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import Debugging from './Debugging';

//
// Styles
//
const Container = styled.div
`
    display: flex;
    position: relative;
    height: 100%;
    overflow-y: hidden; /* Prevent double scrollbars */
`
;

const SidebarContainer = styled.div
`
    position: fixed;
    top: 0;
    left: ${(props) => (props.sidebarVisible ? '0' : '-400px')}; /* Show sidebar */
    bottom: 0;
    width: 400px;
    background-color: #f0f0f0;
    padding: 20px;
    z-index: 1000;
    border-right: 1px solid #ccc;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease-in-out; /* Smooth transition */
`
;

const ContentContainer = styled.div
`
    flex: 1;
    padding: 5px; 
    overflow-y: auto; 
`
;

const ToggleButton = styled.button
`
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1100;
    background-color: #008cba;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
`
;

const SwitchButton = styled.button
`
    display: block;
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 10px;
    border: none;
    background-color: transparent;
    text-align: left;
    color: ${(props) => (props.selected ? '#333' : '#666')};
    cursor: pointer;
    transition: background-color 0.3s ease;

    padding-left: 20%;
    font-size: 16px;

    &:hover {
        background-color: #ddd;
    }
`
;

const ChessAppSwitcher = (props) => {
    //
    // Props
    //
    const { username, lastNGames, activeModule, playerInformation } = props;

    //
    // States
    //
    const [renderFlag, setRenderFlag] = useState(false);
    const [gotDataFlag, setGotDataFlag] = useState(false);
    const [parsedMatchObjects, setParsedMatchObjects] = useState(null);

    //
    // Effects
    //
    useEffect(() => {
        if (parsedMatchObjects && parsedMatchObjects.length > 0) {
            setRenderFlag(true);
        } else {
            setRenderFlag(false);
        }
    }, [parsedMatchObjects]);

    //
    // Handlers
    //
    const handleChildData = (data) => {
        setParsedMatchObjects(data);
        setGotDataFlag(data && data.length > 0);
    };

    return (
        <Container>

            <ContentContainer>
                <MatchesRequest
                    username={username}
                    lastNGames={lastNGames}
                    onDataRequest={handleChildData}
                />

                {!gotDataFlag && <p>Component: ChessAppSwitcher: gotDataFlag is false</p>}

                {gotDataFlag && (
                    <>
                        {renderFlag && parsedMatchObjects && activeModule === 'playerInfo' && (
                            <PlayerInformation playerInformation={playerInformation} />
                        )}

                        {renderFlag && parsedMatchObjects && activeModule === 'matchHistory' && (
                            <MatchHistoryDisplay matchHistory={parsedMatchObjects} />
                        )}

                        {renderFlag && parsedMatchObjects && activeModule === 'tableSummary' && (
                            <MatchHistoryTable matchHistory={parsedMatchObjects} />
                        )}

                        {renderFlag && parsedMatchObjects && activeModule === 'heatMapOverview' && (
                            <HeatmapOverview matchHistory={parsedMatchObjects} />
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
        </Container>
    );
};

export default ChessAppSwitcher;
