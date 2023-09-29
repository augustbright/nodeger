import { useEffect, useState } from "react";

export const DotLoader = ({dotsNumber = 3}: {
    dotsNumber?: number
}) => {
    const [dots, setDots] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((dots) => (dots + 1) % (dotsNumber + 1));
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return <>{'.'.repeat(dots)}</>;
};