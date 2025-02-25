"use client";
import { Dog, DogAction, DogState } from "@/interfaces/dogs";
import { createContext, Dispatch, ReactNode, useReducer } from "react";

export const DogsContext = createContext<{ state: DogState; dispatch: Dispatch<DogAction> } | undefined>(
    undefined
);

export function DogsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(dogReducer, { dogs: [{ id: '1', name: 'Bosse', breed: 'purebred puppy', owner: 'Pelle Stöök', age: 4, present: true }, { id: '2', name: 'Lola', breed: 'purebred puppy', owner: 'Pelle Stöök', age: 2, present: false }] });

    // useEffect(() => {}, []);
    return (
        <DogsContext.Provider value={{ state, dispatch }}>
            {children}
        </DogsContext.Provider>
    )
}

export const dogReducer = (state: DogState, action: DogAction): DogState => {
    switch (action.type) {
        case "UPDATE_DOG":
            const foundDog = state.dogs.find((i) => i.id === action.payload.id);
            if (!foundDog)
                throw new Error("Did not find dog, could not update");

            return { ...state, dogs: updateDog(state.dogs, foundDog.id, action.payload) };
        default:
            return state;
    }
};

function updateDog(dogs: Dog[], id: string, updatedData: Partial<Dog>): Dog[] {
    return dogs.map(dog =>
        dog.id === id ? { ...dog, ...updatedData } : dog
    );
}