import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import InputControls from './InputControls';
import HeatmapTiles from './HeatmapTiles';
import PopupOverlay from '../Overlay';
import useIsMobile from '../../hooks/useIsMobile';
import useHeatmapControllerDataset from '../../hooksSpecific/useHeatmapControllerDataset';
import useHeatmapControllerSortData from '../../hooksSpecific/useHeatmapControllerSortData';
import useHeatmapControllerWinsLossDraw from '../../hooksSpecific/useHeatmapControllerWinsLossDraw';
// import { useInputState } from './hooks/useInputState';
// import { usePopup } from './hooks/usePopup';

import { useInputState } from '../../hooksSpecific/useInputState';

import { usePopup } from '../../hooksSpecific/usePopup';



const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
`;

const Title = styled.h1`
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
`;

const HeatmapMasterTwo = (props) => {
    const { matchHistory } = props;

    const [start, handleStartChange, startInc, startDec] = useInputState(0);
    const [end, handleEndChange, endInc, endDec] = useInputState(5);
    const [selectedTeam, setSelectedTeam] = useState('white');
    const [firstMove, setFirstMove] = useState('1.e4');
    const [popupMatchHistory, openPopup, closePopup] = usePopup();
    const [singleTileSelected, setSingleTileSelected] = useState(null);
    const [renderFlag, setRenderFlag] = useState(false);

    const isMobile = useIsMobile();
    const dataSet = useHeatmapControllerDataset(matchHistory);
    const sortedData = useHeatmapControllerSortData(dataSet, start, end, selectedTeam, firstMove);
    const winsLossDraw = useHeatmapControllerWinsLossDraw(dataSet, selectedTeam, firstMove);

    useEffect(() => {
        setRenderFlag(Object.values(winsLossDraw).length > 0);
    }, [winsLossDraw]);

    const handleTeamChange = (event) => setSelectedTeam(event.target.value);
    const handleFirstMoveChange = (event) => setFirstMove(event.target.value);

    const handleTileClick = (tile) => {
        const matchIds = tile.matches.map((entry) => entry.id);
        const result = matchHistory.filter((obj) => matchIds.includes(obj.general.id));
        openPopup(result);
    };

    return (
        <Container>
            {renderFlag ? (
                <>
                    <Title>Heatmap Analysis</Title>
                    <InputControls
                        start={start}
                        end={end}
                        selectedTeam={selectedTeam}
                        firstMove={firstMove}
                        onStartChange={handleStartChange}
                        onEndChange={handleEndChange}
                        onTeamChange={handleTeamChange}
                        onFirstMoveChange={handleFirstMoveChange}
                        onStartInc={startInc}
                        onStartDec={startDec}
                        onEndInc={endInc}
                        onEndDec={endDec}
                    />
                    <HeatmapTiles
                        data={sortedData}
                        isMobile={isMobile}
                        selectedTeam={selectedTeam}
                        handleTileClick={handleTileClick}
                        singleTileSelected={singleTileSelected}
                        setSingleTileSelected={setSingleTileSelected}
                    />
                    {popupMatchHistory && <PopupOverlay data={popupMatchHistory} onClose={closePopup} />}
                </>
            ) : (
                <p>Loading data...</p>
            )}
        </Container>
    );
};

export default HeatmapMasterTwo;
