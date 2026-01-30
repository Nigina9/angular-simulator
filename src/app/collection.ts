export class Collection<T> {
  public arrayItems: T[] = [];

  getAllItems(): T[] {
    return this.arrayItems;
  }

  getItem(): T | undefined {
    return this.arrayItems.at(0);
  }

  clean(): void {
    this.arrayItems = [];
  }

  deleteItem(): void {
    this.arrayItems.pop();
  }

  replaceItem(newItem: T): void {
    this.arrayItems[1] = newItem;
  }
}

const cosmeticProducts = ['mascara', 'lipstick', 'powder', 'shadows', 'eyeliner', 'foundation cream'];
const collectionCosmeticProducts = new Collection<string>();
collectionCosmeticProducts.arrayItems = cosmeticProducts;
collectionCosmeticProducts.getAllItems();
collectionCosmeticProducts.replaceItem('highlighter');

const movieGenres = ['drama', 'comedy', 'fantasy', 'action movie', 'melodrama'];
const collectionMovie = new Collection<string>();
collectionMovie.arrayItems = movieGenres;
collectionMovie.getAllItems();
collectionMovie.replaceItem('horror');




