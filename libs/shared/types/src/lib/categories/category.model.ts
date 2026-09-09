export interface ICreateCategory {
  name: string;
  parentId?: string | null;
}

export interface ICategoryData extends ICreateCategory {
  id: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
