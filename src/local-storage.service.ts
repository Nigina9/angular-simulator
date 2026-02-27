import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  saveValue<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue<T>(key: string): T | null {
    const valueFromStorage: string | null = localStorage.getItem(key);
    return valueFromStorage ? JSON.parse(valueFromStorage) : null;
  }

  removeKey(key: string): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }

}
