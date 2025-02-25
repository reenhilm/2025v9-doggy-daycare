"use client";
import { useDogsContext } from '@/hooks/useDogs'
import styles from './page.module.css'
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface partialDog {
    id: string;
}

export default function Dog({ dogid }: { dogid: string }) {

    const { state, dispatch } = useDogsContext();
    console.log(state, dogid);
    const currentDog = state.dogs.find((i) => i.id === dogid);

const updateDog = (dog: partialDog, isPresent: boolean) => {
    dispatch({
        type: "UPDATE_DOG",
        payload: {
            id: dog.id,
            present: isPresent
        }
    });
}

if (currentDog)
    return (
        <>
            <div className="flex">
                <div className="flex flex-col m-auto items-center">
                    <header><Link href={"/dogs"}>Back to our dogs list</Link></header>
                    <main>                        
                        <div className={currentDog?.present ? styles.greenborder + ' flex flex-col border-8' : styles.redborder + ' flex flex-col border-8'}>
                            <div className='mx-25 my-20 border-2'>Image</div>
                            {currentDog?.name} {currentDog?.present ? 'Är närvarande' : 'Är inte närvarande'}
                            <button className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`} onClick={() => updateDog(currentDog!, true)}>Ändra till närvarande</button>
                            <button className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`} onClick={() => updateDog(currentDog!, false)}>Ändra till frånvarande</button>
                        </div>
                    </main>
                </div>
            </div>
        </>

    )
else
        return notFound();
}