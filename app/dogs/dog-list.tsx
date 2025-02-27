'use client';
import { useDogsContext } from '@/hooks/useDogs'
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link';
import { Dog } from '@/interfaces/dogs';
import Image from "next/image";

export default function DogList() {
    const dogPerPage = 2;
    const { state } = useDogsContext();
    const dogSlice: Dog[] = state.dogs.slice(0, dogPerPage);
    return (
        <div className="flex">
            <div className="flex flex-col m-auto items-center">
                <header>
                    <h1 className="text-3xl font-bold max-w-3xs drop-shadow-lg mt-15 text-center">
                        Our dogs
                    </h1>
                </header>
                <main>
                    <div className='flex justify-between gap-15'>
                        <button className={`${styles.roundedbutton} rounded-lg shadow-md py-1 px-4 my-4`}>search</button>
                        <button className={`${styles.roundedbutton} rounded-lg shadow-md py-1 px-4 my-4`}>filter</button>
                    </div>
                    Page: {state.page} out of {Math.ceil(state.dogs.length / dogPerPage)}
                    <ul className='flex gap-3 flex-col'>
                        {dogSlice.map((dog, index) =>
                            <li key={index} className={dog.present ? styles.greenborder + ' border-8' : styles.redborder + ' border-8'}>
                                <Link href={`/dogs/${dog.id}`}>
                                    <div>
                                        <div className=''>
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
                                        <div className='border-2 text-black'>{dog.age}y/o</div>
                                    </div>
                                    <div className='text-black my-4 px-3'>OWNER: {dog.owner}</div>
                                </Link>
                            </li>
                        )}
                    </ul>
                </main>
            </div>
        </div>
    )
}