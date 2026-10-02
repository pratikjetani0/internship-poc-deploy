## Shallow Copy

- A shallow copy occurs when you copy the reference of an object to a new variable. In this process, only the top-level properties are copied, while nested objects or arrays still reference the original memory location.

```js
let employee = {
  eid: "E102",
  ename: "Pratik",
};

console.log("Employee=> ", employee);

// Shallow copy
let newEmployee = { ...employee };
console.log("New Employee=> ", newEmployee);

console.log("---------After modification----------");
newEmployee.ename = "Abhi";

console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);
```

- shallow copy also done via this

```js
let user = {
  name: "John",
  age: 30,
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent object with the same content
clone.name = "Pratik"; // changed the data in it

console.log(user.name); // still John in the original object
console.log(clone.name);
```

## Deep Copy

- A deep copy, on the other hand, creates a completely independent copy of the object, including all nested objects or arrays. This ensures that changes made to one object do not affect the other. Each object is stored in a separate memory location, making them entirely independent.

- `JSON.stringify()` : converts a JavaScript object into a JSON string.
- `JSON.parse()` : converts the JSON string back into a new JavaScript object.

```js
let employee = {
  eid: "E102",
  ename: "Pratik",
};
console.log("=========Deep Copy========");
let newEmployee = JSON.parse(JSON.stringify(employee));

console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);

console.log("---------After modification---------");
newEmployee.ename = "Abhi";

console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);
```

## Optinal Chaining

- It is a syntax that allows you to safely access properties, methods, or array elements without manually checking if each reference in the chain is valid.

- Represented by the ?. operator,

## Destructuring

### Rest Oprator

- Rest operator packs multiple elements into a single array or object
- Handles an indefinite number of arguments or remaining properties.

### Spread Oprator

- The Spread operator unpacks elements from an array or object.
- Creates a shallow copy of an array or object.

## JSON (JavaScript Object Notation)

- parse
- stringify

## Recursion

- It is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, simpler sub-problems.

```js
function sum(n) {
  if (n === 0) {
    return 0; 
  }
  return n + sum(n - 1); // recursive call
}

console.log(sum(5)); // 15
```

## Scheduling

- `setTimeout()` : Executes a function once after a specified delay in milliseconds.
- `setInterval()` : Repeatedly executes a function at a fixed time interval.

## Error Handling

- `try` : A block containing code that might throw an error.

- `catch(error)` : Executes if an error occurs in the try block, providing an error object with properties like name and message.

- `finally`: An optional block that always runs after the try and catch blocks, regardless of whether an error was thrown.

## Callback

- It is a function which is passed as an argument to another function is called a callback function.

```js
function print() {
  console.log("3 seconds passed");
}

setTimeout(print, 3000);
console.log("Done !");
```

## Callback Hell

- callback hell is a pattern where multiple nested callbacks are used to handle asynchronous operations in a complex application.

```js
function getData(dataId, getNextdata) {
  setTimeout(() => {
    console.log("data = ", dataId);
    if (getNextdata) {
      getNextdata();
    }
  }, 2000);
}

// this is complext call back hell
getData(1, () => {
  console.log("getting data2...");
  getData(2, () => {
    console.log("getting data3...");
    getData(3, () => {
      console.log("getting data4...");
      getData(4);
    });
  });
});
```

## Promise

- Promises is an object that is for eventual completion of asynchronous oprational task

```js
let promise = new Promise((resolve, reject) => {
  resolve();
  reject();
});
```

- Promise has three state of a promise
- `Pending` : the result is undefined
- `Resolved` : the result is a value (fulfilled) `resolve( result )`
- `Rejected` : the result is an error object `reject( error )`

```js
let promise = new Promise((res, rej) => {
  setTimeout(() => {
    console.log("Hello Pratik");
    res("success");
    rej("error");
  }, 2000);
})
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

## Prmoise Chaining

```js
function getData(dataId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("data = ", dataId);
      resolve("success");
    }, 2000);
  });
}

let promise = getData(123);

promise
  .then((result) => {
    console.log(result);
    return getData(456);
  })
  .then((result) => {
    console.log(result);
    return getData(789);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

## Async Await

- async fucntion always returns a promise
- await pauses the execution of its surrounding async function until the promise is setteled.

```js
function api() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("data ");
      resolve("success");
    }, 5000);
  });
}

async function main() {
  const result = await api();
  console.log(result);
}

console.log(main());
```

## IIFE - Immediately Invoked Function Expression

- It is function that is called immediately after it is defined

```js
(function () {
  console.log("Hello");
})();

(async () => {
  console.log("Hello");
})();
```

## Module

- A module is a self-contained file that groups related code (functions, variables, or classes) to be reused across different parts of an application.
