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


    }, [matchHistory]);






    const onButton1Click = () => {
        const sortedArray = matchHistory.sort((a, b) => b.general.id - a.general.id);
        // // console.log(sortedArray)
        // // // console.log(matchHistory)
        // // // console.log("\nbutton 1 clicked\n")
    };

    const onButton2Click = () => {
        const everyOpening = matchHistory.map((match) => match.openingMatch.name);
        console.log(everyOpening);

        // console.log(matchHistory)
        // // console.log("\nbutton 2 clicked\n")
    };

    const onButton3Click = () => {
        const everyTermination = matchHistory.map((match) => match.results.terminationWord);
        const everyUniqueTermination = new Set(everyTermination)
        console.log(everyUniqueTermination);
        // // console.log("\nbutton 3 clicked\n")
    };

    const onButton4Click = () => {


        const results = []
        matchHistory.forEach(game => {
            results.push(game.aaaData.match.status)
        });

        const mySet = new Set(results)
        console.log(mySet)



        const results2 = []
        matchHistory.forEach(game => {
            results2.push(game.aaaData.match.perf)
        });

        const mySet2 = new Set(results2)
        console.log(mySet2)

    };

    const onButton5Click = () => {
        const results = []
        matchHistory.forEach(game => {
            results.push(game.moves.string)
        });


        const arrayOpenings = [];

        results.forEach(match => {
            const parsedGameData = parsePGNData(match);
            arrayOpenings.push(parsedGameData);
            
        });

        processOpenings(arrayOpenings);
    };



    // Dirty Cheaters Debugging
    const onButton6Click = () => {
    
        // Extract usernames
        const white = matchHistory.map((game) => game['white']['username']);
        const black = matchHistory.map((game) => game['black']['username']);
    
        // Combine white and black usernames
        const all = [...white, ...black];
    
        // Filter out specific username
        const opponentUsernames = all.filter((username) => username !== 'BenArthurOce');
    
        const opponentUsernames2 = opponentUsernames.slice(0,1000)

        //armpitsniffer42
// status	"closed:fair_play_violations"
        opponentUsernames2.forEach(username => {

            const url = `https://api.chess.com/pub/player/${username}`
            
            fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                // console.log(data.status)
                if(data.status == 'closed:fair_play_violations') {
                    console.log(data)
                }
            })
            .catch((error) => {

            });

        });
    
    };


// Function to parse single match data from PGN notation
const parsePGNData = (unparsedGameString) => {
    const pgnParseGameRegx = /\[([\w\s]+)\s"([^"]+)"\]/g;
    const parsedGameData = {};

    let match;
    while ((match = pgnParseGameRegx.exec(unparsedGameString)) !== null) {
        parsedGameData[match[1]] = match[2];
    }

    // Function to clean up move string
    const buildMoveString = (input) => {
        return input.replace(/\{[^{}]*\}|\[[^\[\]]*\]/g, '')
                    .replace(/\d+\.{3}/g, ' ')
                    .replace(/\s+/g, ' ')
                    .replace(/\s+\./g, '.').replace(/\.\s+/g, '.')
                    .trim();
    };

    // Function to build move object from move notation
    const buildMoveObject = (notation) => {
        const MOVE_REGEX = /\s*(\d{1,3})\.?\s*((?:(?:O-O(?:-O)?)|(?:[KQNBR][1-8a-h]?x?[a-h]x?[1-8])|(?:[a-h]x?[a-h]?[1-8]\=?[QRNB]?))\+?)(?:\s*\d+\.?\d+?m?s)?\.?\s*((?:(?:O-O(?:-O)?)|(?:[KQNBR][1-8a-h]?x?[a-h]x?[1-8])|(?:[a-h]x?[a-h]?[1-8]\=?[QRNB]?))\+?)?(?:\s*\d+\.?\d+?m?s)?(?:#)?/g;
        const allMoves = {};
        let match;

        while ((match = MOVE_REGEX.exec(notation)) !== null) {
            const moveNumber = parseInt(match[1]);
            const whiteMove = match[2];
            const blackMove = match[3] || undefined;
            allMoves[moveNumber] = [whiteMove, blackMove];
        }
        return allMoves;
    };

    parsedGameData.MoveString = buildMoveString(unparsedGameString.replace(pgnParseGameRegx, '').trim());
    parsedGameData.MoveObject = buildMoveObject(parsedGameData.MoveString);

    return parsedGameData;
};



    // Function to process array of openings and log results
    const processOpenings = (arrayOpenings) => {
        const maxIterations = 10; 
        const finalResult = new Set();

        arrayOpenings.forEach((match) => {
            const movesObject = match.MoveObject;
            let result = "";
            let count = 0;



            for (const [key, value] of Object.entries(movesObject)) {
                if (count >= maxIterations) {
                    break;
                }
                value.forEach((move, index) => {
                    if (move !== undefined) { // Check for undefined
                        if (index === 0) {
                            result += `${key}.${move} `;
                        } else {
                            result += `${move} `;
                        }
                    }
                });
                finalResult.add(result.trim()); // Add unique results to Set
                count++;
            }
        });

        // Convert Set to array and join with newline
        const finalResultArray = [...finalResult];
        console.log(finalResultArray)
        const finalResultString = finalResultArray.join('\n');

        // Create a data URI for the text file
        const blob = new Blob([finalResultString], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Create a link element to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'fen_strings.txt';

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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

                <button onClick={() => onButton5Click()}>Button 5</button>

                <button onClick={() => onButton6Click()}>Button 6</button>
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