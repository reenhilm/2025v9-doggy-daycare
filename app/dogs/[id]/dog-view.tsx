"use client";
import { useDogsContext } from '@/hooks/useDogs'
import styles from './page.module.css'
import { notFound, useRouter } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';

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

    const goToDogOrChangePage = (dogId: string, pageForward: boolean): void => {
        console.log('in function', dogId);
        if (dogId)
            router.push(`/dogs/${dogId}`)
        else if (pageForward)
        {
            setPage(state.page + 1);           
            //Get first dog of new page
            //do router push to dog
            router.push(`/dogs/${state.dogsInPage[0].id}`) 
        }
        else
        {
            setPage(state.page - 1);
            //Get last dog of new page
            //do router push to dog
            router.push(`/dogs/${state.dogsInPage[state.dogsInPage.length - 1].id}`)             
        }            
    }


    if (currentDog) {
        const dogIndexInSearch: number = state.dogsInPage.findIndex((d) => d.id === currentDog.id);
        
        const prevDogId: string = state.dogsInPage[dogIndexInSearch - 1]?.id;
        const nextDogId: string = state.dogsInPage[dogIndexInSearch + 1]?.id;        
    
        return (
            <>
                {prevDogId || state.hasPrevPage ? <button className={`${styles.roundedbutton} rounded-lg shadow-md`} onClick={() => goToDogOrChangePage(nextDogId, false)}>&lt;&lt;Previous dog</button> : ''}
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