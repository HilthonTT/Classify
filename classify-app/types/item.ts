export type Item = {
  id: number;
  folderId?: number;
  orgId: string;
  name: string;
  imageUrl?: string;
  quantity: number;
  minimumLevel: number;
  price: number;
  deleted: boolean;
  dateCreated: Date;
};
