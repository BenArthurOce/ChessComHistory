import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Inner, FlexRow, FlexLabel, FlexInput, FlexDropDown } from "./styles3";


import useBuildMatchesChessCom from "../hooksSpecific/HooksGameObjects/useBuildMatchesChessCom";





// Components
import PlayerInformation from './modulePlayerInformation/PlayerInformation';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import MatchHistoryTableMaster from './moduleMatchHistoryTable/MatchHistoryTableMaster';
import HeatmapMaster from './moduleHeatmap/HeatmapMaster';
import OpeningAnalysisMaster from './moduleOpeningAnalysis/OpeningAnalysisMaster';
import OtherStatsMaster from './moduleOtherStats/OtherStatsMaster';


import RequestsMaster from "./moduleDataRequests/RequestsMaster";


;


//
// Component Styles
//






const ChessAppDebug = () => {

    const [matchHistory, setMatchHistory] = useState(null);



    const hookParsedMatches = useBuildMatchesChessCom(matchHistory, 'BenArthurOCE');
    // const hookParsedMatches = useBuildMatchesChessCom(matchHistory, formData?.username);
    const [activeModule, setActiveModule] = useState('formInput');



    const receiveRequestGameObjects = useCallback((requestGameObjects) => {
        if (requestGameObjects.length == 0) {return};
        if (!requestGameObjects) {return};
        setMatchHistory(requestGameObjects)
    }, []);



    const handleTestButtonClick = () => {
        console.log("==handleButtonClick==");
        console.log(hookParsedMatches)
    };

    const handleModuleChange = (event) => {
        setActiveModule(event.target.value)
    };

    return (
        <>

            <button onClick={handleTestButtonClick}>View Game Objects</button>

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


            { matchHistory && (
            <p>data got</p>
            )}


            {matchHistory && (
                <Inner>

                    {/* {hookParsedMatches && activeModule === 'playerInfo' && (
                        <PlayerInformation playerInformation={playerInformation} />
                    )} */}

                    {hookParsedMatches && activeModule === 'matchHistory' && (
                        <MatchHistoryDisplay matchHistory={hookParsedMatches} />
                    )}

                    {hookParsedMatches && activeModule === 'tableSummary' && (
                        <MatchHistoryTableMaster matchHistory={hookParsedMatches} />
                    )}

                    {hookParsedMatches && activeModule === 'otherStats' && (
                        <OtherStatsMaster matchHistory={hookParsedMatches} />
                    )}

                    {hookParsedMatches && activeModule === 'heatMapMaster' && (
                        <HeatmapMaster matchHistory={hookParsedMatches} />
                    )}

                    {hookParsedMatches && activeModule === 'openingAnalysis' && (
                        <OpeningAnalysisMaster matchHistory={hookParsedMatches} />
                    )}

                </Inner>
            )}

        </>
    );
}

export default ChessAppDebug;
