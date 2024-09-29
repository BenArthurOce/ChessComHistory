import { useState, useEffect } from 'react';

export const useIsTimeBetween = (checkTime, startTimeString = "18:00:00", endTimeString = "21:00:00", timeZone = "Australia/Melbourne") => {
    const [isBetween, setIsBetween] = useState(false);

    useEffect(() => {
        if (checkTime) {
            // Parse the start and end times using the useParseTime hook
            const currentDate = new Date(); // Current date for bounds
            const [startHours, startMinutes, startSeconds] = new Date(`1970-01-01T${startTimeString}`).toLocaleTimeString("en-AU", {
                hour12: false,
                timeZone
            }).split(':');
            const [endHours, endMinutes, endSeconds] = new Date(`1970-01-01T${endTimeString}`).toLocaleTimeString("en-AU", {
                hour12: false,
                timeZone
            }).split(':');

            // Define start and end Date objects
            const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHours, startMinutes, startSeconds);
            const endTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endHours, endMinutes, endSeconds);

            // Check if the time falls between
            setIsBetween(checkTime >= startTime && checkTime <= endTime);
        }
    }, [checkTime, startTimeString, endTimeString, timeZone]);

    return isBetween;
};
