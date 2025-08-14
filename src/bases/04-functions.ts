// Traditional function declaration - hoisted and can be called before declaration
// - Called "declaration" because it follows similar syntax to declaring variables
// HOISTED means that the function is available in the scope before it is declared.
// BEFORE DECLARATION means that the function is available in the scope before the line where it is declared.
function greetPerson(name: string) {
  return `Hello ${name}`;
}

// Arrow function expression - not hoisted and must be declared before use
// - Called "expression" because the function is part of a lagrger expression
// NOT HOISTED means that the function is not available in the scope before it is declared.
const greetPerson2 = (name: string) => {
  return `Hello ${name}`;
}

// This is an implicit object return of an object. You need parenthesis to return an object.
const getUser = (name: string, age: number) => ({ name, age });

console.log(greetPerson('John'));
console.log(greetPerson2('John'));
console.log(getUser('John', 30));

export {};