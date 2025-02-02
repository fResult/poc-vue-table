import faker from "@faker-js/faker";
import { IColumnHeaders } from "./types";

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  houseNo: Address["houseNo"];
  street: Address["street"];
  streetPrefix: Address["streetPrefix"];
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

export type Address = {
  houseNo: string;
  street: string;
  streetPrefix: string;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    // address: {
    houseNo: faker.address.buildingNumber(),
    street: faker.address.streetName(),
    streetPrefix: faker.address.streetPrefix(),
    // },
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0],
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth];
    return range(len).map((): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
