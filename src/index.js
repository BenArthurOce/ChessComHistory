import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import ChessApp from './component/ChessApp';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<StrictMode>
  <ChessApp />
</StrictMode>
);

//https://api.chess.com/pub/player/BenArthurOCE/games/2024/04
