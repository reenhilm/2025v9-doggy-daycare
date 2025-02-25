"use client";
import { DogsContext } from "@/context/dogs-context"
import { useContext } from "react"

export const useDogsContext = () => {
    const context = useContext(DogsContext);
    if (!context) {
        throw new Error("useDogsContext needs to be used within a DogsProvider")
    }
    return context;
}

