import React, { useState, useCallback, useMemo } from "react";


import InputForm from "./InputForm";
import MakeRequestsChessCom2 from "./MakeRequestsChessCom2";
import MakeRequestsLichess2 from "./MakeRequestsLichess2";


const RequestsMaster = ({ receiveRequestGameObjects }) => {
  const [formData, setFormData] = useState(null);

  
  const handleFormSubmit = useCallback((submittedForm) => {
    if (!submittedForm) return;
    setFormData(submittedForm);
  }, []);


  const handleRequestGet = useCallback(
    (data) => {
      if (!data || data.length === 0) return;
      receiveRequestGameObjects(data);
    },
    [receiveRequestGameObjects]
  );


  // 🔹 Derive URLs from formData
  const urls = useMemo(() => {
    if (!formData) return null;

    const { username, website, numgames } = formData;

    if (website === "chesscom") {
      return {
        profile: `https://api.chess.com/pub/player/${username}`,
        stats: `https://api.chess.com/pub/player/${username}/stats`,
        archives: `https://api.chess.com/pub/player/${username}/games/archives`,
      };
    }


    if (website === "lichess") {
      return {
        profile: `https://lichess.org/api/user/${username}`,
        stats: `https://lichess.org/api/user/${username}`,
        games: `https://lichess.org/api/games/user/${username}?pgnInJson=true&max=${numgames}&accuracy=true&opening=true&evals=true&lastFen=true`,
      };
    }

    return null;
  }, [formData]);

  
  return (
    <>
      <h1>RequestsMaster</h1>

      <InputForm onFormSubmit={handleFormSubmit} />

      {formData && urls && (
        <>
          <p>Form has been accepted</p>

          {formData.website === "chesscom" && (
            <MakeRequestsChessCom2
              formData={formData}
              playerProfileUrl={urls.profile}
              playerStatsUrl={urls.stats}
              gameArchiveURls={urls.archives}
              onDataRequest={handleRequestGet}
            />
          )}

          {formData.website === "lichess" && (
            <MakeRequestsLichess2
              formData={formData}
              playerProfileUrl={urls.profile}
              playerStatsUrl={urls.stats}
              gamesUrl={urls.games}
              onDataRequest={handleRequestGet}
            />
          )}
        </>
      )}
    </>
  );
};

export default RequestsMaster;
