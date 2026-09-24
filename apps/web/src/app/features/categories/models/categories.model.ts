export interface ICategoryPost {
  name: string;
  parentId?: string;
}

export interface ICategory {
  id: string;
  name: string;
  parentId: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryTree extends ICategory {
  children: ICategoryTree[];
}
