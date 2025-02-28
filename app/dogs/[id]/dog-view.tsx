"use client";
import { useDogsContext } from '@/hooks/useDogs'
import styles from './page.module.css'
import { notFound } from 'next/navigation';
import Image from "next/image";

interface partialDog {
    id: string;
}

export default function Dog({ dogid }: { dogid: string }) {

    const { state, dispatch } = useDogsContext();
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

if (currentDog)
    return (
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
    )
else
        return notFound();
}