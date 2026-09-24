export interface IProductQueryParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: string;
  [key: string]: string | number | undefined;
}
