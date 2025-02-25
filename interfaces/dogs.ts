export interface Dog {
    id: string;
    name: string;
    breed: string;
    owner: string;
    age: number;
    present: boolean;
}
export interface DogState { dogs: Dog[] };
export interface DogAction { type: string; payload: Partial<Dog> };