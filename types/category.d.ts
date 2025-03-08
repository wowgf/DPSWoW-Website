export interface Category {
  createTime: string;
  description: null;
  id: number;
  image: null;
  key: null | string;
  level: null;
  name: string;
  parentId: null | string;
  sort: number;
  status: number;
  type: number;
  updateTime: string;
  [property: string]: any;
}

export interface CategoryTreeItem extends Category {
  children?: CategoryTreeItem[];
}

export type CategoryTree = CategoryTreeItem[];


export interface Item {
  createTime: string;
  description: null;
  id: number;
  image: null;
  key: null;
  level: null;
  name: string;
  parentId: string;
  sort: number;
  status: number;
  type: number;
  updateTime: string;
  [property: string]: any;
}