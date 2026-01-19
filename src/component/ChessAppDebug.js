import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Inner, FlexRow, FlexLabel, FlexInput, FlexDropDown } from "./styles3";

//
// Components
//
import RequestsMaster from "./moduleDataRequests/RequestsMaster";
import ChessAppSwitcher2 from "./ChessAppSwitcher2";

//
// Component Styles
//



const ChessAppDebug = () => {

    const [builtGameData, setBuiltGameData] = useState(null);
    const [activeModule, setActiveModule] = useState('formInput');


    // When drop down box is changed
    const handleModuleChange = (event) => {
        setActiveModule(event.target.value)
    };

    // Successful API call returning game objects
    const receiveRequestGameObjects = useCallback((requestGameObjects) => {
        if (requestGameObjects.length == 0) {return};
        if (!requestGameObjects) {return};
        setBuiltGameData(requestGameObjects)
    }, []);

    
    // Debugging
    const handleMainAppButtonClick = () => {
        console.log("==handleMainAppButtonClick==");
        console.log("builtGameData", builtGameData)
        console.log("activeModule", activeModule)
    };


    return (
        <>

        <h1> ChessAppDebug Component</h1>

            <select name="module" id="module" value={activeModule} onChange={handleModuleChange}>
                <option value="formInput">Input</option>
                <option value="playerInfo">Player Info</option>
                <option value="matchHistory">Match History</option>
                <option value="tableSummary">Table Summary</option>
                <option value="heatMapMaster">Heat Map</option>
                <option value="openingAnalysis">Openings</option>
                <option value="debugging">Debugging</option>
            </select>


            <button onClick={handleMainAppButtonClick}>ChessAppDebug</button>

            {activeModule === 'formInput' && (
                <RequestsMaster receiveRequestGameObjects={receiveRequestGameObjects} />
            )}


            { builtGameData && (
            <p>data got</p>
            )}

            {builtGameData && (
                <Inner>

                    <ChessAppSwitcher2
                        builtGameData={builtGameData}
                        activeModule={activeModule}
                        // playerInformation={data}
                    />

                </Inner>
            )}

        </>
    );
}

export default ChessAppDebug;