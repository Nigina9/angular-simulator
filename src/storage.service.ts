import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  saveToLocalStorage<T> (key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage<T> (key: string): T | null {
    const keyFromStorage: string | null = localStorage.getItem(key);
    return keyFromStorage ? JSON.parse(keyFromStorage) : null;
  }

  removeItemStorage(key: string): void {
    localStorage.removeItem(key);
  }

  cleanAll(): void {
    localStorage.clear();
  }
}
