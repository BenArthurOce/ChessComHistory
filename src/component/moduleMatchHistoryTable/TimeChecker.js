// import React from 'react';
// import { useParseTime, useIsTimeBetween } from './timeHooks';

// const TimeChecker = ({ timeString }) => {
//     const parsedTime = useParseTime(timeString, "Australia/Melbourne");
//     const isTimeInRange = useIsTimeBetween(parsedTime, "18:00:00", "21:00:00", "Australia/Melbourne");

//     return (
//         <div>
//             <p>Parsed Time: {parsedTime ? parsedTime.toLocaleTimeString("en-AU", { hour12: true }) : "Invalid Time"}</p>
//             <p>Is Time Between 6:00 PM and 9:00 PM? {isTimeInRange ? "Yes" : "No"}</p>
//         </div>
//     );
// };

// export default TimeChecker;
