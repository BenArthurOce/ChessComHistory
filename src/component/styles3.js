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



export const ContainerUserInput = styled.div
`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 900;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
;


/*  */
// export const FlexRow = styled.div
// `
//     display: flex;
//     flex-wrap: wrap;
//     gap: 10px;
// `
// ;


export const FlexRow = styled.div
`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #f0f0f0;
`
;



export const FlexLabel = styled.label
`
    color: #333;
    margin-bottom: 5px;
    font-weight: bold;
    margin-right: 10px;
    flex: 1;
`
;


export const FlexInput = styled.input
`
    flex: 2;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`
;

export const FlexDropDown = styled.select
`
    flex: 2;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`
;