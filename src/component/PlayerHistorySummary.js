import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled component for the outer container
const MatchHistorySummaryContainer = styled.div
`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 10px;
    }
`
;

// Styled component for the heading
const Heading = styled.h1
`
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
`
;

// Styled component for the table container
const TableContainer = styled.div
`
    margin-top: 20px;
`
;

// Styled component for the table
const Table = styled.table
`
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 8px;
    // overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        font-size: 13px;
    }
`
;

// Styled components for table headers and cells
const TableHeader = styled.th
`
    padding: 5px 2px;
    text-align: center;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ddd;
`
;

const TableCell = styled.td
`
    padding: 5px 2px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    max-width: 40px;
`
;

// PlayerHistorySummary component
function PlayerHistorySummary(props) {
    const matchHistory = props.matchHistory;
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const stats = calculateStats(matchHistory);
        setStats(stats);
    }, [matchHistory]);

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

    return (
        <MatchHistorySummaryContainer>
            {stats && (
                <TableContainer>
                    <Heading>Match History Summary</Heading>
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
                            <tr>
                                <TableCell>Daily</TableCell>
                                <TableCell>
                                    <p>White: {stats.daily.wins.white.length}</p>
                                    <p>Black: {stats.daily.wins.black.length}</p>
                                    <b>Total: {stats.daily.wins.white.length + stats.daily.wins.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.daily.losses.white.length}</p>
                                    <p>Black: {stats.daily.losses.black.length}</p>
                                    <b>Total: {stats.daily.losses.white.length + stats.daily.losses.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.daily.draws.white.length}</p>
                                    <p>Black: {stats.daily.draws.black.length}</p>
                                    <b>Total: {stats.daily.draws.white.length + stats.daily.draws.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.daily.wins.white.length + stats.daily.losses.white.length + stats.daily.draws.white.length}</p>
                                    <p>Black: {stats.daily.wins.black.length + stats.daily.losses.black.length + stats.daily.draws.black.length}</p>
                                    <b>Total: {stats.daily.wins.white.length + stats.daily.losses.white.length + stats.daily.draws.white.length +
                                               stats.daily.wins.black.length + stats.daily.losses.black.length + stats.daily.draws.black.length}
                                    </b>
                                </TableCell>
                            </tr>
                            <tr>
                                <TableCell>Rapid</TableCell>
                                <TableCell>
                                    <p>White: {stats.rapid.wins.white.length}</p>
                                    <p>Black: {stats.rapid.wins.black.length}</p>
                                    <b>Total: {stats.rapid.wins.white.length + stats.rapid.wins.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.rapid.losses.white.length}</p>
                                    <p>Black: {stats.rapid.losses.black.length}</p>
                                    <b>Total: {stats.rapid.losses.white.length + stats.rapid.losses.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.rapid.draws.white.length}</p>
                                    <p>Black: {stats.rapid.draws.black.length}</p>
                                    <b>Total: {stats.rapid.draws.white.length + stats.rapid.draws.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.rapid.wins.white.length + stats.rapid.losses.white.length + stats.rapid.draws.white.length}</p>
                                    <p>Black: {stats.rapid.wins.black.length + stats.rapid.losses.black.length + stats.rapid.draws.black.length}</p>
                                    <b>Total: {stats.rapid.wins.white.length + stats.rapid.losses.white.length + stats.rapid.draws.white.length +
                                               stats.rapid.wins.black.length + stats.rapid.losses.black.length + stats.rapid.draws.black.length}
                                    </b>
                                </TableCell>
                            </tr>
                            <tr>
                                <TableCell>Blitz</TableCell>
                                <TableCell>
                                    <p>White: {stats.blitz.wins.white.length}</p>
                                    <p>Black: {stats.blitz.wins.black.length}</p>
                                    <b>Total: {stats.blitz.wins.white.length + stats.blitz.wins.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.blitz.losses.white.length}</p>
                                    <p>Black: {stats.blitz.losses.black.length}</p>
                                    <b>Total: {stats.blitz.losses.white.length + stats.blitz.losses.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.blitz.draws.white.length}</p>
                                    <p>Black: {stats.blitz.draws.black.length}</p>
                                    <b>Total: {stats.blitz.draws.white.length + stats.blitz.draws.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.blitz.wins.white.length + stats.blitz.losses.white.length + stats.blitz.draws.white.length}</p>
                                    <p>Black: {stats.blitz.wins.black.length + stats.blitz.losses.black.length + stats.blitz.draws.black.length}</p>
                                    <b>Total: {stats.blitz.wins.white.length + stats.blitz.losses.white.length + stats.blitz.draws.white.length +
                                               stats.blitz.wins.black.length + stats.blitz.losses.black.length + stats.blitz.draws.black.length}
                                    </b>
                                </TableCell>
                            </tr>
                            <tr>
                                <TableCell>Bullet</TableCell>
                                <TableCell>
                                    <p>White: {stats.bullet.wins.white.length}</p>
                                    <p>Black: {stats.bullet.wins.black.length}</p>
                                    <b>Total: {stats.bullet.wins.white.length + stats.bullet.wins.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.bullet.losses.white.length}</p>
                                    <p>Black: {stats.bullet.losses.black.length}</p>
                                    <b>Total: {stats.bullet.losses.white.length + stats.bullet.losses.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.bullet.draws.white.length}</p>
                                    <p>Black: {stats.bullet.draws.black.length}</p>
                                    <b>Total: {stats.bullet.draws.white.length + stats.bullet.draws.black.length}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.bullet.wins.white.length + stats.bullet.losses.white.length + stats.bullet.draws.white.length}</p>
                                    <p>Black: {stats.bullet.wins.black.length + stats.bullet.losses.black.length + stats.bullet.draws.black.length}</p>
                                    <b>Total: {stats.bullet.wins.white.length + stats.bullet.losses.white.length + stats.bullet.draws.white.length +
                                               stats.bullet.wins.black.length + stats.bullet.losses.black.length + stats.bullet.draws.black.length}
                                    </b>
                                </TableCell>
                            </tr>
                            <tr>
                                <TableCell>Total</TableCell>
                                <TableCell>
                                    <p>White: {stats.total.wins.white}</p>
                                    <p>Black: {stats.total.wins.black}</p>
                                    <b>Total: {stats.total.wins.white + stats.total.wins.black}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.total.losses.white}</p>
                                    <p>Black: {stats.total.losses.black}</p>
                                    <b>Total: {stats.total.losses.white + stats.total.losses.black}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.total.draws.white}</p>
                                    <p>Black: {stats.total.draws.black}</p>
                                    <b>Total: {stats.total.draws.white + stats.total.draws.black}</b>
                                </TableCell>
                                <TableCell>
                                    <p>White: {stats.total.wins.white + stats.total.losses.white + stats.total.draws.white}</p>
                                    <p>Black: {stats.total.wins.black + stats.total.losses.black + stats.total.draws.black}</p>
                                    <b>Total: {stats.total.wins.white + stats.total.losses.white + stats.total.draws.white +
                                               stats.total.wins.black + stats.total.losses.black + stats.total.draws.black}
                                    </b>
                                </TableCell>
                            </tr>
                        </tbody>
                    </Table>
                </TableContainer>
            )}
        </MatchHistorySummaryContainer>
    );
}

export default PlayerHistorySummary;