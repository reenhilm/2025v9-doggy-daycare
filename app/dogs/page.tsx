import { Metadata } from "next";
import DogList from "./dog-list";

export const metadata: Metadata = {
    title: "Our dogs",
    description: "Our dogs",
    authors: {
        url: new URL('https://www.linkedin.com/in/christian-ronnholm'),
        name: 'Christian Rönnholm'
    }
};

export default function Dogs() {
    return (
         <DogList />
    )
}