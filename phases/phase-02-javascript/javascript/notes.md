# JavaScript

- JavaScript is the programming language of the web.
- It allows us to take our pages from static web pages to dynamic web applications.

## Variables

- var : functional scope (Variable can be redeclared & updated)
- let : block scope (Variable cannot be redeclared but can be updated)
- const : block scope (Variable cannot be redeclared or updated)

## Data Types

### Primitive Types

- Integer(number) , Boolean , undefined , null

### Reference Type

- Objects, Arrays ,functions

## Oprators

**Arithmetic oprator** : + , - , \* , / , %(modulus), \*\*(exponent)

**Unary operator** : increment, decrement (post and pre)

**Assignment operator** : = , += , -= , \*= , /= , %= , \*\*=

**Compariosn operator** : == , === , != , !== , > , < , >= , <=

**Ternary operator** : condtion ? true : false

**Logical operator** : &&, ||, !, ??

## String

- Strings, another basic data type, represent a string (or sequence) of characters.
- It is a sequence of characters used to represent text.

- Template literals in string

```js
let name = "Pratik";
let age = 20;
console.log(`My name is ${name} and age is ${age}`);
```

- Perform all string in-built methods opration in `index.js` file.

## Undefined

- Variables are only stored as undefined if they have been declared but not instantiated with a value.

## Null

- Null values intentionally are stored as null to indicate that the variable is empty.

## Functions

- Functions allow us to repeat tasks that involve a similar sequence of steps.

```js
function sum(a, b) {
  return a + b;
}
let ans = sum(5, 5);
console.log(ans);
```

- Arrow Functions

```js
const sayHello = () => {
  console.log("Hello");
};
sayHello();
```

## Conditional Statements

- Using this we can control the flow of our program.

- `if else`

```js
let age = 20;
if (age > 18) {
  console.log("Do voting");
} else {
  console.log("Do not voting");
}
```

- `if elseif else`

```js
let age = 37;
if (age < 18) {
  console.log("student");
} else if (age >= 18 && age <= 50) {
  console.log("working man");
} else {
  console.log("Retire man");
}
```

## Loops

- `while` : if you don't know how many times it will run.

```js
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}
```

- `for` : if you know how many times it will run.

```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

- `for in` : It is used to iterate over the keys of an object.

```js
let obj = {
  name: "Pratik",
  age: 20,
  city: "Nashik",
};
for (let i in obj) {
  console.log(i);
}
```

- ` for of` : It is used itrate over string of each character.

```js
for (let i of "hello") {
  console.log(i);
}
```

## Arrays

- Arrays are collection of data/items.
- Arrays is heterogeneous , beacause we can store different type of data in one array.

- `toString` : Convert array in to string
- `push` : It will add the element at the end
- `pop` : it will remove the last element
- `unshift` : it will add the element at the start
- `shift` : it will remove the first element
- `indexOf` : return index of the element
- `concat` : it will add the element at the end
- `includes` : it will return true or false
- `reverse` : it will reverse the array
- `sort` : it will sort the array
- `find` : find particular element in array
- `slice(start, end)`: Gate the particular elements
- `splice(start, count of remove elements)` : Remove the particular elements from array
- `join` : join particular element in array
- `some` : It returns true if any element satisfies the condition, otherwise it returns false
- `every` : It returns true only if every element satisfies the condition, otherwise it returns false.
- `foreach` : forEach is used to iterate the array(not modification)
- `map` : map is used to iterate the array(new array), If you want to modify the array then use map
- `filter` : filter particular element in array based on condition
- `reduce` : reduce particular element in array(combine in to one)

## Objects

- A JavaScript object is another variable that allows us to store multiple pieces of data.

```js
var student = {
  name: "Mary",
  age: 10,
};
console.log(student.name);
console.log(student["age"]);
```

## this Keyword

- The this keyword allows us to create functions that modify the specific instance of the object to which the function is attached.

```js
const person = {
  name: "Pratik",
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
};

person.greet();
```

## DOM (Document Object Model)

- It is a programming interface provided by the browser that allows JavaScript to interact with and manipulate the HTML and CSS of a web page.
- The DOM is like a tree structure that represents all the elements (tags) of your webpage.
- JavaScript can use this structure to read, add, change, or delete elements and content on the page.

```
Document
  └── html
      └── body
          ├── h1
          │   └── "Hello"
          └── p
              └── "Welcome!"
```

- `getElementById` : Returns the element with the ID
- `getElementsByClassName` : Returns an HTMLCollection of class
- `getElementsByTagName` : Returns all HTML elements

- `querySelector` : Returns the first element matching the selector
- `querySelectorAll` : Returns all matching elements as a NodeList

- `createElement` : Create a new HTML elements

- `createTextNode` : Creates a new text node
- `appendChild(newElement)` : Adds a new element to the body
- `removeChild(element)` : Removes an element from the body

### Dom Properties

- `tagName` : returns the tag name of the element
- `className` : returns the class name of the element
- `innerHTML` : returns the palin text or HTML content of the element
- `innerText` : returns the visible text content of the element
- `textContent` -> returns the text content of the element event for hidden elements
- `value` -> returns the value of the element

- `getAttribute` -> returns the value of the attribute
- `setAttribute` -> sets the value of the attribute

- `node.style` -> returns the style object of the element


## Events in js

- Chnage in the state of an object is knoown as an event
- Events are fired to notify code of "interesting changes " that may affect code execuation

### Event Types
1. Mouse Events - click, mousemove, mouseout, mouseover
2. Keyboard Events - keydown, keypress, keyup
3. Focus Events - focus, blur
4. Form Events - submit, change, reset

```js
btn.click = () => {
    console.log("clicked");
}
```

- `Event Object` : it is a special object that has details about the event
- Call envents handlers have acces to the event object's properties and methods

1. target - returns the element that triggered the event
2. preventDefault() - prevents the default behavior of the event
3. stopPropagation() - stops the event from bubbling up the DOM tree

```js
btn.click = (e) =>{
   console.log(e.target);
   e.preventDefault();
    e.stopPropagation();
}
```

### Event Listeners
1. `addEventListener` - adds an event listener to an element
2. `removeEventListener` - removes an event listener from an element

```js
btn.addEventListener("click", (e) => {
    console.log(e.target);
 })
```
```js
btn.removeEventListener("click", (e) => {
     console.log(e.target);
})
```