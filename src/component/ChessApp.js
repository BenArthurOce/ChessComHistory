import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import SearchForm from './SearchForm';
import PlayerInformation from './PlayerInformation';
import MatchHistory from './MatchHistory';


function ChessApp() {

    const [formData, setFormData] = useState(null);

    const [waitingFlag, setWaitingFlag] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    const [error, setError] = useState(null);


    const mountedRef = useRef(true);    // Does not trigger a re-render

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false; // Cleanup function to set mountedRef to false when component unmounts
        };
    }, []);



    const triggerFormSubmitted = (newFormData) => {
        console.log("triggerFormSubmitted");
        setFormData(newFormData);
        fetchPlayerData(newFormData);

        // prepareDictionary()
    }

  

    // To be moved to PlayerInformation
    const fetchPlayerData = useCallback(async (formData) => {
        setError(null);
        setWaitingFlag(true);

        try {
            const response = await fetch(`https://api.chess.com/pub/player/${formData.username}`, {
                headers: {
                    Accept: 'application/ld+json',
                },
            });
            const data = await response.json();

            if (!data.player_id) {
                setError(true);
                setWaitingFlag(false);
                return;
            }

            if (!mountedRef.current) return;

            const playerObject = {
                  avatar:       data.avatar
                , id:           data.player_id
                , name:         data.name
                , country:      data.country
                , dateJoined:   data.joined
                , dateOnline:   data.last_online
                , url:          data.url
                , username:     data.username
            };
            setPlayerData(playerObject);
            setWaitingFlag(false);
        } catch (error) {
            setError(true);
            setWaitingFlag(false);
            console.error('Error fetching player information:', error);
        }
    }, []);


    return (
        <div id="wrapper">
            <h1>Chess Match History</h1>

            <section id="form">
                <SearchForm onFormSubmit={triggerFormSubmitted} />
                {waitingFlag && <p>Loading player information...</p>}
                {error && <p>Error fetching data. Please try again.</p>}
            </section>


            {/* Player Information */}
            {/* {!waitingFlag && formData && (
                <div>
                    {playerData && <PlayerInformation username={formData.username} />}
                </div>
            )}; */}

            {/* {!waitingFlag && formData && currentComponent === 'PlayerInformation' && (
                <section id="player-info">
                    {playerData && <PlayerInformation playerInformation={playerData} />}
                </section>
            )} */}


            {/* Match History */}
            {!waitingFlag && formData && (
                <div>
                    {playerData && <MatchHistory username={formData.username} lastNGames={formData.lastNGames} />}
                </div>
            )};

        </div>
    );
}

export default ChessApp;