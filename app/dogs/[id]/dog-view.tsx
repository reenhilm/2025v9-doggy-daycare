"use client";
import { useDogsContext } from '@/hooks/useDogs'
import styles from './page.module.css'
import { notFound, useRouter } from 'next/navigation';
import Image from "next/image";
import { useEffect, useRef } from 'react';

interface partialDog {
    id: string;
}

export default function Dog({ dogid }: { dogid: string }) {

    const { state, dispatch } = useDogsContext();
    const router = useRouter();
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

    const pageForwardRef = useRef<boolean | null>(null);

    useEffect(() => {
        if (state.dogsInPage.length > 0 && pageForwardRef.current !== null) {
            const newDogId = pageForwardRef.current
                ? state.dogsInPage[0].id // First dog of new page
                : state.dogsInPage[state.dogsInPage.length - 1].id; // Last dog of new page

            router.push(`/dogs/${newDogId}`);
            pageForwardRef.current = null; // Reset after use
        }
    }, [router, state.dogsInPage, state.page]); // Runs when state.page updates

    const goToDogOrChangePage = (dogId: string, pageForward: boolean): void => {
        if (dogId)
            router.push(`/dogs/${dogId}`);
        else {
            pageForwardRef.current = pageForward;
            setPage(pageForward ? state.page + 1 : state.page - 1);    
        }
    }


    if (currentDog) {
        const dogIndexInSearch: number = state.dogsInPage.findIndex((d) => d.id === currentDog.id);
        
        const prevDogId: string = state.dogsInPage[dogIndexInSearch - 1]?.id;
        const nextDogId: string = state.dogsInPage[dogIndexInSearch + 1]?.id;        
    
        return (
            <>
                {prevDogId || state.hasPrevPage ? <button className={`${styles.roundedbutton} rounded-lg shadow-md`} onClick={() => goToDogOrChangePage(prevDogId, false)}>&lt;&lt;Previous dog</button> : ''}
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
                {nextDogId || state.hasNextPage ? <button className={`${styles.roundedbutton} rounded-lg shadow-md`} onClick={() => goToDogOrChangePage(nextDogId, true)}>&gt;&gt;Next dog</button> : ''}
            </> 
        )
    }    
    else
            return notFound();
}