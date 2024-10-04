import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Title } from "../styles3";

// Components
import SingleIcon from "../SingleIcon";

//
// Component Styles
//
const TableContainer = styled.div
`
    margin-top: 20px;
`
;

const Table = styled.table
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

const TableHeader = styled.th
`
    padding: 5px 2px;
    text-align: center;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
`
;

const TableCell = styled.td
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

const CellContents = styled.div
`
    display: inline-block;
    margin-top: 10px;
    width: 50%
`
;

const CellTotal = styled.div
`
    margin-bottom: 5px;
`
;

const FirstColumnCell = styled(TableCell)
`
    width: 20%
`
;


function MatchHistoryTimeTable(props) {

    //
    // Props
    //
    const {matchHistory} = props

    //
    // States
    //
    const [stats, setStats] = useState(null);

    //
    // Effects
    //
    useEffect(() => {
        const stats = calculateStats(matchHistory);
        setStats(stats);

        const results = []
        matchHistory.forEach(match => {
            results.push(match.time.class)
        });

        const mySet = new Set(results)
        console.log(mySet)

    }, [matchHistory]);



    const filterMatches = (matchHistory, userPlayed, winLoseDraw, startMinutes, endMinutes) => {
        return matchHistory.filter(({ results, general, time }) => {
            return (
                results.userPlayed === userPlayed &&
                results.userResult === winLoseDraw &&
                general.timeMinutes > startMinutes &&
                general.timeMinutes <= endMinutes
            );
        });
    };



    const calculateStats = (matchHistory) => { 
        const stats = {

            t_12am_to_4am : {
                wins: {
                    white: filterMatches(matchHistory, "white", "win", 0, 240),
                    black: filterMatches(matchHistory, "black", "win", 0, 240)
                },
                losses: {
                    white: filterMatches(matchHistory, "white", "lose", 0, 240),
                    black: filterMatches(matchHistory, "black", "lose", 0, 240)
                },
                draws: {
                    white: filterMatches(matchHistory, "white", "draw", 0, 240),
                    black: filterMatches(matchHistory, "black", "draw", 0, 240)
                }
            }
            ,
            t_4am_to_8am : {
                wins: {
                    white: filterMatches(matchHistory, "white", "win", 240, 480),
                    black: filterMatches(matchHistory, "black", "win", 240, 480)
                },
                losses: {
                    white: filterMatches(matchHistory, "white", "lose", 240, 480),
                    black: filterMatches(matchHistory, "black", "lose", 240, 480)
                },
                draws: {
                    white: filterMatches(matchHistory, "white", "draw", 240, 480),
                    black: filterMatches(matchHistory, "black", "draw", 240, 480)
                }
            }
            ,
            t_8am_to_12pm : {
                wins: {
                    white: filterMatches(matchHistory, "white", "win", 480, 720),
                    black: filterMatches(matchHistory, "black", "win", 480, 720)
                },
                losses: {
                    white: filterMatches(matchHistory, "white", "lose", 480, 720),
                    black: filterMatches(matchHistory, "black", "lose", 480, 720)
                },
                draws: {
                    white: filterMatches(matchHistory, "white", "draw", 480, 720),
                    black: filterMatches(matchHistory, "black", "draw", 480, 720)
                }
            }
            ,
            t_12pm_to_4pm : {
                wins: {
                    white: filterMatches(matchHistory, "white", "win", 720, 960),
                    black: filterMatches(matchHistory, "black", "win", 720, 960)
                },
                losses: {
                    white: filterMatches(matchHistory, "white", "lose", 720, 960),
                    black: filterMatches(matchHistory, "black", "lose", 720, 960)
                },
                draws: {
                    white: filterMatches(matchHistory, "white", "draw", 720, 960),
                    black: filterMatches(matchHistory, "black", "draw", 720, 960)
                }
            }
            ,
            t_4pm_to_8pm : {
                wins: {
                    white: filterMatches(matchHistory, "white", "win", 960, 1200),
                    black: filterMatches(matchHistory, "black", "win", 960, 1200)
                },
                losses: {
                    white: filterMatches(matchHistory, "white", "lose", 960, 1200),
                    black: filterMatches(matchHistory, "black", "lose", 960, 1200)
                },
                draws: {
                    white: filterMatches(matchHistory, "white", "draw", 960, 1200),
                    black: filterMatches(matchHistory, "black", "draw", 960, 1200)
                }
            }
            ,
            t_8pm_to_12am : {
                wins: {
                    white: filterMatches(matchHistory, "white", "win", 1200, 1440),
                    black: filterMatches(matchHistory, "black", "win", 1200, 1440)
                },
                losses: {
                    white: filterMatches(matchHistory, "white", "lose", 1200, 1440),
                    black: filterMatches(matchHistory, "black", "lose", 1200, 1440)
                },
                draws: {
                    white: filterMatches(matchHistory, "white", "draw", 1200, 1440),
                    black: filterMatches(matchHistory, "black", "draw", 1200, 1440)
                }
            }
        }

        stats.total = {
            wins: {
                white: stats.t_12am_to_4am.wins.white.length + stats.t_4am_to_8am.wins.white.length + stats.t_8am_to_12pm.wins.white.length + stats.t_12pm_to_4pm.wins.white.length + stats.t_4pm_to_8pm.wins.white.length + stats.t_8pm_to_12am.wins.white.length,
                black: stats.t_12am_to_4am.wins.black.length + stats.t_4am_to_8am.wins.black.length + stats.t_8am_to_12pm.wins.black.length + stats.t_12pm_to_4pm.wins.black.length + stats.t_4pm_to_8pm.wins.black.length + stats.t_8pm_to_12am.wins.black.length
            },
            losses: {
                white: stats.t_12am_to_4am.losses.white.length + stats.t_4am_to_8am.losses.white.length + stats.t_8am_to_12pm.losses.white.length + stats.t_12pm_to_4pm.losses.white.length + stats.t_4pm_to_8pm.losses.white.length + stats.t_8pm_to_12am.losses.white.length,
                black: stats.t_12am_to_4am.losses.black.length + stats.t_4am_to_8am.losses.black.length + stats.t_8am_to_12pm.losses.black.length + stats.t_12pm_to_4pm.losses.black.length + stats.t_4pm_to_8pm.losses.black.length + stats.t_8pm_to_12am.losses.black.length
            },
            draws: {
                white: stats.t_12am_to_4am.draws.white.length + stats.t_4am_to_8am.draws.white.length + stats.t_8am_to_12pm.draws.white.length + stats.t_12pm_to_4pm.draws.white.length + stats.t_4pm_to_8pm.draws.white.length + stats.t_8pm_to_12am.draws.white.length,
                black: stats.t_12am_to_4am.draws.black.length + stats.t_4am_to_8am.draws.black.length + stats.t_8am_to_12pm.draws.black.length + stats.t_12pm_to_4pm.draws.black.length + stats.t_4pm_to_8pm.draws.black.length + stats.t_8pm_to_12am.draws.black.length
            }
        };
        return stats
    };

    // Function to render pawn icon with associated number of wins/losses/draws/total
    // see SingleIcon.js 
    const renderPawnIcon = (iconType, color, count) => (
        <CellContents>
            <SingleIcon icon={iconType} color={color} size={20} />
            <p>{count}</p>
        </CellContents>
    );

    return (
        <Container>
            <Title>Winrate by Time of Day</Title>
            {stats && (
                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Time of Day</TableHeader>
                                <TableHeader>Wins</TableHeader>
                                <TableHeader>Losses</TableHeader>
                                <TableHeader>Draws</TableHeader>
                                <TableHeader>Total</TableHeader>
                            </tr>
                        </thead>
                        <tbody>

                            {/* 12am to 4am */}
                            <tr>
                                <FirstColumnCell>12am to 4am</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_12am_to_4am.wins.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_12am_to_4am.wins.black.length)}
                                    <CellTotal> <b>Total: {stats.t_12am_to_4am.wins.white.length + stats.t_12am_to_4am.wins.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_12am_to_4am.losses.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_12am_to_4am.losses.black.length)}
                                    <CellTotal> <b>Total: {stats.t_12am_to_4am.losses.white.length + stats.t_12am_to_4am.losses.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_12am_to_4am.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_12am_to_4am.draws.black.length)}
                                    <CellTotal> <b>Total: {stats.t_12am_to_4am.draws.white.length + stats.t_12am_to_4am.draws.black.length}</b> </CellTotal>
                                </TableCell>
                                
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_12am_to_4am.wins.white.length + stats.t_12am_to_4am.losses.white.length + stats.t_12am_to_4am.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_12am_to_4am.wins.black.length + stats.t_12am_to_4am.losses.black.length + stats.t_12am_to_4am.draws.black.length)}
                                    <CellTotal>
                                        <b>Total: {stats.t_12am_to_4am.wins.white.length + stats.t_12am_to_4am.losses.white.length + stats.t_12am_to_4am.draws.white.length +
                                                   stats.t_12am_to_4am.wins.black.length + stats.t_12am_to_4am.losses.black.length + stats.t_12am_to_4am.draws.black.length}
                                        </b>
                                    </CellTotal>
                                </TableCell>
                            </tr>


                            {/* 4am to 8am */}
                            <tr>
                                <FirstColumnCell>4am to 8am</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_4am_to_8am.wins.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_4am_to_8am.wins.black.length)}
                                    <CellTotal> <b>Total: {stats.t_4am_to_8am.wins.white.length + stats.t_4am_to_8am.wins.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_4am_to_8am.losses.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_4am_to_8am.losses.black.length)}
                                    <CellTotal> <b>Total: {stats.t_4am_to_8am.losses.white.length + stats.t_4am_to_8am.losses.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_4am_to_8am.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_4am_to_8am.draws.black.length)}
                                    <CellTotal> <b>Total: {stats.t_4am_to_8am.draws.white.length + stats.t_4am_to_8am.draws.black.length}</b> </CellTotal>
                                </TableCell>
                                
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_4am_to_8am.wins.white.length + stats.t_4am_to_8am.losses.white.length + stats.t_4am_to_8am.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_4am_to_8am.wins.black.length + stats.t_4am_to_8am.losses.black.length + stats.t_4am_to_8am.draws.black.length)}
                                    <CellTotal>
                                        <b>Total: {stats.t_4am_to_8am.wins.white.length + stats.t_4am_to_8am.losses.white.length + stats.t_4am_to_8am.draws.white.length +
                                                   stats.t_4am_to_8am.wins.black.length + stats.t_4am_to_8am.losses.black.length + stats.t_4am_to_8am.draws.black.length}
                                        </b>
                                    </CellTotal>
                                </TableCell>
                            </tr>


                            {/* 8am to 12pm */}
                            <tr>
                                <FirstColumnCell>8am to 12pm</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_8am_to_12pm.wins.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_8am_to_12pm.wins.black.length)}
                                    <CellTotal> <b>Total: {stats.t_8am_to_12pm.wins.white.length + stats.t_8am_to_12pm.wins.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_8am_to_12pm.losses.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_8am_to_12pm.losses.black.length)}
                                    <CellTotal> <b>Total: {stats.t_8am_to_12pm.losses.white.length + stats.t_8am_to_12pm.losses.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_8am_to_12pm.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_8am_to_12pm.draws.black.length)}
                                    <CellTotal> <b>Total: {stats.t_8am_to_12pm.draws.white.length + stats.t_8am_to_12pm.draws.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_8am_to_12pm.wins.white.length + stats.t_8am_to_12pm.losses.white.length + stats.t_8am_to_12pm.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_8am_to_12pm.wins.black.length + stats.t_8am_to_12pm.losses.black.length + stats.t_8am_to_12pm.draws.black.length)}
                                    <CellTotal>
                                        <b>Total: {stats.t_8am_to_12pm.wins.white.length + stats.t_8am_to_12pm.losses.white.length + stats.t_8am_to_12pm.draws.white.length +
                                                   stats.t_8am_to_12pm.wins.black.length + stats.t_8am_to_12pm.losses.black.length + stats.t_8am_to_12pm.draws.black.length}
                                        </b>
                                    </CellTotal>
                                </TableCell>
                            </tr>

                            {/* 12pm to 4pm */}
                            <tr>
                                <FirstColumnCell>12pm to 4pm</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_12pm_to_4pm.wins.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_12pm_to_4pm.wins.black.length)}
                                    <CellTotal> <b>Total: {stats.t_12pm_to_4pm.wins.white.length + stats.t_12pm_to_4pm.wins.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_12pm_to_4pm.losses.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_12pm_to_4pm.losses.black.length)}
                                    <CellTotal> <b>Total: {stats.t_12pm_to_4pm.losses.white.length + stats.t_12pm_to_4pm.losses.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_12pm_to_4pm.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_12pm_to_4pm.draws.black.length)}
                                    <CellTotal> <b>Total: {stats.t_12pm_to_4pm.draws.white.length + stats.t_12pm_to_4pm.draws.black.length}</b> </CellTotal>
                                </TableCell>


                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_12pm_to_4pm.wins.white.length + stats.t_12pm_to_4pm.losses.white.length + stats.t_12pm_to_4pm.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_12pm_to_4pm.wins.black.length + stats.t_12pm_to_4pm.losses.black.length + stats.t_12pm_to_4pm.draws.black.length)}
                                    <CellTotal>
                                        <b>Total: {stats.t_12pm_to_4pm.wins.white.length + stats.t_12pm_to_4pm.losses.white.length + stats.t_12pm_to_4pm.draws.white.length +
                                                   stats.t_12pm_to_4pm.wins.black.length + stats.t_12pm_to_4pm.losses.black.length + stats.t_12pm_to_4pm.draws.black.length}
                                        </b>
                                    </CellTotal>
                                </TableCell>
                            </tr>

                            {/* 4pm to 8pm */}
                            <tr>
                                <FirstColumnCell>4pm to 8pm</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_4pm_to_8pm.wins.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_4pm_to_8pm.wins.black.length)}
                                    <CellTotal> <b>Total: {stats.t_4pm_to_8pm.wins.white.length + stats.t_4pm_to_8pm.wins.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_4pm_to_8pm.losses.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_4pm_to_8pm.losses.black.length)}
                                    <CellTotal> <b>Total: {stats.t_4pm_to_8pm.losses.white.length + stats.t_4pm_to_8pm.losses.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_4pm_to_8pm.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_4pm_to_8pm.draws.black.length)}
                                    <CellTotal> <b>Total: {stats.t_4pm_to_8pm.draws.white.length + stats.t_4pm_to_8pm.draws.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_4pm_to_8pm.wins.white.length + stats.t_4pm_to_8pm.losses.white.length + stats.t_4pm_to_8pm.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_4pm_to_8pm.wins.black.length + stats.t_4pm_to_8pm.losses.black.length + stats.t_4pm_to_8pm.draws.black.length)}
                                    <CellTotal>
                                        <b>Total: {stats.t_4pm_to_8pm.wins.white.length + stats.t_4pm_to_8pm.losses.white.length + stats.t_4pm_to_8pm.draws.white.length +
                                                   stats.t_4pm_to_8pm.wins.black.length + stats.t_4pm_to_8pm.losses.black.length + stats.t_4pm_to_8pm.draws.black.length}
                                        </b>
                                    </CellTotal>
                                </TableCell>
                            </tr>

                            {/* 8pm to 12am */}
                            <tr>
                                <FirstColumnCell>8pm to 12am</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_8pm_to_12am.wins.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_8pm_to_12am.wins.black.length)}
                                    <CellTotal> <b>Total: {stats.t_8pm_to_12am.wins.white.length + stats.t_8pm_to_12am.wins.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_8pm_to_12am.losses.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_8pm_to_12am.losses.black.length)}
                                    <CellTotal> <b>Total: {stats.t_8pm_to_12am.losses.white.length + stats.t_8pm_to_12am.losses.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_8pm_to_12am.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_8pm_to_12am.draws.black.length)}
                                    <CellTotal> <b>Total: {stats.t_8pm_to_12am.draws.white.length + stats.t_8pm_to_12am.draws.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.t_8pm_to_12am.wins.white.length + stats.t_8pm_to_12am.losses.white.length + stats.t_8pm_to_12am.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.t_8pm_to_12am.wins.black.length + stats.t_8pm_to_12am.losses.black.length + stats.t_8pm_to_12am.draws.black.length)}
                                    <CellTotal>
                                        <b>Total: {stats.t_8pm_to_12am.wins.white.length + stats.t_8pm_to_12am.losses.white.length + stats.t_8pm_to_12am.draws.white.length +
                                                   stats.t_8pm_to_12am.wins.black.length + stats.t_8pm_to_12am.losses.black.length + stats.t_8pm_to_12am.draws.black.length}
                                        </b>
                                    </CellTotal>
                                </TableCell>
                            </tr>

                            {/* Total */}
                            <tr>
                                <FirstColumnCell>Total</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.total.wins.white)}
                                    {renderPawnIcon("pawn", "black", stats.total.wins.black)}
                                    <CellTotal> <b>Total: {stats.total.wins.white + stats.total.wins.black}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.total.losses.white)}
                                    {renderPawnIcon("pawn", "black", stats.total.losses.black)}
                                    <CellTotal> <b>Total: {stats.total.losses.white + stats.total.losses.black}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.total.draws.white)}
                                    {renderPawnIcon("pawn", "black", stats.total.draws.black)}
                                    <CellTotal> <b>Total: {stats.total.draws.white + stats.total.draws.black}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.total.wins.white + stats.total.losses.white + stats.total.draws.white)}
                                    {renderPawnIcon("pawn", "black", stats.total.wins.black + stats.total.losses.black + stats.total.draws.black)}
                                    <CellTotal>
                                        <b>Total: {stats.total.wins.white + stats.total.losses.white + stats.total.draws.white +
                                                   stats.total.wins.black + stats.total.losses.black + stats.total.draws.black}
                                        </b>
                                    </CellTotal>
                                </TableCell>
                            </tr>
                        </tbody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default MatchHistoryTimeTable;