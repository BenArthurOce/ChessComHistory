import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import useFetchMultiple from "../hooks/useFetchMultiple";

import MatchHistorySummary from './MatchHistorySummary';
import PlayerInformation from './PlayerInformation';
import SingleMatch from './SingleMatch';
import UniqueMoves from './UniqueMoves';
import OpeningAnalysis from './OpeningAnalysis';


import useMatchHistoryAPI from '../hooks/useMatchHistoryAPI';

import useMatchHistoryParsePGN from '../hooks/useMatchHistoryParsePGN';

const MatchHistory = (props) => {
    const [matches, setMatches] = useState([])


    const urls = [
          `https://api.chess.com/pub/player/${props.username}/games/2024/06`
        , `https://api.chess.com/pub/player/${props.username}/games/2024/05`
        // , `https://api.chess.com/pub/player/${props.username}/games/2024/04`
        // , `https://api.chess.com/pub/player/${props.username}/games/2024/03`
        // , `https://api.chess.com/pub/player/${props.username}/games/2024/02`
        // , `https://api.chess.com/pub/player/${props.username}/games/2024/01`
        // , `https://api.chess.com/pub/player/${props.username}/games/2023/12`
        // , `https://api.chess.com/pub/player/${props.username}/games/2023/11`
    ];

    const { data, loading, error } = useFetchMultiple(urls);

    const arrayOfUnparsedMatchObjects = useMatchHistoryAPI(data, props.lastNGames)

    const arrayOfParsedMatchObjects = useMatchHistoryParsePGN(arrayOfUnparsedMatchObjects, props.username)


    useEffect(() => {
        if (data === null || data === undefined) {
            return;
        }
        
        setMatches(arrayOfParsedMatchObjects)
    }, [data]);


    return (
        <section className="player-match-history">

            {/* {!waitingFlag && formData && (
                <div>
                    <button onClick={() => setCurrentComponent('PlayerInformation')}>Player Information</button>
                    <button onClick={() => setCurrentComponent('MatchHistorySummary')}>Player History Summary</button>
                    <button onClick={() => setCurrentComponent('MatchHistory')}>Match History</button>
                    <button onClick={() => setCurrentComponent('UniqueMoves')}>Unique Moves</button>
                    <button onClick={() => setCurrentComponent('OpeningAnalysis')}>Opening Analysis</button>
                </div>
            )} */}



            {/* {!loading && data && (
                <section id="player-history-summary">
                    {data && <MatchHistorySummary matchHistory={arrayMatches} />}
                </section>
            )} */}

            {/* {!loading && data && (
                <section id="matchHistory">
                    {arrayMatches && (
                        <div>
                            {arrayMatches.map((match, index) => (
                                index < matchesToDisplay && <SingleMatch key={index} gameInformation={match} />
                            ))}
                        </div>
                    )}
                </section>
            )} */}


            {/* {!loading && data && (
                <section id="player-unique-moves">
                    {data && <OpeningAnalysis matchHistory={arrayMatches} />}
                </section>
            )} */}

            {!loading && data && (
                <section id="player-unique-moves">
                    {data && <UniqueMoves matchHistory={matches} />}
                </section>
            )}

            {/* {!waitingFlag && formData && currentComponent === 'OpeningAnalysis' && (
                <section id="player-opening-analysis">
                    {playerData && playerData.matchHistory && <OpeningAnalysis matchHistory={playerData.matchHistory} />}
                </section>
            )} */}

        </section>
    );
}

export default MatchHistory;
