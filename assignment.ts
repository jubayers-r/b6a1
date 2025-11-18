const formatValue = (
  input: string | number | boolean
): string | number | boolean => {
  switch (typeof input) {
    case "string":
      return input.toUpperCase();
    case "number":
      return input * 10;
    case "boolean":
      return !input;
  }
};

const getLength = (input: string | any[]): number => {
  if (typeof input === "string") {
    return [...input].length;
  }
  if (Array.isArray(input)) {
    return input.length;
  }
  throw new Error("Input must be a string or array");
};

class Person {
  constructor(public name: string, public age: number) {}
  getDetails() {
    return `'Name: ${this.name}, Age: ${this.age}'`;
  }
}

const filterByRating = (
  books: {
    title: string;
    rating: number;
  }[]
): {
  title: string;
  rating: number;
}[] => {
  return books.filter((book) => {
    if (book.rating < 1 || book.rating > 5) {
      throw new Error(`Invalid rating: ${book.rating}`);
    }
    return book.rating >= 4;
  });
};

const filterActiveUsers = (
  users: {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
  }[]
): {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}[] => {
  return users.filter((user) => user.isActive === true);
};

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}

const printBookDetails = (book: Book) => {
  console.log(
    `Title: ${book.title}, Author: ${book.author}, Published: ${
      book.publishedYear
    }, Available: ${book.isAvailable ? "Yes" : "No"}`
  );
};

const getUniqueValues = <T extends number | string>(
  arr1: T[],
  arr2: T[]
): T[] => {
  const arr = [...arr1, ...arr2];
  let exists: Record<number | string, boolean> = {};
  let filteredArr: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    let value = arr[i]!;
    if (!exists[value]) {
      filteredArr.push(value);
      exists[value] = true;
    }
  }

  return filteredArr;
};

const calculateTotalPrice = <
  T extends { name: string; price: number; quantity: number; discount?: number }
>(
  products: T[]
): number => {
  let sum: number = 0;

  products.map((element) => {
    if (element.discount) {
      if (element.discount >= 0 && element.discount <= 100) {
        sum +=
          (element.price - (element.price * element.discount) / 100) *
          element.quantity;
      } else {
        throw new Error("Discount cannot be less than 0 and more than 100");
      }
    } else {
      sum += element.price * element.quantity;
    }
  });
  return sum;
};
