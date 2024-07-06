// useParseFEN

/* 



*/

import { useState, useEffect } from 'react';

const useParseFEN = (hookInput) => {
    const [hookOutput, setHookOutput] = useState([])

    useEffect(() => {
        if (hookInput === null || hookInput === undefined || hookInput === "") {
            return;
        }

        setHookOutput(parseFEN(hookInput))

    }, [hookInput]);


    const parseFEN = (fen) => {
        const isCapitalized = (char) => /[A-Z]/.test(char);
        const fenParts = fen.split(" ");
        const boardLayout = fenParts[0];
        const rows = boardLayout.split("/");
        const result = [];
    
        rows.forEach((row) => {
            const newRow = [];
            const splitRow = row.split("");
    
            splitRow.forEach((char) => {
                if (!isNaN(char)) {
                    for (let j = 0; j < parseInt(char, 10); j++) {
                        newRow.push(null);
                    }
                } else {
                    newRow.push(char);
                }
            });
            result.push(newRow);
        });
        return result;
    };

    return hookOutput;
};

export default useParseFEN;
