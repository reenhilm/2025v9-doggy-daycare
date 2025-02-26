"use server";
import { fetchFromAPI } from "@/data-access/generic-api";
import { APIDog } from "@/interfaces/dogs";

export const fetchDogs = async () => {
    const res = await fetchFromAPI<APIDog[]>('https://majazocom.github.io/Data/dogs.json');
   
    if ("message" in res) {
        console.log("Error fetching data:", res.message);
        throw new Error(res.message);
    }
    return res;
};