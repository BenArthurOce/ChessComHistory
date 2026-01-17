import React, { useState, useEffect, useCallback, useRef } from "react";

import InputForm from "./InputForm";
import MakeRequestsChessCom2 from "./MakeRequestsChessCom2";
import MakeRequestsLichess2 from "./MakeRequestsLichess2";

const RequestsMaster = ({receiveRequestGameObjects}) => {

    const [formData, setFormData] = useState(null);


    const refPlayerProfileUrlChessCom = useRef(null)
    const refPlayerStatsUrlChessCom = useRef(null)
    const refPlayerArchiveURlsChessCom = useRef(null)



    const refPlayerProfileUrlLichess = useRef(null)
    const refPlayerStatsUrlLichess = useRef(null)
    const refPlayerArchiveURlsLichess = useRef(null)

    const refPlayerGamesUrlLichess = useRef(null)


    const masterHandleFormSubmit = useCallback((submittedForm) => {
        if (!submittedForm) return;

        setFormData(submittedForm);

        // refPlayerProfileUrlChessCom.current = `https://api.chess.com/pub/player/${submittedForm.username}`
        // refPlayerStatsUrlChessCom.current = `https://api.chess.com/pub/player/${submittedForm.username}/stats`
        // refPlayerArchiveURlsChessCom.current = `https://api.chess.com/pub/player/${submittedForm.username}/games/archives`
 
 
 
        /* ---------------- CHESS.COM ---------------- */
        if (submittedForm.website === "chesscom") {
            refPlayerProfileUrlChessCom.current =
                `https://api.chess.com/pub/player/${submittedForm.username}`;

            refPlayerStatsUrlChessCom.current =
                `https://api.chess.com/pub/player/${submittedForm.username}/stats`;

            refPlayerArchiveURlsChessCom.current =
                `https://api.chess.com/pub/player/${submittedForm.username}/games/archives`;
        }



// const url = `https://lichess.org/api/games/user/${username}?pgnInJson=true&max=${lastNGames}&accuracy=true&opening=true&evals=true&lastFen=true`;
 


        /* ---------------- LICHESS ---------------- */
        if (submittedForm.website === "lichess") {

            refPlayerProfileUrlLichess.current =
                `https://lichess.org/api/user/${submittedForm.username}`;

            refPlayerStatsUrlLichess.current =
                `https://lichess.org/api/user/${submittedForm.username}`;
                
            refPlayerStatsUrlLichess.current =
                `https://lichess.org/api/user/${submittedForm.username}`;

            refPlayerGamesUrlLichess.current =
                `https://lichess.org/api/games/user/${submittedForm.username}?pgnInJson=true&max=${submittedForm.numgames}&accuracy=true&opening=true&evals=true&lastFen=true`;
            }


    }, []);


    const masterHandleRequestGet = useCallback((data) => {
        if (data.length == 0) {return};
        if (!data) {return};
        console.log(data)
        receiveRequestGameObjects(data)
    }, []);





    return (
        <>
            <h1>RequestsMaster</h1>

            <InputForm onFormSubmit={masterHandleFormSubmit} />

            {formData && (
                <>
                    <p>form has been accepted</p>

                    {/* -------- CHESS.COM -------- */}
                    {formData.website === "chesscom" && (
                        <MakeRequestsChessCom2
                            formData={formData}
                            playerProfileUrl={refPlayerProfileUrlChessCom.current}
                            playerStatsUrl={refPlayerStatsUrlChessCom.current}
                            gameArchiveURls={refPlayerArchiveURlsChessCom.current}
                            onDataRequest={masterHandleRequestGet}
                        />
                        
                    )}

                    {/* -------- LICHESS -------- */}
                    {formData.website === "lichess" && (
                        <>

                        <h1>MakeRequestsLichess2</h1>
                            {/* Placeholder for future */}
                            
                            <MakeRequestsLichess2
                                formData={formData}
                                playerProfileUrl={refPlayerProfileUrlLichess.current}
                                playerStatsUrl={refPlayerStatsUrlLichess.current}
                                gamesUrl={refPlayerGamesUrlLichess.current}
                                onDataRequest={masterHandleRequestGet}
                            />
                            
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default RequestsMaster;
