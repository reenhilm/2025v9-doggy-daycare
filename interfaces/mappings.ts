import { APIDog, Dog } from "@/interfaces/dogs";

export function mapAPIDogsToDogs(apiDogs: APIDog[]): Dog[] {
  return apiDogs.map(mapAPIDogToDog);
}

export function mapAPIDogToDog(apiDog: APIDog): Dog {
  return {
    id: apiDog.chipNumber, // Using chipNumber as a unique identifier
    name: apiDog.name,
    img: apiDog.img,
    breed: apiDog.breed, // Since APIDog doesn't have breed info, set a default value
    owner: `${apiDog.owner.name} ${apiDog.owner.lastName}`,
    age: apiDog.age,
    present: apiDog.present,
  };
}