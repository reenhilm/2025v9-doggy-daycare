import { DOGS_PER_PAGE } from "@/constants";
import { useState, useEffect } from "react";

interface DogNumTextProps {
    page: number;
    dogIndexInSearch: number;
    totalDogsForSearch: number;
}

export default function DogNumText({ propps }: { propps: DogNumTextProps }) {
    const [lastValidText, setLastValidText] = useState<string>("");

    useEffect(() => {
        if (propps.dogIndexInSearch !== -1) {
            const newText = `Dog: ${propps.page * DOGS_PER_PAGE + propps.dogIndexInSearch - 1} out of ${propps.totalDogsForSearch}`;
            
            const timeout = setTimeout(() => {
                setLastValidText(newText);
            }, 200);

            return () => clearTimeout(timeout);
        }
    }, [propps.page, propps.dogIndexInSearch, propps.totalDogsForSearch, DOGS_PER_PAGE]);

    return <p className="text-black">{lastValidText || "Dog: __ out of __"}</p>;
}
