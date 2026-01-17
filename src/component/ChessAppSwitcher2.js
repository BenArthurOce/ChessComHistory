import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Title, Inner } from './styles3';

// Components
// import RequestChessCom from './RequestChessCom';
// import RequestLichess from './RequestLichess';
import MakeRequestsLichess2 from './moduleDataRequests/MakeRequestsLichess2';
// import RequestLichess2 
import PlayerInformation from './modulePlayerInformation/PlayerInformation';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import MatchHistoryTableMaster from './moduleMatchHistoryTable/MatchHistoryTableMaster';
import HeatmapMaster from './moduleHeatmap/HeatmapMaster';
import OpeningAnalysisMaster from './moduleOpeningAnalysis/OpeningAnalysisMaster';
// import Debugging from './Debugging';
import OtherStatsMaster from './moduleOtherStats/OtherStatsMaster';


const ChessAppSwitcher2 = (props) => {

    //
    // Props
    //
    // const { username, lastNGames, activeModule, playerInformation, website } = props;
    const { matchHistory, activeModule} = props;

    
    //
    // States
    //
    const [matchData, setMatchData] = useState(null);
    const [gotDataFlag, setGotDataFlag] = useState(false);


    // setmatchHistory(matchHistory);
    //
    // Helpers
    //  
    const handleChildData = (data) => {
        if (!data) return;
        setMatchData(data);
        setGotDataFlag(data && data.length > 0);
    };


    const handleTestButtonClick = () => {
        console.log("==handleButtonClick==");
        console.log("activeModule", activeModule);
        console.log("matchHistory", matchHistory);
        // console.log(builtGameData)
        // console.log(builtGameData)
        // console.log({builtGameData, isBuiltPending, builtGameErrors})
        // console.log(builtGameData['hookUseSingleMatchObjects'])
        // console.log(builtGameData['hookData'])
        // console.log(builtGameData['hookUseSingleMatchObjects']['hookData'])
    };



    return (
        <Container>


                {matchHistory && (
                    <>
                    <h1> Chess App Switcher2 Component</h1>
                    <p> Active Module {activeModule}</p>
                    <button onClick={handleTestButtonClick}>View Component Information</button>
                    </>
                )}







                <Inner>
                    {/* {matchHistory && activeModule === 'playerInfo' && (
                        <PlayerInformation playerInformation={playerInformation} />
                    )} */}

                    {matchHistory && activeModule === 'matchHistory' && (
                        <MatchHistoryDisplay matchHistory={matchHistory} />
                    )}

                    {matchHistory && activeModule === 'tableSummary' && (
                        <MatchHistoryTableMaster matchHistory={matchHistory} />
                    )}

                    {matchHistory && activeModule === 'otherStats' && (
                        <OtherStatsMaster matchHistory={matchHistory} />
                    )}

                    {matchHistory && activeModule === 'heatMapMaster' && (
                        <HeatmapMaster matchHistory={matchHistory} />
                    )}

                    {matchHistory && activeModule === 'openingAnalysis' && (
                        <OpeningAnalysisMaster matchHistory={matchHistory} />
                    )}

                    {/* {matchHistory && activeModule === 'debugging' && (
                        <Debugging matchHistory={matchHistory} />
                    )} */}

                </Inner>

        </Container>
    );
};

export default ChessAppSwitcher2;