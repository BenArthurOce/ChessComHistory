import React, { useState } from 'react';
import styled from 'styled-components';

// Modules
import PlayerInformation from './modulePlayerInformation/PlayerInformation';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import MatchHistoryTable from './moduleMatchHistoryTable/MatchHistoryTable';
import HeatmapMasterTwo from './moduleHeatmap/HeatmapMasterTwo';
import HeatmapOverview from './moduleHeatmapOverview/HeatmapOverview';
import HeatmapController from './moduleHeatmapAnalysis/HeatmapController';
import OpeningAnalysisController from './moduleOpeningAnalysis/OpeningAnalysisController';
import Debugging from './Debugging';

// Other Components
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
    const [matchData, setMatchData] = useState(null);
    const [gotDataFlag, setGotDataFlag] = useState(false);

    const handleChildData = (data) => {
        if (!data) return;
        setMatchData(data);
        setGotDataFlag(data && data.length > 0);
    };

    return (
        <Container>
            {!gotDataFlag && (
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

            {gotDataFlag && (
                <ContentContainer>
                    {matchData && activeModule === 'playerInfo' && (
                        <PlayerInformation playerInformation={playerInformation} />
                    )}

                    {matchData && activeModule === 'matchHistory' && (
                        <MatchHistoryDisplay matchHistory={matchData} />
                    )}

                    {matchData && activeModule === 'tableSummary' && (
                        <MatchHistoryTable matchHistory={matchData} />
                    )}

                    {matchData && activeModule === 'heatMapMaster' && (
                        <HeatmapMasterTwo matchHistory={matchData} />
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
                </ContentContainer>
            )}
        </Container>
    );
};

export default ChessAppSwitcher;
