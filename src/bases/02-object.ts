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

console.log(person);
console.log(person.address);
console.log(person.address.country);