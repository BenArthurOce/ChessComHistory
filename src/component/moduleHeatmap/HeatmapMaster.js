import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Title } from '../styles3';


// Components
import HeatmapSubByPiece from './HeatmapSubByPiece';
import HeatmapSubByTurn from './HeatmapSubByTurn';

// Custom Hooks
import useHeatMasterData from '../../hooksSpecific/useHeatMasterData';

//
// Component Styles
//
const TabContainer = styled.div
`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
;

const TabButton = styled.button
`
  flex: 1;
  padding: 10px;
  cursor: pointer;
  background-color: ${props => (props.active ? '#ddd' : '#fff')};
  border: 1px solid #ddd;
  border-bottom: ${props => (props.active ? 'none' : '1px solid #ddd')};
  outline: none;

  &:hover {
    background-color: #eee;
  }
`
;

const Content = styled.div
`
  padding: 20px;
`
;


const HeatmapMaster = (props) => {

    //
    // Props
    //
    const {matchHistory} = props;

    //
    // States
    //
    const [activeTab, setActiveTab] = useState('byPiece');


    //
    // Hooks
    //
    const hookMasterData = useHeatMasterData(matchHistory)
    

    //
    // Effects
    //
    useEffect(() => {
        // if (!hookDataSet || hookDataSet.length === 0) { return};
        // console.log(hookDataSet);

        if (!hookMasterData || hookMasterData.length === 0) { return};
        console.log(hookMasterData);      

    }, [hookMasterData]);

    //
    // Helpers
    //






    return (
        <Container>
            <Title>Heatmap Master</Title>

            <TabContainer>
                <TabButton active={activeTab === 'byPiece'} onClick={() => setActiveTab('byPiece')}>
                    By Piece
                </TabButton>

                <TabButton active={activeTab === 'byTurn'} onClick={() => setActiveTab('byTurn')}>
                    By Turn
                </TabButton>
            </TabContainer>


            <Content>
                {activeTab === 'byPiece' && (
                    <HeatmapSubByPiece turnData={hookMasterData} />
                )}

                {activeTab === 'byTurn' && (
                    <HeatmapSubByTurn turnData={hookMasterData} />
                )}
            </Content>

        </Container>
    );
};

export default HeatmapMaster;