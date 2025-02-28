"use client";
import { Dog, DogAction, DogState } from "@/interfaces/dogs";
import { createContext, Dispatch, ReactNode, useReducer } from "react";

export const DogsContext = createContext<{ state: DogState; dispatch: Dispatch<DogAction> } | undefined>(
    undefined
);

interface DogsProviderProps {
    children: ReactNode;
    initialDogs: Dog[];
}

const dogsPerPage = 2;

export function DogsProvider({ children, initialDogs = [] }: DogsProviderProps) {

    const page = 1;

    let totalPagesForSearch = -1;
    let dogSlice: Dog[] = [];

    if (initialDogs.length !== 0) {
        totalPagesForSearch = Math.ceil(initialDogs.length / dogsPerPage);
        //To get end-index it's actually dogsPerPage * page. But since page is 1 it's not needed.
        dogSlice = initialDogs.slice(dogsPerPage * (page - 1), dogsPerPage);
    }
    
    const [state, dispatch] = useReducer(dogReducer, { 
        dogs: initialDogs,
        page: page,
        dogsInPage: dogSlice,
        totalPagesForSearch: totalPagesForSearch
    });
       
    return (
        <DogsContext.Provider value={{ state, dispatch }}>           
            {children}
        </DogsContext.Provider>
    )
}

export const dogReducer = (state: DogState, action: DogAction): DogState => {
    switch (action.type) {
        case "UPDATE_DOG":
            if (!action.payload.partialDog)
                throw new Error("Correct payload (partialDog) was not supplied for action");

            const foundDog = state.dogs.find((i) => i.id === action.payload.partialDog!.id);
            if (!foundDog)
                throw new Error("Did not find dog, could not update");

            return { ...state, dogs: updateDog(state.dogs, foundDog.id, action.payload.partialDog!) };
        
        case "SET_PAGE":
            if (!action.payload.pageToSet)
                throw new Error("Correct payload (pageToSet) was not supplied for action");
            
            const pageToSet: number = Number(action.payload.pageToSet!);
            return { ...state, page: pageToSet, dogsInPage: state.dogs.slice(dogsPerPage * (pageToSet - 1), dogsPerPage * pageToSet) };
        default:
            return state;
    }
};

function updateDog(dogs: Dog[], id: string, updatedData: Partial<Dog>): Dog[] {
    return dogs.map(dog =>
        dog.id === id ? { ...dog, ...updatedData } : dog
    );
}