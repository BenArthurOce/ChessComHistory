// styles.js
import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
`;


export const Inner = styled.div`
  height: 100%;
  border: 1px solid #ddd;
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
`;

export const FlexRow = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
`;

export const NumericIncDecContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
`;

export const NumberInput = styled.input`
    width: 50px;
    text-align: center;
`;

export const IncDecArrowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
`;

export const IncDecArrow = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

export const DropDownBox = styled.select`
    padding: 5px;
`;

export const HeatmapContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const DisplayColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
`;

export const DisplayColumnTitle = styled.h2`
    margin-bottom: 10px;
`;

export const TileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const TurnNumber = styled.div`
    font-weight: bold;
`;

export const MovesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
