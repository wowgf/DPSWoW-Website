/**
 * CommonRequest
 */
export type CommonRequest = Promise<any>
export type CommonPage = Promise<Data>

export interface Pagination {
  page: number;
  size: number;
  total: number;
  [property: string]: any;
}

export interface Data {
  list: any[];
  pagination: Pagination;
  [property: string]: any;
}


export interface PagePagination {
  page: number;
  size: number;
}
