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


const ContentContainer = styled.div
`
    flex: 1;
    padding: 5px; 
    overflow-y: auto; 
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
