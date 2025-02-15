// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';


// import useFetchUsername from '../hooksSpecific/HooksAPI/useFetchUsername';
// import useFetchUserStats from '../hooksSpecific/HooksAPI/useFetchUserStats';
// import useFetchGameArchiveEndpoints from '../hooksSpecific/HooksAPI/useFetchGameArchiveEndpoints';
// import useFetchGameArchives from '../hooksSpecific/HooksAPI/useFetchGameArchives';

// const ButtonContainer = styled.div
// `
//     display: flex;
//     justify-content: center;
//     gap: 10px;
//     margin: 20px 0;
// `
// ;

// const StatContainer = styled.div
// `
//     display: flex;
//     justify-content: space-around;
//     margin: 20px 0;
// `
// ;

// const StatBox = styled.div
// `
//     background-color: #f9f9f9;
//     border: 1px solid #ddd;
//     border-radius: 8px;
//     padding: 20px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     text-align: center;
// `
// ;


// function EngineDebug() {
//     const [username, setUsername] = useState(null);
//     const [numberOfGames, setNumberOfGames] = useState(null);
//     const [gameEndpoints, setGameEndpoints] = useState(null);

//     const { data, error, loading } = useFetchUsername(username);
//     const { userStats, statsError, statsLoading } = useFetchUserStats(username);
//     const { archiveEndpoints, endpointsError, endpointsLoading } = useFetchGameArchiveEndpoints(username);
//     const { outputArray, loadingGames, progressGames } = useFetchGameArchives(gameEndpoints, numberOfGames);

//     useEffect(() => {


//         if (!username) {return};
//         if (!numberOfGames) {return};
        

//         if (username) {
//             console.log(`Fetching data for username: ${username}`);
//             console.log(`Fetching data for numberOfGames: ${numberOfGames}`);
//         }
    
//         console.log('Username:', username);
//         console.log('Archive Endpoints:', archiveEndpoints);
    
//         if (archiveEndpoints && archiveEndpoints.archives?.length > 0) {
//             // Set the first archive endpoint

//             const a = archiveEndpoints.archives.reverse()
//             const b = a.slice(0, 5)

//             console.log(b)

//             setGameEndpoints(b);
//             console.log('First Archive Endpoint:', a[0]);

//             console.log(gameEndpoints)
//         }
//     }, [username, numberOfGames]);
    

//     const onButton1Click = () => {
//         setUsername('BenArthurOCE');
//     };

//     const onButton2Click = () => {
//         setNumberOfGames(500)
//     };

//     const onButton3Click = () => {
//         console.log('User Name:', data);
//         console.log('User Error:', error);
//         console.log('User Loading:', loading);
//     };

//     const onButton4Click = () => {
//         console.log('User stats:', userStats);
//         console.log('Stats Error:', statsError);
//         console.log('Stats Loading:', statsLoading);
//     };

//     const onButton5Click = () => {
//         console.log('Game archive endpoints:', archiveEndpoints);
//         console.log('Archives Error:', endpointsError);
//         console.log('Archives Loading:', endpointsLoading);
//     };

//     const onButton6Click = () => {
//         console.log('Output Array:', outputArray);
//         console.log('Loading Games:', loadingGames);
//         console.log('Progress Games:', progressGames);
//     };

//     const onButton7Click = () => {

//         // Test an actual run
//         setUsername('BenArthurOCE');
//         setNumberOfGames(500);
        


//     };

//     const onButton8Click = () => {
//         // console.log(archiveEndpoints)
        
//         console.log('Output Array:', outputArray);
//     };


//     return (
//         <>
//             <h1 style={{ textAlign: "center" }}>Debugging</h1>

//             <ButtonContainer>
//                 <button onClick={() => onButton1Click()}>Button 1</button>

//                 <button onClick={() => onButton2Click()}>Button 2</button>

//                 <button onClick={() => onButton3Click()}>Button 3</button>

//                 <button onClick={() => onButton4Click()}>Button 4</button>

//                 <button onClick={() => onButton5Click()}>Button 5</button>

//                 <button onClick={() => onButton6Click()}>Button 6</button>

//                 <button onClick={() => onButton7Click()}>Button 7</button>

//                 <button onClick={() => onButton8Click()}>Button 8</button>

//             </ButtonContainer>

//             <StatContainer>
//                 <StatBox>

//                 </StatBox>
//             </StatContainer>


//         </>
//     );
// };

// export default EngineDebug;