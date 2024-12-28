import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Title } from '../styles3';
import {TableContainer, Table, TableHeader, TableCell, CellTotal, FirstColumnCell} from '../stylesTable';


//
// Component Styles
//

const CellContents = styled.div
`
    display: inline-flex;
    margin-top: 3px;
    margin-bottom: 3px;
    width: 50%
    text-align: left;

    display: inline-flex;
    text-align: left;
    justify-content: left

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
`
;

const OtherStatsOutsidePawn = (props) => {

    //
    // Props
    //
    const {data} = props;

    //
    // States
    //
    const [dataToRender, setDataToRender] = useState([]);
    const [totalsToRender, setTotalsToRender] = useState([]);
    const [isRender, setIsRender] = useState(false);
  

    //
    // Effects
    //
    useEffect(() => {

        if (data || data !== null || data.length() == 0) {
    
            setDataToRender(data);
            setIsRender(true);

        };
    }, [data]);



    return (
        <Container>

            {isRender && (
                <>
                    <TableContainer>
                        <Table>
                            <thead>
                                <tr>
                                    <TableHeader>You Played</TableHeader>
                                    <TableHeader>They Played</TableHeader>
                                    <TableHeader>Wins</TableHeader>
                                    <TableHeader>Losses</TableHeader>
                                    <TableHeader>Draws</TableHeader>
                                    {/* <TableHeader>Win Rate</TableHeader> */}
                                </tr>
                            </thead>

                            <tbody>
                                {dataToRender.slice(0, -1).map((gameStats, index) => (
                                    <tr key={index}>
                                        <FirstColumnCell>{gameStats.you}</FirstColumnCell>
                                        <TableCell>
                                            <CellContents>{gameStats.them}</CellContents>
                                        </TableCell>
                                        <TableCell>
                                            <CellContents>{gameStats.results.win.length}</CellContents>
                                        </TableCell>
                                        <TableCell>
                                            <CellContents>{gameStats.results.lose.length}</CellContents>
                                        </TableCell>
                                        <TableCell>
                                            <CellContents>{gameStats.results.draw.length}</CellContents>
                                        </TableCell>
                                        {/* <TableCell>
                                            <CellContents>{0}</CellContents>
                                        </TableCell> */}
                                    </tr>
                                ))}
                            </tbody>


                            {/* Totals Row */}
                            {/* {totalsToRender && (
                                
                            <tfoot>
                                {console.log(totalsToRender)}
                                <tr>
                                    <FirstColumnCell><b>Total</b></FirstColumnCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <CellTotal><b>{totalsToRender.results.win}</b></CellTotal>
                                    </TableCell>
                                    <TableCell>
                                        <CellTotal><b>{totalsToRender.results.lose}</b></CellTotal>
                                    </TableCell>
                                    <TableCell>
                                        <CellTotal><b>{totalsToRender.results.draw}</b></CellTotal>
                                    </TableCell>
                                    <TableCell>
                                        <CellTotal><b>0</b></CellTotal>
                                    </TableCell>
                                </tr>
                            </tfoot>
                            )} */}

                        </Table>
                    </TableContainer>
                </>
            )}

        </Container>
    );
};


export default OtherStatsOutsidePawn;