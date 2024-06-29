import React, { useState } from 'react';
import styled from 'styled-components';
import PlayerInformation from './modulePlayerInformation/PlayerInformation';

import MatchesRequest from './MatchesRequest';
import HeatmapController from './moduleHeatmapAnalysis/HeatmapController';
import MatchHistoryTable from './moduleMatchHistoryTable/MatchHistoryTable';
import OpeningAnalysis from './moduleOpeningAnalysis/OpeningAnalysis';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';

const ButtonContainer = styled.div
`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
;

const SwitchButton = styled.button
`
  background-color: ${(props) => (props.selected ? '#4CAF50' : '#008CBA')};
  color: white;
  padding: 10px 10px;
  margin: 0 10px;
  border: none;
  cursor: pointer;
  outline: none;
  max-width: 70px;
  font-size: 10px;

  &:hover {
    background-color: ${(props) => (props.selected ? '#45a049' : '#0077A3')};
  }
`
;

const ChessAppSwitcher = ({ username, lastNGames }) => {
    const [activeModule, setActiveModule] = useState('playerInfo');
    const [renderFlag, setRenderFlag] = useState(false);
    const [gotDataFlag, setGotDataFlag] = useState(false);
    const [parsedMatchObjects, setParsedMatchObjects] = useState([]);

    
    const checkIfAbleToRender = (array) => {
        if (array === null || array === undefined) {return false}
        if (array <= 1) {return false}
        return true
    };
  
    const handleChildData = (data) => {
        // Update state with parsed match objects received from MatchHistory
        setParsedMatchObjects(data);
        // Optionally, set a flag or trigger a re-render
        setRenderFlag(true);
    };
    

    const handleButtonClick = (module) => {
        setActiveModule(module);
    };

  return (
    <>
        {/* this currently gets the match history data. I need to find a way to remove the renders */}
        {/* <MatchHistory username={username} lastNGames={lastNGames} onDataRequest={handleChildData} /> */}
        <MatchesRequest username={username} lastNGames={lastNGames} onDataRequest={handleChildData} />


        

        <ButtonContainer>
            <SwitchButton selected={activeModule === 'playerInfo'} onClick={() => handleButtonClick('playerInfo')}>
                Player Information
            </SwitchButton>
            <SwitchButton selected={activeModule === 'matchHistory'} onClick={() => handleButtonClick('matchHistory')}>
                Match History
            </SwitchButton>
            <SwitchButton selected={activeModule === 'tableSummary'} onClick={() => handleButtonClick('tableSummary')}>
                Table Summary
            </SwitchButton>
            <SwitchButton selected={activeModule === 'heatMapAnalysis'} onClick={() => handleButtonClick('heatMapAnalysis')}>
                Heatmap Analysis
            </SwitchButton>
            <SwitchButton selected={activeModule === 'openingAnalysis'} onClick={() => handleButtonClick('openingAnalysis')}>
                Opening Analysis
            </SwitchButton>
        </ButtonContainer>

        {/* {renderFlag && (
            <MatchHistory username={username} lastNGames={lastNGames} onDataRequest={handleChildData} />
        )} */}



        {/* Player Information */}
        {renderFlag && parsedMatchObjects && activeModule === 'playerInfo' && (
            // <MatchHistoryDisplay matchHistory={parsedMatchObjects} />
            <PlayerInformation username={username} ></PlayerInformation>
        )}

        {/* Match History per Single Game */}
        {renderFlag && parsedMatchObjects && activeModule === 'matchHistory' && (
            <MatchHistoryDisplay matchHistory={parsedMatchObjects} />
        )}

        {/* Match History per Table format */}
        {renderFlag && parsedMatchObjects && activeModule === 'tableSummary' && (
            <MatchHistoryTable matchHistory={parsedMatchObjects} />
        )}

        {/* Win/Loss rate by certain moves */}
        {renderFlag && parsedMatchObjects && activeModule === 'heatMapAnalysis' && (
            <HeatmapController matchHistory={parsedMatchObjects} />
        )}

        {/* Win/Loss rate per Openings */}
        {renderFlag && parsedMatchObjects && activeModule === 'openingAnalysis' && (
            <OpeningAnalysis matchHistory={parsedMatchObjects} />
        )}




            {/* {!waitingFlag && formData && currentComponent === 'OpeningAnalysis' && (
                <section id="player-opening-analysis">
                    {playerData && playerData.matchHistory && <OpeningAnalysis matchHistory={playerData.matchHistory} />}
                </section>
            )} */}



    </>
  );
};

export default ChessAppSwitcher;
