"use client";
import { DOGS_PER_PAGE } from "@/constants";
import { Dog, DogAction, DogState } from "@/interfaces/dogs";
import { createContext, Dispatch, ReactNode, useReducer } from "react";

export const DogsContext = createContext<{ state: DogState; dispatch: Dispatch<DogAction> } | undefined>(
    undefined
);

interface DogsProviderProps {
    children: ReactNode;
    initialDogs: Dog[];
}

export function DogsProvider({ children, initialDogs = [] }: DogsProviderProps) {

    const page:number = 1;

    let hasNextPage: boolean = false;

    let totalPagesForSearch = -1;
    let totalDogsForSearch = -1;
    let dogSlice: Dog[] = [];

    if (initialDogs.length !== 0) {
        //We have a result of more than 0 dogs
        totalPagesForSearch = Math.ceil(initialDogs.length / DOGS_PER_PAGE);
        totalDogsForSearch = initialDogs.length;
        //To get end-index it's actually DOGS_PER_PAGE * page. But since page is 1 it's not needed.
        dogSlice = initialDogs.slice(DOGS_PER_PAGE * (page - 1), DOGS_PER_PAGE);

        //This will not happen since we are in constructor-ish function and we have just set page to 1
        // if (page > 1)
        //     hasPrevPage = true;
        
        hasNextPage = evalHasNextPage(page, totalPagesForSearch);
    }
    
    const [state, dispatch] = useReducer(dogReducer, { 
        dogs: initialDogs,
        page: page,
        dogsInPage: dogSlice,
        totalPagesForSearch: totalPagesForSearch,
        totalDogsForSearch: totalDogsForSearch,
        hasPrevPage: false,
        hasNextPage: hasNextPage
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

            //TODO: This seems weird that I don't have the same dog-references in the dogs and the slice of dogs. So I have to update the same dog in both arrays
            return { ...state, dogs: updateDog(state.dogs, foundDog.id, action.payload.partialDog!), dogsInPage: updateDog(state.dogsInPage, foundDog.id, action.payload.partialDog!) };
        
        case "SET_PAGE":
            if (!action.payload.pageToSet)
                throw new Error("Correct payload (pageToSet) was not supplied for action");
            
            const pageToSet: number = Number(action.payload.pageToSet!);
            const newDogsInPage = state.dogs.slice(DOGS_PER_PAGE * (pageToSet - 1), DOGS_PER_PAGE * pageToSet);

            return {
                ...state,
                page: pageToSet,
                hasPrevPage: evalHasPrevPage(pageToSet),
                hasNextPage: evalHasNextPage(pageToSet, state.totalPagesForSearch),
                dogsInPage: newDogsInPage,
                totalDogsForSearch: state.totalDogsForSearch // Ensure this remains unchanged
            };
        default:
            return state;
    }
};

function evalHasPrevPage(page: number): boolean {
    return page > 1
}

function evalHasNextPage(page: number, totalPagesForSearch: number): boolean {
    return page < totalPagesForSearch
}


function updateDog(dogs: Dog[], id: string, updatedData: Partial<Dog>): Dog[] {
    return dogs.map(dog =>
        dog.id === id ? { ...dog, ...updatedData } : dog
    );
}