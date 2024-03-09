import { Item } from "@/types/item";
import { Tag } from "@/types/tag";

export type Folder = {
  id: number;
  orgId: string;
  name: string;
  notes?: string;
  tag?: Tag;
  items: Item[];
  deleted: boolean;
  dateCreated: Date;
  dateDeleted?: Date;
};
