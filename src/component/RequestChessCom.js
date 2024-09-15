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
        `https://api.chess.com/pub/player/${username}/games/2024/09`,
        `https://api.chess.com/pub/player/${username}/games/2024/05`,
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

        `https://api.chess.com/pub/player/${username}/games/2019/12`,
        `https://api.chess.com/pub/player/${username}/games/2019/11`,
        `https://api.chess.com/pub/player/${username}/games/2019/10`,
        `https://api.chess.com/pub/player/${username}/games/2019/09`,
        `https://api.chess.com/pub/player/${username}/games/2019/08`,
        `https://api.chess.com/pub/player/${username}/games/2019/07`,
        `https://api.chess.com/pub/player/${username}/games/2019/06`,
        `https://api.chess.com/pub/player/${username}/games/2019/05`,
        `https://api.chess.com/pub/player/${username}/games/2019/04`,
        `https://api.chess.com/pub/player/${username}/games/2019/03`,
        `https://api.chess.com/pub/player/${username}/games/2019/02`,
        `https://api.chess.com/pub/player/${username}/games/2019/01`,

        `https://api.chess.com/pub/player/${username}/games/2018/12`,
        `https://api.chess.com/pub/player/${username}/games/2018/11`,
        `https://api.chess.com/pub/player/${username}/games/2018/10`,
        `https://api.chess.com/pub/player/${username}/games/2018/09`,
        `https://api.chess.com/pub/player/${username}/games/2018/08`,
        `https://api.chess.com/pub/player/${username}/games/2018/07`,
        `https://api.chess.com/pub/player/${username}/games/2018/06`,
        `https://api.chess.com/pub/player/${username}/games/2018/05`,
        `https://api.chess.com/pub/player/${username}/games/2018/04`,
        `https://api.chess.com/pub/player/${username}/games/2018/03`,
        `https://api.chess.com/pub/player/${username}/games/2018/02`,
        `https://api.chess.com/pub/player/${username}/games/2018/01`,

        `https://api.chess.com/pub/player/${username}/games/2017/12`,
        `https://api.chess.com/pub/player/${username}/games/2017/11`,
        `https://api.chess.com/pub/player/${username}/games/2017/10`,
        `https://api.chess.com/pub/player/${username}/games/2017/09`,
        `https://api.chess.com/pub/player/${username}/games/2017/08`,
        `https://api.chess.com/pub/player/${username}/games/2017/07`,
        `https://api.chess.com/pub/player/${username}/games/2017/06`,
        `https://api.chess.com/pub/player/${username}/games/2017/05`,
        `https://api.chess.com/pub/player/${username}/games/2017/04`,
        `https://api.chess.com/pub/player/${username}/games/2017/03`,
        `https://api.chess.com/pub/player/${username}/games/2017/02`,
        `https://api.chess.com/pub/player/${username}/games/2017/01`,

        `https://api.chess.com/pub/player/${username}/games/2016/12`,
        `https://api.chess.com/pub/player/${username}/games/2016/11`,
        `https://api.chess.com/pub/player/${username}/games/2016/10`,
        `https://api.chess.com/pub/player/${username}/games/2016/09`,
        `https://api.chess.com/pub/player/${username}/games/2016/08`,
        `https://api.chess.com/pub/player/${username}/games/2016/07`,
        `https://api.chess.com/pub/player/${username}/games/2016/06`,
        `https://api.chess.com/pub/player/${username}/games/2016/05`,
        `https://api.chess.com/pub/player/${username}/games/2016/04`,
        `https://api.chess.com/pub/player/${username}/games/2016/03`,
        `https://api.chess.com/pub/player/${username}/games/2016/02`,
        `https://api.chess.com/pub/player/${username}/games/2016/01`,

        `https://api.chess.com/pub/player/${username}/games/2015/12`,
        `https://api.chess.com/pub/player/${username}/games/2015/11`,
        `https://api.chess.com/pub/player/${username}/games/2015/10`,
        `https://api.chess.com/pub/player/${username}/games/2015/09`,
        `https://api.chess.com/pub/player/${username}/games/2015/08`,
        `https://api.chess.com/pub/player/${username}/games/2015/07`,
        `https://api.chess.com/pub/player/${username}/games/2015/06`,
        `https://api.chess.com/pub/player/${username}/games/2015/05`,
        `https://api.chess.com/pub/player/${username}/games/2015/04`,
        `https://api.chess.com/pub/player/${username}/games/2015/03`,
        `https://api.chess.com/pub/player/${username}/games/2015/02`,
        `https://api.chess.com/pub/player/${username}/games/2015/01`,

        `https://api.chess.com/pub/player/${username}/games/2014/12`,
        `https://api.chess.com/pub/player/${username}/games/2014/11`,
        `https://api.chess.com/pub/player/${username}/games/2014/10`,
        `https://api.chess.com/pub/player/${username}/games/2014/09`,
        `https://api.chess.com/pub/player/${username}/games/2014/08`,
        `https://api.chess.com/pub/player/${username}/games/2014/07`,
        `https://api.chess.com/pub/player/${username}/games/2014/06`,
        `https://api.chess.com/pub/player/${username}/games/2014/05`,
        `https://api.chess.com/pub/player/${username}/games/2014/04`,
        `https://api.chess.com/pub/player/${username}/games/2014/03`,
        `https://api.chess.com/pub/player/${username}/games/2014/02`,
        `https://api.chess.com/pub/player/${username}/games/2014/01`,

        `https://api.chess.com/pub/player/${username}/games/2013/12`,
        `https://api.chess.com/pub/player/${username}/games/2013/11`,
        `https://api.chess.com/pub/player/${username}/games/2013/10`,
        `https://api.chess.com/pub/player/${username}/games/2013/09`,
        `https://api.chess.com/pub/player/${username}/games/2013/08`,
        `https://api.chess.com/pub/player/${username}/games/2013/07`,
        `https://api.chess.com/pub/player/${username}/games/2013/06`,
        `https://api.chess.com/pub/player/${username}/games/2013/05`,
        `https://api.chess.com/pub/player/${username}/games/2013/04`,
        `https://api.chess.com/pub/player/${username}/games/2013/03`,
        `https://api.chess.com/pub/player/${username}/games/2013/02`,
        `https://api.chess.com/pub/player/${username}/games/2013/01`,

        `https://api.chess.com/pub/player/${username}/games/2012/12`,
        `https://api.chess.com/pub/player/${username}/games/2012/11`,
        `https://api.chess.com/pub/player/${username}/games/2012/10`,
        `https://api.chess.com/pub/player/${username}/games/2012/09`,
        `https://api.chess.com/pub/player/${username}/games/2012/08`,
        `https://api.chess.com/pub/player/${username}/games/2012/07`,
        `https://api.chess.com/pub/player/${username}/games/2012/06`,
        `https://api.chess.com/pub/player/${username}/games/2012/05`,
        `https://api.chess.com/pub/player/${username}/games/2012/04`,
        `https://api.chess.com/pub/player/${username}/games/2012/03`,
        `https://api.chess.com/pub/player/${username}/games/2012/02`,
        `https://api.chess.com/pub/player/${username}/games/2012/01`,

        `https://api.chess.com/pub/player/${username}/games/2011/12`,
        `https://api.chess.com/pub/player/${username}/games/2011/11`,
        `https://api.chess.com/pub/player/${username}/games/2011/10`,
        `https://api.chess.com/pub/player/${username}/games/2011/09`,
        `https://api.chess.com/pub/player/${username}/games/2011/08`,
        `https://api.chess.com/pub/player/${username}/games/2011/07`,
        `https://api.chess.com/pub/player/${username}/games/2011/06`,
        `https://api.chess.com/pub/player/${username}/games/2011/05`,
        `https://api.chess.com/pub/player/${username}/games/2011/04`,
        `https://api.chess.com/pub/player/${username}/games/2011/03`,
        `https://api.chess.com/pub/player/${username}/games/2011/02`,
        `https://api.chess.com/pub/player/${username}/games/2011/01`,

        `https://api.chess.com/pub/player/${username}/games/2010/12`,
        `https://api.chess.com/pub/player/${username}/games/2010/11`,
        `https://api.chess.com/pub/player/${username}/games/2010/10`,
        `https://api.chess.com/pub/player/${username}/games/2010/09`,
        `https://api.chess.com/pub/player/${username}/games/2010/08`,
        `https://api.chess.com/pub/player/${username}/games/2010/07`,
        `https://api.chess.com/pub/player/${username}/games/2010/06`,
        `https://api.chess.com/pub/player/${username}/games/2010/05`,
        `https://api.chess.com/pub/player/${username}/games/2010/04`,
        `https://api.chess.com/pub/player/${username}/games/2010/03`,
        `https://api.chess.com/pub/player/${username}/games/2010/02`,
        `https://api.chess.com/pub/player/${username}/games/2010/01`,

        `https://api.chess.com/pub/player/${username}/games/2009/12`,
        `https://api.chess.com/pub/player/${username}/games/2009/11`,
        `https://api.chess.com/pub/player/${username}/games/2009/10`,
        `https://api.chess.com/pub/player/${username}/games/2009/09`,
        `https://api.chess.com/pub/player/${username}/games/2009/08`,
        `https://api.chess.com/pub/player/${username}/games/2009/07`,
        `https://api.chess.com/pub/player/${username}/games/2009/06`,
        `https://api.chess.com/pub/player/${username}/games/2009/05`,
        `https://api.chess.com/pub/player/${username}/games/2009/04`,
        `https://api.chess.com/pub/player/${username}/games/2009/03`,
        `https://api.chess.com/pub/player/${username}/games/2009/02`,
        `https://api.chess.com/pub/player/${username}/games/2009/01`,
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
