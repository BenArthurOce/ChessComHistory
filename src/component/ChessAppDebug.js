import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

import Form from "./Form";

import MakeRequestsChessCom from "./MakeRequestsChessCom";
import MakeRequestsChessCom2 from "./MakeRequestsChessCom2";

import MatchHistoryDisplay from "./moduleMatchHistoryDisplay/MatchHistoryDisplay";

import useToggle from "../hooksSpecific/useToggle";

import useBuildMatchesChessCom from "../hooksSpecific/HooksGameObjects/useBuildMatchesChessCom";

;

const ChessAppDebug = () => {

    const [formData, setFormData] = useState(null);
    const [matchHistory, setMatchHistory] = useState(null);
    const [isFormSubmitted, toggle] = useToggle(false);


    const refPlayerProfileUrl = useRef(null)
    const refPlayerStatsUrl = useRef(null)
    const refPlayerArchiveURls = useRef(null)


    const hookParsedMatches = useBuildMatchesChessCom(matchHistory, formData?.username);



    const handleChildData = useCallback((data) => {
        if (data.length == 0) {return};
        if (!data) {return};
        console.log(data)
        setMatchHistory(data);
        }, []);






    const handleFormSubmit = useCallback((submittedForm) => {
      if (!submittedForm) return;

      setFormData(submittedForm);

      refPlayerProfileUrl.current = `https://api.chess.com/pub/player/${submittedForm.username}`
      refPlayerStatsUrl.current = `https://api.chess.com/pub/player/${submittedForm.username}/stats`
      refPlayerArchiveURls.current = `https://api.chess.com/pub/player/${submittedForm.username}/games/archives`


      toggle();
      // setFormData(submittedForm);
    }, [toggle]);


    const handleTestButtonClick = () => {
        console.log("==handleButtonClick==");
        console.log(refPlayerProfileUrl)
        console.log(refPlayerStatsUrl)
        console.log(refPlayerArchiveURls)
        console.log(hookParsedMatches)
    };


    return (
        <>

            <Form onFormSubmit={handleFormSubmit}></Form>
            {/* {formData && (
                <Form onFormSubmit={handleFormSubmit}></Form>
            )} */}

            <button onClick={handleTestButtonClick}>Test Form Data</button>


            {/* {refPlayerProfileUrl.current && refPlayerStatsUrl.current && refPlayerArchiveURls.current && ( */}
            {isFormSubmitted && (
              <>
              <p>form has been accepted</p>
              <MakeRequestsChessCom2
                formData={formData}
                playerProfileUrl={refPlayerProfileUrl.current}
                playerStatsUrl={refPlayerStatsUrl.current}
                gameArchiveURls={refPlayerArchiveURls.current}
                onDataRequest={handleChildData}
              />
              </>
            )}

            { matchHistory && (
              <p>data got</p>
            )}
          
        </>
      );
    }

export default ChessAppDebug;
