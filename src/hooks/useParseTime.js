import { useState, useEffect } from 'react';

export const useParseTime = (timeString, timeZone = "Australia/Melbourne") => {
    const [parsedTime, setParsedTime] = useState(null);

    useEffect(() => {
        if (timeString) {
            const currentDate = new Date(); // Use current date for context
            const [hours, minutes, seconds] = new Date(`1970-01-01T${timeString}`).toLocaleTimeString("en-AU", {
                hour12: false,
                timeZone
            }).split(':');
            
            // Create a new Date object with the current date and the parsed time
            const time = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                hours,
                minutes,
                seconds
            );
            setParsedTime(time);
        }
    }, [timeString, timeZone]);

    return parsedTime;
};
