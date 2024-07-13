import { useState } from 'react';

export const useInputState = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        setValue(parseInt(event.target.value));
    };

    const increment = () => setValue((prev) => prev + 1);
    const decrement = () => setValue((prev) => prev - 1);

    return [value, handleChange, increment, decrement];
};