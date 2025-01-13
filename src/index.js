import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChessApp from './component/ChessApp';

import EngineDebug from './engine/engineDebug';



import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

        <Router>
            <ChessApp />
        </Router>


);

{/* <Router>
    <EngineDebug />
</Router> */}


/* 
Additional APIs to add:


1)
https://api.chess.com/pub/player/BenArthurOCE/stats
Description: Get ratings, win/loss, and other stats about a player's game play, tactics, lessons and Puzzle Rush score. 
Includes current rating, best rating and best game
https://api.chess.com/pub/player/JackSmith_GCC/matches



2)
https://api.chess.com/pub/country/AUS/players
Description: List of usernames for players who identify themselves as being in this country




3) 
Detailed "about me"
https://www.chess.com/callback/user/popup/BenArthurOCE



4) Detailed match information
https://www.chess.com/game/live/15360860817
*/
// 