/*
 * This contains the modules of each of the functions of the chess app
 * swapping the "activeModule" will change what appears in the app
 * 
 */


import styled from 'styled-components';
import { Container, Title, Inner } from './styles3';

// Components
import PlayerInformation from './modulePlayerInformation/PlayerInformation';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import MatchHistoryTableMaster from './moduleMatchHistoryTable/MatchHistoryTableMaster';
import HeatmapMaster from './moduleHeatmap/HeatmapMaster';
import OpeningAnalysisMaster from './moduleOpeningAnalysis/OpeningAnalysisMaster';
import OtherStatsMaster from './moduleOtherStats/OtherStatsMaster';
// import Debugging from './Debugging';



const ChessAppSwitcher2 = ({builtGameData, activeModule}) => {

    const handleSwitchButtonClick = () => {
        console.log("==handleSwitchButtonClick==");
        console.log("builtGameData", builtGameData);
        console.log("activeModule", activeModule);
    };


    return (
        <Container>
                
            {builtGameData && (
                <>
                <h1> Chess App Switcher2 Component</h1>
                <p> Active Module {activeModule}</p>
                </>
            )}


                <Inner>
                    {/* {matchHistory && activeModule === 'playerInfo' && (
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

                    {/* {matchHistory && activeModule === 'debugging' && (
                        <Debugging matchHistory={builtGameData} />
                    )} */}

                </Inner>

            <button onClick={handleSwitchButtonClick}>View AppSwitcher2 Information</button>

        </Container>
    );
};

export default ChessAppSwitcher2;