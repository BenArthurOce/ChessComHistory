import styled from 'styled-components';


/* Full-screen container with padding and automatic overflow handling. */
export const Container = styled.div
`
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
`
;


/* Center-aligned heading with bottom padding and border-bottom. */
export const Title = styled.h1
`
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
`
;

export const Inner = styled.div
`
    flex: 1;
    padding: 5px;
    overflow-y: auto;
`
;


/*  */
export const FlexRow = styled.div
`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`
;