# What are some differences between interfaces and types in TypeScript?

## বিভিন্ন ক্ষেত্রে টাইপস্ক্রিপ্টে Type এবং Interface এর পার্থক্য নিরূপণ করা হল:

1. Extension / Inheritance

- Interface পরে আবার বাড়ানো যায় (extend করা যায়)।

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  salary: number;
}
```

- Type ফরমালি extend করা যায় না, তবে intersection (&) দিয়ে মিলানো যায়।

```ts
type Person = { name: string };

type Employee = Person & {
  salary: number;
};
```

2. Declaration Merging

- Interface merge হয় (একই নামের interface একসাথে মিলিয়ে যায়)।

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

// merged interface: { name: string, age: number }
```

- Type merge হয় না — একই নামে দুইবার ঘোষণা দিলে error হবে।

```ts
type User = { name: string };
// type User = { age: number }; ❌ Error: Duplicate identifier
```

3. Object Shape বর্ণনা

- Interface প্রধানত object-এর shape নির্ধারণে ব্যবহৃত হয়।

```ts
interface Car {
  brand: string;
  speed: number;
}
```

- Type-ও object বর্ণনা করতে পারে, কিন্তু আরও অনেক কিছু করতে পারে।

```ts
type Car = {
  brand: string;
  speed: number;
};
```

4. Flexibility / Versatility

- Interface শুধু object structure বর্ণনা করে।
- Type বেশি flexible — union, tuple, primitive alias সব করতে পারে যা Interface এগুলো করতে পারে না।

```ts
type ID = number | string;
type Point = [number, number];
type Age = number;
type Add = (a: number, b: number) => number;
```

5. Class Implementation

- Class সাধারণত interface implement করে।

```ts
interface Animal {
  move(): void;
}

class Dog implements Animal {
  move() {
    console.log("Running...");
  }
}
```

- Type দিয়েও implement করা যায়, কিন্তু interface এর মতো প্রচলিত না।

```ts
type Animal = {
  move(): void;
};

class Dog implements Animal {
  move() {
    console.log("Running...");
  }
}
```

6. কখন কোনটা ব্যবহার করা ভালো

- Interface: যখন object-এর নকশা তৈরি করতে হবে এবং ভবিষ্যতে বাড়ানোর দরকার হতে পারে।

- Type: যখন বেশি flexible structure দরকার — যেমন union, tuple, function type।

# What is the use of the keyof keyword in TypeScript? Provide an example.

### TypeScript এ keyof কীওয়ার্ডের ব্যবহার

- TypeScript-এ keyof একটি অত্যন্ত শক্তিশালী টাইপ অপারেটর।
  এটি কোনো object type-এর সবগুলো key-এর union টাইপ তৈরি করে।

- মূলত, যখন আমরা চাই যে কোনো ফাংশন বা ভ্যারিয়েবল শুধুমাত্র একটি নির্দিষ্ট object-এর key-গুলোর মধ্যেই সীমাবদ্ধ থাকুক, তখন keyof ব্যবহার করা হয়।

- বাস্তব উদাহরণ (Object থেকে value safely পড়া)
  ✔ উদাহরণ:

```ts
type Car = {
  brand: string;
  model: string;
  year: number;
};

function getCarValue(obj: Car, key: keyof Car) {
  return obj[key];
}

const myCar: Car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
};

console.log(getCarValue(myCar, "brand")); // Safe
console.log(getCarValue(myCar, "model")); // Safe
```

❌ ভুল key দিলে TypeScript সঙ্গে সঙ্গে error দিবে:

```ts
getCarValue(myCar, "color"); // ❌ Error: "color" does not exist in type 'Car'
```

- উদাহরণের ব্যাখ্যা

এখানে keyof Car মানে:

```ts
"brand" | "model" | "year";
```

সুতরাং getCarValue() ফাংশনের key প্যারামিটার কেবল এই তিনটি string-এর একটি হতে পারে।
