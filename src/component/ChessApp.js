import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PlayerInformation from './modulePlayerInformation/PlayerInformation';

import ChessAppSwitcher from './ChessAppSwitcher';
import ChessAppSearchForm from './ChessAppSearchForm';


function ChessApp() {

    const [formData, setFormData] = useState(null);
    const [renderFlag, setRenderFlag] = useState(false);


    useEffect(() => {
        if (formData) {
            setRenderFlag(checkIfAbleToRender(formData));
        } else {
            setRenderFlag(false);
        }
    }, [formData]); // Run code when the data in "ChessAppSearchForm is changed / submitted"


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
                <ChessAppSearchForm onFormSubmit={triggerFormSubmitted} />
            </section>

      {renderFlag && (
        <div>
          <ChessAppSwitcher
            username={formData.username}
            lastNGames={formData.lastNGames}
          />
        </div>
      )}

            {/* Player Information */}
            {/* {renderFlag && (
                <div>
                    {<PlayerInformation username={formData.username} />}
                </div>
            )} */}


            {/* Match History */}
            {/* {renderFlag && formData && (
                <div>
                    {<MatchHistory username={formData.username} lastNGames={formData.lastNGames} />}
                </div>
            )} */}
        </div>
    );
}

export default ChessApp;