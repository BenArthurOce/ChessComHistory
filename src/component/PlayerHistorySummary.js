import React, { useState, useEffect } from "react";
import "./PlayerHistorySummary.css";


function PlayerHistorySummary(props) {

    const matchHistory = props.matchHistory

    const [stats, setStats] = useState('');

    useEffect(() => {
        const stats = calculateStats(matchHistory)
        setStats(stats)
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
        <div className="match-history-summary">
            {stats && (
                <div className="table-container">
                    <h1>Match History Summary</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Time Control</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Draws</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Daily</td>
                                <td>
                                    <p>White: {stats.daily.wins.white.length}</p>
                                    <p>Black: {stats.daily.wins.black.length}</p>
                                </td>
                                <td>
                                    <p>White: {stats.daily.losses.white.length}</p>
                                    <p>Black: {stats.daily.losses.black.length}</p>
                                </td>
                                <td>
                                    <p>White: {stats.daily.draws.white.length}</p>
                                    <p>Black: {stats.daily.draws.black.length}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Rapid</td>
                                <td>
                                    <p>White: {stats.rapid.wins.white.length}</p>
                                    <p>Black: {stats.rapid.wins.black.length}</p>
                                </td>
                                <td>
                                    <p>White: {stats.rapid.losses.white.length}</p>
                                    <p>Black: {stats.rapid.losses.black.length}</p>
                                </td>
                                <td>
                                    <p>White: {stats.rapid.draws.white.length}</p>
                                    <p>Black: {stats.rapid.draws.black.length}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Blitz</td>
                                <td>
                                    <p>White: {stats.blitz.wins.white.length}</p>
                                    <p>Black: {stats.blitz.wins.black.length}</p>
                                </td>
                                <td>
                                    <p>White: {stats.blitz.losses.white.length}</p>
                                    <p>Black: {stats.blitz.losses.black.length}</p>
                                </td>
                                <td>
                                    <p>White: {stats.blitz.draws.white.length}</p>
                                    <p>Black: {stats.blitz.draws.black.length}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Bullet</td>
                                <td>
                                    <p>White: {stats.bullet.wins.white.length}</p>
                                    <p>Black: {stats.bullet.wins.black.length}</p>
                                </td>
                                <td>
                                    <p>White: {stats.bullet.losses.white.length}</p>
                                    <p>Black: {stats.bullet.losses.black.length}</p>
                                </td>
                                <td>
                                    <p>White: {stats.bullet.draws.white.length}</p>
                                    <p>Black: {stats.bullet.draws.black.length}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PlayerHistorySummary;
