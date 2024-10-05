import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Title, Inner } from './styles3';

// Components
import RequestChessCom from './RequestChessCom';
import RequestLichess from './RequestLichess';
import PlayerInformation from './modulePlayerInformation/PlayerInformation';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import MatchHistoryTableMaster from './moduleMatchHistoryTable/MatchHistoryTableMaster';
import HeatmapMaster from './moduleHeatmap/HeatmapMaster';
import OpeningAnalysisController from './moduleOpeningAnalysis/OpeningAnalysisController';
import Debugging from './Debugging';

import SingleOpeningInfo from './moduleOpeningAnalysis/SingleOpeningInfo';




const ChessAppSwitcher = (props) => {

    //
    // Props
    //
    const { username, lastNGames, activeModule, playerInformation, website } = props;

    //
    // States
    //
    const [matchData, setMatchData] = useState(null);
    const [gotDataFlag, setGotDataFlag] = useState(false);

    //
    // Helpers
    //  
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
                <Inner>
                    {matchData && activeModule === 'playerInfo' && (
                        <PlayerInformation playerInformation={playerInformation} />
                    )}

                    {matchData && activeModule === 'matchHistory' && (
                        <MatchHistoryDisplay matchHistory={matchData} />
                    )}

                    {/* {matchData && activeModule === 'tableSummary' && (
                        <MatchHistoryTable matchHistory={matchData} />
                    )} */}

                    {/* {matchData && activeModule === 'tableSummary' && (
                        <MatchHistoryTimeTable matchHistory={matchData} />
                    )} */}

                    {matchData && activeModule === 'tableSummary' && (
                        <MatchHistoryTableMaster matchHistory={matchData} />
                    )}

                    {matchData && activeModule === 'heatMapMaster' && (
                        <HeatmapMaster matchHistory={matchData} />
                    )}

                    {/* {matchData && activeModule === 'openingAnalysis' && (
                        <OpeningAnalysisController matchHistory={matchData} />
                    )} */}

                    {matchData && activeModule === 'openingAnalysis' && (
                        <SingleOpeningInfo matchHistory={matchData} />
                    )}




                    {matchData && activeModule === 'debugging' && (
                        <Debugging matchHistory={matchData} />
                    )}
                </Inner>
            )}
        </Container>
    );
};

export default ChessAppSwitcher;
