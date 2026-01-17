// переменные
let appStatus: "success" | "error" | "loading";
let textFormat: "uppercase" | "lowercase" | "capitalize";

// интерфейсы
interface IUser {
  id: number;
  name: string;
  surname: string;
  city: string;
  age: number;
  address ? : string;
}
interface IDeveloper extends IUser {
  position: string;
  workExperience: number;
}

// функции
function culcNumbers(a: number, b: number): number {
  return a + b;
}
culcNumbers(23, 75);
culcNumbers(15, 16);

function formatString(resultingString: string, format: string): string {
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

function getString(originalString: string, specialСharacter: string): string {
  return originalString.replaceAll(specialСharacter, "");
}
getString("Как дела", "?");

// Массив объектов
const users: IUser[] = [{
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

const filtredUsers =  users.filter(user => user.age > 25);
console.log(users);
console.log(filtredUsers);
