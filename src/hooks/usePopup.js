import { useState } from 'react';

export const usePopup = () => {
    const [popupData, setPopupData] = useState(null);

    const openPopup = (data) => setPopupData(data);
    const closePopup = () => setPopupData(null);

    return [popupData, openPopup, closePopup];
};