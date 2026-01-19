// переменные
let appStatus: "success" | "error" | "loading";
let textFormat: "uppercase" | "lowercase" | "capitalize";
<<<<<<< HEAD

=======
>>>>>>> b40c1de1c6db8967866bcbd12b6399286e98c542
// интерфейсы
interface IUser {
  id: number;
  name: string;
  surname: string;
  city: string;
  age: number;
<<<<<<< HEAD
  address?: string;
=======
  address ? : string;
>>>>>>> b40c1de1c6db8967866bcbd12b6399286e98c542
}
interface IDeveloper extends IUser {
  position: string;
  workExperience: number;
}

// функции
<<<<<<< HEAD
function sumNumbers(a: number, b: number): number {
  return a + b;
}
sumNumbers(23, 75);
sumNumbers(15, 16);

function formatString(resultingString: string, format: "uppercase" | "lowercase" | "capitalize"): string {
=======
function culcNumbers(a: number, b: number): number {
  return a + b;
}
culcNumbers(23, 75);
culcNumbers(15, 16);

function formatString(resultingString: string, format: string): string {
>>>>>>> b40c1de1c6db8967866bcbd12b6399286e98c542
  if (format === "uppercase") {
    return resultingString.toLocaleUpperCase();
  } else if (format === "lowercase") {
    return resultingString.toLocaleLowerCase();
  } else {
    return resultingString.charAt(0).toLocaleUpperCase() + resultingString.slice(1).toLocaleLowerCase();
  }
}
formatString("Привет всем", "lowercase");
formatString("доброе утро", "uppercase");
formatString("мороз и солнце, день чудесный", "capitalize");

<<<<<<< HEAD
function deleteSymbolFromString(text: string, symbol: string): string {
  return text.replaceAll(symbol, "");
}
deleteSymbolFromString("Как дела", "?");

// Массив объектов
const users: IUser[] = [
  {
=======
function getString(originalString: string, specialСharacter: string): string {
  return originalString.replaceAll(specialСharacter, "");
}
getString("Как дела", "?");

// Массив объектов
const users: IUser[] = [{
>>>>>>> b40c1de1c6db8967866bcbd12b6399286e98c542
    id: 3,
    name: "Nigina",
    surname: "Zaripova",
    city: "Moscow",
    age: 29,
    address: "street Pererva, 57"
  },
  {
    id: 7,
    name: "Dasha",
    surname: "Ivanova",
    city: "Moscow",
    age: 31,
    address: "street Tenlyi stan, 13"
  },
  {
    id: 2,
    name: "Elena",
    surname: "Kaverina",
    city: "Lyubertsy",
    age: 19,
    address: "Oktyabrsky prospekt 34"
  },
  {
    id: 5,
    name: "Seva",
    surname: "Rozhkov",
    city: "Moscow",
    age: 21
  }
]

<<<<<<< HEAD
const usersOverAgeTwentyFive: IUser[] = users.filter(currentUser => currentUser.age > 25);
console.log(users);
console.log(usersOverAgeTwentyFive);
=======
const filtredUsers =  users.filter(user => user.age > 25);
console.log(users);
console.log(filtredUsers);
>>>>>>> b40c1de1c6db8967866bcbd12b6399286e98c542
