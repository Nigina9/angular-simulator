// переменные
let appStatus: 'success' | 'error' | 'loading';
let textFormat: 'uppercase' | 'lowercase' | 'capitalize';
// интерфейсы
interface IUser {
  id: number;
  name: string;
  surname: string;
  city: string;
  age: number;
  address?: string;
}
interface IDeveloper extends IUser {
  position: string;
  workExperience: number;
}

// функции
function sum(a: number, b: number): number {
  return a + b;
}
sum(23, 75);
sum(15, 16);

function formatString(text: string, format: 'uppercase' | 'lowercase' | 'capitalize'): string {
  if (format === 'uppercase') {
    return text.toLocaleUpperCase();
  } else if (format === 'lowercase') {
    return text.toLocaleLowerCase();
  } else {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1).toLocaleLowerCase();
  }
}
formatString('Привет всем', 'lowercase');
formatString('доброе утро', 'uppercase');
formatString('мороз и солнце, день чудесный', 'capitalize');

function deleteSymbol(text: string, symbol: string): string {
  return text.replaceAll(symbol, '');
}
deleteSymbol('Как дела', '?');

// Массив объектов
const users: IUser[] = [
  {
    id: 3,
    name: 'Nigina',
    surname: 'Zaripova',
    city: 'Moscow',
    age: 29,
    address: 'street Pererva, 57'
  },
  {
    id: 7,
    name: 'Dasha',
    surname: 'Ivanova',
    city: 'Moscow',
    age: 31,
    address: 'street Tenlyi stan, 13'
  },
  {
    id: 2,
    name: 'Elena',
    surname: 'Kaverina',
    city: 'Lyubertsy',
    age: 19,
    address: 'Oktyabrsky prospekt 34'
  },
  {
    id: 5,
    name: 'Seva',
    surname: 'Rozhkov',
    city: 'Moscow',
    age: 21
  }
];

const usersOverAgeTwentyFive: IUser[] = users.filter((currentUser: IUser) => currentUser.age > 25);
