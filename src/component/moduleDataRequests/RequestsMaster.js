import React, { useState, useEffect, useCallback, useRef } from "react";

import InputForm from "./InputForm";
import MakeRequestsChessCom2 from "./MakeRequestsChessCom2";


const RequestsMaster = ({receiveRequestGameObjects}) => {

    const [formData, setFormData] = useState(null);


    const refPlayerProfileUrl = useRef(null)
    const refPlayerStatsUrl = useRef(null)
    const refPlayerArchiveURls = useRef(null)

 



    const masterHandleFormSubmit = useCallback((submittedForm) => {
        if (!submittedForm) return;

        setFormData(submittedForm);

        refPlayerProfileUrl.current = `https://api.chess.com/pub/player/${submittedForm.username}`
        refPlayerStatsUrl.current = `https://api.chess.com/pub/player/${submittedForm.username}/stats`
        refPlayerArchiveURls.current = `https://api.chess.com/pub/player/${submittedForm.username}/games/archives`
    }, []);


    const masterHandleRequestGet = useCallback((data) => {
        if (data.length == 0) {return};
        if (!data) {return};
        receiveRequestGameObjects(data)
    }, []);




    return (
        <>
            <h1>RequestsMaster</h1>

            <InputForm onFormSubmit={masterHandleFormSubmit}> </InputForm>


            {formData && (
                <>
                <p>form has been accepted</p>
                <MakeRequestsChessCom2
                    formData={formData}
                    playerProfileUrl={refPlayerProfileUrl.current}
                    playerStatsUrl={refPlayerStatsUrl.current}
                    gameArchiveURls={refPlayerArchiveURls.current}
                    onDataRequest={masterHandleRequestGet}
                />
                </>
            )}

        </>
    );
};

export default RequestsMaster;
