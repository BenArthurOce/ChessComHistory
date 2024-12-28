import styled from 'styled-components';


export const TableContainer = styled.div
`
    margin-top: 20px;
`
;

export const Table = styled.table
`
    width: 100%;
    border-collapse: collapse;
    // background-color: #fff;
    background-color: #ffffff59;
    
    border-radius: 8px;
    // overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        font-size: 13px;
    }

    border: 1px solid #ddd;
`
;

export const TableHeader = styled.th
`
    padding: 5px 2px;
    text-align: center;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
`
;

export const TableCell = styled.td
`
    padding: 5px 2px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    width: 80px;
    white-space: nowrap;
    text-overflow: ellipsis;
`
;

export const CellContents = styled.div
`
    display: inline-block;
    margin-top: 10px;
    width: 50%
`
;

export const CellTotal = styled.div
`
    margin-bottom: 5px;
`
;

export const FirstColumnCell = styled(TableCell)
`
    width: 20%
`
;