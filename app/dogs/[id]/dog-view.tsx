"use client";
import { useDogsContext } from '@/hooks/useDogs'
import styles from './page.module.css'
import { notFound, useRouter } from 'next/navigation';
import Image from "next/image";
import { useLayoutEffect, useRef } from 'react';

interface partialDog {
    id: string;
}

export default function Dog({ dogid }: { dogid: string }) {

    const { state, dispatch } = useDogsContext();
    const router = useRouter();
    const pageForwardRef = useRef<boolean | null>(null);

    const currentDog = state.dogs.find((i) => i.id === dogid);

    const updateDog = (dog: partialDog, isPresent: boolean) => {
        dispatch({
            type: "UPDATE_DOG",
            payload: {
                partialDog: {
                    id: dog.id,
                    present: isPresent
                }
            }
        });
    }

    const setPage = (page: number) => {
        dispatch({
            type: "SET_PAGE",
            payload: {
                pageToSet: page
            }
        });
    }    

    const goToDogOrChangePage = (dogId: string, pageForward: boolean): void => {
        if (dogId) {
            router.replace(`/dogs/${dogId}`);
            return;
        }

        const newPage = pageForward ? state.page + 1 : state.page - 1;
        pageForwardRef.current = pageForward;
        setPage(newPage);
    }

    useLayoutEffect(() => {
        if (state.dogsInPage.length > 0 && pageForwardRef.current !== null) {
            const newDogId = pageForwardRef.current
                ? state.dogsInPage[0]?.id
                : state.dogsInPage[state.dogsInPage.length - 1]?.id;

            if (newDogId) {
                router.replace(`/dogs/${newDogId}`);
            }
            pageForwardRef.current = null; //Reset
        }
    }, [state.page, state.dogsInPage]); // Wait for state.page and state.dogsInPage to change


    if (currentDog) {
        //if we enter by direct url http://localhost:3000/dogs/ELN562847 we have no idea of what page this dog is on. If it is in first page everything works but not if it's on later pages.
        //TODO if this is the case find dog in state.dogs and calculate what page we are at and set page first, maybe do this early in the component as an "return early thing"
        //Or we could commit a search on the exakt dog-name or ID so the search is small, thus creating few pages

        const dogIndexInSearch: number = state.dogsInPage.findIndex((d) => d.id === currentDog.id);
        console.log('test', dogIndexInSearch);
        
        const prevDogId: string = state.dogsInPage[dogIndexInSearch - 1]?.id;
        const nextDogId: string = state.dogsInPage[dogIndexInSearch + 1]?.id;        
    
        return (
            <>
                {
                    // dogIndexInSearch === -1 ? `dogIndexInSearch: ${dogIndexInSearch} currentDog.id: ${currentDog.id} state.dogsInPage: ${state.dogsInPage.length}` :
                    dogIndexInSearch === -1 ? '' :
                    <div className='flex gap-3 items-center my-4'>
                        {prevDogId || state.hasPrevPage ? <button className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`} onClick={() => goToDogOrChangePage(prevDogId, false)}>&lt;&lt;</button> : ''}
                        <p className='text-black'>Dog: {state.page * 2 + dogIndexInSearch - 1} out of {state.totalDogsForSearch}</p>
                        {nextDogId || state.hasNextPage ? <button className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`} onClick={() => goToDogOrChangePage(nextDogId, true)}>&gt;&gt;</button> : ''}
                    </div>
                }
                
                <div className={currentDog?.present ? styles.greenborder + ' flex flex-col border-8' : styles.redborder + ' flex flex-col border-8'}>
                    <div className='border-2'>
                        <Image
                            alt={currentDog.name}
                            src={currentDog.img}
                            width={400}
                            height={400}
                        />                        
                    </div>
                    {currentDog.name} {currentDog?.present ? 'Är närvarande' : 'Är inte närvarande'}
                    <button className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`} onClick={() => updateDog(currentDog, true)}>Ändra till närvarande</button>
                    <button className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`} onClick={() => updateDog(currentDog, false)}>Ändra till frånvarande</button>
                </div>
            </> 
        )
    }    
    else
        return notFound();
}