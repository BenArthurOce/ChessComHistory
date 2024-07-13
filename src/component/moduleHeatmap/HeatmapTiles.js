// HeatmapTiles.js
import React from 'react';
import { HeatmapContainer, TileContainer, Row, TurnNumber, MovesContainer, DisplayColumn, DisplayColumnTitle } from '../styles';
// import HeatmapTileMobile from './HeatmapTileMobile';
// import HeatmapTilePC from './HeatmapTilePC';
// import SingleIcon from './SingleIcon';


import SingleIcon from '../SingleIcon';
import HeatmapTilePC from '../moduleHeatmapAnalysis/HeatmapTilePC';
import HeatmapTileMobile from '../moduleHeatmapAnalysis/HeatmapTileMobile';

const HeatmapTiles = ({ data, isMobile, selectedTeam, handleTileClick, singleTileSelected, setSingleTileSelected }) => (
    <HeatmapContainer>
        {!isMobile &&
            ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king', 'castling'].map((piece, index) => (
                <DisplayColumn key={index}>
                    <DisplayColumnTitle>
                        <SingleIcon icon={piece} color={selectedTeam} size={30} />
                    </DisplayColumnTitle>
                    {data[piece].map((moveObj, idx) => (
                        <HeatmapTilePC key={idx} moveObj={moveObj} handleClick={() => handleTileClick(moveObj)} />
                    ))}
                </DisplayColumn>
            ))}
        {isMobile && (
            <TileContainer>
                {Object.entries(data).map(([piece, moves], idx) => (
                    <Row key={idx}>
                        <TurnNumber>{piece}</TurnNumber>
                        <MovesContainer>
                            {/* {moves.map((moveObj, idx) => (
                                <HeatmapTileMobile
                                    key={idx}
                                    moveObj={moveObj}
                                    selected={singleTileSelected === idx}
                                    handleClick={() => setSingleTileSelected(idx)}
                                />
                            ))} */}
                        </MovesContainer>
                    </Row>
                ))}
            </TileContainer>
        )}
    </HeatmapContainer>
);

export default HeatmapTiles;