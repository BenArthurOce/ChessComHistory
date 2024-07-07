import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayerInformation from './modulePlayerInformation/PlayerInformation';
import HeatmapOverview from './moduleHeatmapOverview/HeatmapOverview';
import HeatmapController from './moduleHeatmapAnalysis/HeatmapController';
import MatchHistoryTable from './moduleMatchHistoryTable/MatchHistoryTable';
import OpeningAnalysisController from './moduleOpeningAnalysis/OpeningAnalysisController';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import Debugging from './Debugging';

import LoadingScreen from './LoadingScreen';


import RequestChessCom from './RequestChessCom';
import RequestLichess from './RequestLichess';


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
    const [matchData, setMatchData] = useState(false);
    const [gotDataFlag, setGotDataFlag] = useState(false);


    //
    // Handlers
    //
    const handleChildData = (data) => {
        if (!data) {return}
        console.log("handleChildData")
        console.log(data)
        console.log()

        

        setMatchData(data);
        setGotDataFlag(data && data.length > 0);
    };

    return (
        <Container>

            {/* "gotDataFlag" = false means we still need to fetch the data. "handleChildData" will change the flag */}
            {props && !gotDataFlag && (
                // <>
                //     <RequestChessCom
                //         username={username}
                //         lastNGames={lastNGames}
                //         onDataRequest={handleChildData}
                //     />
                // </>

                <>
                <RequestLichess
                    username={username}
                    lastNGames={lastNGames}
                    onDataRequest={handleChildData}
                />
                </>
            )}


            {props && (

                <>
                <ContentContainer>

                    {/* Loading screen when we have submitted props but are waiting for data */}
                    {!gotDataFlag && <LoadingScreen />}

                    {/* Data successfully received*/}
                    {gotDataFlag && (
                        <>
                            {matchData && activeModule === 'playerInfo' && (
                                <PlayerInformation playerInformation={playerInformation} />
                            )}

                            {matchData && activeModule === 'matchHistory' && (
                                <MatchHistoryDisplay matchHistory={matchData} />
                            )}

                            {matchData && activeModule === 'tableSummary' && (
                                <MatchHistoryTable matchHistory={matchData} />
                            )}

                            {matchData && activeModule === 'heatMapOverview' && (
                                <HeatmapOverview matchHistory={matchData} />
                            )}

                            {matchData && activeModule === 'heatMapAnalysis' && (
                                <HeatmapController matchHistory={matchData} />
                            )}

                            {matchData && activeModule === 'openingAnalysis' && (
                                <OpeningAnalysisController matchHistory={matchData} />
                            )}

                            {matchData && activeModule === 'debugging' && (
                                <Debugging matchHistory={matchData} />
                            )}
                        </>
                    )}
                </ContentContainer>
                </>
            )}


        </Container>
    );
};

export default ChessAppSwitcher;
