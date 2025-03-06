'use client';
import { useDogsContext } from '@/hooks/useDogs'
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link';
import Image from "next/image";

export default function DogList() {

    
    const { state, dispatch } = useDogsContext();

    const setPage = (page:number) => {
        dispatch({
            type: "SET_PAGE",
            payload: {
                pageToSet: page
            }
        });
    } 

    
    return (
        <div className="flex mb-15">
            <div className="flex flex-col m-auto items-center">
                <header>
                    <h1 className="text-3xl font-bold max-w-3xs drop-shadow-lg mt-15 text-center">
                        Our dogs
                    </h1>
                </header>
                <main className='flex flex-col justify-between'>
                    <div className='flex justify-between gap-15'>
                        <button className={`${styles.roundedbutton} rounded-lg shadow-md py-1 px-4 my-4`}>search</button>
                        <button className={`${styles.roundedbutton} rounded-lg shadow-md py-1 px-4 my-4`}>filter</button>
                    </div>
                    <div className='flex gap-3 items-center my-4'>
                        {state.hasPrevPage ? <button className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`} onClick={() => setPage(state.page - 1)}>Gå till sida {state.page - 1}</button> : ''}
                        <p className='text-black'>Page: {state.page} out of {state.totalPagesForSearch}</p>
                        {state.hasNextPage ? <button className={`${styles.roundedbutton} rounded-lg shadow-md py-3 px-4`} onClick={() => setPage(state.page + 1)}>Gå till sida {state.page + 1}</button> : ''}
                    </div>
                    <ul className='flex gap-3 flex-col'>
                        {state.dogsInPage.map((dog, index) =>
                            <li key={index} className={dog.present ? styles.greenborder + ' border-8' : styles.redborder + ' border-8'}>
                                <Link href={`/dogs/${dog.id}`}>
                                    <div>
                                        <div>
                                            <Image
                                                alt={dog.name}
                                                src={dog.img}
                                                width={400}
                                                height={400}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-start px-3'>
                                        <div>
                                            <h3 className='text-l uppercase font-bold text-black'>{dog.name}</h3>
                                            <p className='text-black'>{dog.breed}</p>
                                        </div>
                                        <div className='text-black'>{dog.age}y/o</div>
                                    </div>
                                    <div className='text-black my-4 px-3'>OWNER: {dog.owner}</div>
                                    <div className='text-black my-4 px-3'>Närvarostatus: {dog.present ? '✅ Närvarande' : '❌ Frånvarande"'}</div>
                                </Link>
                            </li>
                        )}
                    </ul>
                </main>
            </div>
        </div>
    )
}