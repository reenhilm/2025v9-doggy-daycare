import styles from './page.module.css'

interface dog {
    name: string;
    breed: string;
    owner: string;
    age: number;
    present: boolean;
}

export default function Dogs() {

    const dogs: dog[] = [
        { name: 'Bosse', breed: 'purebred puppy', owner: 'Pelle Stöök', age: 4, present: true },
        { name: 'Lola', breed: 'purebred puppy', owner: 'Pelle Stöök', age: 2, present: false }
    ];
    return (
        <>
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
                        <ul className='flex gap-3 flex-col'>
                            {dogs.map((dog, index) =>
                                <li key={index} className={dog.present ? styles.greenborder + ' border-8' : styles.redborder + ' border-8'}>
                                    <div>
                                        <div className='mx-25 my-20'>Image</div>
                                    </div>
                                    <div className='flex justify-between items-start px-3'>
                                        <div>
                                            <h3 className='text-l uppercase font-bold text-black'>{dog.name}</h3>
                                            <p className='text-black'>{dog.breed}</p>
                                        </div>
                                        <div className='border-2 text-black'>{dog.age}y/o</div>
                                    </div>
                                    <div className='text-black my-4 px-3'>OWNER: {dog.owner}</div>
                                </li>
                            )}
                        </ul>
                    </main>
                </div>
            </div>
        </>
    )
}