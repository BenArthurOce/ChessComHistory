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


function MatchHistoryTable(props) {

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
    }, [matchHistory]);

    //
    // Helpers
    //
    const calculateStats = (matchHistory) => {
        const stats = {
            daily: {
                wins: {
                    white: filterMatches(matchHistory, "white", "win", "daily"),
                    black: filterMatches(matchHistory, "black", "win", "daily")
                },
                losses: {
                    white: filterMatches(matchHistory, "white", "lose", "daily"),
                    black: filterMatches(matchHistory, "black", "lose", "daily")
                },
                draws: {
                    white: filterMatches(matchHistory, "white", "draw", "daily"),
                    black: filterMatches(matchHistory, "black", "draw", "daily")
                }
            },
            rapid: {
                wins: {
                    white: filterMatches(matchHistory, "white", "win", "rapid"),
                    black: filterMatches(matchHistory, "black", "win", "rapid")
                },
                losses: {
                    white: filterMatches(matchHistory, "white", "lose", "rapid"),
                    black: filterMatches(matchHistory, "black", "lose", "rapid")
                },
                draws: {
                    white: filterMatches(matchHistory, "white", "draw", "rapid"),
                    black: filterMatches(matchHistory, "black", "draw", "rapid")
                }
            },
            blitz: {
                wins: {
                    white: filterMatches(matchHistory, "white", "win", "blitz"),
                    black: filterMatches(matchHistory, "black", "win", "blitz")
                },
                losses: {
                    white: filterMatches(matchHistory, "white", "lose", "blitz"),
                    black: filterMatches(matchHistory, "black", "lose", "blitz")
                },
                draws: {
                    white: filterMatches(matchHistory, "white", "draw", "blitz"),
                    black: filterMatches(matchHistory, "black", "draw", "blitz")
                }
            },
            bullet: {
                wins: {
                    white: filterMatches(matchHistory, "white", "win", "bullet"),
                    black: filterMatches(matchHistory, "black", "win", "bullet")
                },
                losses: {
                    white: filterMatches(matchHistory, "white", "lose", "bullet"),
                    black: filterMatches(matchHistory, "black", "lose", "bullet")
                },
                draws: {
                    white: filterMatches(matchHistory, "white", "draw", "bullet"),
                    black: filterMatches(matchHistory, "black", "draw", "bullet")
                }
            }
        };

        // Calculate totals
        stats.total = {
            wins: {
                white: stats.daily.wins.white.length + stats.rapid.wins.white.length + stats.blitz.wins.white.length + stats.bullet.wins.white.length,
                black: stats.daily.wins.black.length + stats.rapid.wins.black.length + stats.blitz.wins.black.length + stats.bullet.wins.black.length
            },
            losses: {
                white: stats.daily.losses.white.length + stats.rapid.losses.white.length + stats.blitz.losses.white.length + stats.bullet.losses.white.length,
                black: stats.daily.losses.black.length + stats.rapid.losses.black.length + stats.blitz.losses.black.length + stats.bullet.losses.black.length
            },
            draws: {
                white: stats.daily.draws.white.length + stats.rapid.draws.white.length + stats.blitz.draws.white.length + stats.bullet.draws.white.length,
                black: stats.daily.draws.black.length + stats.rapid.draws.black.length + stats.blitz.draws.black.length + stats.bullet.draws.black.length
            }
        };

        return stats;
    };

    const filterMatches = (matchHistory, userPlayed, winLoseDraw, timeClass) => {
        return matchHistory.filter(({ results, time }) => {
            return (
                results.userPlayed === userPlayed &&
                results.userResult === winLoseDraw &&
                time.class === timeClass
            );
        });
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
            <Title>Match History Summary</Title>
            {stats && (
                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Time Control</TableHeader>
                                <TableHeader>Wins</TableHeader>
                                <TableHeader>Losses</TableHeader>
                                <TableHeader>Draws</TableHeader>
                                <TableHeader>Total</TableHeader>
                            </tr>
                        </thead>
                        <tbody>

                            {/* Daily */}
                            <tr>
                                <FirstColumnCell>Daily</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.daily.wins.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.daily.wins.black.length)}
                                    <CellTotal> <b>Total: {stats.daily.wins.white.length + stats.daily.wins.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.daily.losses.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.daily.losses.black.length)}
                                    <CellTotal> <b>Total: {stats.daily.losses.white.length + stats.daily.losses.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.daily.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.daily.draws.black.length)}
                                    <CellTotal> <b>Total: {stats.daily.draws.white.length + stats.daily.draws.black.length}</b> </CellTotal>
                                </TableCell>
                                
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.daily.wins.white.length + stats.daily.losses.white.length + stats.daily.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.daily.wins.black.length + stats.daily.losses.black.length + stats.daily.draws.black.length)}
                                    <CellTotal>
                                        <b>Total: {stats.daily.wins.white.length + stats.daily.losses.white.length + stats.daily.draws.white.length +
                                                   stats.daily.wins.black.length + stats.daily.losses.black.length + stats.daily.draws.black.length}
                                        </b>
                                    </CellTotal>
                                </TableCell>
                            </tr>

                            {/* Rapid */}
                            <tr>
                                <FirstColumnCell>Rapid</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.rapid.wins.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.rapid.wins.black.length)}
                                    <CellTotal> <b>Total: {stats.rapid.wins.white.length + stats.rapid.wins.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.rapid.losses.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.rapid.losses.black.length)}
                                    <CellTotal> <b>Total: {stats.rapid.losses.white.length + stats.rapid.losses.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.rapid.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.rapid.draws.black.length)}
                                    <CellTotal> <b>Total: {stats.rapid.draws.white.length + stats.rapid.draws.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.rapid.wins.white.length + stats.rapid.losses.white.length + stats.rapid.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.rapid.wins.black.length + stats.rapid.losses.black.length + stats.rapid.draws.black.length)}
                                    <CellTotal>
                                        <b>Total: {stats.rapid.wins.white.length + stats.rapid.losses.white.length + stats.rapid.draws.white.length +
                                                   stats.rapid.wins.black.length + stats.rapid.losses.black.length + stats.rapid.draws.black.length}
                                        </b>
                                    </CellTotal>
                                </TableCell>
                            </tr>

                            {/* Blitz */}
                            <tr>
                                <FirstColumnCell>Blitz</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.blitz.wins.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.blitz.wins.black.length)}
                                    <CellTotal> <b>Total: {stats.blitz.wins.white.length + stats.blitz.wins.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.blitz.losses.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.blitz.losses.black.length)}
                                    <CellTotal> <b>Total: {stats.blitz.losses.white.length + stats.blitz.losses.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.blitz.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.blitz.draws.black.length)}
                                    <CellTotal> <b>Total: {stats.blitz.draws.white.length + stats.blitz.draws.black.length}</b> </CellTotal>
                                </TableCell>


                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.blitz.wins.white.length + stats.blitz.losses.white.length + stats.blitz.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.blitz.wins.black.length + stats.blitz.losses.black.length + stats.blitz.draws.black.length)}
                                    <CellTotal>
                                        <b>Total: {stats.blitz.wins.white.length + stats.blitz.losses.white.length + stats.blitz.draws.white.length +
                                                   stats.blitz.wins.black.length + stats.blitz.losses.black.length + stats.blitz.draws.black.length}
                                        </b>
                                    </CellTotal>
                                </TableCell>
                            </tr>

                            {/* Bullet */}
                            <tr>
                                <FirstColumnCell>Bullet</FirstColumnCell>
                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.bullet.wins.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.bullet.wins.black.length)}
                                    <CellTotal> <b>Total: {stats.bullet.wins.white.length + stats.bullet.wins.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.bullet.losses.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.bullet.losses.black.length)}
                                    <CellTotal> <b>Total: {stats.bullet.losses.white.length + stats.bullet.losses.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.bullet.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.bullet.draws.black.length)}
                                    <CellTotal> <b>Total: {stats.bullet.draws.white.length + stats.bullet.draws.black.length}</b> </CellTotal>
                                </TableCell>

                                <TableCell>
                                    {renderPawnIcon("pawn", "white", stats.bullet.wins.white.length + stats.bullet.losses.white.length + stats.bullet.draws.white.length)}
                                    {renderPawnIcon("pawn", "black", stats.bullet.wins.black.length + stats.bullet.losses.black.length + stats.bullet.draws.black.length)}
                                    <CellTotal>
                                        <b>Total: {stats.bullet.wins.white.length + stats.bullet.losses.white.length + stats.bullet.draws.white.length +
                                                   stats.bullet.wins.black.length + stats.bullet.losses.black.length + stats.bullet.draws.black.length}
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

export default MatchHistoryTable;