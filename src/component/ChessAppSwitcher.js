import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayerInformation from './modulePlayerInformation/PlayerInformation';

import MatchesRequest from './MatchesRequest';
import HeatmapController from './moduleHeatmapAnalysis/HeatmapController';
import MatchHistoryTable from './moduleMatchHistoryTable/MatchHistoryTable';
import OpeningAnalysis from './moduleOpeningAnalysis/OpeningAnalysis';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';

const ButtonContainer = styled.div
`
    margin-top: 20px;
    margin-bottom: 20px;
`
;

const SwitchButton = styled.button
`
  
  color: white;
  padding: 10px 10px;
  margin: 0 10px;
  border: none;
  cursor: pointer;
  outline: none;
  max-width: 70px;
  font-size: 10px;
  background-color: ${(props) => (props.selected ? '#4CAF50' : '#008CBA')};

  &:hover {
    background-color: ${(props) => (props.selected ? '#45a049' : '#0077A3')};
  }
`
;

const ChessAppSwitcher = ({ username, lastNGames }) => {
    const [activeModule, setActiveModule] = useState("playerInfo");
    const [renderFlag, setRenderFlag] = useState(false);
    const [gotDataFlag, setGotDataFlag] = useState(false);
    const [parsedMatchObjects, setParsedMatchObjects] = useState(null);


    useEffect(() => {
        if (parsedMatchObjects && parsedMatchObjects.length > 0) {
            setRenderFlag(true);
        } else {
            setRenderFlag(false);
        }
    }, [parsedMatchObjects]);


    const handleChildData = (data) => {
        setParsedMatchObjects(data);
        setGotDataFlag(data && data.length > 0);
    };

    const handleButtonClick = (module) => {
        setActiveModule(module);
    };


    return (
        <>
            <MatchesRequest
                username={username}
                lastNGames={lastNGames}
                onDataRequest={handleChildData}
            />

            {!gotDataFlag && (
                <>
                    <p>Component: ChessAppSwitcher: gotDataFlag is false</p>
                </>
            )}

            {gotDataFlag && (
                <>
                    <ButtonContainer>
                        <SwitchButton
                            selected={activeModule === "playerInfo"}
                            onClick={() => handleButtonClick("playerInfo")}>
                            Player Information
                        </SwitchButton>

                        <SwitchButton
                            selected={activeModule === "matchHistory"}
                            onClick={() => handleButtonClick("matchHistory")}>
                            Match History
                        </SwitchButton>

                        <SwitchButton
                            selected={activeModule === "tableSummary"}
                            onClick={() => handleButtonClick("tableSummary")}>
                            Table Summary
                        </SwitchButton>

                        <SwitchButton
                            selected={activeModule === "heatMapAnalysis"}
                            onClick={() => handleButtonClick("heatMapAnalysis")}>
                            Heatmap Analysis
                        </SwitchButton>

                        <SwitchButton
                            selected={activeModule === "openingAnalysis"}
                            onClick={() => handleButtonClick("openingAnalysis")}>
                            Opening Analysis
                        </SwitchButton>
                    </ButtonContainer>


                    {/* Player Information */}
                    {renderFlag && parsedMatchObjects && activeModule === "playerInfo" && (
                        <PlayerInformation username={username}></PlayerInformation>
                    )}

                    {/* Match History per Single Game */}
                    {renderFlag && parsedMatchObjects && activeModule === "matchHistory" && (
                        <MatchHistoryDisplay matchHistory={parsedMatchObjects} />
                    )}

                    {/* Match History per Table format */}
                    {renderFlag && parsedMatchObjects && activeModule === "tableSummary" && (
                        <MatchHistoryTable matchHistory={parsedMatchObjects} />
                    )}

                    {/* Win/Loss rate by certain moves */}
                    {renderFlag && parsedMatchObjects && activeModule === "heatMapAnalysis" && (
                        <HeatmapController matchHistory={parsedMatchObjects} />
                    )}

                    {/* Win/Loss rate per Openings */}
                    {renderFlag && parsedMatchObjects && activeModule === "openingAnalysis" && (
                        <OpeningAnalysis matchHistory={parsedMatchObjects} />
                    )}
                </>
            )}
        </>
    );
};

export default ChessAppSwitcher;