"use client";
import { useDogsContext } from '@/hooks/useDogs'
import styles from './page.module.css'
import { notFound, useRouter } from 'next/navigation';
import Image from "next/image";

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

    const dogsPerPage: number = 2;

    const goToDogOrChangePage = (dogId: string, pageForward: boolean): void => {
        if (dogId) {
            router.replace(`/dogs/${dogId}`);
            return;
        }

        const newPage = pageForward ? state.page + 1 : state.page - 1;

        // Manually compute the next dogs before setting state
        const newDogs = state.dogs.slice(dogsPerPage * (newPage - 1), dogsPerPage * newPage);
        const newDogId = pageForward ? newDogs[0]?.id : newDogs[newDogs.length - 1]?.id;

        if (!newDogId) {
            console.warn("No dog found on the new page!");
            return;
        }

        setPage(newPage);
        router.replace(`/dogs/${newDogId}`);
    }


    if (currentDog) {
        const dogIndexInSearch: number = state.dogsInPage.findIndex((d) => d.id === currentDog.id);
        
        const prevDogId: string = state.dogsInPage[dogIndexInSearch - 1]?.id;
        const nextDogId: string = state.dogsInPage[dogIndexInSearch + 1]?.id;        
    
        return (
            <>
                <div className='flex gap-3 items-center my-4'>
                    {prevDogId || state.hasPrevPage ? <button className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`} onClick={() => goToDogOrChangePage(prevDogId, false)}>&lt;&lt;</button> : ''}
                    <p className='text-black'>Dog: {state.page * 2 + dogIndexInSearch - 1} out of {state.totalDogsForSearch}</p>
                    {nextDogId || state.hasNextPage ? <button className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`} onClick={() => goToDogOrChangePage(nextDogId, true)}>&gt;&gt;</button> : ''}
                </div>
                
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