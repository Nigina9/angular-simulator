import { IProduct } from "../../products/interfaces/IProduct";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
