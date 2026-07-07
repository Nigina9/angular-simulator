export class Collection<T> {

  private items: T[] = [];

  constructor(items: T[]) {
    this.items = items;
  }

  getAllItems(): T[] {
    return this.items;
  }

  getItem(index: number): T | undefined {
    return this.items.at(index);
  }

  clear(): void {
    this.items = [];
  }

  deleteItem(index: number): void {
    this.items = this.items.filter((item, i) => i !== index);
  }

  replaceItem(index: number, newItem: T): void {
    this.items[index] = newItem;
  }

}

const cosmeticProducts: string[] = ['mascara', 'lipstick', 'powder', 'shadows', 'eyeliner', 'foundation cream'];
const collectionCosmeticProducts = new Collection<string>(cosmeticProducts);
collectionCosmeticProducts.replaceItem(1, 'highlighter');
collectionCosmeticProducts.getItem(3);
collectionCosmeticProducts.deleteItem(2);

const movieGenres: string[] = ['drama', 'comedy', 'fantasy', 'action movie', 'melodrama'];
const collectionMovie = new Collection<string>(movieGenres);
collectionMovie.getAllItems();
collectionMovie.replaceItem(2, 'horror');
