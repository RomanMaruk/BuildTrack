export interface ICreateSupplier {
  name: string;
}

export interface ISupplierData extends ICreateSupplier {
  id: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
