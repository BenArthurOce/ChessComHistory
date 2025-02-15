import React, { useState, useEffect } from "react";
import styled from "styled-components";

import UncontrolledForm from "./UncontrolledForm";

import MakeRequestsChessCom from "./MakeRequestsChessCom";

;

function ChessAppDebug() {

    const [formData, setFormData] = useState(null);
    const [playerProfileUrl, setPlayerProfileUrl] = useState(null);
    const [playerStatsUrl, setPlayerStatsUrl] = useState(null);
    const [gameArchiveURls, setGameArchiveURls] = useState(null);




    useEffect(() => {
        setPlayerProfileUrl(null);
        setPlayerStatsUrl(null);
        setGameArchiveURls(null);


        if( !formData || !formData.numgames || !formData.username || !formData.website) { return;};

        setPlayerProfileUrl(`https://api.chess.com/pub/player/${formData.username}`);
        setPlayerStatsUrl(`https://api.chess.com/pub/player/${formData.username}/stats`)
        setGameArchiveURls(`https://api.chess.com/pub/player/${formData.username}/games/archives`);

      }, [formData])



    const handleFormSubmit = (submittedForm) => {
        if (!submittedForm) {return};
        setFormData(submittedForm);
    };


    // const handleTestButtonClick = () => {
    //     console.log("==handleButtonClick==");
    //     // console.log("Games Data:", gamesData);
    //     // console.log("Profile Data:", profileData);
    // };


    return (
        // <progress value={0.5}></progress>
        // <Form></Form>
        <>

            <UncontrolledForm onFormSubmit={handleFormSubmit}></UncontrolledForm>


            {playerProfileUrl && playerStatsUrl && gameArchiveURls && (
                <>
                    <p>playerProfileUrl and gameArchiveURls successfully grabbed </p>
                    <p>Player Profile URL: {playerProfileUrl}</p>
                    <p>Player Stats URL: {playerStatsUrl}</p>
                    <p>Game Archives URL: {gameArchiveURls}</p>
                    <MakeRequestsChessCom 
                        formData={formData} 
                        playerProfileUrl={playerProfileUrl} 
                        playerStatsUrl={playerStatsUrl} 
                        gameArchiveURls={gameArchiveURls}>
                    </MakeRequestsChessCom>
                </>
            )}           

            
            {/* <button onClick={handleTestButtonClick} >TEST</button> */}

        </>

    );
}

export default ChessAppDebug;
