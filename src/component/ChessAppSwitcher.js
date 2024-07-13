import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayerInformation from './modulePlayerInformation/PlayerInformation';
import HeatmapOverview from './moduleHeatmapOverview/HeatmapOverview';
import HeatmapController from './moduleHeatmapAnalysis/HeatmapController';
import MatchHistoryTable from './moduleMatchHistoryTable/MatchHistoryTable';
import OpeningAnalysisController from './moduleOpeningAnalysis/OpeningAnalysisController';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import Debugging from './Debugging';


import RequestChessCom from './RequestChessCom';
import RequestLichess from './RequestLichess';

const Container = styled.div
`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
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
    const { username, lastNGames, activeModule, playerInformation, website } = props;

    const [matchData, setMatchData] = useState(false);
    const [gotDataFlag, setGotDataFlag] = useState(false);

    const handleChildData = (data) => {
        if (!data) return;

        setMatchData(data);
        setGotDataFlag(data && data.length > 0);
    };

    return (
        <Container>

            {props && !gotDataFlag && (
                <>
                    {website === "chesscom" && (
                        <RequestChessCom
                            username={username}
                            lastNGames={lastNGames}
                            onDataRequest={handleChildData}
                        />
                    )}

                    {website === "lichess" && (
                        <RequestLichess
                            username={username}
                            lastNGames={lastNGames}
                            onDataRequest={handleChildData}
                        />
                    )}
                </>
            )}

            {props && (
                <ContentContainer>
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
            )}
        </Container>
    );
};

export default ChessAppSwitcher;
