import Dog from "./dog-view";

export default async function Dogs({ params }: { params: Promise<{ id: string }>; }) {
    const { id } = await params;

    return (
        <>
            <Dog dogid={id} />
        </>
    )
}