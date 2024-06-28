import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import SearchForm from './SearchForm';
import PlayerInformation from './PlayerInformation';
import MatchHistory from './MatchHistory';


function ChessApp() {

    const [formData, setFormData] = useState(null);

    const [waitingFlag, setWaitingFlag] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    const [error, setError] = useState(null);

    const [renderFlag, setRenderFlag] = useState(false);


    useEffect(() => {
        if (formData) {
            setRenderFlag(checkIfAbleToRender(formData));
        } else {
            setRenderFlag(false);
        }
        console.log(renderFlag)
        // setRenderFlag(false);
        // console.log(renderFlag)
    }, [formData]); // Run code when the data in "SearchForm is changed / submitted"


    const checkIfAbleToRender = (formData) => {
        return formData.username.length >= 3 && formData.lastNGames >= 1;
    };
    

    const triggerFormSubmitted = (newFormData) => {
        setFormData(newFormData)
    };

  

    return (
        <div id="wrapper">
            <h1>Chess Match History</h1>

            <section id="form">
                <SearchForm onFormSubmit={triggerFormSubmitted} />
                {/* {waitingFlag && <p>Loading player information...</p>}
                {error && <p>Error fetching data. Please try again.</p>} */}
                {renderFlag && <p>renderflag is true</p>}
                {!renderFlag && <p>renderflag is false</p>}
            </section>

            {/* Player Information */}
            {renderFlag && (
                <div>
                    {<PlayerInformation username={formData.username} />}
                </div>
            )};


            {/* Match History */}
            {renderFlag && formData && (
                <div>
                    {<MatchHistory username={formData.username} lastNGames={formData.lastNGames} />}
                </div>
                
            )};
        </div>
    );
}

export default ChessApp;