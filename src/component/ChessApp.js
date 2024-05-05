import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import PlayerInformation from './PlayerInformation';
import SingleMatch from './SingleMatch';


function ChessApp() {
    const [inputString, setInputString] = useState('');
    const [waitingFlag, setWaitingFlag] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    const [error, setError] = useState(null);
    const [matchCount, setMatchCount] = useState(0);
    const [matchesToDisplay, setMatchesToDisplay] = useState(0);


    useEffect(() => {
        if (inputString) {
            triggerFormSubmitted(inputString);
        }
    }, [inputString]);

    const triggerFormSubmitted = async (textBoxString) => {
        setError(null);
        setWaitingFlag(true);

        try {
            const response = await fetch(`https://api.chess.com/pub/player/${textBoxString}`, {
                headers: {
                    Accept: 'application/ld+json',
                },
            });
            const data = await response.json();

            if (data.player_id === undefined) {
                setError(true);
                setWaitingFlag(false);
                return;
            }

            const standardPlayerObject = {
                avatar: data.avatar,
                id: data.player_id,
                name: data.name,
                country: data.country,
                dateJoined: data.joined,
                dateOnline: data.last_online,
                matchHistory: await getMatchHistory(textBoxString),
                url: data.url,
                username: data.username,
            };

            setPlayerData(standardPlayerObject);
            setWaitingFlag(false);
        } catch (error) {
            setError(true);
            setWaitingFlag(false);
            console.error('Error fetching player information:', error);
        }
    };

    const getMatchHistory = async (textBoxString) => {
        try {
            const response = await fetch(`https://api.chess.com/pub/player/${textBoxString}/games/2024/05`);
            const data = await response.json();
            setMatchCount(data.games.length); // Set total number of games
            setMatchesToDisplay(10)


            const matchObjects = await Promise.all(data.games.map(async (match) => {
                const stringObject = parseStringToObject(match.pgn);

                let userPlayed = "";
                let winner = "";
                let isWin = false;
                
                if (match.white.username.toLowerCase() === textBoxString.toLowerCase()) {
                    userPlayed = "white";
                } else if (match.black.username.toLowerCase() === textBoxString.toLowerCase()) {
                    userPlayed = "black";
                }
                
                if (match.white.result.toLowerCase() === "win" || match.black.result.toLowerCase() === "win") {
                    winner = match.white.result.toLowerCase() === "win" ? "white" : "black";
                }

                if (stringObject.Result === "1/2-1/2") {
                    winner = "draw";
                }


                const CalcPlayerResult = () => {
                    if (match.white.result === "win" && match.white.username.toLowerCase() === textBoxString.toLowerCase()) {return "win"};
                    if (match.black.result === "win" && match.black.username.toLowerCase() === textBoxString.toLowerCase()) {return "win"};
                    if (stringObject.Result === "1/2-1/2") {return "draw"};
                    return "lose"
                }


                // const getUsername = (player) => player.username.toLowerCase();

                // const getResult = (player) => player.result.toLowerCase();
                
                // const isUserPlayed = (match, textBoxString) => {
                //     if (getUsername(match.white) === textBoxString.toLowerCase()) return "white";
                //     if (getUsername(match.black) === textBoxString.toLowerCase()) return "black";
                //     return "";
                // };
                
                // const determineWinner = (match) => {
                //     if (getResult(match.white) === "win") return "white";
                //     if (getResult(match.black) === "win") return "black";
                //     return "draw";
                // };
                
                // let userPlayed = isUserPlayed(match, textBoxString);
                // let winner = determineWinner(match);
                


                
                // isWin = userPlayed === winner;

                const matchObject = {
                    url: match.url,
                    site: stringObject.Site,
                    event: stringObject.Event,
                    startTime: match.start_time,
                    endTime: match.end_time,
                    timeControl: match.time_control,
                    timeClass: match.time_class,
                    rules: match.rules,
                    isRated: match.rated,

                    id: extractGameId(stringObject.Link),
                    date: stringObject.Date,
                    link: stringObject.Link,
                    
                    
                    pgn: '',
                    moves: stringObject.moves,
                    position: stringObject.CurrentPosition,


                    results: {
                          white:            match.white.result
                        , black:            match.black.result
                        , userPlayed:       ""
                        , result:           stringObject.Termination
                        , keyword:          stringObject.Termination.split(' ').pop()
                        , playerResult:     CalcPlayerResult()
                    }

                    ,isWin: isWin

                    ,userPlayed: userPlayed
                    ,winner: winner
                    ,outcome: isWin ? "win" : "loss"

                    ,time: {
                          class:        match.time_class
                        , base:         match.time_control  // need to remove the "+2" for every extra time per turn
                        , increment:    match.time_control  // need to include the "+2"
                        , bonus:        ""
                    }

                    ,white: {
                          username:     match.white.username
                        , elo:          match.white.rating
                        , url:          match.white['@id']
                    }

                    ,black: {
                            username:     match.black.username
                        , elo:          match.black.rating
                        , url:          match.black['@id']
                    }

                    ,opening: {
                            eco:          stringObject.ECO
                        , url:          stringObject.ECOUrl
                        , name:         extractOpeningName(stringObject.ECOUrl)
                    }


                };

                if (stringObject.Result === "1/2-1/2") {
                    winner = "draw";
                    matchObject.outcome = "draw";
                }
                return matchObject;
            }));

            return matchObjects;
        } catch (error) {
            setError(true);
            setWaitingFlag(false);
            console.error('Error fetching match history:', error);
            return [];
        }
    };

    const extractOpeningName = (openingURL) => {
        const index = openingURL.indexOf("/openings/");
        const opening = openingURL.substring(index + "/openings/".length);
        return opening.replace(/-/g, ' ');
    };

    const extractGameId = (gameURL) => {
        const index = gameURL.indexOf("/live/");
        const id = gameURL.substring(index + "/live/".length);
        return parseInt(id, 10);
    };

    //https://api.chess.com/pub/player/pounkumar14

    const parseStringToObject = (inputString) => {
        const regex = /\[([\w\s]+)\s"([^"]+)"\]/g;
        let match;
        const obj = {};
        let remainingData = inputString; // Initialize remaining data with the input string
    
        while ((match = regex.exec(inputString)) !== null) {
            const key = match[1];
            const value = match[2];
            obj[key] = value;
            // Update remaining data by removing the matched key-value pair
            remainingData = remainingData.replace(match[0], '').trim();
        }
    
        obj.moves = buildMoveString(remainingData)
        return obj;
    };
    
    
        // Takes the moves and the PGN with the clock and only returns the moves
        const buildMoveString = (input) => {
    
            // Remove everything between curly and square brackets, including the brackets themselves
            const step1 = input.replace(/\{[^{}]*\}|\[[^\[\]]*\]/g, '');
        
            // Remove any instance of "..." along with the number before it and replace with a single space
            const step2 = step1.replace(/\d+\.{3}/g, ' ');
        
            // Replace multiple spaces with a single space
            const step3 = step2.replace(/\s+/g, ' ');
        
            // Remove spaces around single periods
            const step4 = step3.replace(/\s+\./g, '.').replace(/\.\s+/g, '.');
        
            // Trim any leading or trailing spaces
            const step5 = step4.trim();
            
            return step5;
        }
    

    return (
        <div id="wrapper">
            <h1>Chess Match History</h1>

            <section id="form">
                <SearchForm onFormSubmit={setInputString} />
                {waitingFlag && <p>Loading player information...</p>}
                {error && <p>Error fetching data. Please try again.</p>}
                {playerData && (
                    <div>
                        <h2>Player Information</h2>
                        <p>Player Username: {playerData.username}</p>
                        <p>{matchCount} matches found</p>
                    </div>
                )}
            </section>

            <section id="playerInfo">
                {playerData && (
                    <PlayerInformation playerInformation={playerData} />
                )}
            </section>

            <section id="matchHistory">
                {playerData && playerData.matchHistory && (
                    <div>
                        {playerData.matchHistory.map((match, index) => (
                            index < matchesToDisplay && <SingleMatch key={index} gameInformation={match} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default ChessApp;
