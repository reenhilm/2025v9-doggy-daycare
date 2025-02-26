export interface Dog {
    id: string;
    name: string;
    breed: string;
    img: string;
    owner: string;
    age: number;
    present: boolean;
}
export interface APIDog {
    name: string;
    sex: string;
    breed: string;
    img: string;
    present: boolean;
    age: number;
    chipNumber: string;
    owner: APIOwner;
}
export interface APIOwner {
    name: string;
    lastName: string;
    phoneNumber: string;
}
export interface DogState { dogs: Dog[], page: number };
export interface DogAction { type: string; payload: Partial<Dog> };