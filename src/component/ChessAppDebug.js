import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Inner, FlexRow, FlexLabel, FlexInput, FlexDropDown } from "./styles3";


import useBuildMatchesChessCom from "../hooksSpecific/HooksAPI/useBuildMatchesChessCom";

import useBuildMatchesLichess from "../hooksSpecific/HooksGameObjects/useBuildMatchesLichess2";



// Components
import PlayerInformation from './modulePlayerInformation/PlayerInformation';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import MatchHistoryTableMaster from './moduleMatchHistoryTable/MatchHistoryTableMaster';
import HeatmapMaster from './moduleHeatmap/HeatmapMaster';
import OpeningAnalysisMaster from './moduleOpeningAnalysis/OpeningAnalysisMaster';
import OtherStatsMaster from './moduleOtherStats/OtherStatsMaster';


import RequestsMaster from "./moduleDataRequests/RequestsMaster";

// TestSpinner component
import TestSpinner from "./TestSpinner";
;


//
// Component Styles
//






const ChessAppDebug = () => {

    // const [matchHistory, setMatchHistory] = useState(null);
    const [builtGameData, setBuiltGameData] = useState(null);
    const website = 'chesscom'




//
// Progress 17th Jane 2026
//
// "useBuildMatchesLichess" / Com should not be in this component, but the match history doesn't run without it
//
//

    // const {builtGameData, isPending, builtGameErrors} = useBuildMatchesChessCom(matchHistory, 'BenArthurOCE');
    // const {builtGameData, isPending, builtGameErrors} = useBuildMatchesLichess(matchHistory, 'BenArthurOCE');
    // const builtGameData = useBuildMatchesChessCom(matchHistory, formData?.username);
    const [activeModule, setActiveModule] = useState('formInput');



    const receiveRequestGameObjects = useCallback((requestGameObjects) => {
        if (requestGameObjects.length == 0) {return};
        if (!requestGameObjects) {return};
        // setMatchHistory(requestGameObjects)
        setBuiltGameData(requestGameObjects)
    }, []);



    const handleTestButtonClick = () => {
        console.log("==handleButtonClick==");
        // console.log(matchHistory)
        console.log(builtGameData)
        // console.log({builtGameData, isBuiltPending, builtGameErrors})
        // console.log(builtGameData['hookUseSingleMatchObjects'])
        // console.log(builtGameData['hookData'])
        // console.log(builtGameData['hookUseSingleMatchObjects']['hookData'])
    };

    const handleModuleChange = (event) => {
        setActiveModule(event.target.value)
    };

    return (
        <>

        <h1> ChessAppDebug Component</h1>

            <button onClick={handleTestButtonClick}>ChessAppDebug</button>

            <select name="module" id="module" value={activeModule} onChange={handleModuleChange}>
                <option value="formInput">Input</option>
                <option value="playerInfo">Player Info</option>
                <option value="matchHistory">Match History</option>
                <option value="tableSummary">Table Summary</option>
                <option value="heatMapMaster">Heat Map</option>
                <option value="openingAnalysis">Openings</option>
                <option value="debugging">Debugging</option>
            </select>


            {activeModule === 'formInput' && (
                <RequestsMaster receiveRequestGameObjects={receiveRequestGameObjects} />
            )}


            {/* --- TestSpinner while building games --- */}
            {/* {isPending && (
                <TestSpinner 
                    size="60px" 
                    thickness="6px" 
                    color="#eee" 
                    colorTop="#007bff" 
                    text="Processing games..." 
                />
            )} */}

            { builtGameData && (
            <p>data got</p>
            )}

            {builtGameData && (
                <Inner>

                    <p>activeModule {activeModule} </p>

                    {/* {builtGameData && activeModule === 'playerInfo' && (
                        <PlayerInformation playerInformation={playerInformation} />
                    )} */}

                    {builtGameData && activeModule === 'matchHistory' && (
                        <MatchHistoryDisplay matchHistory={builtGameData} />
                    )}

                    {builtGameData && activeModule === 'tableSummary' && (
                        <MatchHistoryTableMaster matchHistory={builtGameData} />
                    )}

                    {builtGameData && activeModule === 'otherStats' && (
                        <OtherStatsMaster matchHistory={builtGameData} />
                    )}

                    {builtGameData && activeModule === 'heatMapMaster' && (
                        <HeatmapMaster matchHistory={builtGameData} />
                    )}

                    {builtGameData && activeModule === 'openingAnalysis' && (
                        <OpeningAnalysisMaster matchHistory={builtGameData} />
                    )}

                </Inner>
            )}

        </>
    );
}

export default ChessAppDebug;