const numberArray: number[] = [1, 2, 3, 4, 5];
// Typescript doesn't allow to add a string to the array because it's a number array

const numberArray2: (number | string)[] = [1, 2, 3, 4, 5, '6', '7', '8', '9', '10'];
// Now it allows to add a string to the array because it's a number or string array

console.log({ numberArray, numberArray2 });

/* Array Destructuring */
// Variables are assigned to the values of the array in the order they are declared
// If you want to skip a value, you can use a comma to skip it
// If you want to assign the first value to a variable and the rest of the values to a variable, you can use the rest operator (...)

const [first, second, third, fourth, fifth] = numberArray;
console.log({ first, second, third, fourth, fifth });

const [first2, second2, third2, fourth2, fifth2] = numberArray2;
console.log({ first2, second2, third2, fourth2, fifth2 });

const [first3, second3, ...rest] = numberArray2;
console.log({ first3, second3, rest });

//iF you destructure a value that is not in the array, you will get undefined
const [first4, second4, third4, fourth4, fifth4, sixth4] = numberArray;
console.log({ first4, second4, third4, fourth4, fifth4, sixth4 }); // sixth4 is undefined

export {};
// Without any export or import, TypeScript treats the file as a script (global scope), not a module (isolated scope).
// In script mode (no imports, no exports), variables declared with let, const, or var get added to the global scope, which can cause naming conflicts.
// Multiple files could declare variables with the same name
// This creates naming collisions in the global scope
// export {} prevents this by making each file a module with isolated scope.
// So it is just a trick. It's TypeScript's way of saying "treat this as a module, not a script."