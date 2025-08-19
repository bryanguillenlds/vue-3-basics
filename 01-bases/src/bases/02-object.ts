const person = {
  name: 'Bryan',
  lastName: 'Guillen',
  age: 20,
  address: {
    country: 'Brasil',
    houseNumber: 123,
    city: 'Sao Paulo',
    zip: '1234567890',
    lat: 12.34567890,
    lng: 12.34567890
  },
} // as const; // as const is used to make the object immutable, so we can't change the value of the properties

const person2 = structuredClone(person); // clone the object, even deeply nested properties

console.log(person);
console.log(person2);

/* OBJECT DESTRUCTURING */
const { name, lastName, age, address } = person;
console.log({ name, lastName, age, address });