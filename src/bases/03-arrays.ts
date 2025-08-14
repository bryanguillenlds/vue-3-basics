const numberArray: number[] = [1, 2, 3, 4, 5];
// Typescript doesn't allow to add a string to the array because it's a number array

const numberArray2: (number | string)[] = [1, 2, 3, 4, 5, '6', '7', '8', '9', '10'];
// Now it allows to add a string to the array because it's a number or string array

console.log({ numberArray, numberArray2 });

export {};
// Without any export or import, TypeScript treats the file as a script (global scope), not a module (isolated scope).
// In script mode (no imports, no exports), variables declared with let, const, or var get added to the global scope, which can cause naming conflicts.
// Multiple files could declare variables with the same name
// This creates naming collisions in the global scope
// export {} prevents this by making each file a module with isolated scope.
// So it is just a trick. It's TypeScript's way of saying "treat this as a module, not a script."