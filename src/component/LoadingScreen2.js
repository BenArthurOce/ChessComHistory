import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes
`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`
;

const LoadingContainer = styled.div
`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`
;

const Spinner = styled.div
`
    border: 8px solid #f3f3f3;
    border-top: 8px solid #008cba;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: ${spin} 2s linear infinite;
`
;

const LoadingScreen2 = ({ progress, total, gamesremaining }) => (
    <LoadingContainer>
        <Spinner />
        <p>{`${progress}/${total} endpoints completed`}</p>
        <p>{`${gamesremaining} games remaining`}</p>
    </LoadingContainer>
);

export default LoadingScreen2;