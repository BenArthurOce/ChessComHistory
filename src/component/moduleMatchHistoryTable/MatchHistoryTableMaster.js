import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Title } from '../styles3';

// Components
import MatchHistoryTable from './MatchHistoryTable';
import MatchHistoryTimeTable from './MatchHistoryTimeTable';


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


const MatchHistoryTableMaster = (props) => {

    //
    // Props
    //
    const {matchHistory} = props;

    //
    // States
    //
    const [activeTab, setActiveTab] = useState('byMode');


  
    return (
        <Container>
            <Title>Table Summary</Title>

             <TabContainer>
                <TabButton active={activeTab === 'byMode'} onClick={() => setActiveTab('byMode')}>
                    By Time Class
                </TabButton>

                <TabButton active={activeTab === 'byTime'} onClick={() => setActiveTab('byTime')}>
                    By Time of Day
                </TabButton>
            </TabContainer>


            <Content>
                {activeTab === 'byMode' && (
                    <MatchHistoryTable matchHistory={matchHistory} />
                )}

                {activeTab === 'byTime' && (
                    <MatchHistoryTimeTable matchHistory={matchHistory} />
                )}
            </Content> 

        </Container>
    );
};

export default MatchHistoryTableMaster;