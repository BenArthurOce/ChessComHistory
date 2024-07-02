import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Import your components and hooks
import useIsMobile from "../../hooks/useIsMobile";
import useHeatmapControllerDataset from "../../hooksSpecific/useHeatmapControllerDataset";
import useHeatmapControllerWinsLossDraw from "../../hooksSpecific/useHeatmapControllerWinsLossDraw";

// Styles
const Container = styled.div
`
  height: 100%;
  overflow-y: scroll;
`
;

const Title = styled.h1
`
  text-align: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
`
;

const TileContainer = styled.div
`
  display: grid;
  gap: 10px;
`
;

const Row = styled.div
`
  display: flex;
  align-items: center;
  gap: 10px;
`
;

const TurnNumber = styled.div
`
  font-weight: bold;
`
;

const MovesContainer = styled.div
`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`
;

const Tile = styled.div
`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
`
;

const HeatmapOverview = (props) => {
  // Props
  const { matchHistory } = props;

  // States
  const [renderFlag, setRenderFlag] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("white");
  const [popupMatchHistory, setPopupMatchHistory] = useState(null);
  const [singleTileSelected, setSingleTileSelected] = useState(null);

  // Hooks
  const hookIsMobile = useIsMobile(true);
  const hookDataSet = useHeatmapControllerDataset(matchHistory);
  const hookWinsLossDrawWHITE = useHeatmapControllerWinsLossDraw(hookDataSet, "white");
  const hookWinsLossDrawBLACK = useHeatmapControllerWinsLossDraw(hookDataSet, "black");

  // Effects
  useEffect(() => {
    if (Object.values(hookWinsLossDrawWHITE).length > 0 && Object.values(hookWinsLossDrawBLACK).length > 0) {
      setRenderFlag(true);
    } else {
      setRenderFlag(false);
    }
  }, [hookWinsLossDrawWHITE, hookWinsLossDrawBLACK]);

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <Container>
      <Title>Heatmap Overview</Title>

      {renderFlag ? (
        <TileContainer>
          {Object.values(hookWinsLossDrawWHITE).map((array, index) => (
            <Row key={`row-${index}`}>
              <TurnNumber>Turn: {index}</TurnNumber>
              <MovesContainer>
                {array.map((item, innerIndex) => (
                  <Tile key={`tile-${index}-${innerIndex}`}>
                    <p>{item.move}</p>
                  </Tile>
                ))}
              </MovesContainer>
            </Row>
          ))}
        </TileContainer>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default HeatmapOverview;
