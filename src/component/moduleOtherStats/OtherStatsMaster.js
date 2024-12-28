import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Title } from '../styles3';

// Components
import OtherStatsFianchetto from './OtherStatsFianchetto';
import OtherStatsCastling from './OtherStatsCastling';
import OtherStatsOutsidePawn from './OtherStatsOutsidePawn';

// Custom Hooks
import useOtherStatsFianchetto from '../../hooksSpecific/useOtherStatsFianchetto';
import useOtherStatsCastling from '../../hooksSpecific/useOtherStatsCastling';
import useOtherStatsOutsidePawn from '../../hooksSpecific/useOtherStatsOutsidePawn';


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


const OtherStatsMaster = (props) => {

    //
    // Props
    //
    const {matchHistory} = props;

    //
    // States
    //
    const [activeTab, setActiveTab] = useState('byFianchetto');
    const [isRender, setIsRender] = useState(false);

    //
    // Hooks
    //
    const hookUseOtherStatsFianchetto = useOtherStatsFianchetto(matchHistory);
    const hookUseOtherStatsCastling = useOtherStatsCastling(matchHistory)
    const hookUseOtherStatsOutsidePawn = useOtherStatsOutsidePawn(matchHistory);

    //
    // Effects
    //
    useEffect(() => {

        if (matchHistory && matchHistory !== null) {
            setIsRender(true);
        };
    }, [matchHistory]);


    return (
        <Container>
            <Title>Other Stats</Title>

            <p>Still in development</p>

            <TabContainer>
                <TabButton active={activeTab === 'byFianchetto'} onClick={() => setActiveTab('byFianchetto')}>
                    By Fianchetto
                </TabButton>

                <TabButton active={activeTab === 'byCastling'} onClick={() => setActiveTab('byCastling')}>
                    By Castling
                </TabButton>

                <TabButton active={activeTab === 'byOutsidePawn'} onClick={() => setActiveTab('byOutsidePawn')}>
                    By Outside Pawn
                </TabButton>

            </TabContainer>


            <Content>
                {activeTab === 'byFianchetto' && (
                    <OtherStatsFianchetto data={hookUseOtherStatsFianchetto}/>
                )}

                {activeTab === 'byCastling' && (
                    <OtherStatsCastling data={hookUseOtherStatsCastling} />
                )}

                {activeTab === 'byOutsidePawn' && (
                    <OtherStatsOutsidePawn data={hookUseOtherStatsOutsidePawn} />
                )}
            </Content>

        </Container>
    );
};

export default OtherStatsMaster;