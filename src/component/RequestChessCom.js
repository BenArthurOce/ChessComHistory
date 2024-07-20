import React, { useEffect } from "react";

// Components
import LoadingChessCom from "./LoadingChessCom";

// Custom Hooks
import useAPIChessCom from "../hooksSpecific/useAPIChessCom";
import useBuildMatchesChessCom from "../hooksSpecific/useBuildMatchesChessCom";

const RequestChessCom = (props) => {

    //
    // Props
    //
    const { username, lastNGames, onDataRequest } = props;

    const urls = [
        `https://api.chess.com/pub/player/${username}/games/2024/07`,
        `https://api.chess.com/pub/player/${username}/games/2024/06`,
        `https://api.chess.com/pub/player/${username}/games/2024/05`,
        `https://api.chess.com/pub/player/${username}/games/2024/04`,
        `https://api.chess.com/pub/player/${username}/games/2024/03`,
        `https://api.chess.com/pub/player/${username}/games/2024/02`,
        `https://api.chess.com/pub/player/${username}/games/2024/01`,

        `https://api.chess.com/pub/player/${username}/games/2023/12`,
        `https://api.chess.com/pub/player/${username}/games/2023/11`,
        `https://api.chess.com/pub/player/${username}/games/2023/10`,
        `https://api.chess.com/pub/player/${username}/games/2023/09`,
        `https://api.chess.com/pub/player/${username}/games/2023/08`,
        `https://api.chess.com/pub/player/${username}/games/2023/07`,
        `https://api.chess.com/pub/player/${username}/games/2023/06`,
        `https://api.chess.com/pub/player/${username}/games/2023/05`,
        `https://api.chess.com/pub/player/${username}/games/2023/04`,
        `https://api.chess.com/pub/player/${username}/games/2023/03`,
        `https://api.chess.com/pub/player/${username}/games/2023/02`,
        `https://api.chess.com/pub/player/${username}/games/2023/01`,

        `https://api.chess.com/pub/player/${username}/games/2022/12`,
        `https://api.chess.com/pub/player/${username}/games/2022/11`,
        `https://api.chess.com/pub/player/${username}/games/2022/10`,
        `https://api.chess.com/pub/player/${username}/games/2022/09`,
        `https://api.chess.com/pub/player/${username}/games/2022/08`,
        `https://api.chess.com/pub/player/${username}/games/2022/07`,
        `https://api.chess.com/pub/player/${username}/games/2022/06`,
        `https://api.chess.com/pub/player/${username}/games/2022/05`,
        `https://api.chess.com/pub/player/${username}/games/2022/04`,
        `https://api.chess.com/pub/player/${username}/games/2022/03`,
        `https://api.chess.com/pub/player/${username}/games/2022/02`,
        `https://api.chess.com/pub/player/${username}/games/2022/01`,

        `https://api.chess.com/pub/player/${username}/games/2021/12`,
        `https://api.chess.com/pub/player/${username}/games/2021/11`,
        `https://api.chess.com/pub/player/${username}/games/2021/10`,
        `https://api.chess.com/pub/player/${username}/games/2021/09`,
        `https://api.chess.com/pub/player/${username}/games/2021/08`,
        `https://api.chess.com/pub/player/${username}/games/2021/07`,
        `https://api.chess.com/pub/player/${username}/games/2021/06`,
        `https://api.chess.com/pub/player/${username}/games/2021/05`,
        `https://api.chess.com/pub/player/${username}/games/2021/04`,
        `https://api.chess.com/pub/player/${username}/games/2021/03`,
        `https://api.chess.com/pub/player/${username}/games/2021/02`,
        `https://api.chess.com/pub/player/${username}/games/2021/01`,

        `https://api.chess.com/pub/player/${username}/games/2020/12`,
        `https://api.chess.com/pub/player/${username}/games/2020/11`,
        `https://api.chess.com/pub/player/${username}/games/2020/10`,
        `https://api.chess.com/pub/player/${username}/games/2020/09`,
        `https://api.chess.com/pub/player/${username}/games/2020/08`,
        `https://api.chess.com/pub/player/${username}/games/2020/07`,
        `https://api.chess.com/pub/player/${username}/games/2020/06`,
        `https://api.chess.com/pub/player/${username}/games/2020/05`,
        `https://api.chess.com/pub/player/${username}/games/2020/04`,
        `https://api.chess.com/pub/player/${username}/games/2020/03`,
        `https://api.chess.com/pub/player/${username}/games/2020/02`,
        `https://api.chess.com/pub/player/${username}/games/2020/01`,
    ];

    //
    // Hooks
    //
    const { outputArray, loading, progress, totalEndpoints } = useAPIChessCom(urls, lastNGames);
    const hookParsedMatches = useBuildMatchesChessCom(outputArray, username);

    //
    // Effects
    //
    useEffect(() => {
        if (!outputArray || outputArray.length === 0) return;
        if (!hookParsedMatches || hookParsedMatches.length === 0) return;
        onDataRequest(hookParsedMatches);
    }, [outputArray, hookParsedMatches]);

    return (
        <>
        {loading && (
            <LoadingChessCom progress={progress} total={totalEndpoints} gamesremaining={lastNGames - outputArray.length} />
        )}
        </>
    )
};

export default RequestChessCom;
