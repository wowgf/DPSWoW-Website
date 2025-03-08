export interface PageParams {
  page: number;
  size: number;
  [property: string]: any;
}

export interface MiniURLScheme {
  errcode: number;
  errmsg: string;
  openlink: string;
  [property: string]: any;
}