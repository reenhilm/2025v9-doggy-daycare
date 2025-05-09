import Dog from "./dog-view";
import Link from 'next/link';

export default async function Dogs({ params }: { params: Promise<{ id: string }>; }) {
    const { id } = await params;

    return (
        <div className="flex mb-15">
            <div className="flex flex-col m-auto items-center">
                <header className="flex flex-col m-auto items-center">
                    <Link className="text-center mt-15 mb-5" href={"/dogs"}>Back to our dogs list</Link>                       
                </header>
                <main className='flex flex-col justify-between'>                                    
                    <Dog dogid={id} />
                </main>
            </div>
        </div>
    )
}