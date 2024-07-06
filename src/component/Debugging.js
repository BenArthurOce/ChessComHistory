import React, { useState, useEffect } from 'react';
import styled from 'styled-components';



const ButtonContainer = styled.div
`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
`
;

const StatContainer = styled.div
`
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
`
;

const StatBox = styled.div
`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`
;

const Debugging = (props) => {
    const [stats, setStats] = useState()

    const {matchHistory, openingDictionary} = props






    useEffect(() => {
        const totalMatches = matchHistory.length;
        const wins = matchHistory.filter(match => match.playerResults.userResult === 'win').length;
        const losses = matchHistory.filter(match => match.playerResults.userResult === 'lose').length;
        const draws = matchHistory.filter(match => match.playerResults.userResult === 'draw').length;
        setStats(wins)

        const game1 = "1.e4 e5 2.Nf3 Nc6 3.d4 d6 4.d5 Nce7 5.Nfd2 Ng6 6.Nb3 Nh6 7.Bxh6 gxh6 8.f3 Nf4 9.g3 Nh5 10.N1d2 Qf6 11.Bg2 Bd7 12.Qe2 a6 13.O-O-O Ba4 14.Rhf1 Qg5 15.Kb1 c6 16.c4 b5 17.dxc6 Rc8 18.Rc1 bxc4 19.Nxc4 Bb5 20.Nxd6+ Bxd6 21.f4 exf4 22.e5 Bxe2 23.exd6 O-O 24.Rfe1 Bb5 25.d7 Rxc6 26.Bxc6 Bxc6 27.Rxc6 Qf5+ 28.Ka1 Qxd7 29.Rxa6 f3 30.Rxh6 Ng7 31.Rf6 Qh3 32.Rxf3 Qxh2 33.Nd4 Qd2 34.Nc2 Qxc2 35.g4 Qd2 36.Rh1 Qd5 37.Rfh3 Rd8 38.a3 Rb8 39.Rxh7 Ne8 40.Rh8+ Kg7 41.R1h7+ Kf6 42.Rh6+ Ke7 43.Rh5 Qb7 44.Rh2 Nd6 45.g5 Rxh8 46.Rxh8 Qg2 47.Rb8 Qf1+ 48.Ka2 Qc4+ 49.Rb3 Ne4 50.a4 Nd2 51.Ka3 Qxb3# 0-1";
        
        const game2 = "1.e4 e5 2.Nf3 Bc5 3.c3 d6 4.d4 exd4 5.cxd4 Bb6 6.Be3 a6 7.d5 Bg4 8.Bxb6 cxb6 9.h3 Bh5 10.g4 Bg6 11.Be2 Bxe4 12.Nc3 Bg6 13.O-O Ne7 14.h4 h6 15.h5 Bh7 16.Bd3 f5 17.Nh4 O-O 18.Nxf5 Nxf5 19.gxf5 Qg5+ 20.Kh2 Qh4+ 21.Kg1 Nd7 22.Qe2 Ne5 23.Rae1 Rae8 24.Ne4 Ng4 25.Nxd6 Qg5 26.Qxe8 Nf6+ 27.Kh1 Nxe8 28.Nxe8 Qxh5+ 29.Kg1 Rxe8 30.Bc4 Bxf5 31.d6+ Kh7 32.Rxe8 Qxe8 33.Re1 Qg6+ 34.Kf1 Bd7 35.Rd1 Qf6 36.b4 Bh3+ 37.Ke1 Qe5+ 38.Be2 Qc3+ 39.Rd2 Qxb4 40.Kd1 Qb1# 0-1"
        
        const game3 = "1.d4 d5 2.Bf4 c6 3.Nf3 Bf5 4.c3 f6 5.e3 e6 6.Bd3 Bxd3 7.Qxd3 Bd6 8.Bg3 Ne7 9.Nbd2 O-O 10.e4 e5 11.dxe5 dxe4 12.Nxe4 Bxe5 13.Qxd8 Rxd8 14.Nxe5 fxe5 15.Bxe5 Nd7 16.Bg3 Nf6 17.Nxf6+ gxf6 18.O-O Rd2 19.Rab1 Rad8 20.Bf4 Rc2 21.Rfc1 Rxc1+ 22.Rxc1 Ng6 23.Bg3 f5 24.f4 Rd2 25.Rb1 Kf7 26.a3 Ke6 27.h4 Kd5 28.h5 Ne7 29.Bh4 Nc8 30.Be1 Rc2 31.b4 Ke4 32.g3 Kf3 33.Rd1 Ke2 34.Rd8 Nb6 35.Rb8 Kxe1 36.Rxb7 Rxc3 37.Rxh7 Rxg3+ 38.Kh2 Rg4 39.Rf7 Kf2 40.Kh3 Rg3+ 41.Kh4 Kf3 42.Rxf5 Nc4 43.h6 Ne3 44.Rf7 Ng4 45.h7 Rg2 46.h8=Q Rh2+ 47.Kg5 Rxh8 48.f5 Rg8+ 49.Kh4 Kf4 50.Kh3 Nf2+ 51.Kh2 Kf3 52.Rh7 Kf4 53.f6 Ng4+ 54.Kh3 Nxf6 55.Rf7 Rg6 56.Rxa7 Ke5 57.Ra5+ Kd6 58.Rc5 Nd5 59.Rc4 Rg5 60.a4 Rg8 61.b5 cxb5 62.axb5 Nb6 63.Rc6+ Kd5 64.Rxb6 Kc5 65.Rb7 Rc8 66.b6 Kc6 67.Rh7 Kxb6 68.Rh6+ Kb7 69.Rh4 Rc7 70.Rb4+ Kc8 71.Rb6 Kd8 72.Rb8+ Rc8 73.Rb1 Kc7 74.Rc1+ Kd8 75.Rg1 Rc7 76.Rg8+ Kd7 77.Rg7+ Kc6 78.Rg2 Kb7 79.Ra2 Kc8 80.Ra8+ Kd7 81.Rh8 Kd6 82.Rh4 Kd7 83.Rd4+ Kc8 84.Ra4 Kb7 85.Rb4+ Kc6 86.Rh4 Kb7 87.Rh8 Kc6 88.Rh4 Kb7 1/2-1/2"
        
        const a = findOpeningMatch(game3, openingDictionary)
        // console.log(a)
        // console.log()

    }, [matchHistory]);






    const onButton1Click = () => {
        const sortedArray = matchHistory.sort((a, b) => b.general.id - a.general.id);
        // console.log(sortedArray)
        // // console.log(matchHistory)
        // // console.log("\nbutton 1 clicked\n")
    };

    const onButton2Click = () => {
        // console.log("\nbutton 2 clicked\n")
    };

    const onButton3Click = () => {
        // console.log("\nbutton 3 clicked\n")
    };

    const onButton4Click = () => {
        // console.log("\nbutton 4 clicked\n")
    };


    const findOpeningMatch = (game, openings) => {
        const gameMoves = game.split(' ').slice(0, 15).join(' '); // Consider the first 15 moves
        let bestMatch = null;
        let bestMatchLength = 0;
    
        for (const opening in openings) {
            if (gameMoves.startsWith(opening)) {
                const openingLength = opening.split(' ').length;
                if (openingLength > bestMatchLength) {
                    bestMatch = opening;
                    bestMatchLength = openingLength;
                }
            }
        }
    
        return bestMatch ? openings[bestMatch] : null;
    };


    return (
        <>
            <h1 style={{ textAlign: "center" }}>Debugging</h1>

            <ButtonContainer>
                <button onClick={() => onButton1Click()}>Button 1</button>

                <button onClick={() => onButton2Click()}>Button 2</button>

                <button onClick={() => onButton3Click()}>Button 3</button>

                <button onClick={() => onButton4Click()}>Button 4</button>
            </ButtonContainer>

            <StatContainer>
                <StatBox>
                    <h3>stats</h3>
                    <p>{stats}</p>
                </StatBox>
            </StatContainer>


        </>
    );
};

export default Debugging;